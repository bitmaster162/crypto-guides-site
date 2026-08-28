import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifestPath = join(root, 'dist/guides-index.json');
const apiPath = join(root, 'dist/api/public-guides.json');
const lifecyclePath = join(root, 'src/data/public-evidence-lifecycle.json');
const overridePath = join(root, 'src/data/public-review-overrides.json');

const [manifest, api, lifecycleConfig, overrideConfig] = await Promise.all([
  readFile(manifestPath, 'utf8').then(JSON.parse),
  readFile(apiPath, 'utf8').then(JSON.parse),
  readFile(lifecyclePath, 'utf8').then(JSON.parse),
  readFile(overridePath, 'utf8').then(JSON.parse)
]);

if (lifecycleConfig.schema !== 'crypto-guides.evidence-lifecycle.v1') {
  throw new Error(`Unexpected lifecycle schema: ${lifecycleConfig.schema}`);
}
if (manifest.evidenceLifecycleSchema !== lifecycleConfig.schema) {
  throw new Error('Built manifest is not bound to the source lifecycle schema');
}
if (manifest.evidenceLifecycleSource !== 'src/data/public-evidence-lifecycle.json') {
  throw new Error(`Unexpected manifest lifecycle source: ${manifest.evidenceLifecycleSource}`);
}
if (api.evidenceLifecycle !== 'SOURCE_OWNED_FAIL_CLOSED_V1') {
  throw new Error(`Unexpected public API lifecycle mode: ${api.evidenceLifecycle}`);
}
if (api.evidenceLifecycleSource !== manifest.evidenceLifecycleSource) {
  throw new Error('Public API lifecycle source does not match built manifest');
}
if (!Array.isArray(manifest.records) || !Array.isArray(api.records) || manifest.records.length !== api.records.length || manifest.records.length < 100) {
  throw new Error('Manifest/API record count mismatch or unexpectedly small corpus');
}

const requiredFields = [
  'evidenceState',
  'evidenceAsOf',
  'evidenceRefs',
  'latestVerdict',
  'primarySourceRequired',
  'reverifyAfter'
];
const allowedStates = new Set([
  'UNBOUND_REVIEW_REQUIRED',
  'REVIEW_DOC_BOUND',
  'POST_R13_CONTENT_TRUTH_HOLD'
]);
const apiBySlug = new Map(api.records.map((record) => [record.slug, record]));
const lifecycleRecords = lifecycleConfig.records || {};
const expectedHolds = {
  'analiz-fidov-likvidatsiy-kriptovalyut': 'HOLD_DISPUTED_LIQUIDATION_FEED_CLAIMS',
  'rynochno-neytralnye-kriptostrategii-2026': 'HOLD_LATER_REJECTION_OR_NON_PROMOTION_CONFLICT',
  'simulyatsiya-ispolneniya-kripto-strategiy': 'HOLD_RESEARCH_CANDIDATE_NOT_IMPLEMENTATION_GUIDANCE',
  'kriptotreyding-i-quant-issledovaniya': 'HOLD_UNSUPPORTED_QUANT_EXECUTION_CLAIMS_SOURCE_REMOVAL_REQUIRED',
  'obzor-vsekh-torgovykh-strategiy': 'HOLD_UNSUPPORTED_STRATEGY_CLAIMS_SOURCE_REMOVAL_REQUIRED'
};
const counts = {
  REVIEW_DOC_BOUND: 0,
  POST_R13_CONTENT_TRUTH_HOLD: 0,
  UNBOUND_REVIEW_REQUIRED: 0
};
const checkedRefs = new Set();

function assertDateOrNull(value, label) {
  if (value === null) return;
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`${label} must be YYYY-MM-DD|null`);
  }
}

for (const record of manifest.records) {
  const apiRecord = apiBySlug.get(record.slug);
  if (!apiRecord) throw new Error(`Public API missing lifecycle record: ${record.slug}`);

  for (const field of requiredFields) {
    if (!(field in record)) throw new Error(`Manifest route ${record.slug} missing ${field}`);
    if (!(field in apiRecord)) throw new Error(`Public API route ${record.slug} missing ${field}`);
    if (JSON.stringify(record[field]) !== JSON.stringify(apiRecord[field])) {
      throw new Error(`Manifest/API lifecycle mismatch for ${record.slug}.${field}`);
    }
  }

  if (!allowedStates.has(record.evidenceState)) {
    throw new Error(`Unsupported evidenceState for ${record.slug}: ${record.evidenceState}`);
  }
  if (!Array.isArray(record.evidenceRefs)) throw new Error(`evidenceRefs is not an array: ${record.slug}`);
  if (typeof record.latestVerdict !== 'string' || !record.latestVerdict) throw new Error(`latestVerdict missing: ${record.slug}`);
  if (typeof record.primarySourceRequired !== 'boolean') throw new Error(`primarySourceRequired is not boolean: ${record.slug}`);
  assertDateOrNull(record.evidenceAsOf, `${record.slug}.evidenceAsOf`);
  assertDateOrNull(record.reverifyAfter, `${record.slug}.reverifyAfter`);

  if (/VERIFIED_CURRENT|APPROVED_CURRENT|CURRENT_VERIFIED/.test(`${record.evidenceState} ${record.latestVerdict}`)) {
    throw new Error(`Lifecycle metadata makes an unauthorized currentness upgrade: ${record.slug}`);
  }

  if (record.evidenceState === 'UNBOUND_REVIEW_REQUIRED') {
    if (record.evidenceRefs.length !== 0 || record.latestVerdict !== 'HOLD_NO_SOURCE_BINDING') {
      throw new Error(`Unbound route is not fail-closed: ${record.slug}`);
    }
  }
  if (record.evidenceState === 'REVIEW_DOC_BOUND') {
    if (record.evidenceRefs.length === 0 || record.latestVerdict !== 'REVIEW_DOC_BOUND_NO_CURRENTNESS_UPGRADE') {
      throw new Error(`Review-doc-bound route has unsafe lifecycle semantics: ${record.slug}`);
    }
  }
  if (record.evidenceState === 'POST_R13_CONTENT_TRUTH_HOLD') {
    if (!(record.slug in expectedHolds) || record.latestVerdict !== expectedHolds[record.slug] || record.primarySourceRequired !== true) {
      throw new Error(`Post-R13 hold binding mismatch: ${record.slug}`);
    }
  }

  for (const ref of record.evidenceRefs) {
    if (!ref.startsWith('docs/')) throw new Error(`Unsafe evidence reference path for ${record.slug}: ${ref}`);
    if (!checkedRefs.has(ref)) {
      await access(join(root, ref));
      checkedRefs.add(ref);
    }
  }

  counts[record.evidenceState] += 1;
}

for (const [slug, verdict] of Object.entries(expectedHolds)) {
  const sourceEntry = lifecycleRecords[slug];
  const builtEntry = manifest.records.find((record) => record.slug === slug);
  if (!sourceEntry || !builtEntry) throw new Error(`Required post-R13 lifecycle target missing: ${slug}`);
  if (sourceEntry.evidenceState !== 'POST_R13_CONTENT_TRUTH_HOLD' || sourceEntry.latestVerdict !== verdict) {
    throw new Error(`Source lifecycle hold changed unexpectedly: ${slug}`);
  }
  if (sourceEntry.evidenceRefs.length !== 0 || sourceEntry.evidenceAsOf !== null || sourceEntry.reverifyAfter !== null) {
    throw new Error(`Post-R13 hold falsely claims evidence timing or source refs: ${slug}`);
  }
}

const explicitReviewDocBound = Object.entries(overrideConfig.records || {}).filter(([slug, review]) => {
  if (slug in expectedHolds) return false;
  return Boolean(review?.claimReview || review?.lineageReview);
}).length;
if (counts.REVIEW_DOC_BOUND !== explicitReviewDocBound) {
  throw new Error(`Review-doc-bound count mismatch: built=${counts.REVIEW_DOC_BOUND} expected=${explicitReviewDocBound}`);
}
if (counts.POST_R13_CONTENT_TRUTH_HOLD !== Object.keys(expectedHolds).length) {
  throw new Error(`Post-R13 hold count mismatch: ${counts.POST_R13_CONTENT_TRUTH_HOLD}`);
}
if (counts.REVIEW_DOC_BOUND + counts.POST_R13_CONTENT_TRUTH_HOLD + counts.UNBOUND_REVIEW_REQUIRED !== manifest.records.length) {
  throw new Error('Evidence lifecycle counts do not cover the full corpus');
}
if (JSON.stringify(manifest.evidenceLifecycleCounts) !== JSON.stringify(counts)) {
  throw new Error('Manifest evidenceLifecycleCounts mismatch');
}
if (JSON.stringify(api.evidenceLifecycleCounts) !== JSON.stringify(counts)) {
  throw new Error('Public API evidenceLifecycleCounts mismatch');
}

console.log(`EVIDENCE_LIFECYCLE_GATE=PASS records=${manifest.records.length} review_doc_bound=${counts.REVIEW_DOC_BOUND} post_r13_holds=${counts.POST_R13_CONTENT_TRUTH_HOLD} unbound=${counts.UNBOUND_REVIEW_REQUIRED} checked_refs=${checkedRefs.size}`);
