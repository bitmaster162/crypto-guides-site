import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { allPublicGuideRepairs as repairs } from '../src/data/public-guide-repair-registry.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const overrideConfig = JSON.parse(await readFile(join(root, 'src/data/public-review-overrides.json'), 'utf8'));
const overrides = overrideConfig.records || {};

if (!Array.isArray(repairs) || repairs.length !== 8) {
  throw new Error(`expected exactly eight bounded public guide repairs in R6, got ${repairs?.length ?? 'invalid'}`);
}

for (const repair of repairs) {
  await access(join(root, repair.evidenceDoc));
  const review = overrides[repair.slug];
  if (!review) throw new Error(`review override missing for repaired guide: ${repair.slug}`);
  if (review.status !== repair.expectedReviewStatus) throw new Error(`repair must not upgrade review status: ${repair.slug} ${review.status}`);
  if (review.currentness !== repair.expectedCurrentness) throw new Error(`repair must not upgrade currentness: ${repair.slug} ${review.currentness}`);
  if (repair.expectedReviewStatus === 'YMYL_TRADING_REVIEW_REQUIRED' && review.ymyl !== true) {
    throw new Error(`trading repair must preserve YMYL boundary: ${repair.slug}`);
  }

  const outPath = join(dist, 'guides', repair.slug, 'index.html');
  const html = await readFile(outPath, 'utf8');
  const marker = `data-public-guide-repair="${repair.repairId}"`;
  const markerCount = html.split(marker).length - 1;
  if (markerCount !== 1) throw new Error(`public repair marker count invalid for ${repair.slug}: ${markerCount}`);
  if (html.includes('class="params-block"') || html.includes('Executable Parameters') || html.includes('class="memir-summary"')) {
    throw new Error(`legacy executable/agent blocks survived public repair: ${repair.slug}`);
  }
  for (const required of repair.requiredMarkers) {
    if (!html.includes(required)) throw new Error(`public repair required marker missing for ${repair.slug}: ${required}`);
  }
  for (const forbidden of repair.forbiddenPatterns) {
    if (forbidden.pattern.test(html)) throw new Error(`public repair leaked ${forbidden.label}: ${repair.slug}`);
  }

  if (repair.expectedReviewStatus === 'YMYL_TRADING_REVIEW_REQUIRED') {
    if (!html.includes('Эта страница не является торговым разрешением')) throw new Error(`non-execution boundary missing: ${repair.slug}`);
    if (!html.includes('delta-neutral не означает risk-neutral')) throw new Error(`risk qualification heading missing: ${repair.slug}`);
    if (!html.includes('Исправление публичной копии не является сертификацией стратегии')) throw new Error(`review-state qualification missing: ${repair.slug}`);
  }

  if (repair.expectedReviewStatus === 'VOLATILE_VENDOR_STATE') {
    if (review.ymyl !== false) throw new Error(`vendor-state repair unexpectedly marked YMYL: ${repair.slug}`);
    const hasVendorBoundary = html.includes('This vendor snapshot is dated, not durable authority.');
    const hasPricingBoundary = html.includes('This pricing snapshot is dated, not billing authority.');
    if (!hasVendorBoundary && !hasPricingBoundary) throw new Error(`dated vendor-state boundary missing: ${repair.slug}`);
  }

  console.log(`PUBLIC_GUIDE_REPAIR_GATE=PASS slug=${repair.slug} repair=${repair.repairId} state=${repair.state} review=${review.status} currentness=${review.currentness} ymyl=${review.ymyl}`);
}

console.log(`PUBLIC_GUIDE_REPAIR_GATE_SUMMARY=PASS repairs=${repairs.length}`);
