import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const origin = 'https://cryptoguidessite.vercel.app';
const ruDisclaimer = 'Здесь — личная практика и исследования автора. Это не инвестиционный совет и не предложение управлять чужими средствами. Торговля криптоактивами может привести к потере всех вложенных денег; прошлые результаты не гарантируют будущих.';
const enDisclaimer = "This is the author's own practice and research. It is not investment advice or an offer to manage anyone's funds. Trading crypto-assets can lose all the money you put in; past results do not predict future ones.";
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex');
let checks = 0;
const check = (ok, note) => { assert.ok(ok, note); checks += 1; };
const equal = (a, b, note) => { assert.equal(a, b, note); checks += 1; };
function head(html) {
  const end = html.toLowerCase().indexOf('</head>');
  check(end > 0, 'head present');
  return html.slice(0, end + 7);
}
function attribute(tag, name) {
  return (tag.match(new RegExp('\\b' + name + '=["\\x27]([^"\\x27]+)["\\x27]', 'i')) || [,''])[1] || '';
}
function alternate(html, lang) {
  return [...head(html).matchAll(/<link\b[^>]*\brel=["']alternate["'][^>]*>/giu)]
    .map((m) => m[0])
    .filter((tag) => attribute(tag, 'hreflang') === lang)
    .map((tag) => attribute(tag, 'href'));
}
function canonical(html) {
  const tags = [...head(html).matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/giu)].map((m) => m[0]);
  equal(tags.length, 1, 'one canonical');
  return attribute(tags[0], 'href');
}

const en = await readFile(join(dist, 'en/guides/index.html'), 'utf8');
const ru = await readFile(join(dist, 'guides/index.html'), 'utf8');
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
const llms = await readFile(join(dist, 'llms.txt'), 'utf8');
const index = JSON.parse(await readFile(join(dist, 'guides-index.json'), 'utf8'));
const api = JSON.parse(await readFile(join(dist, 'api/public-guides.json'), 'utf8'));

check(/<html\b[^>]*lang="en"/iu.test(en), 'en HTML lang');
check(/<html\b[^>]*lang="ru"/iu.test(ru), 'ru HTML lang');
equal(canonical(en), origin + '/en/guides', 'en self canonical');
equal(canonical(ru), origin + '/guides', 'ru self canonical');
for (const [lang, expected] of [
  ['ru', origin + '/guides'],
  ['en', origin + '/en/guides'],
  ['x-default', origin + '/guides']
]) {
  assert.deepEqual(alternate(en, lang), [expected], 'EN index alternate: ' + lang); checks++;
  assert.deepEqual(alternate(ru, lang), [expected], 'RU index alternate: ' + lang); checks++;
}
check(en.includes('data-en-guide-count="1"'), 'T1.3 has one reviewed EN guide after owner-reviewed candidate');
check(en.includes('href="/en/guides/trading-bot-api-keys"'), 'EN index links to reviewed article');
check(!en.includes('No reviewed English guides have been published yet.'), 'EN empty state hidden when first guide exists');
check(en.includes('id="en-archive-boundary"'), 'EN archive boundary');
check(en.includes('>Archive<'), 'EN archive label');
check(en.includes('sources'), 'EN sources context');
check(en.includes('href="/guides"'), 'EN language switch -> RU index');
check(ru.includes('href="/en/guides"'), 'RU language switch -> EN index');
equal(en.split(enDisclaimer).length - 1, 1, 'approved EN disclaimer once');
equal(en.split(ruDisclaimer).length - 1, 0, 'RU disclaimer absent from EN');
equal(sha(enDisclaimer), '9900d9e98fc20ec130e5b2f71b3bbf7a6fff014bb382e4767dd42d621689ee24', 'EN disclaimer SHA');
equal(sha(ruDisclaimer), '6dd6a7500f9265a42e1f35bf0981cfdf1da0217bffcd0e01dc8af5e6d7b232dc', 'RU disclaimer SHA');

const visibleEn = en
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/giu, ' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/giu, ' ')
  .replace(/<[^>]*>/gu, ' ')
  .replace(/&[a-z0-9#]+;/giu, ' ')
  .replace(/\s+/g, ' ');
check(!/[\u0400-\u052F]/u.test(visibleEn), 'EN index no visible Cyrillic');
const enEntries = await readdir(join(dist, 'en/guides'), { withFileTypes: true });
const reviewedEnDirs = enEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
assert.deepEqual(reviewedEnDirs, ['trading-bot-api-keys'], 'one published reviewed EN guide route'); checks++;
for (const slug of ['evm-approval-safety-flashbots', 'trading-bot-api-keys']) {
  const h = await readFile(join(dist, 'guides', slug, 'index.html'), 'utf8');
  if (slug === 'trading-bot-api-keys') {
    check(h.includes('href="/en/guides/trading-bot-api-keys"'), 'paired RU language switch to EN article');
    for (const [lang, expected] of [
      ['ru', origin + '/guides/trading-bot-api-keys'],
      ['en', origin + '/en/guides/trading-bot-api-keys'],
      ['x-default', origin + '/guides/trading-bot-api-keys']
    ]) {
      assert.deepEqual(alternate(h, lang), [expected], 'paired RU hreflang: ' + lang); checks++;
    }
  } else {
    check(h.includes('href="/en/guides"'), slug + ' unpaired index fallback');
    equal(alternate(h, 'en').length, 0, slug + ' no false EN hreflang');
    equal(alternate(h, 'x-default').length, 0, slug + ' no false paired x-default');
  }
}

equal(index.records.length, 163, 'RU guide corpus 163');
equal(api.records.length, 163, 'metadata API corpus 163');
equal(index.records.filter((r) => r.reviewed && r.sourcesPresent).length, 2, 'RU reviewed guides 2');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gu)].map((m) => m[1]);
equal(locs.length, 8, 'five static + two reviewed RU + one reviewed EN sitemap URLs');
check(locs.includes(origin + '/en/guides'), 'EN index in sitemap');
assert.deepEqual(locs.filter((x) => x.startsWith(origin + '/en/guides/')), [origin + '/en/guides/trading-bot-api-keys'], 'one reviewed EN guide sitemap URL'); checks++;
equal(locs.filter((x) => x.startsWith(origin + '/guides/')).length, 2, 'two reviewed RU URLs');
check(llms.includes('Reviewed English guide index: ' + origin + '/en/guides'), 'EN index in llms');
check(llms.includes('## Indexable English guide routes (1)'), 'one indexable EN guide in llms');
check(llms.includes(' — ' + origin + '/en/guides/trading-bot-api-keys'), 'reviewed EN route listed in llms');
equal(llms.split(/\r?\n/).filter((s) => s.includes(' — ' + origin + '/guides/')).length, 2, 'RU llms guides');

const ruSource = await readFile(join(root, 'src/pages/guides/index.astro'), 'utf8');
check(ruSource.includes("frontmatter.lang === 'ru'"), 'RU markdown frontmatter only');
check(ruSource.includes('Array.isArray(frontmatter.sources)'), 'source metadata requirement');
check(ruSource.includes('verifiedRecords.length !== expectedReviewedCount'), 'dynamic RU source count');
check(ruSource.includes('console.warn('), 'nonblocking mismatch warning');
check(!ruSource.includes('throw new Error(' + String.fromCharCode(96) + 'reviewed guide count mismatch:'), 'hardcoded count throw removed');
const enSource = await readFile(join(root, 'src/pages/en/guides/index.astro'), 'utf8');
check(enSource.includes("guide.lang === 'en'"), 'EN frontmatter filter');
check(enSource.includes('guide.sources.length > 0'), 'EN sources filter');
const layout = await readFile(join(root, 'src/layouts/ReviewedGuideLayout.astro'), 'utf8');
check(layout.includes('hasPublishedPair'), 'real RU/EN pair gate');
check(layout.includes('languageSwitchHref'), 'pair or safe index fallback');
check(layout.includes('alternates={alternates}'), 'reciprocal guide alternates when paired');
const boundary = await readFile(join(root, 'src/components/GuideTruthBoundary.astro'), 'utf8');
check(boundary.includes('Checked '), 'EN review status copy');
check(boundary.includes('Next review '), 'EN next review copy');

const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
equal(pkg.scripts['verify:t1-en-section'], 'node scripts/verify-t1-1-en-section-r1.mjs', 'verifier registered');
check(pkg.scripts.build.includes('npm run verify:t1-en-section'), 'verifier included in full build');
console.log('T1_1_EN_SECTION_R1=PASS checks=' + checks + ' en_index=1 en_guide_routes=1 ru_guide_routes=163 reviewed_ru=2 archive_noindex=161 sitemap_urls=8 sitemap_ru_guides=2 sitemap_en_guides=1 llms_en_index=1 reciprocal_index_hreflang=PASS self_canonical=PASS en_cyrillic=0 approved_en_disclaimer=PASS dynamic_ru_count=PASS');
