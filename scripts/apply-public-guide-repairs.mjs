import { access, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { allPublicGuideRepairs as repairs } from '../src/data/public-guide-repair-registry.mjs';
import { publicGuideTitleRepairs } from '../src/data/public-guide-title-repairs.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const guidesIndexPath = join(dist, 'guides-index.json');
const publicApiPath = join(dist, 'api', 'public-guides.json');

if (!Array.isArray(repairs) || repairs.length === 0) {
  throw new Error('public guide repair registry is empty');
}

const escapeHtmlText = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const guidesIndex = JSON.parse(await readFile(guidesIndexPath, 'utf8'));
const publicApi = JSON.parse(await readFile(publicApiPath, 'utf8'));
const guidesIndexBySlug = new Map((guidesIndex.records || []).map((record) => [record.slug, record]));
const publicApiBySlug = new Map((publicApi.records || []).map((record) => [record.slug, record]));
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

const seen = new Set();
let metadataRepairs = 0;
for (const repair of repairs) {
  if (repair.schema !== 'crypto-guides.public-guide-repair.v1') throw new Error(`repair schema mismatch: ${repair.slug || '<unknown>'}`);
  if (!repair.slug || !repair.repairId || !repair.articleHtml || !repair.evidenceDoc) throw new Error(`repair record incomplete: ${JSON.stringify(repair)}`);
  if (seen.has(repair.slug)) throw new Error(`duplicate public guide repair slug: ${repair.slug}`);
  seen.add(repair.slug);

  await access(join(root, repair.evidenceDoc));
  const outPath = join(dist, 'guides', repair.slug, 'index.html');
  const html = await readFile(outPath, 'utf8');
  const articlePattern = /<article\b[^>]*class="article-page"[^>]*>[\s\S]*?<\/article>/iu;
  if (!articlePattern.test(html)) throw new Error(`public guide article boundary missing: ${repair.slug}`);
  if (html.includes(`data-public-guide-repair="${repair.repairId}"`)) throw new Error(`public guide repair already present before apply step: ${repair.slug}`);

  let repaired = html.replace(articlePattern, repair.articleHtml.trim());
  if (repaired === html) throw new Error(`public guide repair made no change: ${repair.slug}`);

  const metadataSpec = metadataSpecFor(repair);
  if (metadataSpec) {
    const { sourceTitle, publicTitle } = metadataSpec;
    if (!sourceTitle || !publicTitle) throw new Error(`public metadata repair requires sourceTitle + publicTitle: ${repair.slug}`);

    const oldHeadTitle = `<title>${escapeHtmlText(sourceTitle)} · Crypto Guides</title>`;
    const newHeadTitle = `<title>${escapeHtmlText(publicTitle)} · Crypto Guides</title>`;
    if (!repaired.includes(oldHeadTitle)) throw new Error(`source direct-page title missing before metadata repair: ${repair.slug}`);
    repaired = repaired.replace(oldHeadTitle, newHeadTitle);

    const indexRecord = guidesIndexBySlug.get(repair.slug);
    const apiRecord = publicApiBySlug.get(repair.slug);
    if (!indexRecord || !apiRecord) throw new Error(`public metadata record missing: ${repair.slug}`);
    if (indexRecord.title !== sourceTitle) throw new Error(`guides-index source title drift before metadata repair: ${repair.slug}`);
    if (apiRecord.title !== sourceTitle) throw new Error(`public-api source title drift before metadata repair: ${repair.slug}`);
    indexRecord.title = publicTitle;
    apiRecord.title = publicTitle;
    metadataRepairs += 1;
    console.log(`PUBLIC_GUIDE_METADATA_REPAIR=PASS slug=${repair.slug} repair=${repair.repairId}`);
  }

  await writeFile(outPath, repaired, 'utf8');
  console.log(`PUBLIC_GUIDE_REPAIR_APPLY=PASS slug=${repair.slug} repair=${repair.repairId} state=${repair.state}`);
}

if (metadataRepairs > 0) {
  await writeFile(guidesIndexPath, `${JSON.stringify(guidesIndex, null, 2)}\n`, 'utf8');
  await writeFile(publicApiPath, `${JSON.stringify(publicApi, null, 2)}\n`, 'utf8');
}

console.log(`PUBLIC_GUIDE_METADATA_REPAIR_SUMMARY=PASS repairs=${metadataRepairs}`);
console.log(`PUBLIC_GUIDE_REPAIR_APPLY_SUMMARY=PASS repairs=${repairs.length}`);
