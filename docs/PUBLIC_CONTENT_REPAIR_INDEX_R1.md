# Crypto Guides — Public Content Repair Index R1

Date: 2026-08-15
State: PREVIEW_BRANCH_ONLY

This registry tracks source-controlled public-artifact repairs and their evidence ladder. A repair may narrow or replace unsafe restored public copy, but it must not silently upgrade review status, currentness, trading authorization, vendor selection, runtime state or production state.

## Latest executed proof before this source change

Exact head `0e44dd076e6d2e53eddd2fd53709c5af114c9323` received a real Vercel build and READY preview deployment `dpl_5Wtju7DUTNKLV9945uHa761BaYLo`.

Executed proof:
- 166 pages / 162 guide routes;
- `DISCOVERY_GENERATION=PASS`;
- `REVIEW_STATUS_GATE=PASS ... restored_unreviewed=0`;
- `PUBLIC_API_GENERATION=PASS ... winners=2 superseded=2`;
- `PUBLIC_GUIDE_REPAIR_APPLY_SUMMARY=PASS repairs=5`;
- `DIRECT_GUIDE_SANITIZER_APPLY=PASS routes=162 memir_removed=157 params_removed=157 repaired_zero_target=5`;
- canonical/public-contract gates PASS;
- five route-specific `PUBLIC_GUIDE_REPAIR_GATE=PASS` receipts;
- `PUBLIC_GUIDE_REPAIR_GATE_SUMMARY=PASS repairs=5`;
- `DIRECT_GUIDE_SANITIZER_GATE=PASS routes=162 preserved=162 repaired_routes=5 forbidden_surface_hits=0 structural_holds=0`;
- Vercel deployment state `READY`.

Current exact-deployment API/body readback remains SSO-protected, so no external READBACK PASS is inferred from this deployment. The executed exact-head build gates are the artifact proof.

## BUILD-validated trading/YMYL cluster — 5/5

1. `funding-convergence-arbitrage` / `funding-convergence-r1`;
2. `liquidation-cascades-arbitrage` / `liquidation-cascades-r1`;
3. `bitcoin-futures-2026` / `bitcoin-futures-2026-r1`;
4. `btc-futures-trading-strategies` / `btc-futures-trading-strategies-r1`;
5. `risk-freymvork-dlya-kripto-botov` / `risk-framework-crypto-bots-r1`.

All five remain `YMYL_TRADING_REVIEW_REQUIRED / HISTORICAL_REVERIFY_REQUIRED`. BUILD validation proves the bounded public-copy contract and sanitizer, not current strategy truth or trading authorization.

## Newly active vendor-state source repairs — exact-head BUILD pending

### anthropic-models-and-upgrade
- Repair ID: `anthropic-models-vendor-state-r1`
- Evidence: `docs/CONTENT_REVIEW_ANTHROPIC_VENDOR_STATE_EVIDENCE_R1.md`
- Review/currentness remain: `VOLATILE_VENDOR_STATE / REVERIFY_REQUIRED`
- Main boundary: replace stale undated Fable/Mythos availability and permanent Opus-default framing with dated vendor facts; acknowledge the later Sonnet 5 release; do not publish static pricing as durable billing authority.

### fable-mythos-agents-2026
- Repair ID: `fable-mythos-vendor-state-r1`
- Evidence: `docs/CONTENT_REVIEW_ANTHROPIC_VENDOR_STATE_EVIDENCE_R1.md`
- Review/currentness remain: `VOLATILE_VENDOR_STATE / REVERIFY_REQUIRED`
- Main boundary: preserve the June suspension and July restoration as dated facts; distinguish shared underlying model from different safeguard/access profiles; keep trusted-access/provider state under revalidation.

Both vendor-state routes are retained with no redirect/delete and no model-selection, billing, runtime or production effect. Their exact-head BUILD proof is pending after this source change.

## Aggregate repair/sanitizer architecture

`src/data/public-guide-repair-registry.mjs` is the single aggregate registry consumed by:
- public repair apply;
- public repair verifier;
- direct-guide sanitizer apply;
- direct-guide sanitizer verifier.

This prevents a repaired route from being misclassified as an ordinary restored route in later sanitizer stages.

The repair verifier now enforces class-specific boundaries:
- trading repairs must preserve YMYL/non-execution/risk qualification;
- volatile vendor-state repairs must preserve dated vendor-state/reverification boundaries.

## Next vendor-state queue after exact-head proof

- `frontier-models-cost-routing` remains `VOLATILE_VENDOR_STATE / REVERIFY_REQUIRED` and has not yet received a bounded public rewrite.
- Exact current provider/model/pricing/routing facts must be sourced from primary vendor documentation before repair.

## Invariants

1. Restored monolithic source remains provenance and is not silently promoted to current authority.
2. Generated public HTML for active repairs must not expose targeted legacy executable-looking parameters or unsupported overclaims.
3. Each repair binds to source-controlled evidence and deterministic verification.
4. Evidence readiness is not implementation; implementation is not BUILD PASS; BUILD PASS is not production promotion.
5. Repairing public copy is not equivalent to `CURRENT_VERIFIED` or current vendor billing authority.
6. GitHub runner/provisioning failure with zero executed steps is not a code-test failure.
7. No repair authorizes orders, transfers, leverage/margin changes, vendor purchase, billing/plan change, deployment promotion or production mutation.
8. `can_trade=false` and `capital_permission=DENY` remain invariant.
