import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { allPublicGuideRepairs as repairs } from '../src/data/public-guide-repair-registry.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const guidesDir = join(dist, 'guides');
const archiveCopy = 'Архив. Материал не проверялся на текущую дату: цифры, комиссии и правила бирж могли измениться.';

const protectedBlockPattern = /<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/giu;
const serviceReviewPattern = /\b[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*_REVIEW_REQUIRED\b/g;
const serviceReverifyPattern = /\b[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*_REVERIFY_REQUIRED\b/g;

function sanitizeVisibleSegment(text) {
  return text
    .replace(/RESTORED CONTENT\s*·\s*REVIEW REQUIRED/gu, archiveCopy)
    .replace(/REVIEW_STATUS_LOADING|CURRENTNESS_LOADING/gu, '')
    .replace(/YMYL REVIEW/gu, '')
    .replace(/Открыть review index\s*→?/giu, '')
    .replace(/Это восстановленный исследовательский материал\. Наличие страницы не подтверждает текущую точность исторических фактов,\s*параметров, API\/venue state, комиссий, funding, leverage, performance claims или торговых порогов\./gu, '')
    .replace(/Для этого материала установлен YMYL review boundary:[^<]*/giu, '')
    .replace(/Source-derived review metadata сейчас не удалось загрузить\.[^<]*/giu, '')
    .replace(serviceReviewPattern, 'требует проверки')
    .replace(serviceReverifyPattern, 'требует повторной проверки')
    .replace(/\bREVIEW_REQUIRED\b/g, 'требует проверки');
}

function sanitizeVisibleText(html) {
  let out = '';
  let cursor = 0;
  protectedBlockPattern.lastIndex = 0;
  for (const match of html.matchAll(protectedBlockPattern)) {
    const index = match.index ?? 0;
    out += sanitizeVisibleSegment(html.slice(cursor, index));
    out += match[0];
    cursor = index + match[0].length;
  }
  out += sanitizeVisibleSegment(html.slice(cursor));
  return out;
}

const manifest = JSON.parse(await readFile(join(dist, 'guides-index.json'), 'utf8'));
const records = Array.isArray(manifest.records) ? manifest.records : [];
if (manifest.schema !== 'crypto-guides.public-index.v1' || records.length !== 163) {
  throw new Error(`P31.3 guide census mismatch: schema=${manifest.schema || '<missing>'} records=${records.length}`);
}
const repairBySlug = new Map(repairs.map((repair) => [repair.slug, repair]));

let changed = 0;
let repairMetaRemoved = 0;
for (const record of records) {
  const slug = String(record?.slug || '').trim();
  if (!slug) throw new Error('P31.3 empty guide slug');
  const path = join(guidesDir, slug, 'index.html');
  const before = await readFile(path, 'utf8');

  let after = before.replace(/<div\b[^>]*class="public-repair-meta"[^>]*>[\s\S]*?<\/div>/giu, () => {
    repairMetaRemoved += 1;
    return '';
  });
  after = sanitizeVisibleText(after);

  const repair = repairBySlug.get(slug);
  if (repair) {
    if (after.includes('data-p31-reader-hidden-receipt')) throw new Error(`P31.3 duplicate hidden repair receipt: ${slug}`);
    const articleClose = after.lastIndexOf('</article>');
    if (articleClose < 0) throw new Error(`P31.3 repaired article close missing: ${slug}`);
    const receiptPayload = JSON.stringify({
      reviewStatus: repair.expectedReviewStatus,
      currentness: repair.expectedCurrentness,
      ymyl: typeof repair.expectedYmyl === 'boolean' ? repair.expectedYmyl : repair.expectedReviewStatus === 'YMYL_TRADING_REVIEW_REQUIRED'
    }).replace(/</g, '\\u003c');
    const receipt = `<script type="application/json" data-p31-reader-hidden-receipt>${receiptPayload}</script>`;
    after = `${after.slice(0, articleClose)}${receipt}${after.slice(articleClose)}`;
  }

  if (!after.includes('data-guide-truth-boundary')) throw new Error(`P31.3 reader status boundary missing: ${slug}`);
  if (!after.includes(archiveCopy) && !/Проверено \d{4}-\d{2}-\d{2} · следующий пересмотр \d{4}-\d{2}-\d{2}/u.test(after)) {
    throw new Error(`P31.3 reader status copy missing: ${slug}`);
  }

  if (after !== before) {
    await writeFile(path, after, 'utf8');
    changed += 1;
  }
}

const guideIndexPath = join(guidesDir, 'index.html');
const guideIndexBefore = await readFile(guideIndexPath, 'utf8');
const guideIndexAfter = sanitizeVisibleText(guideIndexBefore);
if (guideIndexAfter !== guideIndexBefore) {
  await writeFile(guideIndexPath, guideIndexAfter, 'utf8');
  changed += 1;
}

console.log(`P31_3_READER_STATUS_APPLY=PASS guides=${records.length} changed_html=${changed} public_repair_meta_removed=${repairMetaRemoved} machine_data_mutations=0`);
