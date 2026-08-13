import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const publicDir = join(root, 'public');
const sourcePath = join(root, 'src/pages/index.astro');
const origin = 'https://cryptoguidessite.vercel.app';

await mkdir(publicDir, { recursive: true });

const source = await readFile(sourcePath, 'utf8');
const marker = 'const guides = [';
const start = source.indexOf(marker);
const end = source.indexOf('\n];', start);
if (start < 0 || end < 0) throw new Error('Guide index source block not found in src/pages/index.astro');

const block = source.slice(start + marker.length, end);
const parsed = [];
for (const rawLine of block.split('\n')) {
  const line = rawLine.trim().replace(/,$/, '');
  if (!line.startsWith('{"slug"')) continue;
  try {
    const record = JSON.parse(line);
    if (record?.slug && record?.title) parsed.push(record);
  } catch (error) {
    throw new Error(`Guide index parse failed near: ${line.slice(0, 120)} :: ${error.message}`);
  }
}

if (parsed.length < 100) throw new Error(`Guide census unexpectedly small: ${parsed.length}`);

const bySlug = new Map();
const duplicateSlugs = [];
for (const record of parsed) {
  if (bySlug.has(record.slug)) duplicateSlugs.push(record.slug);
  else bySlug.set(record.slug, record);
}
const guides = [...bySlug.values()];

const indexPayload = {
  schema: 'crypto-guides.public-index.v1',
  source: 'src/pages/index.astro',
  sourceRecords: parsed.length,
  uniqueGuides: guides.length,
  duplicateSlugs: [...new Set(duplicateSlugs)],
  status: 'RESTORED_CORPUS_UNDER_REVIEW',
  records: guides.map(({ slug, title, date, category, kicker, tags = [] }) => ({
    slug,
    title,
    date: date || null,
    category: category || 'Unclassified',
    kicker: kicker || null,
    tags
  }))
};
await writeFile(join(publicDir, 'guides-index.json'), `${JSON.stringify(indexPayload, null, 2)}\n`, 'utf8');

const xmlEscape = (value) => String(value).replace(/[<>&'\"]/g, (ch) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;'
}[ch]));

const staticRoutes = ['/', '/guides', '/sovereign-arena-dataset', '/version'];
const urls = [...staticRoutes, ...guides.map((guide) => `/guides/${guide.slug}`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((route) => `  <url><loc>${xmlEscape(`${origin}${route}`)}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(join(publicDir, 'sitemap.xml'), sitemap, 'utf8');

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${origin}/sitemap.xml</loc></sitemap>\n</sitemapindex>\n`;
await writeFile(join(publicDir, 'sitemap-index.xml'), sitemapIndex, 'utf8');

const llms = [
  '# Crypto Guides — machine-readable public index',
  '',
  `Generated from the same restored source index used by the public site. Unique guide routes: ${guides.length}.`,
  'Status: RESTORED_CORPUS_UNDER_REVIEW. Publication does not imply that every historical claim is current.',
  'Machine-readable parameters/specifications on legacy pages may be synthetic, historical, or research artifacts unless explicitly marked otherwise.',
  '',
  '## Canonical discovery',
  `- Guide index: ${origin}/guides`,
  `- Guide index JSON: ${origin}/guides-index.json`,
  `- Failure-inclusive research dataset: ${origin}/sovereign-arena-dataset`,
  `- Sitemap: ${origin}/sitemap.xml`,
  `- Build receipt: ${origin}/version.json`,
  '',
  '## Restored guide routes',
  ...guides.map((guide) => `- ${guide.title} — ${origin}/guides/${guide.slug}`),
  ''
].join('\n');
await writeFile(join(publicDir, 'llms.txt'), llms, 'utf8');

console.log(`DISCOVERY_GENERATION=PASS source_records=${parsed.length} unique_guides=${guides.length} duplicate_slugs=${new Set(duplicateSlugs).size} sitemap_urls=${urls.length}`);
