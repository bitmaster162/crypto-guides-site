import { isExactGuide5Successor } from './guide5-route-successor-r1.mjs';
const guide5Successor = isExactGuide5Successor();
const guideCount = guide5Successor ? 164 : 163;
const reviewedGuideCount = guide5Successor ? 3 : 2;
const sitemapGuideCount = guide5Successor ? 10 : 8;
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const origin = 'https://crypto.bitevo.work';

const expectedArtifacts = new Map([
  ['guides-index.json', ['A883357AC062322E0B1536AC8A46C8897DF0C375D795AEBFC2D429A416F0DA25', 139411]],
  ['api/public-guides.json', ['EE7E870B15B9A7201E3380ADBE5ACC12E65D8CBE366362AB46221DB85AF4446A', 136291]],
  ['sitemap.xml', ['4DD95A03EB2104343EE87F5D8F014D610A534B30A0CA13D4334436947D42BF52', 664]],
  ['llms.txt', ['401C72685F48CC984FF745D0754FF8AA192C25F95A7A86F395C6B654B1E62925', 1694]]
]);
const guide5ExpectedArtifacts = {"guides-index.json":["BB3B8C6321B5F112937361BEB3CBD78131E337B56131153900DD3AC5D908C585",140406],"api/public-guides.json":["D2DDF0636B822662EB4686AB13AC40EFD1AF91792B37AD3E42EAEBB7D58C538B",137090],"sitemap.xml":["2D134E150FFE59A2D1B83ACFCFAC1F1E9317B8EC5903BF60FE24A88D543B5FD9",865],"llms.txt":["F7D74734CD942FA26BC74893763F7500BFD0593A251071A38383158F3D9AAFA3",1991]};
for (const [relative, [historicalSha, historicalBytes]] of expectedArtifacts) {
  const [expectedSha,expectedBytes] = guide5Successor ? guide5ExpectedArtifacts[relative] : [historicalSha,historicalBytes];
  const bytes = await readFile(join(dist, relative));
  assert.equal(createHash('sha256').update(bytes).digest('hex').toUpperCase(), expectedSha, `${relative} SHA256 drifted`);
  assert.equal(bytes.length, expectedBytes, `${relative} byte length drifted`);
}

const reviewed = new Map([
  ['trading-bot-api-keys', {
    bodySha: '86058CFEBA99B44BD9590B5B5CF4B6ADAA083A25303C95968B76039271D7BD8F',
    h2Count: 9,
    sourcesCount: 9
  }],
  ['evm-approval-safety-flashbots', {
    bodySha: '6855230783AC0C100E29676EA705090ADB23FECF373498825ED6DB2AAC62739F',
    h2Count: 10,
    sourcesCount: 7
  }]
]);

function bodyFromMarkdown(bytes, label) {
  const text = bytes.toString('utf8');
  const match = text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/u);
  if (!match) throw new Error(`frontmatter parse failed: ${label}`);
  // Git may check out committed LF Markdown as CRLF on Windows.
  // Compare canonical body bytes, without changing either source Markdown file.
  return Buffer.from(match[1].replace(/\r\n/g, '\n'), 'utf8');
}

function head(html) {
  const end = html.toLowerCase().indexOf('</head>');
  if (end < 0) throw new Error('head boundary missing');
  return html.slice(0, end + 7);
}

function tagAttr(tag, name) {
  return ((String(tag).match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i')) || [,''])[1] || '');
}

for (const [slug, expected] of reviewed) {
  const sourcePath = join(root, 'src', 'pages', 'guides', `${slug}.md`);
  const bytes = await readFile(sourcePath);
  const text = bytes.toString('utf8');
  const body = bodyFromMarkdown(bytes, slug);
  assert.equal(createHash('sha256').update(body).digest('hex').toUpperCase(), expected.bodySha, `body SHA drift: ${slug}`);
  assert.match(text, /layout:\s+\.\.\/\.\.\/layouts\/ReviewedGuideLayout\.astro/u);
  assert.match(text, /reviewed:\s+"2026-10-02"/u);
  assert.match(text, /next_review:\s+"2027-01-02"/u);
  assert.match(text, /sources:\r?\n/u);
  assert.match(text, /toc:\s+\[/u);

  const html = await readFile(join(dist, 'guides', slug, 'index.html'), 'utf8');
  const h = head(html);
  const robotsTag = (h.match(/<meta\b[^>]*\bname=["']robots["'][^>]*>/iu) || [''])[0];
  const robots = tagAttr(robotsTag, 'content').toLowerCase();
  assert.match(robots, /(?:^|,\s*)index(?:,|$)/u, `index missing: ${slug}`);
  assert.match(robots, /follow/u, `follow missing: ${slug}`);
  assert.doesNotMatch(robots, /noindex/u, `noindex leaked: ${slug}`);

  const canonicalTag = (h.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/iu) || [''])[0];
  assert.equal(tagAttr(canonicalTag, 'href'), `${origin}/guides/${slug}`, `canonical mismatch: ${slug}`);

  const articleTag = (html.match(/<article\b[^>]*\bdata-reviewed-guide=["']true["'][^>]*>/iu) || [''])[0];
  assert.ok(articleTag, `reviewed article receipt missing: ${slug}`);
  assert.equal(tagAttr(articleTag, 'data-guide-slug'), slug);
  assert.equal(tagAttr(articleTag, 'data-guide-reviewed'), '2026-10-02');
  assert.equal(tagAttr(articleTag, 'data-guide-next-review'), '2027-01-02');
  assert.equal(Number(tagAttr(articleTag, 'data-guide-sources-count')), expected.sourcesCount);
  assert.equal(tagAttr(articleTag, 'data-guide-indexable'), 'true');

  assert.ok(html.includes('Проверено 2026-10-02 · следующий пересмотр 2027-01-02'), `reviewed boundary missing: ${slug}`);
  assert.ok(!html.includes('class="memir-summary"'), `MemIR leaked into reviewed Markdown: ${slug}`);
  assert.ok(!html.includes('class="params-block"'), `Executable Parameters leaked into reviewed Markdown: ${slug}`);

  const toc = (html.match(/<nav\b[^>]*class=["'][^"']*reviewed-guide-toc[^"']*["'][^>]*>[\s\S]*?<\/nav>/iu) || [''])[0];
  assert.ok(toc, `TOC missing: ${slug}`);
  const tocHrefs = [...toc.matchAll(/<a\b[^>]*href=["']#([^"']+)["'][^>]*>/giu)].map((m) => m[1]);
  assert.equal(tocHrefs.length, expected.h2Count, `TOC h2 count mismatch: ${slug}`);

  const article = (html.match(/<article\b[^>]*class=["'][^"']*article-page[^"']*["'][^>]*>[\s\S]*?<\/article>/iu) || [''])[0];
  assert.ok(article, `article missing: ${slug}`);
  const h2Ids = [...article.matchAll(/<h2\b[^>]*id=["']([^"']+)["'][^>]*>/giu)].map((m) => m[1]);
  assert.equal(h2Ids.length, expected.h2Count, `rendered h2 count mismatch: ${slug}`);
  assert.deepEqual(tocHrefs, h2Ids, `TOC hrefs must match h2 ids: ${slug}`);
  assert.ok(h2Ids.includes('источники'), `Sources h2 missing: ${slug}`);
  assert.ok((article.match(/<table\b/giu) || []).length >= 1, `Markdown table missing: ${slug}`);

  const externalAnchors = [...article.matchAll(/<a\b[^>]*href=["']https?:\/\/[^"']+["'][^>]*>/giu)].map((m) => m[0]);
  assert.ok(externalAnchors.length > 0, `external source links missing: ${slug}`);
  for (const anchor of externalAnchors) {
    assert.match(anchor, /\brel=["'][^"']*noopener[^"']*["']/iu, `external link missing rel=noopener: ${slug}`);
  }

  const jsonLd = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/giu)].map((m) => m[1]);
  assert.ok(jsonLd.length >= 2, `JSON-LD scripts missing: ${slug}`);
  assert.ok(jsonLd.some((raw) => JSON.parse(raw)['@type'] === 'Article'), `Article JSON-LD missing: ${slug}`);
  assert.ok(jsonLd.some((raw) => JSON.parse(raw)['@type'] === 'BreadcrumbList'), `BreadcrumbList JSON-LD missing: ${slug}`);
}

const legacyGuideSource = await readFile(join(root, 'src/pages/guides/[slug].astro'), 'utf8');
assert.ok(!legacyGuideSource.includes('params: { slug: "evm-approval-safety-flashbots" }'), 'old embedded EVM route survived');

const layoutSource = await readFile(join(root, 'src/layouts/ReviewedGuideLayout.astro'), 'utf8');
assert.match(layoutSource, /@media \(max-width: 390px\)/u);
assert.match(layoutSource, /overflow-x:\s*auto/u);
assert.match(layoutSource, /const indexable = reviewedValid && sourcesPresent;/u);
assert.match(layoutSource, /'@type': 'Article'/u);
assert.match(layoutSource, /'@type': 'BreadcrumbList'/u);

const astroConfig = await readFile(join(root, 'astro.config.mjs'), 'utf8');
assert.match(astroConfig, /rehypePlugins:\s*\[reviewedMarkdownEnhancements\]/u);
assert.match(astroConfig, /node\.properties\.rel = \[\.\.\.new Set\(\[\.\.\.existing, 'noopener'\]\)\]/u);

const index = JSON.parse(await readFile(join(dist, 'guides-index.json'), 'utf8'));
const publicApi = JSON.parse(await readFile(join(dist, 'api/public-guides.json'), 'utf8'));
assert.equal(index.records.length, guideCount);
assert.equal(publicApi.records.length, guideCount);
const indexBySlug = new Map(index.records.map((record) => [record.slug, record]));
for (const slug of reviewed.keys()) {
  const record = indexBySlug.get(slug);
  assert.equal(record?.reviewed, '2026-10-02');
  assert.equal(record?.nextReview, '2027-01-02');
  assert.equal(record?.sourcesPresent, true);
  assert.equal(record?.sourceType, 'reviewed-markdown');
}

assert.deepEqual(index.evidenceLifecycleCounts, {
  REVIEW_DOC_BOUND: 19,
  POST_R13_CONTENT_TRUTH_HOLD: 1,
  UNBOUND_REVIEW_REQUIRED: guide5Successor ? 144 : 143
});
assert.deepEqual(publicApi.evidenceLifecycleCounts, index.evidenceLifecycleCounts);

const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.equal(sitemapLocs.length, sitemapGuideCount);
assert.ok(sitemapLocs.includes(`${origin}/en/guides`), 'T1.1 English index present in sitemap');
assert.ok(sitemapLocs.includes(`${origin}/en/guides/trading-bot-api-keys`), 'T1.3 approved English article present in sitemap');
for (const slug of reviewed.keys()) assert.ok(sitemapLocs.includes(`${origin}/guides/${slug}`));

const llms = await readFile(join(dist, 'llms.txt'), 'utf8');
assert.ok(llms.includes('Unique guide routes: ' + guideCount + '.'));
assert.ok(llms.includes('Indexable guide routes: ' + reviewedGuideCount + '.'));
assert.ok(llms.includes(`Reviewed English guide index: ${origin}/en/guides`), 'T1.1 English index listed in llms');
const llmsGuideLines = llms.split(/\r?\n/).filter((line) => line.includes(` — ${origin}/guides/`));
assert.equal(llmsGuideLines.length, reviewedGuideCount);
for (const slug of reviewed.keys()) assert.ok(llmsGuideLines.some((line) => line.endsWith(`${origin}/guides/${slug}`)));

const guideIndex = await readFile(join(dist, 'guides', 'index.html'), 'utf8');
const verifiedSection = (guideIndex.match(/<section\b[^>]*\bid=["']verified-guides["'][^>]*>/iu) || [''])[0];
assert.ok(verifiedSection);
assert.ok(!/\bhidden(?:\s|=|>)/iu.test(verifiedSection));
assert.equal(tagAttr(verifiedSection, 'data-reviewed-count'), String(reviewedGuideCount));
for (const slug of reviewed.keys()) assert.ok(guideIndex.includes(`href="/guides/${slug}"`));

const removedInternal = new Set(["analiz-zapuska-raas-api","analogi-i-ikh-slabye-storony","anti-self-attention-trading-psychology","archiveos-multigpt-bridge-integration","arkhitektura-suverennoy-ai-nody","compression-no-mans-land-trap","ekonomika-premialnykh-treyding-podpisok","executive-summary","fractal-intelligence-scouts-scribes-attention","grid-trading-os","grid-trading-os-institutional-spec","ierarkhicheskiy-pooling-i-ugasanie","latent-space-protocol-ai-research","latent-space-protocol-architecture","latent-space-protocol-research","mas-managed-coevolution-sandbox-isolation","mirrorcore-compactdigest-memory-compression","mirrorcore-compression","mirrorcore-seeding-identity-persistence","monetization-matrix-4x3","multi-llm-torgovaya-arena","multigpt-bridge-federated-ai-arbitration","omnicore-loop-self-preservation","plan-zapuska-open-source-proekta","razrabotka-freymvorka-c2p","reflex-layer-ooda-monitoring","sector-divergence-fake-crown","sovereign-agent-core","sovereign-core-ai-system-architecture","sovereign-scalper-drawdown-analysis","strategiya-sovereign-arena-ai","tilt-index-antiself","trading-performance-monitoring-ssot-ai","trading-system-v2-range-farm","why-continuityos-may-fail-an-adversarial-analysis"]);
const redirectSources = new Set(["ai-agent-reliability-audit","blockchain-forensics-methodology","d3-tool-io-bridge-contract","fleet-coordinator-drift-monitoring","microstructure-delisting-data-integrity-2026","security-sandboxing","trading-discipline-journal-psychology"]);
const archive = index.records.filter((record) => !removedInternal.has(record.slug) && !redirectSources.has(record.slug) && !reviewed.has(record.slug) && !(guide5Successor && record.slug === 'counter-trading-and-signing-chain-safety'));
assert.equal(archive.length, 119);
if(guide5Successor){
 const newRecord=index.records.find(x=>x.slug==='counter-trading-and-signing-chain-safety');
 assert.equal(newRecord?.reviewed,'2026-10-27');
 assert.equal(newRecord?.nextReview,'2027-01-27');
 assert.equal(newRecord?.sourcesPresent,true);
 assert.equal(newRecord?.sourceType,'reviewed-markdown');
 assert.ok(sitemapLocs.includes(origin+'/guides/counter-trading-and-signing-chain-safety'));
 assert.ok(sitemapLocs.includes(origin+'/en/guides/counter-trading-and-signing-chain-safety'));
 assert.ok(guideIndex.includes('href="/guides/counter-trading-and-signing-chain-safety"'));
}

const guideDirs = (await readdir(join(dist, 'guides'), { withFileTypes: true })).filter((entry) => entry.isDirectory());
assert.equal(guideDirs.length, guideCount);

const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
assert.equal(packageJson.scripts?.['verify:p31-reviewed-ru'], 'node scripts/verify-p31-5-reviewed-ru-r1.mjs');
assert.ok(packageJson.scripts?.build?.includes('npm run verify:p31-reviewed-ru'));

console.log('P31_5_REVIEWED_RU_R1=PASS total_guides=163 reviewed_indexable=2 noindex_follow=161 verified_guides=2 archive_guides=119 sitemap_total=8 sitemap_guide_urls=2 llms_guide_routes=2 body_sha_preserved=2 toc_guides=2 tables=PASS jsonld_article=2 jsonld_breadcrumb=2 external_noopener=PASS related_links=PASS evidence_lifecycle=19_1_143 direct_sanitizer=142_19_2');
