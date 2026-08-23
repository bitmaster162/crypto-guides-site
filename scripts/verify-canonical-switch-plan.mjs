import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const planPath = join(root, 'src/data/canonical-switch-plan.json');
const overridesPath = join(root, 'src/data/public-review-overrides.json');

const plan = JSON.parse(await readFile(planPath, 'utf8'));
const overrideConfig = JSON.parse(await readFile(overridesPath, 'utf8'));
const overrides = overrideConfig.records || {};

if (plan.schema !== 'crypto-guides.canonical-switch-plan.v1') throw new Error('canonical switch plan schema mismatch');
if (plan.state !== 'APPLIED_PREVIEW_ONLY') throw new Error(`canonical switch plan state invalid: ${plan.state}`);
if (plan.activation !== true) throw new Error('canonical switch source activation must be true on the preview branch');
if (plan.evidenceAuthority !== 'docs/CANONICAL_LINEAGE_DECISION_R1.md') throw new Error('canonical switch evidence authority mismatch');
await access(join(root, plan.evidenceAuthority));

if (plan.currentPublicSemantics?.canonicalization !== 'REVISION_PAIRS_CANONICAL_SELECTED_SUPERSEDED_PRESERVED') throw new Error('current canonicalization receipt mismatch');
if (plan.currentPublicSemantics?.decision !== 'EVIDENCE_REVIEWED_CANONICAL_SELECTED') throw new Error('current canonical decision receipt mismatch');
if (plan.currentPublicSemantics?.routePolicy !== 'PRESERVE_BOTH_NO_REDIRECT') throw new Error('current canonical route policy mismatch');
if (plan.currentPublicSemantics?.winnerCount !== 2 || plan.currentPublicSemantics?.supersededCount !== 2 || plan.currentPublicSemantics?.routeCount !== 4) throw new Error('current canonical counts mismatch');

if (plan.targetPublicSemantics?.canonicalization !== 'REVISION_PAIRS_CANONICAL_SELECTED_SUPERSEDED_PRESERVED') throw new Error('target canonicalization receipt mismatch');
if (plan.targetPublicSemantics?.decision !== 'EVIDENCE_REVIEWED_CANONICAL_SELECTED') throw new Error('target canonical decision receipt mismatch');
if (plan.targetPublicSemantics?.routePolicy !== 'PRESERVE_BOTH_NO_REDIRECT') throw new Error('canonical route-preservation policy mismatch');
if (plan.targetPublicSemantics?.winnerCount !== 2 || plan.targetPublicSemantics?.supersededCount !== 2) throw new Error('canonical target counts mismatch');

if (!Array.isArray(plan.groups) || plan.groups.length !== 2) throw new Error('canonical switch plan must contain exactly two groups');
const winners = new Set();
const superseded = new Set();
for (const group of plan.groups) {
  if (!group.canonicalGroup || !group.canonicalSlug || !group.supersededSlug) throw new Error(`canonical group identity incomplete: ${JSON.stringify(group)}`);
  if (group.canonicalSlug === group.supersededSlug) throw new Error(`canonical and superseded slug collide: ${group.canonicalGroup}`);
  if (group.canonicalRoleTarget !== 'CANONICAL') throw new Error(`canonical role target invalid: ${group.canonicalGroup}`);
  if (group.supersededRoleTarget !== 'SUPERSEDED_HISTORICAL_REVISION') throw new Error(`superseded role target invalid: ${group.canonicalGroup}`);
  if (winners.has(group.canonicalSlug) || superseded.has(group.supersededSlug)) throw new Error(`duplicate canonical-plan slug: ${group.canonicalGroup}`);
  winners.add(group.canonicalSlug);
  superseded.add(group.supersededSlug);

  await access(join(root, group.claimReview));
  await access(join(root, group.lineageReview));

  const canonical = overrides[group.canonicalSlug];
  const historical = overrides[group.supersededSlug];
  if (!canonical || !historical) throw new Error(`canonical plan references missing override: ${group.canonicalGroup}`);
  for (const [slug, record, expectedRole] of [
    [group.canonicalSlug, canonical, group.canonicalRoleTarget],
    [group.supersededSlug, historical, group.supersededRoleTarget]
  ]) {
    if (record.status !== 'REDUNDANT_REVISION_PAIR') throw new Error(`canonical switch route status changed unexpectedly: ${slug}`);
    if (record.canonicalDecision !== 'EVIDENCE_REVIEWED_CANONICAL_SELECTED') throw new Error(`canonical switch route decision invalid: ${slug}`);
    if (record.canonicalSlug !== group.canonicalSlug) throw new Error(`canonical winner binding mismatch: ${slug}`);
    if (record.canonicalRole !== expectedRole) throw new Error(`canonical role application mismatch: ${slug}`);
    if (record.canonicalGroup !== group.canonicalGroup) throw new Error(`canonical group mismatch: ${slug}`);
    if (record.claimReview !== group.claimReview) throw new Error(`claim-review binding mismatch: ${slug}`);
    if (record.lineageReview !== group.lineageReview) throw new Error(`lineage-review binding mismatch: ${slug}`);
    if (record.canonicalDecisionReadiness !== 'APPLIED_PREVIEW_ONLY') throw new Error(`canonical readiness receipt mismatch: ${slug}`);
  }
  if (canonical.pair !== group.supersededSlug || historical.pair !== group.canonicalSlug) throw new Error(`canonical plan pair is not reciprocal: ${group.canonicalGroup}`);
}

for (const file of plan.coordinatedFiles || []) await access(join(root, file));
if (!Array.isArray(plan.coordinatedFiles) || plan.coordinatedFiles.length !== 6) throw new Error('coordinated file-set receipt mismatch');
if (!Array.isArray(plan.validationRequirements) || plan.validationRequirements.length < 8) throw new Error('canonical validation requirements incomplete');

const governance = plan.governance || {};
if (governance.deleteRoutes !== false || governance.redirectRoutes !== false) throw new Error('canonical plan must preserve routes before separate authorization');
if (governance.mergeAuthorized !== false || governance.productionPromotionAuthorized !== false) throw new Error('canonical plan must not authorize merge or production promotion');
if (governance.billingMutationAuthorized !== false || governance.runtimeMutationAuthorized !== false) throw new Error('canonical plan must not authorize billing/runtime mutation');
if (governance.can_trade !== false || governance.capital_permission !== 'DENY') throw new Error('capital boundary mismatch');

console.log(`CANONICAL_SWITCH_PLAN_GATE=PASS state=${plan.state} activation=${plan.activation} groups=${plan.groups.length} winners=${winners.size} superseded=${superseded.size} route_policy=${plan.targetPublicSemantics.routePolicy}`);
