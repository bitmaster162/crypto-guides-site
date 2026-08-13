import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const manifestPath = join(dist, 'guides-index.json');
const outDir = join(dist, 'api');
const outPath = join(outDir, 'public-guides.json');

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
if (!Array.isArray(manifest.records) || manifest.records.length < 100) {
  throw new Error('Reviewed guide manifest missing or unexpectedly small');
}

const records = manifest.records.map((record) => ({
  slug: record.slug,
  title: record.title,
  category: record.category || 'Unclassified',
  date: record.date || null,
  reviewStatus: record.reviewStatus,
  currentness: record.currentness,
  ymyl: record.ymyl === true,
  pair: record.pair || null,
  reviewRule: record.reviewRule || null
}));

for (const record of records) {
  if (!record.slug || !record.title || !record.reviewStatus || !record.currentness) {
    throw new Error(`Unsafe/incomplete public API record: ${JSON.stringify(record)}`);
  }
}

const payload = {
  schema: 'crypto-guides.public-api.v1',
  status: 'RESTORED_CORPUS_UNDER_REVIEW',
  exposure: 'REVIEWED_METADATA_ONLY',
  generatedFrom: 'guides-index.json after review routing',
  warning: 'This endpoint intentionally excludes legacy executable-looking params, RPC endpoints, contracts, safety constants and operational configuration. Historical publication does not imply currentness.',
  count: records.length,
  records
};

await mkdir(outDir, { recursive: true });
await writeFile(outPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`PUBLIC_API_GENERATION=PASS records=${records.length} exposure=${payload.exposure}`);
