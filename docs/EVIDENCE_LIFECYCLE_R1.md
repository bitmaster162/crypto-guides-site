# Crypto Guides — Evidence Lifecycle R1

Baseline: `631069c68c3563292b0c150de0d982991ca0b44d`
Branch: `agent/evidence-lifecycle-r1`
Task class: SOURCE-ONLY / DRAFT-PR / FAIL-CLOSED

## Goal

Add a source-owned evidence lifecycle layer without changing article copy, deleting historical routes, or upgrading review/currentness judgments.

## Contract

Every built public guide record must carry:

- `evidenceState`
- `evidenceAsOf`
- `evidenceRefs`
- `latestVerdict`
- `primarySourceRequired`
- `reverifyAfter`

The default is fail-closed: `UNBOUND_REVIEW_REQUIRED` + `HOLD_NO_SOURCE_BINDING`.

Existing claim/lineage review documents may produce `REVIEW_DOC_BOUND`, but that state explicitly means review-document binding only and **does not upgrade currentness**.

## Post-R13 explicit holds

The following routes are source-bound to explicit lifecycle holds while their underlying claim/source work remains unresolved:

- `analiz-fidov-likvidatsiy-kriptovalyut`
- `rynochno-neytralnye-kriptostrategii-2026`
- `simulyatsiya-ispolneniya-kripto-strategiy`
- `kriptotreyding-i-quant-issledovaniya`
- `obzor-vsekh-torgovykh-strategiy`

Their `evidenceRefs` remain empty until actual claim-level evidence is source-bound. This is intentional: the lifecycle layer must record the unresolved state without fabricating provenance.

## Non-effects

This patch does not:

- rewrite or remove article claims;
- resolve the five post-R13 content-truth atomics;
- delete or redirect routes;
- change canonical revision selections;
- change DNS, aliases, runtime, trading, or capital permissions;
- authorize merge or production promotion.

## Acceptance gate

`npm run build` must prove lifecycle coverage for the full restored corpus and fail closed if any record is missing lifecycle fields, if manifest/API lifecycle metadata diverges, if evidence refs point outside repository docs, or if any explicit post-R13 hold is silently upgraded.
