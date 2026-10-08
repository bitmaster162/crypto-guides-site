import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const origin = 'https://cryptoguidessite.vercel.app';
const slug = 'trading-bot-api-keys';
const ruRoute = '/guides/' + slug;
const enRoute = '/en/guides/' + slug;
const approvedEnSha = '84407BDC284768EE9BDC56ABFBF2A8CF5F7E56B798C5EFF78994FB94F7FB68D6';
const approvedRuBlob = 'f87cd96927f495d7d628c69c755752158f824c38';
const enDisclaimer = "This is the author's own practice and research. It is not investment advice or an offer to manage anyone's funds. Trading crypto-assets can lose all the money you put in; past results do not predict future ones.";
const ruDisclaimer = 'Здесь — личная практика и исследования автора. Это не инвестиционный совет и не предложение управлять чужими средствами. Торговля криптоактивами может привести к потере всех вложенных денег; прошлые результаты не гарантируют будущих.';
let checks = 0;
const check = (value, message) => { assert.ok(value, message); checks++; };
const equal = (actual, expected, message) => { assert.equal(actual, expected, message); checks++; };
const digest = (algorithm, input) => createHash(algorithm).update(input).digest('hex').toUpperCase();
const readText = (path) => readFile(path, 'utf8');
const normalise = (text) => text.replace(/\r\n/gu, '\n');
const count = (text, value) => text.split(value).length - 1;

function frontmatter(text, label) {
  const match = normalise(text).match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/u);
  check(match !== null, label + ' YAML frontmatter exists');
  const meta = match[1];
  const raw = (key) => {
    const hit = meta.match(new RegExp('^' + key + ':\\s*(.*)$', 'm'));
    return hit ? hit[1] : null;
  };
  const field = (key) => {
    const value = raw(key);
    return value && value.startsWith('"') && value.endsWith('"')
      ? value.slice(1, -1) : value;
  };
  return { meta, body: match[2], raw, field };
}
function head(html) {
  const position = html.toLowerCase().indexOf('</head>');
  check(position > 0, 'HTML head is present');
  return html.slice(0, position + 7);
}
function tagAttr(tag, name) {
  const re = new RegExp('\\b' + name + '=["\\x27]([^"\\x27]+)["\\x27]', 'i');
  return (tag.match(re) || [,''])[1] || '';
}
function singleTag(html, type) {
  const tags = [...head(html).matchAll(new RegExp('<link\\b[^>]*\\brel=["\\x27]' + type +
    '["\\x27][^>]*>', 'giu'))].map((m) => m[0]);
  equal(tags.length, 1, 'exactly one ' + type + ' link');
  return tags[0];
}
function alternate(html, lang) {
  return [...head(html).matchAll(/<link\b[^>]*\brel=["']alternate["'][^>]*>/giu)]
    .map((m) => m[0])
    .filter((tag) => tagAttr(tag, 'hreflang') === lang)
    .map((tag) => tagAttr(tag, 'href'));
}
function articleTag(html) {
  const found = html.match(/<article\b[^>]*\bdata-reviewed-guide=["']true["'][^>]*>/iu);
  check(Boolean(found), 'EN reviewed guide article exists');
  return found[0];
}
function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/giu, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/giu, ' ')
    .replace(/<[^>]*>/gu, ' ')
    .replace(/&[a-z0-9#]+;/giu, ' ')
    .replace(/\s+/gu, ' ');
}

const enSourceBytes = await readFile(join(root, 'src/pages/en/guides', slug + '.md'));
const enSource = normalise(enSourceBytes.toString('utf8'));
const enCanonicalBytes = Buffer.from(enSource, 'utf8');
equal(enCanonicalBytes.length, 11509, 'Claude-reviewed EN candidate byte length');
equal(digest('sha256', enCanonicalBytes), approvedEnSha, 'approved EN text SHA256 (LF canonical)');
equal(count(enSource, 'layout: ../../../layouts/EnglishReviewedGuideLayout.astro'), 1, 'only approved EN layout path');
const enFront = frontmatter(enSource, 'EN');
equal(enFront.field('site'), 'cryptoguidessite.vercel.app', 'EN site');
equal(enFront.field('slug'), slug, 'EN slug');
equal(enFront.field('lang'), 'en', 'EN language');
equal(enFront.field('path'), enRoute, 'EN route');
equal(enFront.field('alternate'), ruRoute, 'EN counterpart path');
equal(enFront.field('layout'), '../../../layouts/EnglishReviewedGuideLayout.astro', 'EN routed layout');
equal(enFront.field('reviewed'), '2026-10-02', 'EN review date');
equal(enFront.field('next_review'), '2027-01-02', 'EN next review date');
equal(enFront.field('schema'), '[Article, BreadcrumbList]', 'EN schema');
check((enFront.field('seo_title') || '').length > 0 &&
  [...enFront.field('seo_title')].length <= 60, 'EN SEO title within 60 characters');
check((enFront.field('description') || '').length > 0 &&
  [...enFront.field('description')].length <= 160, 'EN description within 160 characters');
check(!/[\u0400-\u052F]/u.test(enFront.body), 'EN prose/body has no Cyrillic (source titles in metadata allowed)');

const ruSourceBytes = await readFile(join(root, 'src/pages/guides', slug + '.md'));
const ruCanonicalBytes = Buffer.from(normalise(ruSourceBytes.toString('utf8')), 'utf8');
const ruGitBlob = Buffer.concat([
  Buffer.from('blob ' + ruCanonicalBytes.length + '\0', 'utf8'), ruCanonicalBytes
]);
equal(digest('sha1', ruGitBlob).toLowerCase(), approvedRuBlob, 'RU Git blob unchanged');
const ruFront = frontmatter(ruCanonicalBytes.toString('utf8'), 'RU');
for (const field of ['site', 'slug', 'category', 'reviewed', 'next_review', 'schema']) {
  equal(enFront.field(field), ruFront.field(field), 'paired metadata ' + field);
}
const ruSources = [...ruFront.meta.matchAll(/^\s+url:\s+(https?:\/\/\S+)/gmu)].map((m) => m[1]);
const enSources = [...enFront.meta.matchAll(/^\s+url:\s+(https?:\/\/\S+)/gmu)].map((m) => m[1]);
assert.deepEqual(enSources, ruSources, 'EN source URLs and order unchanged'); checks++;
equal(enSources.length, 9, 'nine unchanged sources');

const parityOutput = execFileSync(process.execPath, [
  join(root, 'scripts/verify-t1-2-ru-en-parity-r1.mjs')
], { cwd: root, encoding: 'utf8', timeout: 30000 });
check(parityOutput.includes('T1_2_PAIR=PASS slug=' + slug), 'real translation pair passed');
check(parityOutput.includes('T1_2_RU_EN_PARITY_R1=PASS pairs=1'), 'exactly one paired EN article');
check(parityOutput.includes('mismatches=0'), 'translation structural URL and numeric parity exact');
check(parityOutput.includes('fixture_checks=30'), '30 T1.2 in-memory assertions preserved');

const enHtml = await readText(join(dist, 'en/guides', slug, 'index.html'));
const ruHtml = await readText(join(dist, 'guides', slug, 'index.html'));
const evmHtml = await readText(join(dist, 'guides/evm-approval-safety-flashbots/index.html'));
const enIndex = await readText(join(dist, 'en/guides/index.html'));
check(/<html\b[^>]*\blang="en"/iu.test(enHtml), 'EN html lang');
check(/<html\b[^>]*\blang="ru"/iu.test(ruHtml), 'RU html lang');
equal(tagAttr(singleTag(enHtml, 'canonical'), 'href'), origin + enRoute, 'EN self canonical');
equal(tagAttr(singleTag(ruHtml, 'canonical'), 'href'), origin + ruRoute, 'RU self canonical');
for (const [lang, target] of [
  ['ru', origin + ruRoute],
  ['en', origin + enRoute],
  ['x-default', origin + ruRoute]
]) {
  assert.deepEqual(alternate(enHtml, lang), [target], 'EN reciprocal hreflang ' + lang); checks++;
  assert.deepEqual(alternate(ruHtml, lang), [target], 'RU reciprocal hreflang ' + lang); checks++;
}
equal(alternate(evmHtml, 'en').length, 0, 'unpaired EVM has no false EN hreflang');
check(ruHtml.includes('href="' + enRoute + '"'), 'RU language switch leads to EN article');
check(enHtml.includes('href="' + ruRoute + '"'), 'EN language switch leads to RU article');
check(evmHtml.includes('href="/en/guides"'), 'unpaired EVM switch keeps safe index fallback');

const enHead = head(enHtml);
const robotsTag = (enHead.match(/<meta\b[^>]*\bname=["']robots["'][^>]*>/iu) || [''])[0];
const robots = tagAttr(robotsTag, 'content');
check(/(?:^|,\s*)index(?:,|$)/u.test(robots) && /follow/u.test(robots) && !/noindex/u.test(robots),
  'reviewed EN article index/follow, never noindex');
equal(tagAttr((enHead.match(/<meta\b[^>]*\bname=["']description["'][^>]*>/iu) || [''])[0],
  'content'), enFront.field('description'), 'EN description from frontmatter');
check(enHead.includes('<title>' + enFront.field('seo_title') + '</title>'), 'EN SEO title from frontmatter');
equal(count(enHtml, enDisclaimer), 1, 'approved EN disclaimer exactly once');
equal(count(enHtml, ruDisclaimer), 0, 'wrong-language RU disclaimer absent');
equal(digest('sha256', enDisclaimer), '9900D9E98FC20EC130E5B2F71B3BBF7A6FFF014BB382E4767DD42D621689EE24',
  'approved English disclaimer SHA256 unchanged');
check(!/[\u0400-\u052F]/u.test(visibleText(enHtml)), 'rendered EN page has no visible Cyrillic');

const tag = articleTag(enHtml);
equal(tagAttr(tag, 'data-guide-slug'), slug, 'EN article slug receipt');
equal(tagAttr(tag, 'data-guide-reviewed'), '2026-10-02', 'EN article review receipt');
equal(tagAttr(tag, 'data-guide-next-review'), '2027-01-02', 'EN article next review receipt');
equal(tagAttr(tag, 'data-guide-lang'), 'en', 'EN article language receipt');
equal(tagAttr(tag, 'data-guide-indexable'), 'true', 'EN indexability receipt');
equal(Number(tagAttr(tag, 'data-guide-sources-count')), 9, 'EN nine sources receipt');
check(enHtml.includes('Checked 2 October 2026'), 'visible EN review date');
check(enHtml.includes('Next review 2 January 2027'), 'visible EN next review date');
const toc = (enHtml.match(/<nav\b[^>]*class=["'][^"']*reviewed-guide-toc[^"']*["'][^>]*>[\s\S]*?<\/nav>/iu) || [''])[0];
check(Boolean(toc), 'EN table of contents exists');
const tocIds = [...toc.matchAll(/<a\b[^>]*href=["']#([^"']+)["'][^>]*>/giu)].map((m) => m[1]);
const enArticle = (enHtml.match(/<article\b[^>]*class=["'][^"']*article-page[^"']*["'][^>]*>[\s\S]*?<\/article>/iu) || [''])[0];
check(Boolean(enArticle), 'rendered EN article body exists');
const h2Ids = [...enArticle.matchAll(/<h2\b[^>]*id=["']([^"']+)["'][^>]*>/giu)].map((m) => m[1]);
equal(tocIds.length, 9, 'EN table-of-contents count');
assert.deepEqual(tocIds, h2Ids, 'EN toc hrefs match H2 IDs'); checks++;
check(h2Ids.includes('sources'), 'EN Sources section present');
equal((enArticle.match(/<table\b/giu) || []).length, 2, 'two rendered EN markdown tables');
const externalAnchors = [...enArticle.matchAll(/<a\b[^>]*href=["']https?:\/\/[^"']+["'][^>]*>/giu)]
  .map((m) => m[0]);
check(externalAnchors.length >= 9, 'EN source hyperlinks present in article');
for (const anchor of externalAnchors) {
  check(/\brel=["'][^"']*noopener[^"']*["']/iu.test(anchor), 'EN external link rel=noopener');
}
for (const url of enSources) check(enArticle.includes(url), 'EN source URL in visible content: ' + url);

const jsonLd = [...enHtml.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/giu)]
  .map((m) => JSON.parse(m[1]));
const structuredArticle = jsonLd.find((row) => row['@type'] === 'Article');
const structuredBreadcrumb = jsonLd.find((row) => row['@type'] === 'BreadcrumbList');
check(Boolean(structuredArticle), 'EN Article JSON-LD exists');
check(Boolean(structuredBreadcrumb), 'EN BreadcrumbList JSON-LD exists');
equal(structuredArticle.inLanguage, 'en', 'EN JSON-LD language');
equal(structuredArticle.mainEntityOfPage, origin + enRoute, 'EN JSON-LD page URL');
equal(structuredArticle.dateModified, '2026-10-02', 'EN JSON-LD dateModified');
assert.deepEqual(structuredArticle.citation, enSources, 'EN JSON-LD sources ordered'); checks++;
equal(structuredBreadcrumb.itemListElement[1].item, origin + '/en/guides', 'EN breadcrumb index');
equal(structuredBreadcrumb.itemListElement[2].item, origin + enRoute, 'EN breadcrumb canonical');

check(enIndex.includes('data-en-guide-count="1"'), 'EN index reports one approved article');
check(enIndex.includes('href="' + enRoute + '"'), 'EN index links first article');
check(!enIndex.includes('No reviewed English guides have been published yet.'),
  'EN index not displaying empty state');
const enEntries = (await readdir(join(dist, 'en/guides'), { withFileTypes: true }))
  .filter((ent) => ent.isDirectory()).map((ent) => ent.name).sort();
assert.deepEqual(enEntries, [slug], 'exactly one EN article route generated'); checks++;

const sitemap = await readText(join(dist, 'sitemap.xml'));
const llms = await readText(join(dist, 'llms.txt'));
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gu)].map((m) => m[1]);
equal(locs.length, 8, 'sitemap has eight URLs after EN publication');
equal(locs.filter((x) => x === origin + enRoute).length, 1, 'EN URL once in sitemap');
equal(locs.filter((x) => x.startsWith(origin + '/en/guides/')).length, 1, 'one EN guide in sitemap');
equal(locs.filter((x) => x.startsWith(origin + '/guides/')).length, 2, 'two reviewed RU URLs preserved');
check(llms.includes('## Indexable English guide routes (1)'), 'llms EN route count one');
check(llms.includes(' — ' + origin + enRoute), 'llms enumerates reviewed EN article');
equal(llms.split(/\r?\n/u).filter((line) => line.includes(' — ' + origin + '/guides/')).length,
  2, 'llms RU guide list preserved');

for (const [path, expectedSha, expectedBytes] of [
  ['guides-index.json', 'A883357AC062322E0B1536AC8A46C8897DF0C375D795AEBFC2D429A416F0DA25', 139411],
  ['api/public-guides.json', 'EE7E870B15B9A7201E3380ADBE5ACC12E65D8CBE366362AB46221DB85AF4446A', 136291],
  ['sitemap.xml', '938FAAC1A483CE48BE50AB8C3E92D0823EEBA40988188BFD78038C6092DF848A', 736],
  ['llms.txt', '0A156171513B2CE1C8556747FD6AAEAB78EC893EC10F4949B3C02BEB9D7B8B3F', 1784]
]) {
  const bytes = await readFile(join(dist, path));
  equal(digest('sha256', bytes), expectedSha, path + ' exact SHA256');
  equal(bytes.length, expectedBytes, path + ' exact bytes');
}
const pkg = JSON.parse(await readText(join(root, 'package.json')));
equal(pkg.scripts?.['verify:t1-first-en'], 'node scripts/verify-t1-3-first-en-r1.mjs',
  'T1.3 verifier registered');
check(pkg.scripts?.build?.includes('npm run verify:t1-first-en'), 'T1.3 verifier wired into build');

console.log('T1_3_FIRST_EN_R1=PASS checks=' + checks +
  ' en_articles=1 ru_guides=163 en_index=1 total_html=170 sitemap_urls=8' +
  ' ru_en_pairs=1 parity_mismatches=0 en_candidate_sha256=PASS ru_git_blob=PASS' +
  ' en_source_links=9 external_noopener=PASS reciprocal_hreflang=PASS' +
  ' self_canonical=PASS seo_limits=PASS approved_disclaimer=PASS jsonld=PASS' +
  ' sitemap_llms_hashes=PASS owner_publication_gate=SEPARATE');
