import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const required = ['index.html','guides/index.html','version/index.html','version.json','guides-index.json','api/public-guides.json','llms.txt','sitemap.xml','sitemap-index.xml','robots.txt'];
for (const file of required) await access(join(dist, file));

const index = JSON.parse(await readFile(join(dist, 'guides-index.json'), 'utf8'));
if (index.schema !== 'crypto-guides.public-index.v1') throw new Error('guide index schema mismatch');
if (!Number.isInteger(index.uniqueGuides) || index.uniqueGuides < 100) throw new Error(`guide index count invalid: ${index.uniqueGuides}`);
if (!Array.isArray(index.records) || index.records.length !== index.uniqueGuides) throw new Error('guide records count mismatch');

for (const record of index.records) {
  if (!record.slug || !record.title) throw new Error('guide identity missing');
  if (!record.reviewStatus || !record.currentness) throw new Error(`review metadata missing: ${record.slug}`);
  if (typeof record.ymyl !== 'boolean') throw new Error(`YMYL flag missing: ${record.slug}`);
}

const routing = index.reviewRouting;
if (!routing) throw new Error('review routing receipt missing');
const routedTotal = routing.explicitOverrides + routing.ruleRouted + routing.restoredUnreviewed;
if (routedTotal !== index.uniqueGuides) throw new Error(`review routing count mismatch: ${routedTotal} != ${index.uniqueGuides}`);
if (routing.explicitOverrides < 10) throw new Error(`explicit review overrides regressed: ${routing.explicitOverrides}`);
if (routing.ruleRouted < 1) throw new Error('topic-level review routing produced zero matches');
if (routing.restoredUnreviewed !== 0) throw new Error(`restored corpus still contains unrouted records: ${JSON.stringify(routing.unrouted || [])}`);
if (Array.isArray(routing.unrouted) && routing.unrouted.length !== 0) throw new Error(`unrouted receipt not empty: ${routing.unrouted.join(', ')}`);

const bySlug = new Map(index.records.map((record) => [record.slug, record]));
const requireRecord = (slug) => {
  const record = bySlug.get(slug);
  if (!record) throw new Error(`required review control route missing: ${slug}`);
  return record;
};

if (requireRecord('ai-agent-reliability-audit').reviewStatus !== 'LEGACY_COMMERCIAL_CONFLICT') throw new Error('legacy AI Audit authority boundary regressed');
if (requireRecord('microstructure-delisting-2026').reviewStatus !== 'REDUNDANT_REVISION_PAIR') throw new Error('microstructure revision-pair boundary regressed');
if (requireRecord('anthropic-models-and-upgrade').currentness !== 'REVERIFY_REQUIRED') throw new Error('volatile Anthropic currentness boundary regressed');
if (requireRecord('bitcoin-futures-2026').ymyl !== true) throw new Error('trading YMYL routing failed');
if (requireRecord('security-sandboxing').reviewStatus !== 'SECURITY_SAFETY_REVIEW_REQUIRED') throw new Error('security review routing failed');
if (requireRecord('monetization-matrix-4x3').reviewStatus !== 'COMMERCIAL_PRODUCT_STATE_REVIEW_REQUIRED') throw new Error('monetization current-product boundary regressed');
if (requireRecord('fleet-coordinator-drift-monitoring').reviewStatus !== 'INFRASTRUCTURE_IMPLEMENTATION_REVIEW_REQUIRED') throw new Error('fleet infrastructure boundary regressed');

const overrideConfig = JSON.parse(await readFile(join(root, 'src/data/public-review-overrides.json'), 'utf8'));
const overrideRecords = overrideConfig.records || {};
const redundantOverrides = Object.entries(overrideRecords).filter(([, review]) => review?.status === 'REDUNDANT_REVISION_PAIR');
if (redundantOverrides.length !== 4) throw new Error(`unexpected redundant revision-route count: ${redundantOverrides.length}`);
const canonicalGroups = new Map();
for (const [slug, review] of redundantOverrides) {
  if (!review.pair || !overrideRecords[review.pair]) throw new Error(`revision pair peer missing: ${slug}`);
  const peer = overrideRecords[review.pair];
  if (peer.status !== 'REDUNDANT_REVISION_PAIR' || peer.pair !== slug) throw new Error(`revision pair is not reciprocal: ${slug}`);
  if (!review.canonicalGroup || peer.canonicalGroup !== review.canonicalGroup) throw new Error(`canonical group mismatch: ${slug}`);
  if (review.canonicalDecision !== 'PENDING_CLAIM_LEVEL_REVIEW' || peer.canonicalDecision !== review.canonicalDecision) throw new Error(`canonical decision boundary invalid: ${slug}`);
  if (review.canonicalSlug != null || peer.canonicalSlug != null) throw new Error(`pending revision pair asserted canonical winner: ${slug}`);
  if (!review.canonicalRole || !peer.canonicalRole || review.canonicalRole === peer.canonicalRole) throw new Error(`canonical review roles invalid: ${slug}`);
  if (requireRecord(slug).pair !== review.pair) throw new Error(`generated index pair binding mismatch: ${slug}`);
  const members = canonicalGroups.get(review.canonicalGroup) || new Set();
  members.add(slug);
  canonicalGroups.set(review.canonicalGroup, members);
}
if (canonicalGroups.size !== 2) throw new Error(`canonical revision-group count mismatch: ${canonicalGroups.size}`);
for (const [group, members] of canonicalGroups) {
  if (members.size !== 2) throw new Error(`canonical revision group must contain exactly two routes: ${group}`);
}

const publicApi = JSON.parse(await readFile(join(dist, 'api/public-guides.json'), 'utf8'));
if (publicApi.schema !== 'crypto-guides.public-api.v1') throw new Error('public API schema mismatch');
if (publicApi.exposure !== 'REVIEWED_METADATA_ONLY') throw new Error('public API exposure boundary missing');
if (publicApi.canonicalization !== 'REVISION_PAIRS_EXPLICIT_PENDING_NO_WINNER') throw new Error('public API canonicalization boundary missing');
if (!Array.isArray(publicApi.records) || publicApi.records.length !== index.uniqueGuides || publicApi.count !== index.uniqueGuides) throw new Error('public API count mismatch');
const forbiddenApiKeys = new Set(['params','rpc_endpoints','contracts','constants','safety_guards','rpcEndpoints','operationalConfig']);
let apiRevisionRoutes = 0;
for (const record of publicApi.records) {
  for (const key of Object.keys(record)) {
    if (forbiddenApiKeys.has(key)) throw new Error(`public API leaked legacy operational field ${key} on ${record.slug || '<unknown>'}`);
  }
  if (!record.reviewStatus || !record.currentness || typeof record.ymyl !== 'boolean') throw new Error(`public API review metadata missing: ${record.slug}`);
  if (record.reviewStatus === 'REDUNDANT_REVISION_PAIR') {
    apiRevisionRoutes += 1;
    if (!record.canonicalGroup || record.canonicalDecision !== 'PENDING_CLAIM_LEVEL_REVIEW' || !record.canonicalRole) throw new Error(`public API revision canonical metadata missing: ${record.slug}`);
    if (record.canonicalSlug !== null) throw new Error(`public API pending revision asserted canonical winner: ${record.slug}`);
  }
}
if (apiRevisionRoutes !== redundantOverrides.length) throw new Error(`public API revision-route count mismatch: ${apiRevisionRoutes}`);
const apiRaw = await readFile(join(dist, 'api/public-guides.json'), 'utf8');
for (const forbiddenToken of ['rpc_endpoints','BITEVO_API_KEY','34.70.171.152','185.231.154.149','144.124.250.14']) {
  if (apiRaw.includes(forbiddenToken)) throw new Error(`public metadata API leaked forbidden operational token: ${forbiddenToken}`);
}

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
if (!llms.includes('https://cryptoguidessite.vercel.app/api/public-guides.json')) throw new Error('llms canonical reviewed API missing');
if (!llms.includes('legacy /api/guides endpoint')) throw new Error('llms legacy API migration boundary missing');
if (!llms.includes('not the canonical machine-ingestion authority')) throw new Error('llms canonical API authority statement missing');

const guidesHtml = await readFile(join(dist, 'guides/index.html'), 'utf8');
if (!guidesHtml.includes('RESTORED_CORPUS_UNDER_REVIEW')) throw new Error('/guides review boundary missing');
if (!guidesHtml.includes('/guides-index.json')) throw new Error('/guides source binding missing');

console.log(`CANONICAL_DECISION_GATE=PASS groups=${canonicalGroups.size} routes=${redundantOverrides.length} decision=PENDING_CLAIM_LEVEL_REVIEW winners=0 api_revision_routes=${apiRevisionRoutes}`);
console.log(`PUBLIC_CONTRACT_GATE=PASS guides=${index.uniqueGuides} sha=${version.sha} explicit=${routing.explicitOverrides} rule_routed=${routing.ruleRouted} unreviewed=${routing.restoredUnreviewed} public_api=${publicApi.count} exposure=${publicApi.exposure} canonicalization=${publicApi.canonicalization} canonical_machine_api=/api/public-guides.json legacy_api=/api/guides required_artifacts=${required.length}`);
