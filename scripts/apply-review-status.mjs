import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifestPath = join(root, 'dist/guides-index.json');
const reviewPath = join(root, 'src/data/public-review-overrides.json');

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const reviewConfig = JSON.parse(await readFile(reviewPath, 'utf8'));
const overrides = reviewConfig.records || {};
const defaultStatus = reviewConfig.defaultStatus || 'RESTORED_UNREVIEWED';

if (!Array.isArray(manifest.records)) throw new Error('guides-index.json records are missing');

const builtSlugs = new Set(manifest.records.map((record) => record.slug));
const missing = Object.keys(overrides).filter((slug) => !builtSlugs.has(slug));
if (missing.length) throw new Error(`Review overrides reference missing routes: ${missing.join(', ')}`);

manifest.reviewSource = 'src/data/public-review-overrides.json';
manifest.records = manifest.records.map((record) => {
  const review = overrides[record.slug] || {};
  return {
    ...record,
    reviewStatus: review.status || defaultStatus,
    currentness: review.currentness || 'UNREVIEWED',
    ymyl: review.ymyl === true,
    pair: review.pair || null,
    reviewNote: review.note || null
  };
});
manifest.reviewCounts = manifest.records.reduce((acc, record) => {
  acc[record.reviewStatus] = (acc[record.reviewStatus] || 0) + 1;
  return acc;
}, {});

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`REVIEW_STATUS_GATE=PASS guides=${manifest.records.length} explicit_overrides=${Object.keys(overrides).length} default_status=${defaultStatus}`);
