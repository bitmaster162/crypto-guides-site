# Crypto Guides — Direct Guide Truth Boundary R2

Status: `SOURCE_COMPONENT_READY / INTEGRATION_BLOCKED / NO PUBLIC EFFECT CLAIM`

## Current source state

A shared read-only component now exists at:

`src/components/GuideTruthBoundary.astro`

It is designed only for `/guides/<slug>` routes. The component:

- renders a conservative static `RESTORED CONTENT · REVIEW REQUIRED` warning before historical article content;
- fetches `/guides-index.json` client-side and resolves the exact route slug;
- surfaces `reviewStatus` and `currentness` from the generated review index;
- exposes `YMYL REVIEW` and the stronger trading warning only when the generated record has `ymyl=true`;
- fails closed to `REVIEW_METADATA_UNAVAILABLE / CURRENTNESS_UNVERIFIED` if review metadata cannot be resolved;
- explicitly states that restored numeric thresholds, performance, leverage, funding/fees, API/venue state and execution claims are not runtime configuration, trading authority, universal parameters or guarantees;
- links back to `/guides`, the source-derived review browser.

The component does not execute trades, call exchanges, modify runtime state, publish orders, mutate capital permissions, or transform historical article records.

## Integration blocker

The intended shared-layout mount is exactly:

```astro
---
import GuideTruthBoundary from '../components/GuideTruthBoundary.astro';
---

<main>
  <GuideTruthBoundary />
  <slot />
</main>
```

A normal GitHub `update_file` attempt to apply this mount to `src/layouts/Layout.astro` was blocked by the OpenAI connector safety interlock. No lower-level Git tree/blob/ref workaround and no alternate equivalent integration path was attempted.

Therefore the current branch contains the component source but **does not yet mount it in the public layout**. Do not report the direct article boundary as deployed, built, rendered, or read back until the mount is applied through an allowed path and an exact-head preview is verified.

## Verification required after allowed integration

An acceptable successor must prove all of the following on one exact Git head:

1. `GuideTruthBoundary.astro` is imported and mounted by the shared layout.
2. `/guides` itself does not show a detail-page boundary.
3. A non-YMYL detail route shows exactly one conservative boundary and resolves review/currentness metadata.
4. A known YMYL route such as `/guides/bitcoin-futures-2026` shows exactly one boundary plus `YMYL REVIEW`.
5. A metadata resolution failure fails closed rather than silently hiding the warning.
6. No exchange/order/runtime/capital call is added.
7. Existing generated discovery, 162-guide routing, canonical-decision and public-contract gates still pass.

The stronger server/build-time requirement from `docs/PUBLIC_ARTICLE_TRUTH_BOUNDARY_R1.md` remains open: historical headings such as `Executable Parameters` and `Safety Guards` still require source/build requalification. The client-visible component does not claim to rewrite those strings in raw generated HTML.

## Governance

- no merge;
- no production promotion;
- no DNS/domain/canonical-origin mutation;
- no billing/plan mutation;
- no article deletion/redirect;
- no trading/runtime/capital effect;
- `can_trade=false`;
- `capital_permission=DENY`.
