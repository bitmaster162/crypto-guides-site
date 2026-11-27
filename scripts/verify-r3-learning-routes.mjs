import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { root, readContract, moduleSlugs, routeFor } from './r3-learning-contract.mjs';

const rows = await readContract();
const dist = join(root, 'dist');
const origin = 'https://crypto.bitevo.work';
const expected = new Set(rows.map(row => row.route));
for (const lang of ['ru','en']) {
  const p = join(dist, lang === 'en' ? 'en/learn/r3' : 'learn/r3');
  const entries = await readdir(p, { withFileTypes: true });
  assert(entries.every(e => e.isDirectory()), 'unexpected files in learning namespace');
  assert.deepEqual(entries.map(e => e.name).sort(), [...moduleSlugs].sort(), 'R3 routes');
  for (const name of moduleSlugs) assert.deepEqual(await readdir(join(p,name)), ['index.html']);
}
const attr = (tag, name) => ((tag.match(new RegExp('\\b' + name + '=["\\x27]([^"\\x27]*)["\\x27]','i')) || [,''])[1]);
const unescape = x => x.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&#x27;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
for (const row of rows) {
  const html = await readFile(join(dist, row.route.slice(1), 'index.html'), 'utf8');
  const head = html.split('</head>')[0];
  assert.match(html, new RegExp('<html\\b[^>]*lang="'+row.lang+'"','i'));
  const robots = (head.match(/<meta\b[^>]*name="robots"[^>]*>/ig)||[]);
  assert.equal(robots.length,1);
  assert.equal(attr(robots[0],'content'), 'noindex, follow');
  const canonical = (head.match(/<link\b[^>]*rel="canonical"[^>]*>/ig)||[]);
  assert.equal(canonical.length,1);
  assert.equal(attr(canonical[0],'href'), origin+row.route);
  for (const [locale, route] of [['ru',routeFor(row.slug,'ru')],['en',routeFor(row.slug,'en')],['x-default',routeFor(row.slug,'ru')]]) {
    const tags = (head.match(/<link\b[^>]*rel="alternate"[^>]*>/ig)||[]).filter(t=>attr(t,'hreflang')===locale);
    assert.equal(tags.length,1);
    assert.equal(attr(tags[0],'href'),origin+route);
  }
  assert.match(html,/data-r3-review-status="NOT_RUN"/);
  assert.doesNotMatch(html,/data-reviewed-guide="true"/);
  const article = (html.match(/<article\b[^>]*\bdata-r3-module="[^"]+"[^>]*>[\s\S]*?<\/article>/i)||[])[0];
  assert(article,row.route+' article');
  assert.equal(attr(article.split('>')[0],'data-r3-body-sha256'),row.body_sha256);
  assert.equal(attr(article.split('>')[0],'data-r3-module'),row.module);
  assert.equal(attr(article.split('>')[0],'data-r3-locale'),row.lang);
  assert.equal((article.match(/<h1\b/g)||[]).length,1);
  assert.doesNotMatch(article,/<(?:script|iframe|object|embed)\b/i);
  const hrefs = (article.match(/<a\b[^>]*>/ig)||[]).map(t=>unescape(attr(t,'href')));
  assert.deepEqual(hrefs,row.sources.map(s=>s.url),row.route+' exact ordered source links');
  for (const slug of moduleSlugs) assert(html.includes('href="'+routeFor(slug,row.lang)+'"'), row.route+' navigation');
  const other = routeFor(row.slug,row.lang==='ru'?'en':'ru');
  assert(html.includes('href="'+other+'"'),row.route+' reciprocal language link');
}
for (const [lang, name] of [['ru','guides/index.html'],['en','en/guides/index.html']]) {
  const html = await readFile(join(dist,name),'utf8');
  assert(html.includes('id="r3-learning-collection"'));
  assert(html.includes('href="'+routeFor(moduleSlugs[0],lang)+'"'));
}
for (const name of ['sitemap.xml','llms.txt','guides-index.json','api/public-guides.json']) {
  const text = await readFile(join(dist,name),'utf8');
  for (const route of expected) assert(!text.includes(route),name+' must not include unreviewed R3');
}
console.log('R3_LEARNING_ROUTES=PASS exact_routes=18 immutable_bodies=18 noindex=18 source_order=18 reciprocal_locale=18 reviewed_discovery_excluded=1');
