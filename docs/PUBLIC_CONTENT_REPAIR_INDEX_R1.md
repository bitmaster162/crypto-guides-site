# Crypto Guides — Public Content Repair Index R1

Date: 2026-08-15
State: PREVIEW_BRANCH_ONLY

This registry tracks source-controlled public-artifact repairs and their evidence ladder. A repair may narrow or replace unsafe restored public copy, but it must not silently upgrade review status, currentness, trading authorization, runtime state or production state.

## Latest executed repair proof before this change

Exact head `d96ab05be91a1b6b4a0dc797fc56d64f2aa3cda3` received a real Vercel build and READY preview deployment `dpl_CsxiQEc8qNo1br3Y7pA5NtPuvzRK`.

That build executed and passed:
- 166 pages / 162 guide routes;
- `DISCOVERY_GENERATION=PASS`;
- `REVIEW_STATUS_GATE=PASS ... restored_unreviewed=0`;
- `PUBLIC_API_GENERATION=PASS ... winners=2 superseded=2`;
- `PUBLIC_GUIDE_REPAIR_APPLY_SUMMARY=PASS repairs=4`;
- route-specific apply PASS for funding convergence, liquidation cascades and both BTC-futures routes;
- `DIRECT_GUIDE_SANITIZER_APPLY=PASS routes=162 memir_removed=158 params_removed=158 repaired_zero_target=4`;
- canonical, direct-guide-boundary and public-contract gates;
- route-specific `PUBLIC_GUIDE_REPAIR_GATE=PASS` for all four repairs;
- `PUBLIC_GUIDE_REPAIR_GATE_SUMMARY=PASS repairs=4`;
- `DIRECT_GUIDE_SANITIZER_GATE=PASS routes=162 preserved=162 repaired_routes=4 forbidden_surface_hits=0 structural_holds=0`.

The exact deployment reached `READY`. Direct page-body readback remains SSO-protected, so generated HTML correctness is claimed from the executed deterministic build verifier, not from an external body fetch.

The immediately preceding BTC implementation head `1cb0a3b338676b90a59518d966cd2073b522f456` produced a real code failure after all four repairs applied: the direct-guide sanitizer still consumed the older two-repair registry and misclassified the newly repaired BTC routes as ordinary routes. Commit `d96ab05...` fixed the root cause by introducing one aggregate public-repair registry used by both repair and sanitizer stages.

## BUILD-validated active repairs

### funding-convergence-arbitrage
- Repair ID: `funding-convergence-r1`
- Evidence: `docs/CONTENT_REPAIR_FUNDING_CONVERGENCE_R1.md`
- Exact-head BUILD proof: PASS on `d96ab05...`
- Review/currentness remain: `YMYL_TRADING_REVIEW_REQUIRED` / `HISTORICAL_REVERIFY_REQUIRED`

### liquidation-cascades-arbitrage
- Repair ID: `liquidation-cascades-r1`
- Evidence: `docs/CONTENT_REPAIR_LIQUIDATION_CASCADES_EVIDENCE_R1.md`
- Exact-head BUILD proof: PASS on `d96ab05...`
- Review/currentness remain: `YMYL_TRADING_REVIEW_REQUIRED` / `HISTORICAL_REVERIFY_REQUIRED`
- Current feed boundary: Binance public `forceOrder` WebSocket streams are distinct from user-account `GET /fapi/v1/forceOrders`; current Bybit full topic is `allLiquidation.{symbol}`.

### bitcoin-futures-2026
- Repair ID: `bitcoin-futures-2026-r1`
- Evidence: `docs/CONTENT_REPAIR_BTC_FUTURES_EVIDENCE_R1.md`
- Exact-head BUILD proof: PASS on `d96ab05...` / `dpl_CsxiQEc8qNo1br3Y7pA5NtPuvzRK`
- Main boundary: venue/product-specific funding and margin mechanics only; unsupported performance, generic leverage and universal current-venue assertions removed from current authority.

### btc-futures-trading-strategies
- Repair ID: `btc-futures-trading-strategies-r1`
- Evidence: `docs/CONTENT_REPAIR_BTC_FUTURES_EVIDENCE_R1.md`
- Exact-head BUILD proof: PASS on `d96ab05...` / `dpl_CsxiQEc8qNo1br3Y7pA5NtPuvzRK`
- Main boundary: reproducible strategy methodology separated from generic return tables, fixed leverage/fee settings, stale venue lists and static legal/tax claims.

## Newly active source repair — exact-head BUILD pending

### risk-freymvork-dlya-kripto-botov
- Repair ID: `risk-framework-crypto-bots-r1`
- State: `BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS`
- Evidence: `docs/CONTENT_REPAIR_RISK_FRAMEWORK_EVIDENCE_R1.md`
- Main boundary: preserve CDaR, covariance shrinkage, markout/realized-spread, contested VPIN research and low-latency engineering concepts while removing universal DD/latency/re-entry/fleet-size thresholds, pseudo-institutional-standard language and unproven production implementation claims.
- Review/currentness remain: `YMYL_TRADING_REVIEW_REQUIRED` / `HISTORICAL_REVERIFY_REQUIRED`
- Route retained; no redirect/delete; no runtime/trading effect.
- Exact-head BUILD proof: PENDING after this source change.

## Global direct-guide sanitizer

The aggregate-registry sanitizer is BUILD-validated on `d96ab05...`:
- all 162 restored routes preserved;
- historical MemIR summary surfaces removed where present;
- historical Executable Parameters / RPC / constants blocks removed where present;
- four repaired routes recognized as zero-target routes;
- shared truth boundaries retained;
- `forbidden_surface_hits=0` and `structural_holds=0`.

The new Risk Framework repair is now registered through the same aggregate registry and must receive a fresh exact-head execution before its sanitizer accounting can be called PASS.

## High-risk trading cluster receipt

Current disposition across the five originally prioritized routes:
- 4 routes BUILD-validated: funding convergence, liquidation cascades and both BTC-futures routes;
- 1 route applied in SOURCE with exact-head BUILD pending: risk framework;
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
