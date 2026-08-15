# Crypto Guides — Public Content Repair Index R1

Date: 2026-08-15
State: PREVIEW_BRANCH_ONLY

This registry tracks source-controlled public-artifact repairs and their evidence ladder. A repair may narrow or replace unsafe restored public copy, but it must not silently upgrade review status, currentness, trading authorization, runtime state or production state.

## Latest executed repair proof before this change

Exact head `fc0ec41940a660017ea35ce74506acf9802e2ecb` received a real Vercel build and READY preview deployment `dpl_J3V8J7y56qgFZMQM4etjJr7AAoqS`.

That build executed and passed:
- `PUBLIC_GUIDE_REPAIR_APPLY=PASS` for funding convergence and liquidation cascades;
- `PUBLIC_GUIDE_REPAIR_GATE=PASS` for both routes;
- `PUBLIC_GUIDE_REPAIR_GATE_SUMMARY=PASS repairs=2`;
- `DIRECT_GUIDE_SANITIZER_APPLY=PASS routes=162 ... repaired_zero_target=2`;
- `DIRECT_GUIDE_SANITIZER_GATE=PASS routes=162 preserved=162 repaired_routes=2 forbidden_surface_hits=0 structural_holds=0`;
- canonical, discovery and public-contract gates.

The exact deployment reached `READY`. Direct page-body readback remains SSO-protected, so generated HTML correctness is claimed from the executed deterministic build verifier, not from an external body fetch.

## BUILD-validated active repairs

### funding-convergence-arbitrage
- Repair ID: `funding-convergence-r1`
- State: `BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS`
- Evidence: `docs/CONTENT_REPAIR_FUNDING_CONVERGENCE_R1.md`
- Exact-head BUILD proof: PASS on `fc0ec419...` as inherited/re-executed proof
- Review/currentness remain: `YMYL_TRADING_REVIEW_REQUIRED` / `HISTORICAL_REVERIFY_REQUIRED`

### liquidation-cascades-arbitrage
- Repair ID: `liquidation-cascades-r1`
- State: `BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS`
- Evidence: `docs/CONTENT_REPAIR_LIQUIDATION_CASCADES_EVIDENCE_R1.md`
- Exact-head BUILD proof: PASS on `fc0ec419...` / `dpl_J3V8J7y56qgFZMQM4etjJr7AAoqS`
- Review/currentness remain: `YMYL_TRADING_REVIEW_REQUIRED` / `HISTORICAL_REVERIFY_REQUIRED`
- Current feed boundary: Binance public `forceOrder` WebSocket streams are distinct from user-account `GET /fapi/v1/forceOrders`; current Bybit full topic is `allLiquidation.{symbol}`.

## Newly active source repairs — exact-head BUILD pending

### bitcoin-futures-2026
- Repair ID: `bitcoin-futures-2026-r1`
- Evidence: `docs/CONTENT_REPAIR_BTC_FUTURES_EVIDENCE_R1.md`
- Main boundary: venue/product-specific funding and margin mechanics only; remove unsupported performance, generic leverage and universal current venue assertions.
- Review/currentness remain: `YMYL_TRADING_REVIEW_REQUIRED` / `HISTORICAL_REVERIFY_REQUIRED`
- Route retained; no redirect/delete; no runtime/trading effect.

### btc-futures-trading-strategies
- Repair ID: `btc-futures-trading-strategies-r1`
- Evidence: `docs/CONTENT_REPAIR_BTC_FUTURES_EVIDENCE_R1.md`
- Main boundary: separate reproducible strategy methodology from generic return tables, fixed leverage/fee settings, stale venue lists and static legal/tax claims.
- Review/currentness remain: `YMYL_TRADING_REVIEW_REQUIRED` / `HISTORICAL_REVERIFY_REQUIRED`
- Route retained; no redirect/delete; no runtime/trading effect.

Neither BTC-futures repair may be reported BUILD PASS until a fresh exact-head build emits route-specific `PUBLIC_GUIDE_REPAIR_APPLY` and `PUBLIC_GUIDE_REPAIR_GATE` receipts.

## Global direct-guide sanitizer

The global generated-HTML sanitizer is BUILD-validated:
- all 162 restored routes preserved;
- historical MemIR summary surfaces removed where present;
- historical Executable Parameters / RPC / constants blocks removed where present;
- shared truth boundaries retained;
- `forbidden_surface_hits=0` and `structural_holds=0` on the latest executed predecessor.

This is public-artifact sanitation only, not an upgrade of historical claims to current truth.

## Evidence-ready queue — public repair not yet applied

### risk-freymvork-dlya-kripto-botov
- State: `EVIDENCE_READY_PUBLIC_REPAIR_NOT_APPLIED`
- Evidence: `docs/CONTENT_REPAIR_RISK_FRAMEWORK_EVIDENCE_R1.md`
- Main boundary: keep research concepts but remove universal DD/latency/re-entry thresholds, pseudo-institutional-standard language and implied production implementation without evidence.
- Implementation waits for exact-head proof of both BTC-futures repairs: yes

## High-risk trading cluster receipt

Current disposition across the five originally prioritized routes:
- 2 routes BUILD-validated: funding convergence, liquidation cascades;
- 2 routes applied in SOURCE with exact-head BUILD pending: BTC futures pair;
- 1 route evidence-ready only: risk framework;
- 0 routes promoted to `CURRENT_VERIFIED`;
- 0 routes authorized for live trading/runtime use;
- 0 routes deleted or redirected.

## Invariants

1. Restored monolithic source remains provenance and is not silently promoted to current authority.
2. Generated public HTML for an active repair must not expose targeted legacy executable-looking parameters, stale API/RPC configuration or unsupported overclaims.
3. Each repair binds to source-controlled evidence and deterministic verification.
4. Evidence readiness is not implementation; implementation is not BUILD PASS; BUILD PASS is not production promotion.
5. Repairing public copy is not equivalent to `CURRENT_VERIFIED`.
6. GitHub runner/provisioning failure with zero executed steps is not a code-test failure.
7. No repair authorizes orders, transfers, leverage/margin changes, deployment promotion or production mutation.
8. `can_trade=false` and `capital_permission=DENY` remain invariant.
