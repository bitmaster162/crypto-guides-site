import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { allPublicGuideRepairs as repairs } from '../src/data/public-guide-repair-registry.mjs';
import { publicGuideTitleRepairs } from '../src/data/public-guide-title-repairs.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const publicApi = JSON.parse(await readFile(join(dist, 'api', 'public-guides.json'), 'utf8'));
const reviewBySlug = new Map((publicApi.records || []).map((record) => [record.slug, record]));

if (publicApi.schema !== 'crypto-guides.public-api.v1') {
  throw new Error(`public API schema mismatch: ${publicApi.schema || '<missing>'}`);
}
if (!Array.isArray(repairs) || repairs.length !== 14) {
  throw new Error(`expected exactly fourteen bounded public guide repairs in R12, got ${repairs?.length ?? 'invalid'}`);
}

const escapeHtmlText = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const repairSlugs = new Set(repairs.map((repair) => repair.slug));
const orphanTitleRepairs = Object.keys(publicGuideTitleRepairs).filter((slug) => !repairSlugs.has(slug));
if (orphanTitleRepairs.length) throw new Error(`title repairs reference non-repaired routes: ${orphanTitleRepairs.join(', ')}`);

function metadataSpecFor(repair) {
  const central = publicGuideTitleRepairs[repair.slug] || null;
  const inline = repair.publicTitle !== undefined || repair.sourceTitle !== undefined
    ? { sourceTitle: repair.sourceTitle, publicTitle: repair.publicTitle }
    : null;
  if (central && inline && (central.sourceTitle !== inline.sourceTitle || central.publicTitle !== inline.publicTitle)) {
    throw new Error(`central/inline public title repair mismatch: ${repair.slug}`);
  }
  return central || inline;
}

let metadataRepairCount = 0;
for (const repair of repairs) {
  await access(join(root, repair.evidenceDoc));
  const review = reviewBySlug.get(repair.slug);
  if (!review) throw new Error(`routed public review record missing for repaired guide: ${repair.slug}`);
  if (review.reviewStatus !== repair.expectedReviewStatus) throw new Error(`repair must preserve routed review status: ${repair.slug} ${review.reviewStatus}`);
  if (review.currentness !== repair.expectedCurrentness) throw new Error(`repair must preserve routed currentness: ${repair.slug} ${review.currentness}`);

  const expectedYmyl = typeof repair.expectedYmyl === 'boolean'
    ? repair.expectedYmyl
    : repair.expectedReviewStatus === 'YMYL_TRADING_REVIEW_REQUIRED';
  if (review.ymyl !== expectedYmyl) {
    throw new Error(`repair must preserve routed YMYL state: ${repair.slug} expected=${expectedYmyl} actual=${review.ymyl}`);
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

  const metadataSpec = metadataSpecFor(repair);
  if (metadataSpec) {
    const { sourceTitle, publicTitle } = metadataSpec;
    if (!sourceTitle || !publicTitle) throw new Error(`public metadata repair requires sourceTitle + publicTitle: ${repair.slug}`);
    metadataRepairCount += 1;
    if (review.title !== publicTitle) throw new Error(`public API repaired title mismatch: ${repair.slug} ${review.title}`);
    const newHeadTitle = `<title>${escapeHtmlText(publicTitle)} · Crypto Guides</title>`;
    const oldHeadTitle = `<title>${escapeHtmlText(sourceTitle)} · Crypto Guides</title>`;
    if (!html.includes(newHeadTitle)) throw new Error(`repaired direct-page title missing: ${repair.slug}`);
    if (html.includes(oldHeadTitle)) throw new Error(`source direct-page title survived metadata repair: ${repair.slug}`);
    if (!html.includes(`<h1>${publicTitle}</h1>`)) throw new Error(`repaired title/body H1 authority mismatch: ${repair.slug}`);
    console.log(`PUBLIC_TITLE_AUTHORITY_GATE=PASS slug=${repair.slug} title=${publicTitle}`);
  }

  const articleMatch = html.match(/<article\b[^>]*class="article-page[^>]*>[\s\S]*?<\/article>/iu);
  if (!articleMatch) throw new Error(`repaired article boundary missing: ${repair.slug}`);
  const forbiddenSurface = articleMatch[0].replace(/\sdata-public-guide-repair="[^"]+"/gu, '');
  for (const forbidden of repair.forbiddenPatterns) {
    if (forbidden.pattern.test(forbiddenSurface)) throw new Error(`public repair leaked ${forbidden.label}: ${repair.slug}`);
  }

  if (expectedYmyl) {
    if (!html.includes('Эта страница не является торговым разрешением')) throw new Error(`YMYL non-execution boundary missing: ${repair.slug}`);
  }

  if (repair.expectedReviewStatus === 'YMYL_TRADING_REVIEW_REQUIRED') {
    if (!html.includes('delta-neutral не означает risk-neutral')) throw new Error(`risk qualification heading missing: ${repair.slug}`);
    if (!html.includes('Исправление публичной копии не является сертификацией стратегии')) throw new Error(`review-state qualification missing: ${repair.slug}`);
  }

  if (repair.expectedReviewStatus === 'VOLATILE_VENDOR_STATE') {
    const hasVendorBoundary = html.includes('This vendor snapshot is dated, not durable authority.');
    const hasPricingBoundary = html.includes('This pricing snapshot is dated, not billing authority.');
    if (!hasVendorBoundary && !hasPricingBoundary) throw new Error(`dated vendor-state boundary missing: ${repair.slug}`);
  }

  if (repair.expectedReviewStatus === 'INFRASTRUCTURE_IMPLEMENTATION_REVIEW_REQUIRED') {
    const hasHistoricalInfraBoundary = html.includes('This historical infrastructure specification is not current runtime authority.');
    const hasInfraBoundary = html.includes('This infrastructure specification is not current runtime authority.');
    if (!hasHistoricalInfraBoundary && !hasInfraBoundary) {
      throw new Error(`infrastructure authority boundary missing: ${repair.slug}`);
    }
  }

  if (repair.expectedReviewStatus === 'INFRA_IMPLEMENTATION_REVIEW_REQUIRED') {
    if (!html.includes('This infrastructure specification is not current runtime authority.')) {
      throw new Error(`infra implementation authority boundary missing: ${repair.slug}`);
    }
  }

  if (repair.expectedReviewStatus === 'SECURITY_SAFETY_REVIEW_REQUIRED') {
    if (!html.includes('This security architecture is defense in depth, not compromise-proof authority.')) {
      throw new Error(`security defense-in-depth boundary missing: ${repair.slug}`);
    }
    if (!html.includes('Эта страница не является разрешением на создание или использование exchange credentials')) {
      throw new Error(`security no-effect boundary missing: ${repair.slug}`);
    }
  }

  console.log(`PUBLIC_GUIDE_REPAIR_GATE=PASS slug=${repair.slug} repair=${repair.repairId} state=${repair.state} review=${review.reviewStatus} currentness=${review.currentness} ymyl=${review.ymyl}`);
}

if (metadataRepairCount !== 10) throw new Error(`expected ten title-authority repairs in R12, got ${metadataRepairCount}`);
console.log(`PUBLIC_TITLE_AUTHORITY_GATE_SUMMARY=PASS repairs=${metadataRepairCount}`);
console.log(`PUBLIC_GUIDE_REPAIR_GATE_SUMMARY=PASS repairs=${repairs.length}`);
