import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const guidesDir = join(dist, 'guides');
const origin = 'https://cryptoguidessite.vercel.app';

const decode = (value = '') => String(value)
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .trim();
const stripTags = (value = '') => decode(String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' '));
const xmlEscape = (value) => String(value).replace(/[<>&'\"]/g, (ch) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[ch]));

const entries = await readdir(guidesDir, { withFileTypes: true });
const records = [];
for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  const slug = entry.name;
  const indexPath = join(guidesDir, slug, 'index.html');
  let html;
  try { html = await readFile(indexPath, 'utf8'); } catch { continue; }
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!titleMatch) continue;
  const pageTitle = stripTags(titleMatch[1]);
  const title = pageTitle.replace(/\s*·\s*Crypto Guides\s*$/i, '').trim();
  const category = stripTags((html.match(/<span class="cat"[^>]*>([\s\S]*?)<\/span>/i) || [,'Unclassified'])[1]);
  const date = stripTags((html.match(/Published:\s*([^<]+)/i) || [,''])[1]) || null;
  records.push({ slug, title, category: category || 'Unclassified', date });
}
records.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
if (records.length < 150) throw new Error(`Built guide census unexpectedly small: ${records.length}`);

const manifest = {
  schema: 'crypto-guides.public-index.v1',
  source: 'dist/guides/*/index.html',
  uniqueGuides: records.length,
  status: 'RESTORED_CORPUS_UNDER_REVIEW',
  records
};
await writeFile(join(dist, 'guides-index.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

const staticRoutes = ['/', '/guides', '/sovereign-arena-dataset', '/version'];
const routes = [...staticRoutes, ...records.map((record) => `/guides/${record.slug}`)];
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${xmlEscape(`${origin}${route}`)}</loc></url>`).join('\n')}\n</urlset>\n`, 'utf8');
await writeFile(join(dist, 'sitemap-index.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${origin}/sitemap.xml</loc></sitemap>\n</sitemapindex>\n`, 'utf8');

const llms = [
  '# Crypto Guides — machine-readable public index', '',
  `Generated from the actual built guide routes. Unique guide routes: ${records.length}.`,
  'Status: RESTORED_CORPUS_UNDER_REVIEW. A reachable page is not evidence that every historical claim is current.',
  'Legacy machine-readable parameters may be synthetic, historical, or research artifacts unless explicitly marked otherwise.', '',
  '## Canonical machine interfaces',
  `- Reviewed metadata-only API: ${origin}/api/public-guides.json`,
  `- Guide index JSON: ${origin}/guides-index.json`,
  `- Build receipt: ${origin}/version.json`,
  `- Sitemap: ${origin}/sitemap.xml`, '',
  'The legacy /api/guides endpoint is preserved for compatibility during migration, but it is not the canonical machine-ingestion authority because historical records can contain executable-looking params, RPC endpoints, contracts, constants or operational-era fields.', '',
  '## Human discovery',
  `- Guide index: ${origin}/guides`,
  `- Failure-inclusive research dataset: ${origin}/sovereign-arena-dataset`, '',
  '## Built guide routes',
  ...records.map((record) => `- ${record.title} — ${origin}/guides/${record.slug}`), ''
].join('\n');
await writeFile(join(dist, 'llms.txt'), llms, 'utf8');

console.log(`DISCOVERY_GENERATION=PASS built_guides=${records.length} sitemap_urls=${routes.length} source=dist canonical_api=/api/public-guides.json legacy_api=/api/guides`);
