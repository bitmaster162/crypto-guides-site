import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const ruDir = join(root, 'src/pages/guides');
const enDir = join(root, 'src/pages/en/guides');
const origin = 'https://cryptoguidessite.vercel.app';
const approvedExternalLinks = new Map([
  ['https://bitevo.work/guides/before-write-access',
    'https://bitevo.work/ru/guides/before-write-access']
]);
const months = new Map(Object.entries({
  january: '01', february: '02', march: '03', april: '04',
  may: '05', june: '06', july: '07', august: '08',
  september: '09', october: '10', november: '11', december: '12',
  'января': '01', 'февраля': '02', 'марта': '03', 'апреля': '04',
  'мая': '05', 'июня': '06', 'июля': '07', 'августа': '08',
  'сентября': '09', 'октября': '10', 'ноября': '11', 'декабря': '12'
}));
const monthPattern = [...months.keys()].sort((a, b) => b.length - a.length).join('|');
const dateWords = new RegExp('(?<![\\p{L}\\p{N}])(\\d{1,2})\\s+(' +
  monthPattern + ')\\s+(\\d{4})(?![\\p{L}\\p{N}])', 'giu');
const urlPattern = /https?:\/\/[^\s<>"')\]]+/gu;
const safeSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;

function frontmatterParts(source, fileLabel) {
  const text = String(source).replace(/\r\n/g, '\n');
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/u);
  if (!match) throw new Error(fileLabel + ': missing YAML frontmatter');
  const front = new Map();
  let key = null;
  for (const line of match[1].split('\n')) {
    const next = line.match(/^([A-Za-z_][A-Za-z0-9_]*):[ \t]*(.*)$/u);
    if (next) {
      key = next[1];
      if (front.has(key)) throw new Error(fileLabel + ': duplicate ' + key);
      front.set(key, [next[2]]);
    } else if (key && (line.trim() === '' || /^[ \t]/u.test(line))) {
      front.get(key).push(line);
    } else {
      throw new Error(fileLabel + ': unsupported YAML line: ' + line);
    }
  }
  return { front, body: match[2], text };
}
function rawField(doc, name) {
  const lines = doc.front.get(name);
  return lines ? lines.map((x) => x.trimEnd()).join('\n').trim() : null;
}
function scalar(doc, name) {
  const value = rawField(doc, name);
  if (value === null || value.includes('\n')) return null;
  if (value.length > 1 && ((value[0] === '"' && value.at(-1) === '"') ||
      (value[0] === "'" && value.at(-1) === "'"))) {
    return value.slice(1, -1);
  }
  return value;
}
function sourceBacked(doc) {
  const raw = rawField(doc, 'sources');
  return Boolean(raw && /^[ \t]*-\s+title:/mu.test(raw) &&
    /^[ \t]+url:\s+https?:\/\//mu.test(raw));
}
function withoutFences(body) {
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let fence = null;
  for (const line of lines) {
    const open = line.match(/^\s{0,3}(\x60{3,}|~{3,})/u);
    if (open) {
      const marker = open[1][0];
      if (!fence) fence = marker;
      else if (fence === marker) fence = null;
      continue;
    }
    if (!fence) out.push(line);
  }
  return out;
}
function structure(body) {
  const lines = withoutFences(body);
  const pipeLines = lines.filter((line) => /^\s*\|.*\|\s*$/u.test(line));
  const separator = (line) => /^\s*\|\s*:?-+:?\s*(?:\|\s*:?-+:?\s*)+\|\s*$/u.test(line);
  return {
    h2: lines.filter((line) => /^##[ \t]+(?!#)/u.test(line)).length,
    h3: lines.filter((line) => /^###[ \t]+(?!#)/u.test(line)).length,
    tableLines: pipeLines.length,
    tableRows: pipeLines.filter((line) => !separator(line)).length,
    listItems: lines.filter((line) => /^\s*(?:[-*+]\s+|\d+[.)]\s+)/u.test(line)).length
  };
}
function extractUrls(text) {
  const found = [...text.matchAll(urlPattern)]
    .map((m) => m[0].replace(/[.,;:]+$/u, ''));
  return [...new Set(found)].sort();
}
function canonicalUrl(url, pairedSlugs) {
  const knownExternal = approvedExternalLinks.get(url);
  if (knownExternal) return knownExternal;
  if (url === origin + '/en/guides') return origin + '/guides';
  for (const slug of pairedSlugs) {
    if (url === origin + '/en/guides/' + slug) return origin + '/guides/' + slug;
  }
  return url;
}
function canonicalUrls(text, pairedSlugs) {
  return [...new Set(extractUrls(text).map((u) => canonicalUrl(u, pairedSlugs)))].sort();
}
function isoDate(year, month, day) {
  return year + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0');
}
function normalizedDates(body) {
  return body
    .replace(/(?<!\d)(\d{1,2})\.(\d{1,2})\.(\d{4})(?!\d)/gu,
      (_all, day, month, year) => isoDate(year, month, day))
    .replace(dateWords, (_all, day, month, year) =>
      isoDate(year, months.get(month.toLowerCase()), day));
}
function numbers(body) {
  const scrubbed = body.replace(urlPattern, ' ');
  const dated = normalizedDates(scrubbed);
  const tokens = [...dated.matchAll(
    /(?<![\p{L}\p{N}])(?:\d{4}-\d{2}-\d{2}|\d+(?:[.,]\d+)*)(?![\p{L}\p{N}])/gu
  )].map((m) => m[0]);
  return [...new Set(tokens)].sort();
}
function equalSets(a, b) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}
function comparePair(ruText, enText, slug, pairedSlugs) {
  const ru = frontmatterParts(ruText, 'RU ' + slug);
  const en = frontmatterParts(enText, 'EN ' + slug);
  const issues = [];
  const match = (actual, expected, label) => {
    if (actual !== expected) issues.push(label + ': RU=' +
      JSON.stringify(expected) + ' EN=' + JSON.stringify(actual));
  };
  match(scalar(ru, 'site'), 'cryptoguidessite.vercel.app', 'RU site');
  match(scalar(en, 'site'), scalar(ru, 'site'), 'EN site');
  match(scalar(ru, 'slug'), slug, 'RU slug');
  match(scalar(en, 'slug'), slug, 'EN slug');
  match(scalar(ru, 'lang'), 'ru', 'RU lang');
  match(scalar(en, 'lang'), 'en', 'EN lang');
  match(scalar(ru, 'path'), '/guides/' + slug, 'RU path');
  match(scalar(en, 'path'), '/en/guides/' + slug, 'EN path');
  match(scalar(en, 'alternate'), '/guides/' + slug, 'EN alternate');
  match(scalar(en, 'layout'), '../../../layouts/EnglishReviewedGuideLayout.astro', 'EN layout');
  for (const key of ['category', 'reviewed', 'next_review', 'schema', 'sources']) {
    match(rawField(en, key), rawField(ru, key), 'frontmatter ' + key);
    if (!rawField(ru, key)) issues.push('RU required frontmatter missing: ' + key);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(scalar(ru, 'reviewed') || '')) {
    issues.push('RU reviewed date invalid');
  }
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(scalar(ru, 'next_review') || '')) {
    issues.push('RU next_review date invalid');
  }
  if (!sourceBacked(ru) || !sourceBacked(en)) issues.push('sources missing/unbacked');
  for (const field of ['title', 'seo_title', 'description']) {
    const value = scalar(en, field);
    if (!value || /[\u0400-\u052F]/u.test(value)) {
      issues.push('English frontmatter ' + field + ' missing or contains Cyrillic');
    }
  }
  if ([...(scalar(en, 'seo_title') || '')].length > 60) issues.push('seo_title length > 60');
  if ([...(scalar(en, 'description') || '')].length > 160) issues.push('description length > 160');

  const ruStructure = structure(ru.body);
  const enStructure = structure(en.body);
  for (const key of Object.keys(ruStructure)) {
    match(enStructure[key], ruStructure[key], 'structure ' + key);
  }
  const ruUrls = canonicalUrls(ru.text, pairedSlugs);
  const enUrls = canonicalUrls(en.text, pairedSlugs);
  if (!equalSets(ruUrls, enUrls)) {
    issues.push('URL set mismatch: RU=' + JSON.stringify(ruUrls) +
      ' EN=' + JSON.stringify(enUrls));
  }
  // Compare every numeric fact in the document, including frontmatter
  // research notes, SEO metadata and citations, but not URL path digits.
  const ruNumbers = numbers(ru.text);
  const enNumbers = numbers(en.text);
  if (!equalSets(ruNumbers, enNumbers)) {
    issues.push('numeric/date set mismatch: RU=' + JSON.stringify(ruNumbers) +
      ' EN=' + JSON.stringify(enNumbers));
  }
  return { slug, ruStructure, enStructure, ruUrls, enUrls,
    ruNumbers, enNumbers, issues };
}

function fixture(lang) {
  const en = lang === 'en';
  return [
    '---',
    'site: cryptoguidessite.vercel.app',
    'slug: translation-fixture',
    'path: ' + (en ? '/en/guides/translation-fixture' : '/guides/translation-fixture'),
    ...(en ? ['alternate: /guides/translation-fixture'] : []),
    'lang: ' + lang,
    'category: Security',
    'title: "' + (en ? 'API key overview' : 'Обзор API-ключа') + '"',
    'seo_title: "' + (en ? 'API Key Overview | Crypto Guides' : 'Обзор API-ключа | Crypto Guides') + '"',
    'description: "' + (en ? 'Source-backed security overview.' : 'Обзор безопасности.') + '"',
    'reviewed: "2026-10-02"',
    'next_review: "2027-01-02"',
    'related: [' + (en ? 'https://bitevo.work/guides/before-write-access' :
      'https://bitevo.work/ru/guides/before-write-access') + ']',
    'schema: [Article, BreadcrumbList]',
    'sources:',
    '  - title: "Example source (20.03.2025)"',
    '    url: https://example.org/reference',
    'layout: ' + (en ? '../../../layouts/EnglishReviewedGuideLayout.astro' :
      '../../layouts/ReviewedGuideLayout.astro'),
    '---',
    '# ' + (en ? 'API key overview' : 'Обзор API-ключа'),
    '## ' + (en ? 'Summary' : 'Коротко'),
    '### ' + (en ? 'Credentials' : 'Ключи'),
    en ? 'Checked 2 October 2026. Values $64 million and 30 seconds.' :
      'Проверено 2 октября 2026. Значения 64 млн и 30 секунд.',
    '1. ' + (en ? 'Read the source.' : 'Читайте источник.'),
    '2. ' + (en ? 'Do the review.' : 'Проверьте.'),
    '| ' + (en ? 'Item | Value |' : 'Пункт | Значение |'),
    '|---|---|',
    '| A | 64 |',
    '## ' + (en ? 'Sources' : 'Источники'),
    '- [Reference](https://example.org/reference)',
    '- [Related](' + (en ? 'https://bitevo.work/guides/before-write-access' :
      'https://bitevo.work/ru/guides/before-write-access') + ')',
    ''
  ].join('\n');
}
function selfTest() {
  const ru = fixture('ru');
  const en = fixture('en');
  const paired = new Set(['translation-fixture']);
  let checks = 0;
  const good = comparePair(ru, en, 'translation-fixture', paired);
  assert.deepEqual(good.issues, [], 'positive translation/date/link pair fixture'); checks++;
  assert.equal(good.ruStructure.h2, 2); checks++;
  assert.equal(good.ruStructure.h3, 1); checks++;
  assert.equal(good.ruStructure.tableLines, 3); checks++;
  assert.equal(good.ruStructure.tableRows, 2); checks++;
  assert.equal(good.ruStructure.listItems, 4); checks++;
  assert.ok(good.ruNumbers.includes('2026-10-02')); checks++;
  assert.ok(good.ruNumbers.includes('64')); checks++;
  assert.deepEqual(numbers('Updated 20.03.2025'), numbers('Updated 20 March 2025'),
    'dotted and English word dates compare equally'); checks++;
  assert.deepEqual(numbers('Проверено 2 октября 2026'), numbers('Checked 2 October 2026'),
    'Russian and English word dates compare equally'); checks++;
  assert.ok(good.ruUrls.includes('https://bitevo.work/ru/guides/before-write-access')); checks++;
  const fail = (label, variant, expected) => {
    const result = comparePair(ru, variant, 'translation-fixture', paired);
    assert.ok(result.issues.some((issue) => issue.includes(expected)),
      label + ': expected ' + expected + ', actual ' + JSON.stringify(result.issues));
    checks++;
  };
  fail('missing H2', en.replace('## Summary', '#### Summary'), 'structure h2');
  fail('missing H3', en.replace('### Credentials', '#### Credentials'), 'structure h3');
  fail('missing table row', en.replace('| A | 64 |\n', ''), 'structure tableRows');
  fail('missing list item', en.replace('2. Do the review.\n', ''), 'structure listItems');
  fail('altered figure', en.replace('| A | 64 |', '| A | 65 |'), 'numeric/date set mismatch');
  fail('altered review-body date', en.replace('2 October 2026.', '3 October 2026.'), 'numeric/date set mismatch');
  fail('changed URL', en.replace('[Reference](https://example.org/reference)',
    '[Reference](https://example.org/altered)'), 'URL set mismatch');
  fail('altered sources metadata', en.replace('Example source (20.03.2025)',
    'Changed source (20.03.2025)'), 'frontmatter sources');
  fail('changed reviewed metadata', en.replace('reviewed: "2026-10-02"',
    'reviewed: "2026-10-03"'), 'frontmatter reviewed');
  fail('changed schema', en.replace('schema: [Article, BreadcrumbList]',
    'schema: [Article]'), 'frontmatter schema');
  fail('SEO over limit', en.replace('API Key Overview | Crypto Guides',
    'X'.repeat(61)), 'seo_title length > 60');
  fail('description over limit', en.replace('Source-backed security overview.',
    'Y'.repeat(161)), 'description length > 160');
  fail('wrong locale', en.replace('lang: en', 'lang: ru'), 'EN lang');
  fail('wrong path', en.replace('path: /en/guides/translation-fixture',
    'path: /guides/translation-fixture'), 'EN path');
  fail('wrong alternate', en.replace('alternate: /guides/translation-fixture',
    'alternate: /en/guides/translation-fixture'), 'EN alternate');
  fail('wrong layout', en.replace('../../../layouts/EnglishReviewedGuideLayout.astro',
    '../../layouts/EnglishReviewedGuideLayout.astro'), 'EN layout');
  fail('unapproved external link', en.replaceAll(
    'https://bitevo.work/guides/before-write-access',
    'https://example.org/unsupported-english-url'), 'URL set mismatch');
  fail('invented SEO figure', en.replace('Source-backed security overview.',
    'Source-backed security overview with 100 trades.'), 'numeric/date set mismatch');
  const crlfPair = comparePair(ru.replaceAll('\n', '\r\n'),
    en.replaceAll('\n', '\r\n'), 'translation-fixture', paired);
  assert.deepEqual(crlfPair.issues, [], 'Windows CRLF parity'); checks++;
  return checks;
}

const selfTestChecks = selfTest();
if (process.argv.includes('--self-test')) {
  console.log('T1_2_RU_EN_PARITY_SELFTEST=PASS checks=' + selfTestChecks +
    ' in_memory_only=1 negative_tests=18');
  process.exit(0);
}
if (process.argv.length > 2) {
  throw new Error('Unknown argument. Use --self-test or no arguments.');
}
const ruFiles = (await readdir(ruDir)).filter((f) => f.endsWith('.md'));
const enFiles = (await readdir(enDir)).filter((f) => f.endsWith('.md'));
for (const name of ruFiles) {
  if (name.endsWith('.en.md') || name.endsWith('.ru.md')) {
    throw new Error('Unexpected language-suffixed RU route filename: ' + name);
  }
}
const enSlugs = enFiles.map((file) => file.slice(0, -3));
for (const slug of enSlugs) {
  if (!safeSlug.test(slug)) throw new Error('Invalid EN slug filename: ' + slug);
  if (!ruFiles.includes(slug + '.md')) throw new Error('Orphan EN guide without RU source: ' + slug);
}
let structuralComparisons = 0;
let urlComparisons = 0;
let numericComparisons = 0;
let mismatches = 0;
for (const slug of enSlugs.sort()) {
  const ru = await readFile(join(ruDir, slug + '.md'), 'utf8');
  const en = await readFile(join(enDir, slug + '.md'), 'utf8');
  const result = comparePair(ru, en, slug, new Set(enSlugs));
  structuralComparisons += 5;
  urlComparisons++;
  numericComparisons++;
  mismatches += result.issues.length;
  if (result.issues.length) {
    console.error('T1_2_PAIR=FAIL slug=' + slug + '\n  ' + result.issues.join('\n  '));
  } else {
    console.log('T1_2_PAIR=PASS slug=' + slug +
      ' h2=' + result.enStructure.h2 + ' h3=' + result.enStructure.h3 +
      ' table_lines=' + result.enStructure.tableLines +
      ' table_rows=' + result.enStructure.tableRows +
      ' list_items=' + result.enStructure.listItems +
      ' url_set=' + result.enUrls.length +
      ' numeric_set=' + result.enNumbers.length);
  }
}
assert.equal(mismatches, 0, 'T1.2 translation parity mismatches');
console.log('T1_2_RU_EN_PARITY_R1=PASS pairs=' + enSlugs.length +
  ' structure_comparisons=' + structuralComparisons +
  ' url_comparisons=' + urlComparisons +
  ' numeric_comparisons=' + numericComparisons +
  ' fixture_checks=' + selfTestChecks +
  ' mismatches=0 source_ru_markdown=' + ruFiles.length +
  ' en_guide_routes=' + enSlugs.length +
  ' in_memory_selftests=PASS');
