import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { publicGuideTitleRepairs } from '../src/data/public-guide-title-repairs.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const sourcePath = join(root, 'src', 'pages', 'index.astro');
const distPath = join(root, 'dist', 'index.html');
const guidesIndexPath = join(root, 'dist', 'guides-index.json');
const publicApiPath = join(root, 'dist', 'api', 'public-guides.json');

const [source, html, guidesIndexRaw, publicApiRaw] = await Promise.all([
  readFile(sourcePath, 'utf8'),
  readFile(distPath, 'utf8'),
  readFile(guidesIndexPath, 'utf8'),
  readFile(publicApiPath, 'utf8')
]);
const guidesIndex = JSON.parse(guidesIndexRaw);
const publicApi = JSON.parse(publicApiRaw);

const requiredSourceMarkers = [
  'data-root-discovery-authority="REVIEWED_CANONICAL_MERGED"',
  "fetch('/guides-index.json'",
  "fetch('/api/public-guides.json'",
  'authority count mismatch',
  'canonical authority mode mismatch',
  'title authority mismatch',
  "record.canonicalRole !== 'SUPERSEDED_HISTORICAL_REVISION'",
  'DISCOVERY FAIL-CLOSED'
];
for (const marker of requiredSourceMarkers) {
  if (!source.includes(marker)) throw new Error(`root discovery source marker missing: ${marker}`);
}

const forbiddenSourcePatterns = [
  /const\s+guides\s*=\s*\[/u,
  /Crypto\s*&\s*Trading\s*Journal/u,
  /Децентрализованные\s+руководства\s+и\s+плейбуки/u
];
for (const pattern of forbiddenSourcePatterns) {
  if (pattern.test(source)) throw new Error(`legacy root discovery authority survived in source: ${pattern}`);
}

const legacyRepairedTitles = Object.values(publicGuideTitleRepairs)
  .map((entry) => entry?.sourceTitle)
  .filter(Boolean);
for (const title of legacyRepairedTitles) {
  if (source.includes(title)) throw new Error(`legacy repaired title hardcoded on root source: ${title}`);
  if (html.includes(title)) throw new Error(`legacy repaired title leaked into built root HTML: ${title}`);
}

if (!html.includes('data-root-discovery-authority="REVIEWED_CANONICAL_MERGED"')) {
  throw new Error('built root discovery authority marker missing');
}
if (!html.includes('/guides-index.json') || !html.includes('/api/public-guides.json')) {
  throw new Error('built root does not bind both discovery authority endpoints');
}
if (publicApi.canonicalization !== 'REVISION_PAIRS_CANONICAL_SELECTED_SUPERSEDED_PRESERVED') {
  throw new Error(`public API canonicalization mismatch: ${publicApi.canonicalization || '<missing>'}`);
}
if (!Array.isArray(guidesIndex.records) || !Array.isArray(publicApi.records) || guidesIndex.records.length !== publicApi.records.length || guidesIndex.records.length === 0) {
  throw new Error(`root authority payload mismatch index=${guidesIndex.records?.length ?? 'invalid'} api=${publicApi.records?.length ?? 'invalid'}`);
}

const apiBySlug = new Map(publicApi.records.map((record) => [record.slug, record]));
for (const record of guidesIndex.records) {
  const apiRecord = apiBySlug.get(record.slug);
  if (!apiRecord) throw new Error(`root authority API record missing: ${record.slug}`);
  if (apiRecord.title !== record.title) throw new Error(`root authority title mismatch: ${record.slug}`);
}

console.log(`ROOT_DISCOVERY_CANONICALIZATION_GATE=PASS records=${guidesIndex.records.length} repaired_titles_guarded=${legacyRepairedTitles.length}`);
