import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const origin = 'https://cryptoguidessite.vercel.app';

const removedInternalSlugs = ["analiz-zapuska-raas-api","analogi-i-ikh-slabye-storony","anti-self-attention-trading-psychology","archiveos-multigpt-bridge-integration","arkhitektura-suverennoy-ai-nody","compression-no-mans-land-trap","ekonomika-premialnykh-treyding-podpisok","executive-summary","fractal-intelligence-scouts-scribes-attention","grid-trading-os","grid-trading-os-institutional-spec","ierarkhicheskiy-pooling-i-ugasanie","latent-space-protocol-ai-research","latent-space-protocol-architecture","latent-space-protocol-research","mas-managed-coevolution-sandbox-isolation","mirrorcore-compactdigest-memory-compression","mirrorcore-compression","mirrorcore-seeding-identity-persistence","monetization-matrix-4x3","multi-llm-torgovaya-arena","multigpt-bridge-federated-ai-arbitration","omnicore-loop-self-preservation","plan-zapuska-open-source-proekta","razrabotka-freymvorka-c2p","reflex-layer-ooda-monitoring","sector-divergence-fake-crown","sovereign-agent-core","sovereign-core-ai-system-architecture","sovereign-scalper-drawdown-analysis","strategiya-sovereign-arena-ai","tilt-index-antiself","trading-performance-monitoring-ssot-ai","trading-system-v2-range-farm","why-continuityos-may-fail-an-adversarial-analysis"].sort();
const redirectSourceSlugs = ["ai-agent-reliability-audit","blockchain-forensics-methodology","d3-tool-io-bridge-contract","fleet-coordinator-drift-monitoring","microstructure-delisting-data-integrity-2026","security-sandboxing","trading-discipline-journal-psychology"].sort();
const reviewedSlugs = ['evm-approval-safety-flashbots', 'trading-bot-api-keys'].sort();

assert.equal(removedInternalSlugs.length, 35);
assert.equal(redirectSourceSlugs.length, 7);
assert.equal(createHash('sha256').update(`${removedInternalSlugs.join('\n')}\n`).digest('hex').toUpperCase(), 'D0BF27A0656C329F815E4C5A094381E5FFD2A481558211A0044A02B80B3A44DC');

const index = JSON.parse(await readFile(join(dist, 'guides-index.json'), 'utf8'));
const publicApi = JSON.parse(await readFile(join(dist, 'api/public-guides.json'), 'utf8'));
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
const llms = await readFile(join(dist, 'llms.txt'), 'utf8');
const vercel = JSON.parse(await readFile(join(root, 'vercel.json'), 'utf8'));
const guideIndexSource = await readFile(join(root, 'src/pages/guides/index.astro'), 'utf8');
const discoverySource = await readFile(join(root, 'scripts/generate-discovery-dist.mjs'), 'utf8');
const guideIndexHtml = await readFile(join(dist, 'guides/index.html'), 'utf8');
const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));

assert.equal(index.schema, 'crypto-guides.public-index.v1');
assert.equal(index.records?.length, 163);
assert.equal(publicApi.records?.length, 163);
assert.equal(vercel.redirects?.length, 7);

const indexSlugs = new Set(index.records.map((record) => record.slug));
const apiSlugs = new Set(publicApi.records.map((record) => record.slug));
for (const slug of [...removedInternalSlugs, ...redirectSourceSlugs, ...reviewedSlugs]) {
  assert.ok(indexSlugs.has(slug), `guide census lost route: ${slug}`);
  assert.ok(apiSlugs.has(slug), `public API lost route: ${slug}`);
}

const reviewedRecords = index.records.filter((record) => record.reviewed === '2026-10-02' && record.sourcesPresent === true);
assert.deepEqual(reviewedRecords.map((record) => record.slug).sort(), reviewedSlugs, 'P31.5 reviewed set must be exact');

const humanArchive = index.records.filter((record) =>
  !removedInternalSlugs.includes(record.slug) &&
  !redirectSourceSlugs.includes(record.slug) &&
  !reviewedSlugs.includes(record.slug)
);
assert.equal(humanArchive.length, 119, 'P31.4 archive list must evolve to 119 after P31.5');

assert.match(guideIndexSource, /import\.meta\.glob\('\.\/\*\.md', \{ eager: true \}\)/u);
assert.match(guideIndexSource, /<h2>Проверенные гайды<\/h2>/u);
assert.match(guideIndexSource, /<section id="archive-guides" class="guide-group">/u);
assert.match(guideIndexSource, /\.filter\(\(record\) => !redirectSourceSlugs\.has\(record\.slug\)\)/u);
assert.match(guideIndexSource, /\.filter\(\(record\) => !removedInternalSlugs\.has\(record\.slug\)\)/u);
assert.match(guideIndexSource, /verifiedRecords\.length !== 2/u);

const verifiedSection = (guideIndexHtml.match(/<section\b[^>]*\bid="verified-guides"[^>]*>/iu) || [''])[0];
assert.ok(verifiedSection, 'built /guides verified section missing');
assert.ok(!/\bhidden(?:\s|=|>)/iu.test(verifiedSection), 'verified section must be visible with two reviewed guides');
assert.match(verifiedSection, /data-reviewed-count="2"/u);
assert.match(guideIndexHtml, /href="\/guides\/trading-bot-api-keys"/u);
assert.match(guideIndexHtml, /href="\/guides\/evm-approval-safety-flashbots"/u);
assert.match(guideIndexHtml, /<section\b[^>]*\bid="archive-guides"[^>]*>/u);

for (const slug of removedInternalSlugs) {
  assert.ok(guideIndexSource.includes(`'${slug}'`), `/guides removal set missing: ${slug}`);
  assert.ok(discoverySource.includes(`'${slug}'`), `discovery removal set missing: ${slug}`);
  assert.ok(!sitemap.includes(`${origin}/guides/${slug}`), `removed slug leaked into sitemap: ${slug}`);
  assert.ok(!llms.includes(`${origin}/guides/${slug}`), `removed slug leaked into llms: ${slug}`);
}
for (const slug of redirectSourceSlugs) {
  assert.ok(!sitemap.includes(`${origin}/guides/${slug}`), `redirect source leaked into sitemap: ${slug}`);
  assert.ok(!llms.includes(`${origin}/guides/${slug}`), `redirect source leaked into llms: ${slug}`);
}
for (const slug of reviewedSlugs) {
  assert.ok(sitemap.includes(`${origin}/guides/${slug}`), `reviewed slug missing from sitemap: ${slug}`);
  assert.ok(llms.includes(`${origin}/guides/${slug}`), `reviewed slug missing from llms: ${slug}`);
}

assert.match(discoverySource, /if \(removedInternalSlugs\.has\(slug\)\) continue;/u);
assert.match(discoverySource, /if \(indexable && !redirectSourceSlugs\.has\(slug\)\) indexableRecords\.push\(record\);/u);
assert.ok(!JSON.stringify(vercel).includes('410'), 'P31.4 must not introduce 410 behavior');

const guideDirs = (await readdir(join(dist, 'guides'), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
assert.equal(guideDirs.length, 163, 'P31.5 must preserve 163 built guide pages');

let noindexFollow = 0;
let indexFollow = 0;
for (const slug of guideDirs) {
  const html = await readFile(join(dist, 'guides', slug, 'index.html'), 'utf8');
  const robotsMeta = (html.match(/<meta\b[^>]*\bname=["']robots["'][^>]*>/iu) || [''])[0];
  const robotsContent = ((robotsMeta.match(/\bcontent=["']([^"']*)["']/iu) || [,''])[1] || '').toLowerCase();
  if (reviewedSlugs.includes(slug)) {
    assert.match(robotsContent, /(?:^|,\s*)index(?:,|$)/u, `reviewed route lost index: ${slug}`);
    assert.match(robotsContent, /follow/u, `reviewed route lost follow: ${slug}`);
    assert.doesNotMatch(robotsContent, /noindex/u, `reviewed route unexpectedly noindex: ${slug}`);
    indexFollow += 1;
  } else {
    assert.match(robotsContent, /noindex/u, `archive route lost noindex: ${slug}`);
    assert.match(robotsContent, /follow/u, `archive route lost follow: ${slug}`);
    noindexFollow += 1;
  }
}
assert.equal(indexFollow, 2);
assert.equal(noindexFollow, 161);

assert.equal(packageJson.scripts?.['verify:p31-guides-list'], 'node scripts/verify-p31-4-guides-list-r1.mjs');
assert.ok(packageJson.scripts?.build?.includes('npm run verify:p31-guides-list'));

console.log('P31_4_GUIDES_LIST_R1=PASS csv_rows=162 removed_internal=35 redirect_sources=7 verified_guides=2 verified_block=VISIBLE archive_list=119 built_pages=163 noindex_follow=161 index_follow=2 sitemap_removed_hits=0 llms_removed_hits=0 status_410=ABSENT machine_artifacts_evolved_by_p31_5=4');
