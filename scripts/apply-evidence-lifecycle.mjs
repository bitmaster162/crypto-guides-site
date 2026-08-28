import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifestPath = join(root, 'dist/guides-index.json');
const lifecyclePath = join(root, 'src/data/public-evidence-lifecycle.json');
const overridePath = join(root, 'src/data/public-review-overrides.json');

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const lifecycleConfig = JSON.parse(await readFile(lifecyclePath, 'utf8'));
const overrideConfig = JSON.parse(await readFile(overridePath, 'utf8'));
const overrides = overrideConfig.records || {};
const lifecycleRecords = lifecycleConfig.records || {};

if (!Array.isArray(manifest.records) || manifest.records.length < 100) {
  throw new Error('Reviewed guide manifest missing or unexpectedly small');
}
if (lifecycleConfig.schema !== 'crypto-guides.evidence-lifecycle.v1') {
  throw new Error(`Unsupported evidence lifecycle schema: ${lifecycleConfig.schema}`);
}

const requiredFields = [
  'evidenceState',
  'evidenceAsOf',
  'evidenceRefs',
  'latestVerdict',
  'primarySourceRequired',
  'reverifyAfter'
];

function assertLifecycleShape(value, label) {
  for (const field of requiredFields) {
    if (!(field in value)) throw new Error(`${label} missing lifecycle field: ${field}`);
  }
  if (typeof value.evidenceState !== 'string' || !value.evidenceState) {
    throw new Error(`${label} evidenceState must be a non-empty string`);
  }
  if (value.evidenceAsOf !== null && typeof value.evidenceAsOf !== 'string') {
    throw new Error(`${label} evidenceAsOf must be string|null`);
  }
  if (!Array.isArray(value.evidenceRefs) || value.evidenceRefs.some((ref) => typeof ref !== 'string' || !ref)) {
    throw new Error(`${label} evidenceRefs must be an array of non-empty strings`);
  }
  if (typeof value.latestVerdict !== 'string' || !value.latestVerdict) {
    throw new Error(`${label} latestVerdict must be a non-empty string`);
  }
  if (typeof value.primarySourceRequired !== 'boolean') {
    throw new Error(`${label} primarySourceRequired must be boolean`);
  }
  if (value.reverifyAfter !== null && typeof value.reverifyAfter !== 'string') {
    throw new Error(`${label} reverifyAfter must be string|null`);
  }
}

assertLifecycleShape(lifecycleConfig.default || {}, 'lifecycle default');
if (!lifecycleConfig.derivedReviewDocProfile?.evidenceState || !lifecycleConfig.derivedReviewDocProfile?.latestVerdict) {
  throw new Error('derivedReviewDocProfile must define evidenceState and latestVerdict');
}

const builtSlugs = new Set(manifest.records.map((record) => record.slug));
const missingLifecycleTargets = Object.keys(lifecycleRecords).filter((slug) => !builtSlugs.has(slug));
if (missingLifecycleTargets.length) {
  throw new Error(`Evidence lifecycle registry references missing routes: ${missingLifecycleTargets.join(', ')}`);
}

const counts = {
  REVIEW_DOC_BOUND: 0,
  POST_R13_CONTENT_TRUTH_HOLD: 0,
  UNBOUND_REVIEW_REQUIRED: 0
};

manifest.evidenceLifecycleSource = 'src/data/public-evidence-lifecycle.json';
manifest.evidenceLifecycleSchema = lifecycleConfig.schema;
manifest.records = manifest.records.map((record) => {
  const review = overrides[record.slug] || {};
  const reviewRefs = [review.claimReview, review.lineageReview].filter((ref) => typeof ref === 'string' && ref);
  const explicitLifecycle = lifecycleRecords[record.slug] || null;

  let lifecycle;
  if (explicitLifecycle) {
    lifecycle = {
      ...lifecycleConfig.default,
      ...explicitLifecycle,
      evidenceRefs: [...new Set([...(explicitLifecycle.evidenceRefs || []), ...reviewRefs])]
    };
  } else if (reviewRefs.length) {
    lifecycle = {
      ...lifecycleConfig.default,
      ...lifecycleConfig.derivedReviewDocProfile,
      evidenceRefs: [...new Set(reviewRefs)]
    };
  } else {
    lifecycle = { ...lifecycleConfig.default, evidenceRefs: [...lifecycleConfig.default.evidenceRefs] };
  }

  assertLifecycleShape(lifecycle, `route ${record.slug}`);
  if (!(lifecycle.evidenceState in counts)) {
    throw new Error(`Unsupported evidenceState for ${record.slug}: ${lifecycle.evidenceState}`);
  }
  counts[lifecycle.evidenceState] += 1;

  return {
    ...record,
    evidenceState: lifecycle.evidenceState,
    evidenceAsOf: lifecycle.evidenceAsOf,
    evidenceRefs: lifecycle.evidenceRefs,
    latestVerdict: lifecycle.latestVerdict,
    primarySourceRequired: lifecycle.primarySourceRequired,
    reverifyAfter: lifecycle.reverifyAfter
  };
});

manifest.evidenceLifecycleCounts = counts;
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`EVIDENCE_LIFECYCLE_APPLY=PASS records=${manifest.records.length} review_doc_bound=${counts.REVIEW_DOC_BOUND} post_r13_holds=${counts.POST_R13_CONTENT_TRUTH_HOLD} unbound=${counts.UNBOUND_REVIEW_REQUIRED}`);
