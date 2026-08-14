import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const manifestPath = join(dist, 'guides-index.json');
const overridePath = join(root, 'src/data/public-review-overrides.json');
const outDir = join(dist, 'api');
const outPath = join(outDir, 'public-guides.json');

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const overrideConfig = JSON.parse(await readFile(overridePath, 'utf8'));
const overrides = overrideConfig.records || {};
if (!Array.isArray(manifest.records) || manifest.records.length < 100) {
  throw new Error('Reviewed guide manifest missing or unexpectedly small');
}

const records = manifest.records.map((record) => {
  const canonical = overrides[record.slug] || {};
  return {
    slug: record.slug,
    title: record.title,
    category: record.category || 'Unclassified',
    date: record.date || null,
    reviewStatus: record.reviewStatus,
    currentness: record.currentness,
    ymyl: record.ymyl === true,
    pair: record.pair || null,
    canonicalGroup: canonical.canonicalGroup || null,
    canonicalDecision: canonical.canonicalDecision || null,
    canonicalSlug: canonical.canonicalSlug || null,
    canonicalRole: canonical.canonicalRole || null,
    claimReview: canonical.claimReview || null,
    lineageReview: canonical.lineageReview || null,
    canonicalDecisionReadiness: canonical.canonicalDecisionReadiness || null,
    reviewRule: record.reviewRule || null
  };
});

const revisionRecords = [];
const revisionGroups = new Map();
for (const record of records) {
  if (!record.slug || !record.title || !record.reviewStatus || !record.currentness) {
    throw new Error(`Unsafe/incomplete public API record: ${JSON.stringify(record)}`);
  }
  if (record.reviewStatus === 'REDUNDANT_REVISION_PAIR') {
    revisionRecords.push(record);
    if (!record.canonicalGroup || record.canonicalDecision !== 'EVIDENCE_REVIEWED_CANONICAL_SELECTED' || !record.canonicalRole) {
      throw new Error(`Revision pair canonical selection boundary missing: ${record.slug}`);
    }
    if (!record.canonicalSlug) throw new Error(`Selected revision pair missing canonical winner: ${record.slug}`);
    if (!['CANONICAL', 'SUPERSEDED_HISTORICAL_REVISION'].includes(record.canonicalRole)) {
      throw new Error(`Revision pair canonical role invalid: ${record.slug}`);
    }
    if (!record.claimReview || !record.claimReview.startsWith('docs/CONTENT_CLAIM_REVIEW_')) {
      throw new Error(`Revision pair claim-review evidence binding missing: ${record.slug}`);
    }
    if (!record.lineageReview || record.lineageReview !== 'docs/CANONICAL_LINEAGE_DECISION_R1.md') {
      throw new Error(`Revision pair lineage-review evidence binding missing: ${record.slug}`);
    }
    if (record.canonicalDecisionReadiness !== 'COORDINATED_SOURCE_SWITCH_APPLIED') {
      throw new Error(`Revision pair source-switch receipt missing: ${record.slug}`);
    }
    const members = revisionGroups.get(record.canonicalGroup) || [];
    members.push(record);
    revisionGroups.set(record.canonicalGroup, members);
  }
}

if (revisionRecords.length !== 4 || revisionGroups.size !== 2) {
  throw new Error(`Unexpected revision selection census: routes=${revisionRecords.length} groups=${revisionGroups.size}`);
}
let winnerCount = 0;
let supersededCount = 0;
for (const [group, members] of revisionGroups) {
  if (members.length !== 2) throw new Error(`Revision group must contain two routes: ${group}`);
  const winners = members.filter((record) => record.canonicalRole === 'CANONICAL');
  const superseded = members.filter((record) => record.canonicalRole === 'SUPERSEDED_HISTORICAL_REVISION');
  if (winners.length !== 1 || superseded.length !== 1) throw new Error(`Revision group role census invalid: ${group}`);
  if (members.some((record) => record.canonicalSlug !== winners[0].slug)) throw new Error(`Revision group winner binding mismatch: ${group}`);
  if (winners[0].pair !== superseded[0].slug || superseded[0].pair !== winners[0].slug) throw new Error(`Revision group pair is not reciprocal: ${group}`);
  winnerCount += 1;
  supersededCount += 1;
}

const payload = {
  schema: 'crypto-guides.public-api.v1',
  status: 'RESTORED_CORPUS_UNDER_REVIEW',
  exposure: 'REVIEWED_METADATA_ONLY',
  canonicalization: 'REVISION_PAIRS_CANONICAL_SELECTED_SUPERSEDED_PRESERVED',
  evidenceBinding: 'REVISION_PAIRS_SOURCE_BOUND_TO_CLAIM_AND_LINEAGE_REVIEW_DOCS',
  generatedFrom: 'guides-index.json after review routing + source review overrides for canonical-decision, claim-review and lineage-review metadata',
  warning: 'This endpoint intentionally excludes legacy executable-looking params, RPC endpoints, contracts, safety constants and operational configuration. Historical publication does not imply currentness. Canonical selection only identifies the preferred revision inside two evidence-reviewed duplicate pairs; it does not certify every claim as current. Superseded historical routes remain addressable for provenance.',
  canonicalWinners: winnerCount,
  supersededHistoricalRevisions: supersededCount,
  count: records.length,
  records
};

await mkdir(outDir, { recursive: true });
await writeFile(outPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`PUBLIC_API_GENERATION=PASS records=${records.length} exposure=${payload.exposure} canonicalization=${payload.canonicalization} evidence_binding=${payload.evidenceBinding} winners=${winnerCount} superseded=${supersededCount}`);
