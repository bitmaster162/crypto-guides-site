import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

let checks = 0;
const check = (value, message) => { assert.ok(value, message); checks += 1; };
const equal = (actual, expected, message) => { assert.equal(actual, expected, message); checks += 1; };
const deepEqual = (actual, expected, message) => { assert.deepEqual(actual, expected, message); checks += 1; };

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const origin = 'https://cryptoguidessite.vercel.app';

const layoutSource = await readFile(join(root, 'src/layouts/Layout.astro'), 'utf8');
const guideSource = await readFile(join(root, 'src/pages/guides/[slug].astro'), 'utf8');
const discoverySource = await readFile(join(root, 'scripts/generate-discovery-dist.mjs'), 'utf8');
const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
const vercel = JSON.parse(await readFile(join(root, 'vercel.json'), 'utf8'));
const sourceRobots = await readFile(join(root, 'public/robots.txt'));
const builtRobots = await readFile(join(dist, 'robots.txt'));
const index = JSON.parse(await readFile(join(dist, 'guides-index.json'), 'utf8'));
const publicApi = JSON.parse(await readFile(join(dist, 'api/public-guides.json'), 'utf8'));
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
const llms = await readFile(join(dist, 'llms.txt'), 'utf8');

check(layoutSource.includes('robots?: string;') && layoutSource.includes('canonical?: string;'), 'Layout exposes robots + canonical props');
check(layoutSource.includes('<meta name="robots" content={robots} />'), 'Layout renders dynamic robots');
check(layoutSource.includes('{canonical && <link rel="canonical" href={canonical} />}'), 'Layout renders optional canonical');
check(guideSource.includes('content_ru, reviewed, sources } = Astro.props'), 'guide route reads reviewed + sources');
check(guideSource.includes('const _reviewedValid = typeof reviewed === "string"'), 'guide route validates reviewed date');
check(guideSource.includes('const _sourcesPresent = Array.isArray(sources) && sources.length > 0;'), 'guide route requires non-empty sources');
check(guideSource.includes('const _indexableGuide = _reviewedValid && _sourcesPresent;'), 'guide indexability requires reviewed + sources');
check(guideSource.includes('robots={_guideRobots} canonical={_slugUrl}'), 'guide passes robots + self canonical');
check(discoverySource.includes('indexableRecords.map((record) => `/guides/${record.slug}`)'), 'sitemap uses indexable guides only');
check(discoverySource.includes('...indexableRecords.map((record) => `- ${record.title} — ${origin}/guides/${record.slug}`)'), 'llms guide list uses indexable guides only');
check(packageJson.scripts?.build?.includes('verify:p31-indexing'), 'P31.1 verifier wired into build');
equal(Buffer.compare(sourceRobots, builtRobots), 0, 'robots.txt byte-identical');

equal(index.schema, 'crypto-guides.public-index.v1', 'guide index schema');
equal(index.uniqueGuides, 162, 'guide index preserves 162 guides');
equal(index.records.length, 162, 'guide index records preserve 162');
equal(publicApi.count, 162, 'public API count preserves 162');
equal(publicApi.records.length, 162, 'public API records preserve 162');

const guideDirs = (await readdir(join(dist, 'guides'), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
equal(guideDirs.length, 162, 'built guide route directories preserve 162');
deepEqual(guideDirs, [...index.records.map((record) => record.slug)].sort(), 'built guide routes match guide-index slugs exactly');

let noindexFollow = 0;
let selfCanonical = 0;
let indexable = 0;
for (const record of index.records) {
  const html = await readFile(join(dist, 'guides', record.slug, 'index.html'), 'utf8');
  const headEnd = html.toLowerCase().indexOf('</head>');
  check(headEnd >= 0, `head boundary present: ${record.slug}`);
  const head = html.slice(0, headEnd + 7);
  const robotsTags = [...head.matchAll(/<meta\b[^>]*\bname=["']robots["'][^>]*>/gi)].map((match) => match[0]);
  equal(robotsTags.length, 1, `exactly one robots meta: ${record.slug}`);
  const robotsContent = ((robotsTags[0].match(/\bcontent=["']([^"']*)["']/i) || [,''])[1] || '').toLowerCase();
  const robotsTokens = robotsContent.split(',').map((token) => token.trim()).filter(Boolean);
  check(robotsTokens.includes('noindex'), `noindex present: ${record.slug}`);
  check(robotsTokens.includes('follow'), `follow present: ${record.slug}`);
  check(!robotsTokens.includes('index'), `index absent: ${record.slug}`);
  noindexFollow += 1;
  if (robotsTokens.includes('index') && !robotsTokens.includes('noindex')) indexable += 1;

  const canonicalTags = [...head.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)].map((match) => match[0]);
  equal(canonicalTags.length, 1, `exactly one canonical: ${record.slug}`);
  const canonicalHref = (canonicalTags[0].match(/\bhref=["']([^"']+)["']/i) || [,''])[1] || '';
  equal(canonicalHref, `${origin}/guides/${record.slug}`, `self canonical exact: ${record.slug}`);
  selfCanonical += 1;
}
equal(indexable, 0, 'legacy 162 currently have zero indexable guides');
equal(noindexFollow, 162, 'legacy 162 are noindex,follow');
equal(selfCanonical, 162, 'legacy 162 have self canonical');

const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
deepEqual(sitemapLocs, [
  `${origin}/`,
  `${origin}/guides`,
  `${origin}/sovereign-arena-dataset`,
  `${origin}/version`
], 'sitemap preserves current non-guide routes only');
equal(sitemapLocs.filter((url) => url.startsWith(`${origin}/guides/`)).length, 0, 'sitemap contains zero noindex guide URLs');

check(llms.includes('Unique guide routes: 162.'), 'llms preserves total built guide count');
check(llms.includes('Indexable guide routes: 0.'), 'llms reports zero indexable guides');
const llmsGuideLines = llms.split(/\r?\n/).filter((line) => line.includes(` — ${origin}/guides/`));
equal(llmsGuideLines.length, 0, 'llms guide list contains indexable guides only');

const sample = await readFile(join(dist, 'guides/risk-freymvork-dlya-kripto-botov/index.html'), 'utf8');
check(sample.includes('RESTORED CONTENT'), 'P31.3 visible-status cleanup remains deferred');
check(sample.includes('REVIEW_STATUS_LOADING'), 'P31.3 loading-marker cleanup remains deferred');

equal(vercel.redirects?.length, 7, 'P31.2 redirects active; exact redirect semantics delegated to P31.2 verifier');

console.log(`P31_1_INDEXING_R1=PASS checks=${checks} guides=162 noindex_follow=${noindexFollow} self_canonical=${selfCanonical} indexable_guides=${indexable} sitemap_total=${sitemapLocs.length} sitemap_guide_urls=0 llms_guide_list=${llmsGuideLines.length} guides_index_records=${index.records.length} public_api_records=${publicApi.records.length} robots_txt_byte_unchanged=1 p31_2_redirects=ACTIVE_SEPARATE_GATE p31_3_visible_cleanup=DEFERRED`);
