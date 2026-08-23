# Crypto Guides — Direct Guide Executable Surface Audit R1

Date: 2026-08-14
State: `SOURCE_AUDIT / REMEDIATION_PENDING_BUILD_CAPACITY`
Scope: direct public `/guides/<slug>` renderer for the restored corpus

## Finding

The reviewed machine-ingestion surface `/api/public-guides.json` intentionally excludes legacy executable-looking fields such as RPC endpoints, contracts and operational configuration. However, the direct guide template currently renders a separate historical metadata surface inside every guide page.

The template emits:

- `MemIR AI Agent Summary` from `agent_summary`;
- `Executable Parameters`;
- `Contracts` from `contracts`;
- `RPC Endpoints` from `rpc_endpoints`;
- `Constants` from `constants`;
- safety/control metadata from `safety_guards`.

This creates an authority split:

- reviewed public API: bounded metadata only;
- direct HTML page: restored agent summary plus executable-looking legacy metadata.

The existence of a page-level review banner does not fully neutralize this split because machines, search crawlers and readers may still ingest the concrete parameter block as current/actionable data.

Decision: `DIRECT_PUBLIC_EXECUTABLE_SURFACE_CONFLICT`.

## Concrete confirmed example

Route: `fleet-coordinator-drift-monitoring`.

The restored record includes operational metadata such as:

- host aliases and IP addresses;
- host-to-service/project mapping;
- internal endpoint metadata;
- scheduler cadence and task/script names;
- internal state filenames and registry identifiers;
- environment-variable name `BITEVO_API_KEY`.

Exact exposure and disposition are recorded in `docs/CONTENT_DISPOSITION_LEGACY_SURFACES_R1.md`.

No secret value was confirmed in that review. The issue is unnecessary public operational metadata and authority ambiguity, not a proven credential-value leak.

## Why the problem is systemic

The exposure is renderer-driven rather than route-specific. The direct-page template always contains the `MemIR AI Agent Summary` and `Executable Parameters` UI and maps record fields directly into the generated page.

Therefore one-at-a-time redaction of individual IP addresses or constants would leave the architectural defect intact.

The same renderer can expose:

- stale venue/API endpoints;
- trading thresholds and leverage/risk constants;
- historical infrastructure topology;
- internal implementation parameters;
- action-oriented agent summaries that read like operational instructions;
- vendor/product state that has not been currentness-reviewed.

## Public authority contract

For restored public guides, the following hierarchy should hold:

1. `guides-index.json` carries source-derived review/currentness/YMYL routing.
2. `/api/public-guides.json` is the canonical reviewed machine-ingestion metadata surface.
3. Direct guide pages may show article content plus visible review boundaries, but must not reintroduce a parallel executable metadata API through page markup.
4. Historical source data may remain in Git for provenance without being rendered as current public operational configuration.

## Required remediation

A global direct-page sanitizer should be implemented before adding more route-specific public repair machinery.

Target behavior for all restored `/guides/<slug>` pages:

- remove the complete `.params-block` / `Executable Parameters` section from generated public HTML;
- remove the `.memir-summary` block from generated public HTML unless a separately reviewed public-summary contract is created later;
- preserve the article body, route, title and `GuideTruthBoundary`;
- preserve canonical/superseded provenance labels;
- preserve sitemap and route addressability;
- do not delete source records from the restored corpus;
- do not convert removed operational metadata into another public JSON endpoint.

This is a public-artifact boundary change, not a claim that the historical source was false or that any listed runtime remains active.

## Deterministic gate requirements

The future global sanitizer gate should enumerate every built direct guide route and fail if any generated page contains:

- `<div class="params-block"` or the equivalent scoped/rendered class marker;
- the heading `Executable Parameters`;
- `<div class="memir-summary"` or the equivalent scoped/rendered class marker;
- the label `MemIR AI Agent Summary`.

The gate should also require on every direct route:

- the direct-guide truth boundary;
- source-derived review/currentness metadata availability;
- preserved route count;
- no accidental removal of canonical/superseded direct-route labels.

A second denylist layer should fail on known operational identifiers that have already been observed in restored public material, including the fleet host/IP/task/path set documented in `CONTENT_DISPOSITION_LEGACY_SURFACES_R1.md`.

## Order of operations

Current implementation order is intentionally constrained:

1. Obtain a real executed exact-head full-build proof for the already implemented `funding-convergence-r1` public repair.
2. Fix any defect exposed by that build before stacking more transformations.
3. Implement and execute the global direct-page sanitizer.
4. Verify all restored routes remain addressable and retain review boundaries.
5. Only then resume the four evidence-ready high-risk trading copy repairs.

This order prevents multiple unverified post-build transformations from accumulating while Vercel build capacity is unavailable.

## Evidence-state boundary

At the time of this audit:

- the systemic renderer finding is source-verified;
- the global sanitizer is **not implemented**;
- no BUILD PASS is claimed for it;
- no deployment/readback is claimed for it;
- production is unchanged.

## Governance

- no guide deletion;
- no redirect;
- no merge;
- no production promotion;
- no DNS/domain mutation;
- no billing/plan mutation;
- no credential rotation;
- no runtime/firewall/scheduler mutation;
- no trading/capital effect;
- `can_trade=false`;
- `capital_permission=DENY`.
