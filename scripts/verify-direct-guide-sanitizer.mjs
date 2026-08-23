import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { allPublicGuideRepairs as repairs } from '../src/data/public-guide-repair-registry.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const manifest = JSON.parse(await readFile(join(dist, 'guides-index.json'), 'utf8'));
const records = Array.isArray(manifest.records) ? manifest.records : [];

if (manifest.schema !== 'crypto-guides.public-index.v1') throw new Error(`guide index schema mismatch: ${manifest.schema || '<missing>'}`);
if (records.length < 150 || manifest.uniqueGuides !== records.length) throw new Error(`guide route census invalid: records=${records.length} declared=${manifest.uniqueGuides}`);

const repairBySlug = new Map(repairs.map((repair) => [repair.slug, repair]));
const forbiddenMarkers = [
  'class="memir-summary"',
  'MemIR AI Agent Summary',
  'class="params-block"',
  '>Executable Parameters<',
  '<h3>RPC Endpoints</h3>',
  '<h3>Constants</h3>'
];

const slugs = new Set();
let repairedRoutes = 0;
let preserved = 0;

const markerCount = (html, marker) => html.split(marker).length - 1;
const truthBoundaryTagCount = (html) => (html.match(/<aside\b[^>]*\bdata-guide-truth-boundary(?:\s|=|>)/giu) || []).length;
const stripTags = (value = '') => String(value)
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/giu, ' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/giu, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ')
  .trim();

for (const record of records) {
  const slug = String(record?.slug || '').trim();
  if (!slug) throw new Error('empty slug in generated guide index');
  if (slugs.has(slug)) throw new Error(`duplicate slug in generated guide index: ${slug}`);
  slugs.add(slug);

  const outPath = join(dist, 'guides', slug, 'index.html');
  await access(outPath);
  const html = await readFile(outPath, 'utf8');

  if (truthBoundaryTagCount(html) !== 1) throw new Error(`truth boundary tag count invalid after sanitizer: ${slug}`);
  if (!html.includes(`data-guide-slug="${slug}"`)) throw new Error(`truth boundary slug binding missing after sanitizer: ${slug}`);
  if (!html.includes('class="article-page')) throw new Error(`article-page boundary missing after sanitizer: ${slug}`);

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/iu);
  if (!titleMatch || stripTags(titleMatch[1]).length < 2) throw new Error(`page title missing after sanitizer: ${slug}`);
  const articleMatch = html.match(/<article\b[^>]*class="article-page[^>]*>[\s\S]*?<\/article>/iu);
  if (!articleMatch) throw new Error(`article body missing after sanitizer: ${slug}`);
  if (stripTags(articleMatch[0]).length < 100) throw new Error(`article body unexpectedly small after sanitizer: ${slug}`);

  for (const marker of forbiddenMarkers) {
    if (html.includes(marker)) throw new Error(`forbidden renderer metadata surface survived sanitizer: ${slug} marker=${marker}`);
  }

  const repair = repairBySlug.get(slug);
  if (repair) {
    const repairMarker = `data-public-guide-repair="${repair.repairId}"`;
    if (markerCount(html, repairMarker) !== 1) throw new Error(`repaired route marker missing after sanitizer: ${slug}`);
    repairedRoutes += 1;
  }

  preserved += 1;
}

if (slugs.size !== records.length || preserved !== records.length) {
  throw new Error(`route preservation failed: unique=${slugs.size} preserved=${preserved} expected=${records.length}`);
}
if (repairedRoutes !== repairs.length) {
  throw new Error(`repaired-route accounting mismatch: observed=${repairedRoutes} registry=${repairs.length}`);
}

console.log(`DIRECT_GUIDE_SANITIZER_GATE=PASS routes=${records.length} preserved=${preserved} repaired_routes=${repairedRoutes} forbidden_surface_hits=0 structural_holds=0`);
