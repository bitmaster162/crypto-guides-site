# Crypto Guides — Public Content Repair Index R1

Date: 2026-08-14
State: PREVIEW_BRANCH_ONLY

This registry tracks source-controlled public-artifact repairs applied after the restored Astro corpus is built. A repair may narrow or replace unsafe restored public copy, but it must not silently upgrade review status, currentness, trading authorization, runtime state or production state.

## Active repairs

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

## Invariants

1. The restored monolithic source remains provenance and is not silently rewritten by the public repair layer.
2. The generated public HTML must not expose legacy executable-looking parameters or stale RPC configuration for a repaired route.
3. Each repair must bind to a source-controlled evidence document and deterministic build verifier.
4. Repairing public copy is not equivalent to `CURRENT_VERIFIED`.
5. No repair authorizes orders, transfers, margin changes, deployment promotion or production mutation.
