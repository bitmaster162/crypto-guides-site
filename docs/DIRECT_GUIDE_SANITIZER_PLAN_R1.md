# Crypto Guides — Direct Guide Sanitizer Plan R1

Status: DESIGN READY / SOURCE ONLY / IMPLEMENTATION DEFERRED UNTIL EXISTING FUNDING REPAIR EXECUTES

Date: 2026-08-14 (Asia/Bangkok)

## Purpose

Define one deterministic, global post-build sanitizer for restored direct guide pages so historical machine-oriented metadata is not presented as current executable authority.

This plan does **not** implement the sanitizer. The existing `funding-convergence-r1` public repair must first receive a real exact-head build execution so that a second post-build transform is not stacked on top of an unverified first transform.

## Problem boundary

The restored direct route template currently renders historical fields into human-visible HTML, including:

- `MemIR AI Agent Summary` from `agent_summary`;
- `Executable Parameters`;
- `Contracts`;
- `RPC Endpoints`;
- `Constants`;
- safety/control metadata.

The reviewed machine contract `/api/public-guides.json` deliberately excludes legacy operational fields. Direct guide HTML therefore has a renderer-driven authority split: reviewed API output is bounded while the direct page can still expose executable-looking historical metadata.

The sanitizer exists to close that presentation gap without deleting routes, rewriting the restored source corpus, upgrading review status, or claiming currentness.

## Scope

Target only generated restored direct-guide HTML:

```text
dist/guides/<slug>/index.html
```

Expected route universe is the same restored guide universe already governed by the discovery/review pipeline. The current known route count is 162, but the sanitizer must obtain the expected route set from generated/source-controlled discovery evidence rather than hard-code `162` forever.

Do not sanitize:

- `/guides/index.html` discovery/index page;
- `/api/public-guides.json`;
- `/guides-index.json`;
- `llms.txt` or other discovery artifacts;
- unrelated static pages;
- source corpus bytes in `src/pages/guides/[slug].astro`.

## Exact target surfaces

### Surface A — MemIR summary

Current template marker:

```html
<div class="memir-summary">
  <div class="summary-label">MemIR AI Agent Summary</div>
  ...
</div>
```

Disposition for restored public HTML:

`REMOVE_FROM_PUBLIC_DIRECT_PAGE`

Rationale: `agent_summary` frequently uses imperative machine-language such as Enforce/Orchestrate and can be mistaken for current runtime authority. The restored source remains preserved in Git provenance.

### Surface B — executable parameters

Current template marker:

```html
<div class="params-block">
  <h2>Executable Parameters</h2>
  ... Contracts ...
  ... RPC Endpoints ...
  ... Constants ...
  ... safety/control metadata ...
</div>
```

Disposition for restored public HTML:

`REMOVE_FROM_PUBLIC_DIRECT_PAGE`

Rationale: route-level historical constants, endpoint strings, host/config values and execution-looking controls must not inherit current operational authority from publication.

## Explicitly preserved surfaces

The sanitizer must preserve:

- the direct guide route and URL;
- `<article class="article-page">` and the human article body;
- page title/description and ordinary article metadata unless separately reviewed;
- the shared `GuideTruthBoundary` mounted by `Layout.astro` outside the route article slot;
- canonical/superseded review labels already proven by the direct-guide canonical gate;
- source-controlled public repair output, including `funding-convergence-r1`, when present;
- footer/navigation/layout structure;
- all discovery/API artifacts.

The sanitizer is **not** a content-currentness promotion. A route marked `YMYL_TRADING_REVIEW_REQUIRED`, `HISTORICAL_REVERIFY_REQUIRED`, `VOLATILE_VENDOR_STATE`, `INFRASTRUCTURE_IMPLEMENTATION_REVIEW_REQUIRED`, or another bounded status keeps that status.

## Transform order

When implementation is authorized by prior build evidence, use this order:

1. Astro/static site build;
2. discovery/review/public API generation as currently wired;
3. bounded route-specific public repairs such as `funding-convergence-r1`;
4. global direct-guide sanitizer;
5. public/canonical/direct-guide/sanitizer verification gates.

Reason for running the sanitizer after route-specific public repairs: a repaired article may intentionally replace the historical article surface. The global sanitizer should inspect final generated direct-page HTML and remove any remaining executable-looking restored metadata without reintroducing old source content.

## Fail-closed matching contract

Do not use a loose global text replacement.

For each expected restored direct-guide HTML file:

1. read the complete generated HTML;
2. identify `.memir-summary` by a bounded DOM/HTML block contract;
3. identify `.params-block` by a bounded DOM/HTML block contract;
4. remove only complete matched blocks;
5. write the file only after all required structural checks for that file pass;
6. if structural parsing/matching is ambiguous, fail the build rather than partially sanitize the page.

Implementation should prefer a deterministic parser or a carefully bounded balanced-element routine over regex that can cross arbitrary nested HTML.

### Match-count rule

The source template suggests one `memir-summary` and one `params-block` per ordinary restored direct guide, but **R1 does not elevate that inference to a universal route count before generated-output execution**.

Therefore first executable implementation must inventory actual pre-sanitize counts and fail closed on unexpected patterns.

Recommended first-run policy:

- ordinary restored page with exactly one of each target block → sanitize;
- already-repaired page with zero target blocks and an explicit recognized public-repair marker → allow zero/zero;
- zero target blocks without a recognized reason → HOLD;
- more than one target block of either class → HOLD;
- one target block but malformed/unclosed structure → HOLD;
- target marker outside the expected direct-guide article surface → HOLD.

Do not silently normalize a new page shape.

## Route-preservation contract

Before and after sanitization, bind the exact expected restored route set.

Required checks:

- every expected `/guides/<slug>/index.html` exists before sanitization;
- every expected route still exists afterward;
- no unexpected route is deleted;
- no redirect is introduced by the sanitizer;
- file count and route identity are preserved;
- canonical winner/superseded route pairs remain addressable.

A route-preservation failure is build-failing.

## Negative-content verification

After sanitization, scan final direct-guide HTML for the presentation markers that must no longer be public:

```text
MemIR AI Agent Summary
Executable Parameters
<h3>RPC Endpoints</h3>
<h3>Constants</h3>
```

For ordinary restored direct-guide pages, those markers must be absent.

Do not use broad forbidden tokens such as `RPC`, `constant`, `API`, or `endpoint` across article prose: legitimate educational content may discuss those concepts. The gate should target the renderer metadata surface, not censor article language.

## Operational-metadata sentinel checks

Use known exposure examples as regression sentinels without pretending they are an exhaustive secret scanner.

For `fleet-coordinator-drift-monitoring`, final generated public HTML must not expose historical values **through the removed metadata blocks**. The article body itself is separately governed by content disposition and may require a later bounded public-copy repair if operational strings remain in prose.

Important distinction:

- sanitizer closes the renderer-generated metadata surface;
- it does not claim to redact every operational string embedded in restored `content_ru`;
- separate route-level repair remains appropriate where article prose itself exposes infrastructure topology.

This prevents a false security claim.

## Required positive verification

The final direct page must still contain proof that the page was not accidentally gutted.

For every route, verify at least:

- `<article class="article-page` or an explicitly recognized repaired-article marker exists;
- title/article body remains non-empty;
- shared truth-boundary evidence remains present in the complete page output;
- route review/currentness semantics remain obtainable from the governed public metadata surfaces;
- canonical labels remain present where required by canonical-pair tests.

## Proposed implementation files

Implementation should remain small and separable, for example:

```text
scripts/apply-direct-guide-sanitizer.mjs
scripts/verify-direct-guide-sanitizer.mjs
```

Optional source-controlled registry/receipt:

```text
src/data/direct-guide-sanitizer-policy.json
```

Do not modify the 3.5 MB restored monolithic source merely to remove the generated metadata presentation unless a later source migration deliberately replaces that architecture.

## Proposed gate names

Apply receipt:

```text
DIRECT_GUIDE_SANITIZER_APPLY=PASS routes=<n> memir_removed=<n> params_removed=<n> repaired_zero_target=<n>
```

Verification receipt:

```text
DIRECT_GUIDE_SANITIZER_GATE=PASS routes=<n> preserved=<n> forbidden_surface_hits=0 structural_holds=0
```

These strings are **proposed names only** until implementation executes. Their presence in this design document is not PASS evidence.

## Build integration constraint

Do not add the sanitizer implementation while `PUBLIC_GUIDE_REPAIR_APPLY` / `PUBLIC_GUIDE_REPAIR_GATE` for `funding-convergence-r1` remain source-only and unexecuted.

Reason: if the next real build fails, one transform must be diagnosable at a time. Stacking an unverified global sanitizer now would destroy causal attribution between:

- route-specific article replacement;
- global metadata removal;
- later public verification failures.

## Interaction with dependency hardening

Do not combine sanitizer implementation and dependency/framework migration in the same causal test commit.

Preferred sequence:

1. get funding repair exact-head build evidence;
2. fix funding repair if needed;
3. implement and execute sanitizer;
4. then create a separately attributable dependency-hardening candidate;
5. only after infrastructure/security build evidence is understood, resume remaining content rewrites.

## Security claim ceiling

A successful sanitizer would prove only:

`RENDERER_EXECUTABLE_METADATA_SURFACE_REMOVED_FROM_FINAL_DIRECT_GUIDE_HTML`

It would **not** prove:

- complete secret absence across the restored corpus;
- infrastructure safety;
- credential validity or rotation;
- endpoint unreachability;
- correctness/currentness of all article prose;
- safe trading configuration;
- production deployment.

## Rollback / reversibility

The sanitizer is a generated-output transform. Source provenance remains unchanged, so rollback is source-controlled and deterministic:

- revert sanitizer scripts/wiring;
- rebuild from unchanged restored source;
- do not manually edit deployed HTML.

No route deletion, redirect, source-history rewrite or runtime mutation is required.

## Acceptance evidence for implementation phase

Before classifying the sanitizer implementation PASS, require all of:

1. exact Git SHA;
2. full executable build on that SHA;
3. Astro/static route generation complete;
4. existing discovery/review/public API/canonical gates complete;
5. route-specific public-repair gates complete;
6. `DIRECT_GUIDE_SANITIZER_APPLY=PASS` actually emitted;
7. `DIRECT_GUIDE_SANITIZER_GATE=PASS` actually emitted;
8. expected restored route set preserved;
9. exact deployment identity if deployed to preview;
10. public API readback and direct-page body readback where provider authentication permits it.

If provider authentication blocks direct page-body readback, report that as `READBACK_BLOCKED` rather than infer PASS from deployment state.

## Governance

- SOURCE plan only;
- sanitizer implementation not applied;
- no package/lockfile mutation;
- no merge;
- no production promotion;
- no manual deploy;
- no billing/plan change;
- no DNS/domain change;
- no credential/runtime/firewall/scheduler mutation;
- no trading/capital effect;
- `can_trade=false`;
- `capital_permission=DENY`.

Decision: `DIRECT_GUIDE_SANITIZER_DESIGN_READY / WAIT_FOR_SINGLE_TRANSFORM_BUILD_EVIDENCE`.
