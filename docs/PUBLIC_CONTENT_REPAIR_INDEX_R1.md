# Crypto Guides — Public Content Repair Index R1

Date: 2026-08-15
State: PREVIEW_BRANCH_ONLY

This registry tracks source-controlled public-artifact repairs and the evidence queue that precedes them. A repair may narrow or replace unsafe restored public copy, but it must not silently upgrade review status, currentness, trading authorization, runtime state or production state.

## Executed predecessor proof

Exact predecessor head `20ed5033aa7211a37e28665701646a65a8a9c278` received a real Vercel build and READY preview deployment `dpl_HuxJV3PbS9fVPeteFEbhA4nYYTN2`.

That build executed and passed:
- `PUBLIC_GUIDE_REPAIR_APPLY=PASS` for `funding-convergence-arbitrage`;
- `PUBLIC_GUIDE_REPAIR_GATE=PASS` for `funding-convergence-arbitrage`;
- `DIRECT_GUIDE_SANITIZER_APPLY=PASS routes=162 memir_removed=161 params_removed=161 repaired_zero_target=1`;
- `DIRECT_GUIDE_SANITIZER_GATE=PASS routes=162 preserved=162 repaired_routes=1 forbidden_surface_hits=0 structural_holds=0`;
- the canonical, discovery and public-contract gates.

Exact-deployment `/api/public-guides.json` also returned HTTP 200 with 162 records, 2 canonical winners and 2 preserved superseded revisions. Direct page-body readback remained blocked by Vercel SSO, so no external HTML-body PASS is inferred beyond the executed deterministic build verifier.

## Active source repairs

### funding-convergence-arbitrage

- Repair ID: `funding-convergence-r1`
- Repair state: `BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS`
- Source registry: `src/data/public-guide-repairs.mjs`
- Evidence: `docs/CONTENT_REPAIR_FUNDING_CONVERGENCE_R1.md`
- Build apply gate: `PUBLIC_GUIDE_REPAIR_APPLY`
- Build verification gate: `PUBLIC_GUIDE_REPAIR_GATE`
- Review status remains: `YMYL_TRADING_REVIEW_REQUIRED`
- Currentness remains: `HISTORICAL_REVERIFY_REQUIRED`
- Route retained: yes
- Redirect/delete: no
- Runtime/trading effect: none
- Exact predecessor full-build proof: **PASS on `20ed5033...` / `dpl_HuxJV3PbS9fVPeteFEbhA4nYYTN2`**

### liquidation-cascades-arbitrage

- Repair ID: `liquidation-cascades-r1`
- Repair state: `BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS`
- Source registry: `src/data/public-guide-repairs.mjs`
- Evidence: `docs/CONTENT_REPAIR_LIQUIDATION_CASCADES_EVIDENCE_R1.md`
- Main boundary: distinguish public Binance `forceOrder` WebSocket streams from user-account `GET /fapi/v1/forceOrders`; use current Bybit `allLiquidation.{symbol}` semantics; remove stale/deprecated feed framing, zero-risk language, deterministic OI-bottom/squeeze claims and internal thresholds.
- Review status remains: `YMYL_TRADING_REVIEW_REQUIRED`
- Currentness remains: `HISTORICAL_REVERIFY_REQUIRED`
- Route retained: yes
- Redirect/delete: no
- Runtime/trading effect: none
- Exact-head full-build proof for this newly added repair: **PENDING**

The liquidation repair must not be called BUILD PASS until a new exact-head executor emits both apply and verification receipts for `liquidation-cascades-r1`.

## Global direct-guide sanitizer

The global generated-HTML sanitizer is BUILD-validated on predecessor exact head `20ed5033...`:
- 162 restored routes preserved;
- historical MemIR summary surfaces removed where present;
- historical Executable Parameters / RPC / constants blocks removed where present;
- `forbidden_surface_hits=0`;
- structural holds `0`;
- shared truth boundary preserved by deterministic verification.

This is public-artifact sanitation only. It does not alter the provenance source into a runtime authority and does not prove currentness of the underlying historical guide claims.

## Evidence-ready queue — public repair not yet applied

### bitcoin-futures-2026

- State: `EVIDENCE_READY_PUBLIC_REPAIR_NOT_APPLIED`
- Evidence: `docs/CONTENT_REPAIR_BTC_FUTURES_EVIDENCE_R1.md`
- Main boundary: remove unsupported performance claims and universal funding/leverage/venue-state assertions; preserve only current source-scoped mechanics and dated historical facts.
- Implementation waits for exact-head proof of the liquidation repair: yes

### btc-futures-trading-strategies

- State: `EVIDENCE_READY_PUBLIC_REPAIR_NOT_APPLIED`
- Evidence: `docs/CONTENT_REPAIR_BTC_FUTURES_EVIDENCE_R1.md`
- Main boundary: remove generic annual-return tables, unscoped fees/leverage, stale current-venue lists and static legal/tax claims without dedicated official-source review.
- Implementation waits for exact-head proof of the liquidation repair: yes

### risk-freymvork-dlya-kripto-botov

- State: `EVIDENCE_READY_PUBLIC_REPAIR_NOT_APPLIED`
- Evidence: `docs/CONTENT_REPAIR_RISK_FRAMEWORK_EVIDENCE_R1.md`
- Main boundary: keep research concepts but remove universal DD/latency/re-entry thresholds, pseudo-institutional-standard language and implied production implementation without evidence.
- Implementation waits for exact-head proof of the liquidation repair: yes

## High-risk trading cluster receipt

The five routes previously identified for claim-level trading-risk review now have the following disposition:

- 1 route: bounded public repair BUILD-validated (`funding-convergence-arbitrage`);
- 1 route: bounded public repair applied in SOURCE, exact-head BUILD pending (`liquidation-cascades-arbitrage`);
- 3 routes: repair evidence ready, public repair deliberately not applied;
- 0 routes: promoted to `CURRENT_VERIFIED`;
- 0 routes: authorized for live trading/runtime use;
- 0 routes: deleted or redirected.

## Invariants

1. The restored monolithic source remains provenance and is not silently rewritten by the public repair layer.
2. Generated public HTML for an active repair must not expose targeted legacy executable-looking parameters, stale RPC/API configuration or overclaims.
3. Each active repair must bind to a source-controlled evidence document and deterministic build verifier.
4. Evidence readiness is not implementation, implementation is not BUILD PASS, and BUILD PASS is not production promotion.
5. Repairing public copy is not equivalent to `CURRENT_VERIFIED`.
6. A failed external provisioning status is not a code-test failure when no build or test steps execute.
7. No repair authorizes orders, transfers, margin changes, deployment promotion or production mutation.
8. `can_trade=false` and `capital_permission=DENY` remain invariant.
