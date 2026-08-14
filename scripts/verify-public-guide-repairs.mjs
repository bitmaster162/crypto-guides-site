import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { publicGuideRepairs } from '../src/data/public-guide-repairs.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const overrideConfig = JSON.parse(await readFile(join(root, 'src/data/public-review-overrides.json'), 'utf8'));
const overrides = overrideConfig.records || {};

if (!Array.isArray(publicGuideRepairs) || publicGuideRepairs.length !== 1) {
  throw new Error(`expected exactly one bounded public guide repair in R1, got ${publicGuideRepairs?.length ?? 'invalid'}`);
}

for (const repair of publicGuideRepairs) {
  await access(join(root, repair.evidenceDoc));
  const review = overrides[repair.slug];
  if (!review) throw new Error(`review override missing for repaired guide: ${repair.slug}`);
  if (review.status !== repair.expectedReviewStatus) throw new Error(`repair must not upgrade review status: ${repair.slug} ${review.status}`);
  if (review.currentness !== repair.expectedCurrentness) throw new Error(`repair must not upgrade currentness: ${repair.slug} ${review.currentness}`);
  if (review.ymyl !== true) throw new Error(`repair must preserve YMYL boundary: ${repair.slug}`);

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
  if (!html.includes('Эта страница не является торговым разрешением')) throw new Error(`non-execution boundary missing: ${repair.slug}`);
  if (!html.includes('delta-neutral не означает risk-neutral')) throw new Error(`risk qualification heading missing: ${repair.slug}`);
  if (!html.includes('Исправление публичной копии не является сертификацией стратегии')) throw new Error(`review-state qualification missing: ${repair.slug}`);

  console.log(`PUBLIC_GUIDE_REPAIR_GATE=PASS slug=${repair.slug} repair=${repair.repairId} state=${repair.state} review=${review.status} currentness=${review.currentness} ymyl=${review.ymyl}`);
}

console.log(`PUBLIC_GUIDE_REPAIR_GATE_SUMMARY=PASS repairs=${publicGuideRepairs.length}`);
