# Crypto Guides — Public Content Repair Index R1

Date: 2026-08-14
State: PREVIEW_BRANCH_ONLY

This registry tracks source-controlled public-artifact repairs and the evidence queue that precedes them. A repair may narrow or replace unsafe restored public copy, but it must not silently upgrade review status, currentness, trading authorization, runtime state or production state.

## Active source repair

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
- Exact-head full-build proof for this repair: **PENDING / BLOCKED BY VERCEL BUILD-RATE LIMIT**

The source repair exists, but neither its apply gate nor its verifier may be reported as PASS until a full build actually executes on an exact head containing the repair.

## Evidence-ready queue — public repair not yet applied

### liquidation-cascades-arbitrage

- State: `EVIDENCE_READY_PUBLIC_REPAIR_NOT_APPLIED`
- Evidence: `docs/CONTENT_REPAIR_LIQUIDATION_CASCADES_EVIDENCE_R1.md`
- Main boundary: distinguish public liquidation WebSocket streams from user-account force-order REST data; remove stale/deprecated feed semantics, zero-risk language and deterministic OI-bottom claims.
- Implementation blocked on prior repair build proof: yes

### bitcoin-futures-2026

- State: `EVIDENCE_READY_PUBLIC_REPAIR_NOT_APPLIED`
- Evidence: `docs/CONTENT_REPAIR_BTC_FUTURES_EVIDENCE_R1.md`
- Main boundary: remove unsupported performance claims and universal funding/leverage/venue-state assertions; preserve only current source-scoped mechanics and dated historical facts.
- Implementation blocked on prior repair build proof: yes

### btc-futures-trading-strategies

- State: `EVIDENCE_READY_PUBLIC_REPAIR_NOT_APPLIED`
- Evidence: `docs/CONTENT_REPAIR_BTC_FUTURES_EVIDENCE_R1.md`
- Main boundary: remove generic annual-return tables, unscoped fees/leverage, stale current-venue lists and static legal/tax claims without dedicated official-source review.
- Implementation blocked on prior repair build proof: yes

### risk-freymvork-dlya-kripto-botov

- State: `EVIDENCE_READY_PUBLIC_REPAIR_NOT_APPLIED`
- Evidence: `docs/CONTENT_REPAIR_RISK_FRAMEWORK_EVIDENCE_R1.md`
- Main boundary: keep research concepts but remove universal DD/latency/re-entry thresholds, pseudo-institutional-standard language and implied production implementation without evidence.
- Implementation blocked on prior repair build proof: yes

## High-risk trading cluster receipt

The five routes previously identified for claim-level trading-risk review now have the following disposition:

- 1 route: bounded public repair exists in source, full-build validation pending;
- 4 routes: repair evidence ready, public repair deliberately not applied;
- 0 routes: promoted to `CURRENT_VERIFIED`;
- 0 routes: authorized for live trading/runtime use;
- 0 routes: deleted or redirected.

## Invariants

1. The restored monolithic source remains provenance and is not silently rewritten by the public repair layer.
2. Generated public HTML for an active repair must not expose the targeted legacy executable-looking parameters, stale RPC configuration or overclaims.
3. Each active repair must bind to a source-controlled evidence document and deterministic build verifier.
4. Evidence readiness is not implementation, and implementation is not BUILD PASS.
5. Repairing public copy is not equivalent to `CURRENT_VERIFIED`.
6. A failed external provisioning/build-capacity status is not a code-test failure when no build or test steps execute.
7. No repair authorizes orders, transfers, margin changes, deployment promotion or production mutation.
8. `can_trade=false` and `capital_permission=DENY` remain invariant.
