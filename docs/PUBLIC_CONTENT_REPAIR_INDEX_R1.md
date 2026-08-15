# Crypto Guides — Public Content Repair Index R1

Date: 2026-08-15
State: PREVIEW_BRANCH_ONLY

This registry tracks source-controlled public-artifact repairs and their evidence ladder. A repair may narrow or replace unsafe restored public copy, but it must not silently upgrade review status, currentness, trading authorization, vendor selection, runtime state or production state.

## Latest executed proof before this source change

Exact head `ce135b25eacc079ba708274c87225d7abb4befa7` received a real Vercel build and READY preview deployment `dpl_BT3nxij4RoG6uWRCpaKokoMHurzt`.

Executed proof includes:
- 166 pages / 162 guide routes;
- `DISCOVERY_GENERATION=PASS`;
- `REVIEW_STATUS_GATE=PASS ... restored_unreviewed=0`;
- `PUBLIC_API_GENERATION=PASS ... winners=2 superseded=2`;
- seven route-specific `PUBLIC_GUIDE_REPAIR_APPLY=PASS` receipts;
- `PUBLIC_GUIDE_REPAIR_APPLY_SUMMARY=PASS repairs=7`;
- `DIRECT_GUIDE_SANITIZER_APPLY=PASS routes=162 memir_removed=155 params_removed=155 repaired_zero_target=7`;
- canonical/public-contract gates PASS;
- seven route-specific `PUBLIC_GUIDE_REPAIR_GATE=PASS` receipts;
- `PUBLIC_GUIDE_REPAIR_GATE_SUMMARY=PASS repairs=7`;
- `DIRECT_GUIDE_SANITIZER_GATE=PASS routes=162 preserved=162 repaired_routes=7 forbidden_surface_hits=0 structural_holds=0`;
- deployment state `READY`.

GitHub Actions on the same SHA remained runner-provisioning blocked: run `31876127792`, job `94992006647`, `runner_id=0`, empty runner name and `steps=[]`. Therefore GitHub project code did not execute; Vercel is the exact-head executed build proof.

## BUILD-validated trading/YMYL cluster — 5/5

1. `funding-convergence-arbitrage` / `funding-convergence-r1`;
2. `liquidation-cascades-arbitrage` / `liquidation-cascades-r1`;
3. `bitcoin-futures-2026` / `bitcoin-futures-2026-r1`;
4. `btc-futures-trading-strategies` / `btc-futures-trading-strategies-r1`;
5. `risk-freymvork-dlya-kripto-botov` / `risk-framework-crypto-bots-r1`.

All remain `YMYL_TRADING_REVIEW_REQUIRED / HISTORICAL_REVERIFY_REQUIRED`. BUILD validation proves bounded public-copy contracts and generated-artifact sanitation, not current strategy truth or trading authorization.

## BUILD-validated Anthropic volatile vendor-state repairs — 2/2

### anthropic-models-and-upgrade
- Repair ID: `anthropic-models-vendor-state-r1`
- Evidence: `docs/CONTENT_REVIEW_ANTHROPIC_VENDOR_STATE_EVIDENCE_R1.md`
- Review/currentness: `VOLATILE_VENDOR_STATE / REVERIFY_REQUIRED`
- Exact-head BUILD proof: PASS on `ce135b25...` / `dpl_BT3nxij4RoG6uWRCpaKokoMHurzt`.

### fable-mythos-agents-2026
- Repair ID: `fable-mythos-vendor-state-r1`
- Evidence: `docs/CONTENT_REVIEW_ANTHROPIC_VENDOR_STATE_EVIDENCE_R1.md`
- Review/currentness: `VOLATILE_VENDOR_STATE / REVERIFY_REQUIRED`
- Exact-head BUILD proof: PASS on `ce135b25...` / `dpl_BT3nxij4RoG6uWRCpaKokoMHurzt`.

The repair converts suspension/restoration and model-lineup claims into dated vendor facts and does not turn a static pricing table into current billing authority.

## Newly active frontier cost-routing source repair — exact-head BUILD pending

### frontier-models-cost-routing
- Repair ID: `frontier-cost-routing-vendor-state-r1`
- Evidence: `docs/CONTENT_REVIEW_FRONTIER_COST_ROUTING_EVIDENCE_R1.md`
- Review/currentness remain: `VOLATILE_VENDOR_STATE / REVERIFY_REQUIRED`
- Main boundary: replace the restored static cross-vendor price/context/ranking matrix with a versioned provider-state + workload-evaluation routing contract.
- Current primary-source review found material drift in multiple restored rows across Google, xAI and DeepSeek, while even currently matching rows remain time-bound provider state.
- Exact model IDs, prices, aliases, context/output limits, lifecycle, provider availability and performance must be revalidated before operational use.
- No purchase, billing-limit increase, provider addition or production-routing authority.
- Exact-head BUILD proof: PENDING after this source change.

## Aggregate repair/sanitizer architecture

`src/data/public-guide-repair-registry.mjs` is the single aggregate registry consumed by public-repair and direct-guide-sanitizer apply/verify stages. After this source change it contains eight repairs: five YMYL trading repairs and three volatile vendor-state repairs.

Class-specific verification keeps trading non-execution/risk boundaries distinct from vendor-state dated/reverification boundaries.

## Invariants

1. Restored monolithic source remains provenance and is not silently promoted to current authority.
2. Generated public HTML for active repairs must not expose targeted legacy executable-looking parameters or unsupported overclaims.
3. Each repair binds to source-controlled evidence and deterministic verification.
4. Evidence readiness is not implementation; implementation is not BUILD PASS; BUILD PASS is not production promotion.
5. Repairing public copy is not equivalent to `CURRENT_VERIFIED` or current billing authority.
6. GitHub runner/provisioning failure with zero executed steps is not a code-test failure.
7. No repair authorizes orders, transfers, leverage/margin changes, vendor purchase, billing/plan change, provider addition, deployment promotion or production mutation.
8. `can_trade=false` and `capital_permission=DENY` remain invariant.
