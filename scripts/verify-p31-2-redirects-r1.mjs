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

const expectedRedirects = [
  { source: '/guides/blockchain-forensics-methodology', destination: '/guides/blockchain-forensics-onchain-investigations', permanent: true },
  { source: '/guides/trading-discipline-journal-psychology', destination: '/guides/trading-discipline-journal-mae-mfe', permanent: true },
  { source: '/guides/microstructure-delisting-data-integrity-2026', destination: '/guides/microstructure-delisting-2026', permanent: true },
  { source: '/guides/security-sandboxing', destination: 'https://bitevo.work/guides/security-sandboxing', permanent: true },
  { source: '/guides/d3-tool-io-bridge-contract', destination: 'https://bitevo.work/guides/d3-tool-io-bridge-contract', permanent: true },
  { source: '/guides/fleet-coordinator-drift-monitoring', destination: 'https://bitevo.work/guides/fleet-coordinator-drift-monitoring', permanent: true },
  { source: '/guides/ai-agent-reliability-audit', destination: 'https://bitevo.work/entry-audit', permanent: true }
];

const sourceSlugs = expectedRedirects.map((row) => row.source.replace('/guides/', ''));
const internalTargetSlugs = expectedRedirects
  .filter((row) => row.destination.startsWith('/guides/'))
  .map((row) => row.destination.replace('/guides/', ''));

const vercel = JSON.parse(await readFile(join(root, 'vercel.json'), 'utf8'));
const discoverySource = await readFile(join(root, 'scripts/generate-discovery-dist.mjs'), 'utf8');
const guideIndexSource = await readFile(join(root, 'src/pages/guides/index.astro'), 'utf8');
const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
const index = JSON.parse(await readFile(join(dist, 'guides-index.json'), 'utf8'));
const publicApi = JSON.parse(await readFile(join(dist, 'api/public-guides.json'), 'utf8'));
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
const llms = await readFile(join(dist, 'llms.txt'), 'utf8');

equal(vercel.cleanUrls, true, 'Vercel cleanUrls remains enabled');
equal(Array.isArray(vercel.redirects), true, 'Vercel redirects array present');
equal(vercel.redirects.length, 7, 'exactly seven redirects configured');
assert.deepEqual(vercel.redirects, expectedRedirects, 'seven redirect mappings are exact and permanent');
checks += 1;

check(discoverySource.includes('const redirectSourceSlugs = new Set(['), 'discovery owns redirect-source exclusion set');
check(discoverySource.includes('if (indexable && !redirectSourceSlugs.has(slug)) indexableRecords.push(record);'), 'redirect sources cannot enter sitemap/llms indexable set');
check(guideIndexSource.includes('const redirectSourceSlugs = new Set(['), 'human guide index owns redirect-source exclusion set');
check(guideIndexSource.includes('.filter((record) => !redirectSourceSlugs.has(record.slug))'), 'human guide list excludes redirect sources');

for (const slug of sourceSlugs) {
  check(discoverySource.includes(`'${slug}'`), `discovery exclusion declares source slug: ${slug}`);
  check(guideIndexSource.includes(`'${slug}'`), `human list exclusion declares source slug: ${slug}`);
}

equal(index.schema, 'crypto-guides.public-index.v1', 'guide index schema preserved');
equal(index.uniqueGuides, 163, 'guide index includes P31.5 route addition');
equal(index.records.length, 163, 'guide index records include P31.5 route addition');
equal(publicApi.count, 163, 'public API count includes P31.5 route addition');
equal(publicApi.records.length, 163, 'public API records include P31.5 route addition');

const indexSlugs = new Set(index.records.map((record) => record.slug));
const apiSlugs = new Set(publicApi.records.map((record) => record.slug));
for (const slug of sourceSlugs) {
  check(indexSlugs.has(slug), `redirect source remains in provenance census: ${slug}`);
  check(apiSlugs.has(slug), `redirect source remains in public metadata API: ${slug}`);
}
for (const slug of internalTargetSlugs) {
  check(indexSlugs.has(slug), `internal redirect target remains in guide census: ${slug}`);
  check(apiSlugs.has(slug), `internal redirect target remains in public API: ${slug}`);
}

const guideDirs = (await readdir(join(dist, 'guides'), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
equal(guideDirs.length, 163, 'built guide directories include 163 routes');

for (const slug of sourceSlugs) {
  check(guideDirs.includes(slug), `redirect source guide file remains built: ${slug}`);
  const html = await readFile(join(dist, 'guides', slug, 'index.html'), 'utf8');
  check(!/<meta\b[^>]*http-equiv=["']?refresh/i.test(html), `no meta refresh introduced: ${slug}`);
}

const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
equal(sitemapLocs.length, 6, 'sitemap has four static + two reviewed routes');
const sitemapGuideUrls = sitemapLocs.filter((url) => url.startsWith(`${origin}/guides/`));
equal(sitemapGuideUrls.length, 2, 'sitemap has two reviewed guide URLs');
for (const slug of sourceSlugs) {
  check(!sitemap.includes(`${origin}/guides/${slug}`), `redirect source excluded from sitemap: ${slug}`);
  check(!llms.includes(`${origin}/guides/${slug}`), `redirect source excluded from llms guide list: ${slug}`);
}
const llmsGuideLines = llms.split(/\r?\n/).filter((line) => line.includes(` — ${origin}/guides/`));
equal(llmsGuideLines.length, 2, 'llms contains only two P31.5 reviewed guide routes');

equal(packageJson.scripts?.['verify:p31-redirects'], 'node scripts/verify-p31-2-redirects-r1.mjs', 'P31.2 verifier script wired exactly');
check(packageJson.scripts?.build?.includes('npm run verify:p31-redirects'), 'P31.2 verifier wired into build');

console.log(`P31_2_REDIRECTS_R1=PASS checks=${checks} redirects=7 permanent=7 guide_files=163 guides_index_records=${index.records.length} public_api_records=${publicApi.records.length} sitemap_total=${sitemapLocs.length} sitemap_guide_urls=${sitemapGuideUrls.length} llms_guide_urls=${llmsGuideLines.length} human_list_excluded=7 meta_refresh=0 content_rewrite=0`);
