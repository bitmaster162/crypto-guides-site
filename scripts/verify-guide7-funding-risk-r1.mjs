import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { isExactGuide7Successor } from './guide7-route-successor-r1.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const slug = 'perpetual-funding-and-liquidation-risk';
const origin = 'https://crypto.bitevo.work';
const expectedUrls = [
  'https://bybit-exchange.github.io/docs/v5/market/history-fund-rate',
  'https://bybit-exchange.github.io/docs/v5/market/instrument',
  'https://help.coinbase.com/en/coinbase/derivatives/us-perpetual-futures-overview',
  'https://help.coinbase.com/en/derivatives/perpetual-style-futures/settlement-and-other-mechanics',
  'https://www.cftc.gov/filings/orgrules/rules0617266784.pdf#page=8',
  'https://help.coinbase.com/en/derivatives/perpetual-style-futures/contract-specifications',
  'https://bybit-exchange.github.io/docs/v5/position',
  'https://www.bybit.com/en/help-center/article/Understanding-the-Adjustment-and-Impact-of-the-New-Margin-Calculation'
];
const read = (path) => readFileSync(join(root, path), 'utf8').replace(/\r\n/gu, '\n');
const normalize = (text) => text.replace(/\r\n/gu, '\n');
const sources = (text) =>
  [...text.matchAll(/^    url: (https:\/\/\S+)$/gmu)].map((m) => m[1]);
const markers = [
  'reviewed: "2026-11-19"',
  'next_review: "2027-02-19"',
  'UNKNOWN/HOLD',
  'sources:'
];
const bodyValid = (text) => markers.every((marker) => text.includes(marker))
  && expectedUrls.every((url) => text.includes(url));

assert.equal(isExactGuide7Successor(), true, 'Guide 7 RU+EN source review gate');
const ru = read('src/pages/guides/' + slug + '.md');
const en = read('src/pages/en/guides/' + slug + '.md');
assert.ok(bodyValid(ru) && bodyValid(en), 'reviewed source has required evidence boundaries');
assert.deepEqual(sources(ru), expectedUrls, 'RU eight primary links');
assert.deepEqual(sources(en), expectedUrls, 'EN eight primary links');
assert.equal(bodyValid(ru.replace('UNKNOWN/HOLD', 'REPLACED')), false, 'negative test: missing UNKNOWN/HOLD');
assert.equal(bodyValid(en.replaceAll(expectedUrls[0], 'https://invalid.example')), false, 'negative test: source altered');
assert.match(ru, /не инвестиционн/iu);
assert.match(en, /not investment advice/iu);
assert.ok(ru.includes('Rule 1129') && ru.includes('nano Bitcoin BIP') && ru.includes('прежняя редакция спецификации'), 'RU binds documented BIP revision');
assert.ok(en.includes('Rule 1129') && en.includes('nano Bitcoin BIP') && en.includes('earlier specification'), 'EN binds documented BIP revision');
assert.ok(!ru.includes('По двум страницам нельзя считать') && !en.includes('These descriptions must not be treated'), 'obsolete unresolved BIP identity claim rejected');
assert.equal(bodyValid(ru.replaceAll('Rule 1129', 'Rule UNKNOWN')), true, 'body URL validation remains separate from rule-level review');
assert.ok(!ru.includes('Coin50') && !en.includes('Coin50'), 'unrelated Coin50 filing absent from both articles');
assert.ok(en.includes('“risk-free” profit as unsupported claims') &&
  en.includes('not investment advice') && en.includes('Total capital loss is possible'),
  'explicit rejection of risk-free/profit claims and visible loss disclosure');
let checks = 12;
const sitemap = read('dist/sitemap.xml');
const llms = read('dist/llms.txt');
const index = JSON.parse(read('dist/guides-index.json'));
const publicApi = JSON.parse(read('dist/api/public-guides.json'));
assert.equal(index.uniqueGuides, 166);
assert.equal(publicApi.count, 166);
assert.equal(index.records.filter((x) => x.reviewed && x.sourcesPresent).length, 5);
checks += 3;

for (const locale of ['ru', 'en']) {
  const route = (locale === 'en' ? '/en' : '') + '/guides/' + slug;
  const file = 'dist' + route + '/index.html';
  const html = read(file);
  const head = html.split('</head>')[0] + '</head>';
  const counterpart = (locale === 'en' ? '/guides/' : '/en/guides/') + slug;
  assert.ok(head.includes('rel="canonical" href="' + origin + route + '"'), locale + ' canonical');
  for (const [language, target] of [['ru', '/guides/' + slug], ['en', '/en/guides/' + slug]]) {
    assert.ok(head.includes('hreflang="' + language + '"') && head.includes(origin + target),
      locale + ' hreflang ' + language);
  }
  assert.match(head, /name="robots" content="[^"]*\bindex, follow/iu, locale + ' indexable');
  assert.ok(html.includes('data-guide-slug="' + slug + '"'), locale + ' article binding');
  assert.ok(html.includes('data-guide-reviewed="2026-11-19"'), locale + ' reviewed');
  assert.ok(html.includes('data-guide-next-review="2027-02-19"'), locale + ' next review');
  const toc = (html.match(/<nav\b[^>]*class="reviewed-guide-toc"[^>]*>[\s\S]*?<\/nav>/iu) || [''])[0];
  const tocIds = [...toc.matchAll(/<a\b[^>]*href="#([^"]+)"/giu)].map((m) => m[1]);
  const article = (html.match(/<article\b[^>]*class="article-page[^>]*>[\s\S]*?<\/article>/iu) || [''])[0];
  const renderedIds = [...article.matchAll(/<h2\b[^>]*id="([^"]+)"/giu)].map((m) => m[1]);
  assert.equal(tocIds.length, 7, locale + ' seven-item TOC');
  assert.deepEqual(tocIds, renderedIds, locale + ' TOC matches rendered h2');
  assert.equal((article.match(/<table\b/giu) || []).length, 1, locale + ' table');
  assert.ok(article.includes('UNKNOWN/HOLD'), locale + ' visibly fail-closed');
  for (const url of expectedUrls) assert.ok(article.includes(url), locale + ' primary article hyperlink: ' + url);
  const jsonLd = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/giu)]
    .map((m) => JSON.parse(m[1]));
  const structured = jsonLd.find((x) => x['@type'] === 'Article');
  assert.ok(structured, locale + ' Article JSON-LD');
  assert.deepEqual(structured.citation, expectedUrls, locale + ' JSON-LD citations');
  assert.equal(structured.mainEntityOfPage, origin + route, locale + ' JSON-LD canonical');
  assert.ok(sitemap.includes('<loc>' + origin + route + '</loc>'), locale + ' sitemap route');
  assert.ok(llms.includes(origin + route), locale + ' llms route');
  checks += 23;
}
console.log('GUIDE7_FUNDING_RISK_GATE=PASS' +
  ' ru_en=2 sources=8 toc=7 tables=1 review_dates=PASS canonical_hreflang=PASS' +
  ' index_sitemap_llms=PASS jsonld=PASS negative_source_tamper=2 promises=0');
