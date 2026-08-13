import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const required = ['index.html','guides/index.html','version/index.html','version.json','guides-index.json','llms.txt','sitemap.xml','sitemap-index.xml','robots.txt'];
for (const file of required) await access(join(dist, file));

const index = JSON.parse(await readFile(join(dist, 'guides-index.json'), 'utf8'));
if (index.schema !== 'crypto-guides.public-index.v1') throw new Error('guide index schema mismatch');
if (!Number.isInteger(index.uniqueGuides) || index.uniqueGuides < 100) throw new Error(`guide index count invalid: ${index.uniqueGuides}`);
if (!Array.isArray(index.records) || index.records.length !== index.uniqueGuides) throw new Error('guide records count mismatch');

const version = JSON.parse(await readFile(join(dist, 'version.json'), 'utf8'));
if (version.schema !== 'crypto-guides.public-build.v1') throw new Error('build receipt schema mismatch');
if (!/^[0-9a-f]{40}$/i.test(version.sha)) throw new Error('build receipt SHA invalid');

const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
if (!sitemap.includes('https://cryptoguidessite.vercel.app/guides</loc>')) throw new Error('sitemap missing /guides');
for (const record of index.records) {
  if (!sitemap.includes(`https://cryptoguidessite.vercel.app/guides/${record.slug}`)) throw new Error(`sitemap missing ${record.slug}`);
}

const llms = await readFile(join(dist, 'llms.txt'), 'utf8');
if (!llms.includes(`Unique guide routes: ${index.uniqueGuides}`)) throw new Error('llms count mismatch');
if (!llms.includes('RESTORED_CORPUS_UNDER_REVIEW')) throw new Error('llms review boundary missing');

const guidesHtml = await readFile(join(dist, 'guides/index.html'), 'utf8');
if (!guidesHtml.includes('RESTORED_CORPUS_UNDER_REVIEW')) throw new Error('/guides review boundary missing');
if (!guidesHtml.includes('/guides-index.json')) throw new Error('/guides source binding missing');

console.log(`PUBLIC_CONTRACT_GATE=PASS guides=${index.uniqueGuides} sha=${version.sha} required_artifacts=${required.length}`);
