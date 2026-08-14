import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { publicGuideRepairs } from '../src/data/public-guide-repairs.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const manifest = JSON.parse(await readFile(join(dist, 'guides-index.json'), 'utf8'));
const records = Array.isArray(manifest.records) ? manifest.records : [];

if (manifest.schema !== 'crypto-guides.public-index.v1') throw new Error(`guide index schema mismatch: ${manifest.schema || '<missing>'}`);
if (records.length < 150 || manifest.uniqueGuides !== records.length) throw new Error(`guide route census invalid: records=${records.length} declared=${manifest.uniqueGuides}`);

const repairBySlug = new Map(publicGuideRepairs.map((repair) => [repair.slug, repair]));
const slugs = new Set();
let memirRemoved = 0;
let paramsRemoved = 0;
let repairedZeroTarget = 0;

function markerCount(html, marker) {
  return html.split(marker).length - 1;
}

function locateBalancedDiv(html, className) {
  const marker = `class="${className}"`;
  if (markerCount(html, marker) !== 1) throw new Error(`expected exactly one ${className} marker before structural parse`);

  const markerIndex = html.indexOf(marker);
  const start = html.lastIndexOf('<div', markerIndex);
  if (start < 0) throw new Error(`opening div missing for ${className}`);
  const openingEnd = html.indexOf('>', markerIndex);
  if (openingEnd < 0) throw new Error(`opening div not closed for ${className}`);
  const openingTag = html.slice(start, openingEnd + 1);
  if (!openingTag.includes(marker)) throw new Error(`class marker escaped opening div for ${className}`);

  const tagPattern = /<\/?div\b[^>]*>/giu;
  tagPattern.lastIndex = openingEnd + 1;
  let depth = 1;
  let match;
  while ((match = tagPattern.exec(html))) {
    if (/^<\/div\b/iu.test(match[0])) depth -= 1;
    else depth += 1;
    if (depth === 0) return { start, end: tagPattern.lastIndex };
  }
  throw new Error(`balanced div boundary missing for ${className}`);
}

for (const record of records) {
  const slug = String(record?.slug || '').trim();
  if (!slug) throw new Error('empty slug in generated guide index');
  if (slugs.has(slug)) throw new Error(`duplicate slug in generated guide index: ${slug}`);
  slugs.add(slug);

  const outPath = join(dist, 'guides', slug, 'index.html');
  const html = await readFile(outPath, 'utf8');
  const truthBoundaryCount = markerCount(html, 'data-guide-truth-boundary');
  if (truthBoundaryCount !== 1) throw new Error(`truth boundary count invalid before sanitizer: ${slug} count=${truthBoundaryCount}`);
  if (!html.includes('class="article-page')) throw new Error(`article-page boundary missing before sanitizer: ${slug}`);

  const memirCount = markerCount(html, 'class="memir-summary"');
  const paramsCount = markerCount(html, 'class="params-block"');
  const repair = repairBySlug.get(slug);

  if (repair) {
    const repairMarker = `data-public-guide-repair="${repair.repairId}"`;
    if (markerCount(html, repairMarker) !== 1) throw new Error(`recognized repaired route missing exact repair marker: ${slug}`);
    if (memirCount !== 0 || paramsCount !== 0) {
      throw new Error(`repaired route retained sanitizer targets: ${slug} memir=${memirCount} params=${paramsCount}`);
    }
    repairedZeroTarget += 1;
    continue;
  }

  if (memirCount !== 1 || paramsCount !== 1) {
    throw new Error(`ordinary restored route target count invalid: ${slug} memir=${memirCount} params=${paramsCount}`);
  }

  const articleStart = html.indexOf('<article');
  const articleEnd = html.indexOf('</article>', articleStart);
  if (articleStart < 0 || articleEnd < 0) throw new Error(`article boundary incomplete before sanitizer: ${slug}`);

  const memir = locateBalancedDiv(html, 'memir-summary');
  const params = locateBalancedDiv(html, 'params-block');
  for (const [label, block] of [['memir-summary', memir], ['params-block', params]]) {
    if (block.start <= articleStart || block.end > articleEnd) throw new Error(`${label} escaped article boundary: ${slug}`);
  }
  if (!(memir.end <= params.start || params.end <= memir.start)) throw new Error(`sanitizer target blocks overlap: ${slug}`);

  const blocks = [memir, params].sort((a, b) => b.start - a.start);
  let sanitized = html;
  for (const block of blocks) sanitized = `${sanitized.slice(0, block.start)}${sanitized.slice(block.end)}`;

  if (sanitized === html) throw new Error(`sanitizer made no change: ${slug}`);
  if (markerCount(sanitized, 'class="memir-summary"') !== 0 || markerCount(sanitized, 'class="params-block"') !== 0) {
    throw new Error(`sanitizer target marker survived apply step: ${slug}`);
  }
  if (markerCount(sanitized, 'data-guide-truth-boundary') !== 1) throw new Error(`truth boundary changed during sanitizer: ${slug}`);
  if (!sanitized.includes('class="article-page')) throw new Error(`article-page removed during sanitizer: ${slug}`);

  await writeFile(outPath, sanitized, 'utf8');
  memirRemoved += 1;
  paramsRemoved += 1;
}

if (slugs.size !== records.length) throw new Error(`route preservation census mismatch: unique=${slugs.size} records=${records.length}`);
if (memirRemoved + repairedZeroTarget !== records.length) throw new Error(`memir sanitizer accounting mismatch: removed=${memirRemoved} repaired=${repairedZeroTarget} routes=${records.length}`);
if (paramsRemoved + repairedZeroTarget !== records.length) throw new Error(`params sanitizer accounting mismatch: removed=${paramsRemoved} repaired=${repairedZeroTarget} routes=${records.length}`);

console.log(`DIRECT_GUIDE_SANITIZER_APPLY=PASS routes=${records.length} memir_removed=${memirRemoved} params_removed=${paramsRemoved} repaired_zero_target=${repairedZeroTarget}`);
