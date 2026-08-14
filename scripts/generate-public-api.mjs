import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const manifestPath = join(dist, 'guides-index.json');
const overridePath = join(root, 'src/data/public-review-overrides.json');
const outDir = join(dist, 'api');
const outPath = join(outDir, 'public-guides.json');

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const overrideConfig = JSON.parse(await readFile(overridePath, 'utf8'));
const overrides = overrideConfig.records || {};
if (!Array.isArray(manifest.records) || manifest.records.length < 100) {
  throw new Error('Reviewed guide manifest missing or unexpectedly small');
}

const records = manifest.records.map((record) => {
  const canonical = overrides[record.slug] || {};
  return {
    slug: record.slug,
    title: record.title,
    category: record.category || 'Unclassified',
    date: record.date || null,
    reviewStatus: record.reviewStatus,
    currentness: record.currentness,
    ymyl: record.ymyl === true,
    pair: record.pair || null,
    canonicalGroup: canonical.canonicalGroup || null,
    canonicalDecision: canonical.canonicalDecision || null,
    canonicalSlug: canonical.canonicalSlug || null,
    canonicalRole: canonical.canonicalRole || null,
    claimReview: canonical.claimReview || null,
    lineageReview: canonical.lineageReview || null,
    reviewRule: record.reviewRule || null
  };
});

const canonicalRoles = new Set(['CANONICAL', 'SUPERSEDED_HISTORICAL_REVISION']);
let canonicalWinners = 0;
let supersededRevisions = 0;
for (const record of records) {
  if (!record.slug || !record.title || !record.reviewStatus || !record.currentness) {
    throw new Error(`Unsafe/incomplete public API record: ${JSON.stringify(record)}`);
  }
  if (record.reviewStatus === 'REDUNDANT_REVISION_PAIR') {
    if (!record.canonicalGroup || record.canonicalDecision !== 'EVIDENCE_REVIEWED_CANONICAL_SELECTED' || !record.canonicalSlug || !canonicalRoles.has(record.canonicalRole)) {
      throw new Error(`Revision pair canonical selection boundary missing: ${record.slug}`);
    }
    if (!record.claimReview || !record.claimReview.startsWith('docs/CONTENT_CLAIM_REVIEW_')) {
      throw new Error(`Revision pair claim-review evidence binding missing: ${record.slug}`);
    }
    if (record.lineageReview !== 'docs/CANONICAL_LINEAGE_DECISION_R1.md') {
      throw new Error(`Revision pair lineage evidence binding missing: ${record.slug}`);
    }
    if (record.canonicalRole === 'CANONICAL') {
      canonicalWinners += 1;
      if (record.canonicalSlug !== record.slug) throw new Error(`Canonical winner does not self-reference: ${record.slug}`);
    } else {
      supersededRevisions += 1;
      if (record.canonicalSlug === record.slug) throw new Error(`Superseded revision self-selected as canonical: ${record.slug}`);
    }
  }
}
if (canonicalWinners !== 2 || supersededRevisions !== 2) {
  throw new Error(`Canonical selection count mismatch: winners=${canonicalWinners} superseded=${supersededRevisions}`);
}

const payload = {
  schema: 'crypto-guides.public-api.v1',
  status: 'RESTORED_CORPUS_UNDER_REVIEW',
  exposure: 'REVIEWED_METADATA_ONLY',
  canonicalization: 'REVISION_PAIRS_CANONICAL_SELECTED_SUPERSEDED_PRESERVED',
  evidenceBinding: 'REVISION_PAIRS_SOURCE_BOUND_TO_CLAIM_AND_LINEAGE_REVIEW_DOCS',
  generatedFrom: 'guides-index.json after review routing + source review overrides for evidence-reviewed canonical selection and claim/lineage metadata',
  warning: 'This endpoint intentionally excludes legacy executable-looking params, RPC endpoints, contracts, safety constants and operational configuration. Historical publication does not imply currentness. CANONICAL selects the preferred revision only inside the two evidence-reviewed duplicate groups; SUPERSEDED_HISTORICAL_REVISION remains addressable for provenance.',
  count: records.length,
  canonicalWinnerCount: canonicalWinners,
  supersededRevisionCount: supersededRevisions,
  records
};

await mkdir(outDir, { recursive: true });
await writeFile(outPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`PUBLIC_API_GENERATION=PASS records=${records.length} exposure=${payload.exposure} canonicalization=${payload.canonicalization} evidence_binding=${payload.evidenceBinding} winners=${canonicalWinners} superseded=${supersededRevisions}`);
