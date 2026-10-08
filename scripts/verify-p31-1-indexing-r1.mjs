import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

let checks = 0;
const check = (value, message) => { assert.ok(value, message); checks += 1; };
const equal = (actual, expected, message) => { assert.equal(actual, expected, message); checks += 1; };

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const origin = 'https://cryptoguidessite.vercel.app';
const reviewedSlugs = ['evm-approval-safety-flashbots', 'trading-bot-api-keys'].sort();

const layoutSource = await readFile(join(root, 'src/layouts/Layout.astro'), 'utf8');
const guideSource = await readFile(join(root, 'src/pages/guides/[slug].astro'), 'utf8');
const reviewedLayoutSource = await readFile(join(root, 'src/layouts/ReviewedGuideLayout.astro'), 'utf8');
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
check(guideSource.includes('content_ru, reviewed, next_review, sources } = Astro.props'), 'legacy guide route still reads reviewed + next_review + sources');
check(guideSource.includes('const _reviewedValid = typeof reviewed === "string"'), 'legacy guide route validates reviewed date');
check(guideSource.includes('const _sourcesPresent = Array.isArray(sources) && sources.length > 0;'), 'legacy guide route requires non-empty sources');
check(guideSource.includes('const _indexableGuide = _reviewedValid && _sourcesPresent;'), 'legacy guide indexability remains reviewed + sources');
check(reviewedLayoutSource.includes('const indexable = reviewedValid && sourcesPresent;'), 'reviewed Markdown layout uses reviewed + sources indexability');
check(discoverySource.includes('indexableRecords.map((record) => `/guides/${record.slug}`)'), 'sitemap uses indexable guides only');
check(discoverySource.includes('...indexableRecords.map((record) => `- ${record.title} — ${origin}/guides/${record.slug}`)'), 'llms guide list uses indexable guides only');
check(packageJson.scripts?.build?.includes('verify:p31-indexing'), 'P31.1 verifier wired into build');
equal(Buffer.compare(sourceRobots, builtRobots), 0, 'robots.txt byte-identical');

equal(index.schema, 'crypto-guides.public-index.v1', 'guide index schema');
equal(index.uniqueGuides, 163, 'guide index has 163 routes after P31.5');
equal(index.records.length, 163, 'guide index records have 163 routes after P31.5');
equal(publicApi.count, 163, 'public API count has 163 routes after P31.5');
equal(publicApi.records.length, 163, 'public API records have 163 routes after P31.5');

const guideDirs = (await readdir(join(dist, 'guides'), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
equal(guideDirs.length, 163, 'built guide route directories have 163 routes');
assert.deepEqual(guideDirs, [...index.records.map((record) => record.slug)].sort(), 'built guide routes match guide-index slugs exactly');

const indexBySlug = new Map(index.records.map((record) => [record.slug, record]));
for (const slug of reviewedSlugs) {
  const record = indexBySlug.get(slug);
  check(record, `reviewed guide present in index: ${slug}`);
  equal(record.reviewed, '2026-10-02', `reviewed date exact: ${slug}`);
  equal(record.nextReview, '2027-01-02', `next review exact: ${slug}`);
  equal(record.sourcesPresent, true, `sources present: ${slug}`);
  equal(record.sourceType, 'reviewed-markdown', `source type reviewed Markdown: ${slug}`);
}

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
  const tokens = robotsContent.split(',').map((token) => token.trim()).filter(Boolean);
  const expectedIndexable = record.reviewed === '2026-10-02' && record.sourcesPresent === true;

  if (expectedIndexable) {
    check(tokens.includes('index'), `index present: ${record.slug}`);
    check(tokens.includes('follow'), `follow present: ${record.slug}`);
    check(!tokens.includes('noindex'), `noindex absent: ${record.slug}`);
    indexable += 1;
  } else {
    check(tokens.includes('noindex'), `noindex present: ${record.slug}`);
    check(tokens.includes('follow'), `follow present: ${record.slug}`);
    check(!tokens.includes('index'), `index absent: ${record.slug}`);
    noindexFollow += 1;
  }

  const canonicalTags = [...head.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)].map((match) => match[0]);
  equal(canonicalTags.length, 1, `exactly one canonical: ${record.slug}`);
  const canonicalHref = (canonicalTags[0].match(/\bhref=["']([^"']+)["']/i) || [,''])[1] || '';
  equal(canonicalHref, `${origin}/guides/${record.slug}`, `self canonical exact: ${record.slug}`);
  selfCanonical += 1;
}

equal(indexable, 2, 'exactly two reviewed/indexable guides');
equal(noindexFollow, 161, 'remaining 161 guides are noindex,follow');
equal(selfCanonical, 163, 'all 163 guides have self canonical');

const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
equal(sitemapLocs.length, 8, 'sitemap contains five static, two reviewed RU, one reviewed EN routes');
const staticRoutes = new Set([
  `${origin}/`,
  `${origin}/guides`,
  `${origin}/en/guides`,
  `${origin}/sovereign-arena-dataset`,
  `${origin}/version`
]);
for (const route of staticRoutes) check(sitemapLocs.includes(route), `sitemap static route present: ${route}`);
const enSitemapUrls = sitemapLocs.filter((url) => url.startsWith(`${origin}/en/guides/`));
assert.deepEqual(enSitemapUrls, [`${origin}/en/guides/trading-bot-api-keys`], 'only reviewed EN trading bot guide in sitemap');
const sitemapGuideUrls = sitemapLocs.filter((url) => url.startsWith(`${origin}/guides/`)).sort();
assert.deepEqual(sitemapGuideUrls, reviewedSlugs.map((slug) => `${origin}/guides/${slug}`).sort(), 'sitemap guide URLs are exactly reviewed guides');

check(llms.includes('Unique guide routes: 163.'), 'llms reports 163 total guide routes');
check(llms.includes('Indexable guide routes: 2.'), 'llms reports two indexable RU guides');
check(llms.includes(`Reviewed English guide index: ${origin}/en/guides`), 'llms discovers the EN index');
const llmsGuideLines = llms.split(/\r?\n/).filter((line) => line.includes(` — ${origin}/guides/`));
equal(llmsGuideLines.length, 2, 'llms lists exactly two reviewed guides');
for (const slug of reviewedSlugs) check(llmsGuideLines.some((line) => line.endsWith(`${origin}/guides/${slug}`)), `llms reviewed route present: ${slug}`);

const archiveSample = await readFile(join(dist, 'guides/risk-freymvork-dlya-kripto-botov/index.html'), 'utf8');
check(archiveSample.includes('Архив. Материал не проверялся на текущую дату: цифры, комиссии и правила бирж могли измениться.'), 'archive reader status remains active');
equal(vercel.redirects?.length, 7, 'P31.2 redirects remain active');

console.log(`P31_1_INDEXING_R1=PASS checks=${checks} guides=163 noindex_follow=${noindexFollow} self_canonical=${selfCanonical} indexable_guides=${indexable} sitemap_total=${sitemapLocs.length} sitemap_guide_urls=${sitemapGuideUrls.length} llms_guide_list=${llmsGuideLines.length} guides_index_records=${index.records.length} public_api_records=${publicApi.records.length} robots_txt_byte_unchanged=1 p31_2_redirects=ACTIVE_SEPARATE_GATE p31_3_visible_cleanup=ACTIVE_SEPARATE_GATE p31_5_reviewed_markdown=ACTIVE_SEPARATE_GATE`);
