import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { allPublicGuideRepairs as repairs } from '../src/data/public-guide-repair-registry.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const publicApi = JSON.parse(await readFile(join(dist, 'api', 'public-guides.json'), 'utf8'));
const reviewBySlug = new Map((publicApi.records || []).map((record) => [record.slug, record]));

if (publicApi.schema !== 'crypto-guides.public-api.v1') {
  throw new Error(`public API schema mismatch: ${publicApi.schema || '<missing>'}`);
}
if (!Array.isArray(repairs) || repairs.length !== 12) {
  throw new Error(`expected exactly twelve bounded public guide repairs in R9, got ${repairs?.length ?? 'invalid'}`);
}

for (const repair of repairs) {
  await access(join(root, repair.evidenceDoc));
  const review = reviewBySlug.get(repair.slug);
  if (!review) throw new Error(`routed public review record missing for repaired guide: ${repair.slug}`);
  if (review.reviewStatus !== repair.expectedReviewStatus) throw new Error(`repair must preserve routed review status: ${repair.slug} ${review.reviewStatus}`);
  if (review.currentness !== repair.expectedCurrentness) throw new Error(`repair must preserve routed currentness: ${repair.slug} ${review.currentness}`);
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

  const articleMatch = html.match(/<article\b[^>]*class="article-page[^>]*>[\s\S]*?<\/article>/iu);
  if (!articleMatch) throw new Error(`repaired article boundary missing: ${repair.slug}`);
  const forbiddenSurface = articleMatch[0].replace(/\sdata-public-guide-repair="[^"]+"/gu, '');
  for (const forbidden of repair.forbiddenPatterns) {
    if (forbidden.pattern.test(forbiddenSurface)) throw new Error(`public repair leaked ${forbidden.label}: ${repair.slug}`);
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

  if (repair.expectedReviewStatus === 'INFRASTRUCTURE_IMPLEMENTATION_REVIEW_REQUIRED') {
    if (review.ymyl !== false) throw new Error(`infrastructure repair unexpectedly marked YMYL: ${repair.slug}`);
    if (!html.includes('This historical infrastructure specification is not current runtime authority.')) {
      throw new Error(`historical infrastructure authority boundary missing: ${repair.slug}`);
    }
  }

  if (repair.expectedReviewStatus === 'SECURITY_SAFETY_REVIEW_REQUIRED') {
    if (review.ymyl !== false) throw new Error(`security repair unexpectedly marked YMYL: ${repair.slug}`);
    if (!html.includes('This security architecture is defense in depth, not compromise-proof authority.')) {
      throw new Error(`security defense-in-depth boundary missing: ${repair.slug}`);
    }
    if (!html.includes('Эта страница не является разрешением на создание или использование exchange credentials')) {
      throw new Error(`security no-effect boundary missing: ${repair.slug}`);
    }
  }

  console.log(`PUBLIC_GUIDE_REPAIR_GATE=PASS slug=${repair.slug} repair=${repair.repairId} state=${repair.state} review=${review.reviewStatus} currentness=${review.currentness} ymyl=${review.ymyl}`);
}

console.log(`PUBLIC_GUIDE_REPAIR_GATE_SUMMARY=PASS repairs=${repairs.length}`);
