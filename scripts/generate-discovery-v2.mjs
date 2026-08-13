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
if (start < 0 || end < 0) throw new Error('Guide index source block not found');

const literal = source.slice(start + marker.length, end).trim().replace(/,\s*$/, '');
const parsed = JSON.parse(`[${literal}]`).filter((record) => record?.slug && record?.title);
if (parsed.length < 100) throw new Error(`Guide census unexpectedly small: ${parsed.length}`);

const bySlug = new Map();
const duplicateSlugs = new Set();
for (const record of parsed) {
  if (bySlug.has(record.slug)) duplicateSlugs.add(record.slug);
  else bySlug.set(record.slug, record);
}
const guides = [...bySlug.values()];

const manifest = {
  schema: 'crypto-guides.public-index.v1',
  source: 'src/pages/index.astro',
  sourceRecords: parsed.length,
  uniqueGuides: guides.length,
  duplicateSlugs: [...duplicateSlugs],
  status: 'RESTORED_CORPUS_UNDER_REVIEW',
  records: guides.map(({ slug, title, date, category, kicker, tags = [] }) => ({ slug, title, date: date || null, category: category || 'Unclassified', kicker: kicker || null, tags }))
};
await writeFile(join(publicDir, 'guides-index.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

const escapeXml = (value) => String(value).replace(/[<>&'\"]/g, (ch) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[ch]));
const routes = ['/', '/guides', '/sovereign-arena-dataset', '/version', ...guides.map((guide) => `/guides/${guide.slug}`)];
await writeFile(join(publicDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${escapeXml(`${origin}${route}`)}</loc></url>`).join('\n')}\n</urlset>\n`, 'utf8');
await writeFile(join(publicDir, 'sitemap-index.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${origin}/sitemap.xml</loc></sitemap>\n</sitemapindex>\n`, 'utf8');

const llms = [
  '# Crypto Guides — machine-readable public index', '',
  `Generated from the restored source index. Unique guide routes: ${guides.length}.`,
  'Status: RESTORED_CORPUS_UNDER_REVIEW. Publication does not imply that every historical claim is current.',
  'Legacy machine-readable parameters may be synthetic, historical, or research artifacts unless explicitly marked otherwise.', '',
  '## Canonical discovery',
  `- Guide index: ${origin}/guides`,
  `- Guide index JSON: ${origin}/guides-index.json`,
  `- Failure-inclusive research dataset: ${origin}/sovereign-arena-dataset`,
  `- Sitemap: ${origin}/sitemap.xml`,
  `- Build receipt: ${origin}/version.json`, '',
  '## Restored guide routes',
  ...guides.map((guide) => `- ${guide.title} — ${origin}/guides/${guide.slug}`), ''
].join('\n');
await writeFile(join(publicDir, 'llms.txt'), llms, 'utf8');
console.log(`DISCOVERY_GENERATION=PASS source_records=${parsed.length} unique_guides=${guides.length} duplicate_slugs=${duplicateSlugs.size} sitemap_urls=${routes.length}`);
