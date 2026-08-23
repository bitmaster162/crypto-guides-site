# Crypto Guides — Canonical Lineage Decision R1

Status: `DECISION_EVIDENCE_COMPLETE / CANONICAL_SWITCH_NOT_APPLIED`

Scope: the two restored duplicate/revision groups already under claim-level review.

Groups:

1. `trading-discipline-journal`
   - `trading-discipline-journal-mae-mfe`
   - `trading-discipline-journal-psychology`
2. `microstructure-delisting-data-integrity`
   - `microstructure-delisting-data-integrity-2026`
   - `microstructure-delisting-2026`

## New repository-lineage evidence

Historical commit:

`0065ebdd6b8bddf21fa5a55185091394b13f563d`

Commit message:

`Fix guide taxonomy: recategorize AI/Trading/Security/Infra + remove 2 duplicates (162->160)`

Its diff explicitly removed exactly these two restored entries:

- `microstructure-delisting-2026`
- `trading-discipline-journal-psychology`

The later production restore commit:

`2b19db447318a3ddf0c856889d91d0e566deafa7`

has message:

`Restore crypto guides to 07-07 state (abd7fff, 162 guides, pre-taxonomy/category changes)`

and its diff explicitly re-added those same two entries. Therefore their present existence in the restored 162-guide corpus is explained by a wholesale historical restore, not by evidence that the earlier duplicate-removal decision was independently reversed on claim quality.

## Claim-review alignment

### Trading discipline group

Existing claim review: `docs/CONTENT_CLAIM_REVIEW_TRADING_DISCIPLINE_R1.md`.

That review identifies:

- `trading-discipline-journal-mae-mfe` as the lower-overclaim candidate;
- `trading-discipline-journal-psychology` as the richer later revision but with stronger qualification burden, including the approximately-2x loss-aversion shorthand and internal safety-control labels.

Repository lineage independently removed the later `psychology` route during the prior duplicate cleanup.

### Microstructure/delisting group

Existing claim review: `docs/CONTENT_CLAIM_REVIEW_MICROSTRUCTURE_R1.md`.

That review requires exchange-confirmed facts to be separated from derived calibration and Delist-Risk Score heuristics. The historical duplicate-removal commit independently removed `microstructure-delisting-2026`, the restored entry whose metadata contains the stronger universal-looking `0.5` calibration and exact DRS threshold surface.

## Proposed canonical decision

Evidence now supports the following canonical winners:

- `trading-discipline-journal-mae-mfe` -> proposed `CANONICAL`
- `trading-discipline-journal-psychology` -> proposed `SUPERSEDED_HISTORICAL_REVISION`
- `microstructure-delisting-data-integrity-2026` -> proposed `CANONICAL`
- `microstructure-delisting-2026` -> proposed `SUPERSEDED_HISTORICAL_REVISION`

Basis:

`CLAIM-LEVEL LOWER-OVERCLAIM REVIEW + PRIOR REPOSITORY DUPLICATE-REMOVAL LINEAGE`

This is materially stronger than selecting a winner from date or metadata richness alone.

## Why the source switch is not applied in R1

The current public-contract verifier and metadata generator explicitly hard-gate:

- four routes with `REDUNDANT_REVISION_PAIR`;
- `canonicalDecision=PENDING_CLAIM_LEVEL_REVIEW`;
- `canonicalSlug=null`;
- top-level public API state `REVISION_PAIRS_EXPLICIT_PENDING_NO_WINNER`.

Changing only the override records would therefore create a knowingly inconsistent source/build contract. A correct canonical switch must update override data, generated public-API semantics, verifier expectations, library IA, and route presentation as one coordinated change.

Current GitHub Actions cannot execute workflow steps because of account billing/payment/spending-limit state, and Vercel is separately build-rate-limited. Therefore no exact-head build can currently prove such a coordinated switch.

Decision in this R1 receipt:

`CANONICAL_SELECTION_EVIDENCE = COMPLETE`

`CANONICAL_SOURCE_SWITCH = DEFERRED_UNTIL_COORDINATED_BUILD-VERIFIABLE_PATCH`

## Governance

- no guide deletion;
- no redirect or canonical URL mutation;
- no merge;
- no production promotion;
- no billing/plan mutation;
- no runtime/trading/capital effect;
- `can_trade=false`;
- `capital_permission=DENY`.
