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

assert.equal(removedInternalSlugs.length, 35);
assert.equal(redirectSourceSlugs.length, 7);
assert.equal(createHash('sha256').update(`${removedInternalSlugs.join('\n')}\n`).digest('hex').toUpperCase(), 'D0BF27A0656C329F815E4C5A094381E5FFD2A481558211A0044A02B80B3A44DC');

const expectedMachineArtifacts = new Map([
  ['guides-index.json', '65FEAE1B042E8876E3DD38CD46C155701360819A041B5295C1AAD1171029BD42'],
  ['api/public-guides.json', '0282B182AB768223E345A3A4AE2CB7926A807E3ED0AA3D13C6CCE5804EBE9F0F'],
  ['sitemap.xml', 'EE8260DD41D55FB8AE2387E81FECA37EF3F97B73F420D98473E0DEFFC5056E85'],
  ['llms.txt', '4F2552A19451A7569CEBC22826E3D6683782E2DCF07F9AC9F6105ACC9662C0CD']
]);
for (const [relative, expectedSha] of expectedMachineArtifacts) {
  const bytes = await readFile(join(dist, relative));
  const actualSha = createHash('sha256').update(bytes).digest('hex').toUpperCase();
  assert.equal(actualSha, expectedSha, `${relative} changed during P31.4`);
}

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
assert.equal(index.records?.length, 162);
assert.equal(publicApi.records?.length, 162);
assert.equal(vercel.redirects?.length, 7);

const indexSlugs = new Set(index.records.map((record) => record.slug));
const apiSlugs = new Set(publicApi.records.map((record) => record.slug));
for (const slug of [...removedInternalSlugs, ...redirectSourceSlugs]) {
  assert.ok(indexSlugs.has(slug), `guide census lost route: ${slug}`);
  assert.ok(apiSlugs.has(slug), `public API lost route: ${slug}`);
}
const humanArchive = index.records.filter((record) => !removedInternalSlugs.includes(record.slug) && !redirectSourceSlugs.includes(record.slug));
assert.equal(humanArchive.length, 120, 'P31.4 archive list must contain 120 routes');

assert.match(guideIndexSource, /<section id="verified-guides" class="guide-group" hidden>/u);
assert.match(guideIndexSource, /<h2>Проверенные гайды<\/h2>/u);
assert.match(guideIndexSource, /<section id="archive-guides" class="guide-group">/u);
assert.match(guideIndexSource, /records = mergedRecords\.filter\(\(record\) => !redirectSourceSlugs\.has\(record\.slug\)\);/u);
assert.match(guideIndexSource, /records = records\.filter\(\(record\) => !removedInternalSlugs\.has\(record\.slug\)\);/u);
assert.match(guideIndexHtml, /<section id="verified-guides" class="guide-group" hidden(?:\s|>)/u);
assert.match(guideIndexHtml, /<section id="archive-guides" class="guide-group"(?:\s|>)/u);
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
assert.match(discoverySource, /if \(removedInternalSlugs\.has\(slug\)\) continue;/u);
assert.match(discoverySource, /if \(indexable && !redirectSourceSlugs\.has\(slug\)\) indexableRecords\.push\(record\);/u);
assert.ok(!JSON.stringify(vercel).includes('410'), 'P31.4 must not introduce 410 behavior');

const guideDirs = (await readdir(join(dist, 'guides'), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
assert.equal(guideDirs.length, 162, 'P31.4 must preserve all 162 guide pages');
for (const slug of guideDirs) {
  const html = await readFile(join(dist, 'guides', slug, 'index.html'), 'utf8');
  const robotsMeta = (html.match(/<meta\b[^>]*\bname=["']robots["'][^>]*>/iu) || [''])[0];
  const robotsContent = ((robotsMeta.match(/\bcontent=["']([^"']*)["']/iu) || [,''])[1] || '').toLowerCase();
  assert.match(robotsContent, /noindex/u, `P31.4 page lost noindex: ${slug}`);
  assert.match(robotsContent, /follow/u, `P31.4 page lost follow: ${slug}`);
}

assert.equal(packageJson.scripts?.['verify:p31-guides-list'], 'node scripts/verify-p31-4-guides-list-r1.mjs');
assert.ok(packageJson.scripts?.build?.includes('npm run verify:p31-guides-list'));

console.log('P31_4_GUIDES_LIST_R1=PASS csv_rows=162 removed_internal=35 redirect_sources=7 verified_guides=0 verified_block=HIDDEN archive_list=120 built_pages=162 noindex_follow=162 sitemap_removed_hits=0 llms_removed_hits=0 status_410=ABSENT machine_artifacts_byte_identical=4');
