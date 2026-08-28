# Crypto Guides — Post-R13 Content Truth Adjudication R1

Baseline: `631069c68c3563292b0c150de0d982991ca0b44d`
Branch: `agent/evidence-lifecycle-r1`
Adjudication as of: `2026-08-28`
Task class: SOURCE-ONLY / DRAFT-PR / FAIL-CLOSED

## Purpose

This document is a source-owned adjudication receipt for unresolved post-R13 content-truth work. It does **not** verify the underlying article claims and is not a substitute for claim-level primary evidence.

A route bound to this document must remain on HOLD until the required source review or source cleanup is completed. `primarySourceRequired=true` means the adjudication receipt records the unresolved state; it does not satisfy the missing primary-source requirement.

## Lifecycle contract

Every built public guide record must expose:

- `evidenceState`
- `evidenceAsOf`
- `evidenceRefs`
- `latestVerdict`
- `primarySourceRequired`
- `reverifyAfter`

Default records remain fail-closed as `UNBOUND_REVIEW_REQUIRED` / `HOLD_NO_SOURCE_BINDING`. Existing claim/lineage review documents may produce `REVIEW_DOC_BOUND`, which is review-document binding only and never upgrades currentness by itself.

## Explicit post-R13 holds

### `analiz-fidov-likvidatsiy-kriptovalyut`

Verdict: `HOLD_DISPUTED_LIQUIDATION_FEED_CLAIMS`

The route remains blocked from current operational framing until exact public liquidation-feed paths, scope, aggregation behavior and relevant claim wording are rebound to primary sources.

### `rynochno-neytralnye-kriptostrategii-2026`

Verdict: `HOLD_LATER_REJECTION_OR_NON_PROMOTION_CONFLICT`

The route remains blocked from current-guidance promotion because later rejection/non-promotion evidence conflicts with current-looking framing. Historical material is preserved pending source reconciliation.

### `simulyatsiya-ispolneniya-kripto-strategiy`

Verdict: `HOLD_RESEARCH_CANDIDATE_NOT_IMPLEMENTATION_GUIDANCE`

Simulation/research material must not be presented as implementation guidance until execution assumptions and claim-level evidence are source-bound.

### `kriptotreyding-i-quant-issledovaniya`

Verdict: `HOLD_UNSUPPORTED_QUANT_EXECUTION_CLAIMS_SOURCE_REMOVAL_REQUIRED`

Unsupported quant/execution claims remain source-cleanup work. This adjudication does not assert that they have been removed or verified.

### `obzor-vsekh-torgovykh-strategiy`

Verdict: `HOLD_UNSUPPORTED_STRATEGY_CLAIMS_SOURCE_REMOVAL_REQUIRED`

Unsupported strategy claims remain source-cleanup work. Historical preservation does not imply current factual support.

## Boundaries

This adjudication does not:

- rewrite or remove article claims;
- resolve the five R1.74 post-R13 content-truth atomics;
- delete or redirect routes;
- alter canonical revision selection;
- authorize merge or production promotion;
- authorize manual Actions reruns, manual Vercel deployment, alias/DNS, runtime, trading, or capital effects.

## Acceptance condition

The lifecycle verifier must require all five routes to bind to this exact repository-local adjudication document with `evidenceAsOf=2026-08-28`, their exact HOLD verdict, and `primarySourceRequired=true`. Any silent upgrade to a current/verified state must fail the build.
