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
    reviewRule: record.reviewRule || null
  };
});

for (const record of records) {
  if (!record.slug || !record.title || !record.reviewStatus || !record.currentness) {
    throw new Error(`Unsafe/incomplete public API record: ${JSON.stringify(record)}`);
  }
  if (record.reviewStatus === 'REDUNDANT_REVISION_PAIR') {
    if (!record.canonicalGroup || record.canonicalDecision !== 'PENDING_CLAIM_LEVEL_REVIEW' || !record.canonicalRole) {
      throw new Error(`Revision pair canonical boundary missing: ${record.slug}`);
    }
    if (record.canonicalSlug !== null) throw new Error(`Pending revision pair asserted canonical winner: ${record.slug}`);
  }
}

const payload = {
  schema: 'crypto-guides.public-api.v1',
  status: 'RESTORED_CORPUS_UNDER_REVIEW',
  exposure: 'REVIEWED_METADATA_ONLY',
  canonicalization: 'REVISION_PAIRS_EXPLICIT_PENDING_NO_WINNER',
  generatedFrom: 'guides-index.json after review routing + source review overrides for canonical-decision metadata',
  warning: 'This endpoint intentionally excludes legacy executable-looking params, RPC endpoints, contracts, safety constants and operational configuration. Historical publication does not imply currentness. Revision pairs marked PENDING_CLAIM_LEVEL_REVIEW have no canonical winner.',
  count: records.length,
  records
};

await mkdir(outDir, { recursive: true });
await writeFile(outPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`PUBLIC_API_GENERATION=PASS records=${records.length} exposure=${payload.exposure} canonicalization=${payload.canonicalization}`);
