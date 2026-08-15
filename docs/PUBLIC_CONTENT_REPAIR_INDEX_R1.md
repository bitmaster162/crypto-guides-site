# Crypto Guides — Public Content Repair Index R1

Date: 2026-08-15
State: PREVIEW_BRANCH_ONLY

This registry tracks source-controlled public-artifact repairs and their evidence ladder. A repair may narrow or replace unsafe restored public copy, but it must not silently upgrade review status, currentness, trading authorization, vendor selection, runtime state or production state.

## Latest executed proof before this source change

Exact head `9f24a8d3a7d0e455dc8557952ba5bc8da09f95ff` received a real Vercel build and READY preview deployment `dpl_D738ZEr3feCXW5EejYT9yARFcZ6H`.

Executed proof includes:
- 166 pages / 162 guide routes;
- `DISCOVERY_GENERATION=PASS`;
- `REVIEW_STATUS_GATE=PASS ... restored_unreviewed=0`;
- `PUBLIC_API_GENERATION=PASS ... winners=2 superseded=2`;
- eight route-specific `PUBLIC_GUIDE_REPAIR_APPLY=PASS` receipts;
- `PUBLIC_GUIDE_REPAIR_APPLY_SUMMARY=PASS repairs=8`;
- `DIRECT_GUIDE_SANITIZER_APPLY=PASS routes=162 memir_removed=154 params_removed=154 repaired_zero_target=8`;
- canonical/public-contract gates PASS;
- eight route-specific `PUBLIC_GUIDE_REPAIR_GATE=PASS` receipts;
- `PUBLIC_GUIDE_REPAIR_GATE_SUMMARY=PASS repairs=8`;
- `DIRECT_GUIDE_SANITIZER_GATE=PASS routes=162 preserved=162 repaired_routes=8 forbidden_surface_hits=0 structural_holds=0`;
- deployment state `READY`.

Exact-head GitHub Actions remained runner-provisioning blocked: run `31876395241`, job `94992667338`, `runner_id=0`, empty runner name and `steps=[]`. GitHub project code did not execute; Vercel is the exact-head executed build proof.

Exact deployment body/API readback remains protected by Vercel SSO, so no external READBACK PASS is inferred for `9f24a8d...`.

## BUILD-validated trading/YMYL cluster — 5/5

1. `funding-convergence-arbitrage` / `funding-convergence-r1`;
2. `liquidation-cascades-arbitrage` / `liquidation-cascades-r1`;
3. `bitcoin-futures-2026` / `bitcoin-futures-2026-r1`;
4. `btc-futures-trading-strategies` / `btc-futures-trading-strategies-r1`;
5. `risk-freymvork-dlya-kripto-botov` / `risk-framework-crypto-bots-r1`.

All remain `YMYL_TRADING_REVIEW_REQUIRED / HISTORICAL_REVERIFY_REQUIRED`.

## BUILD-validated volatile vendor-state cluster — 3/3

1. `anthropic-models-and-upgrade` / `anthropic-models-vendor-state-r1`;
2. `fable-mythos-agents-2026` / `fable-mythos-vendor-state-r1`;
3. `frontier-models-cost-routing` / `frontier-cost-routing-vendor-state-r1`.

All remain `VOLATILE_VENDOR_STATE / REVERIFY_REQUIRED`, `ymyl=false`.

The frontier cost-routing exact-head pass follows a real intermediate verifier failure at `7ce2d895c8a0676d1cd9c841c4bb8fba19730bc1`; `9f24a8d...` fixed the class-level vendor-state boundary while preserving route-specific markers.

## Newly active infrastructure public-redaction repair — exact-head BUILD pending

### fleet-coordinator-drift-monitoring
- Repair ID: `fleet-coordinator-public-redaction-r1`
- Evidence: `docs/CONTENT_DISPOSITION_LEGACY_SURFACES_R1.md`
- Review/currentness remain: `INFRASTRUCTURE_IMPLEMENTATION_REVIEW_REQUIRED / HISTORICAL_REVERIFY_REQUIRED`
- Source finding: historical public copy exposed host aliases/IP addresses, host-to-service mapping, scheduler/API assumptions, internal filenames/paths and an environment-variable name.
- Secret classification: `NO_CONFIRMED_SECRET_VALUE`; no credential/private-key/token value was observed.
- Public repair boundary: preserve generic reconciliation/drift/fail-closed/audit concepts while removing concrete operational topology from generated HTML.
- Exact boundary: `This historical infrastructure specification is not current runtime authority.`
- Route retained; no redirect/delete; no runtime/firewall/scheduler/credential effect.
- Exact-head BUILD proof: PENDING after this source change.

## Aggregate repair/sanitizer architecture

`src/data/public-guide-repair-registry.mjs` is the single aggregate registry consumed by public-repair and direct-guide-sanitizer apply/verify stages. After this source change it contains nine repairs:
- 5 trading/YMYL;
- 3 volatile vendor-state;
- 1 historical infrastructure public-redaction repair.

Class-specific verification keeps trading non-execution/risk boundaries, vendor-state dated/reverification boundaries and infrastructure no-current-runtime-authority boundaries distinct.

## Next inventory lane after exact-head proof

Read-only source inventory found additional classes requiring evidence before any repair:
- trading-performance/data-provenance claims around Sovereign Arena / 66k paper trades / raw infrastructure links;
- other generic trading guides with universal-looking risk/performance statements;
- historical infrastructure/automation descriptions that may make current implementation claims in article copy even though generated MemIR/parameter blocks are globally sanitized.

No next public rewrite should be stacked until the fleet repair receives exact-head execution.

## Invariants

1. Restored monolithic source remains provenance and is not silently promoted to current authority.
2. Generated public HTML for active repairs must not expose targeted legacy executable-looking parameters, operational topology or unsupported overclaims.
3. Each repair binds to source-controlled evidence and deterministic verification.
4. Evidence readiness is not implementation; implementation is not BUILD PASS; BUILD PASS is not production promotion.
5. Repairing public copy is not equivalent to `CURRENT_VERIFIED`, current billing authority or current runtime authority.
6. GitHub runner/provisioning failure with zero executed steps is not a code-test failure.
7. No repair authorizes orders, transfers, leverage/margin changes, vendor purchase, billing/plan change, provider addition, credential/runtime/firewall/scheduler mutation, deployment promotion or production mutation.
8. `can_trade=false` and `capital_permission=DENY` remain invariant.
