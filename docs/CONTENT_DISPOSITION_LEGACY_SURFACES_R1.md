# Crypto Guides — Legacy Surface Disposition R1

Status: SOURCE REVIEW / NO PRODUCTION EFFECT
Date updated: 2026-08-15

Scope: three restored public routes whose present repository metadata already marks them as historical, volatile, or conflicting with current product/runtime authority.

Reviewed routes:
- `ai-agent-reliability-audit`
- `monetization-matrix-4x3`
- `fleet-coordinator-drift-monitoring`

This disposition is intentionally narrower than a full claim-by-claim fact check. It records what the current repository authority supports and prevents restored material from being mistaken for current commercial or runtime truth.

## Route: ai-agent-reliability-audit

Current source status: `LEGACY_COMMERCIAL_CONFLICT`.
Currentness: `HISTORICAL`.

Repository authority states that this route predates the canonical BitEvo Agent Authority & Evidence Audit doctrine and must not be treated as current commercial authority.

Disposition:
- retain as historical research/provenance only;
- do not treat historical product name, offer framing, scope, timing, price, proof posture, customer claims, conversion language or publication as current BitEvo commercial authority;
- do not infer active offer, current capability, certification, customer result or production-wide security claim from this restored route;
- current commercial authority must come from the separately governed BitEvo product surface.

Decision: `HISTORICAL_COMMERCIAL_SURFACE / NON_CANONICAL_PRODUCT_AUTHORITY`.

## Route: monetization-matrix-4x3

Current source status: `COMMERCIAL_PRODUCT_STATE_REVIEW_REQUIRED`.
Currentness: `REVERIFY_REQUIRED`.

Repository authority says the article contains time-sensitive product, pricing, guide-count and go-to-market state claims.

Disposition:
- retain as historical business-strategy research;
- product names, prices, guide counts, conversion assumptions, funnel state, package composition, customer proof and go-to-market timing require fresh product evidence before being presented as current;
- historical scenario planning must not be converted into present availability or revenue claims because the route remains public;
- any future current-product reuse requires a new source/effect receipt rather than inherited truth from the restored article.

Decision: `HISTORICAL_COMMERCIAL_STRATEGY / REVERIFY_BEFORE_CURRENT_USE`.

## Route: fleet-coordinator-drift-monitoring

Current source status: `INFRASTRUCTURE_IMPLEMENTATION_REVIEW_REQUIRED`.
Currentness: `HISTORICAL_REVERIFY_REQUIRED`.

Repository authority says this historical fleet-coordination specification exposes infrastructure-era host identities, addresses, scheduler/API assumptions and implementation parameters.

### Exact public-source exposure confirmed 2026-08-14

The restored route contains operational metadata in source-visible copy, including:
- four historical host aliases and public IP addresses;
- host-to-service/project topology descriptions;
- internal localhost audit endpoint metadata;
- scheduler filename/task-name/cadence semantics;
- internal output/state filenames and registry/topology filenames;
- the environment-variable name `BITEVO_API_KEY` and a statement that its presence enables audit-log submission.

No credential value, private key, bearer token or API-key secret was observed. The environment-variable name is therefore **not** classified as a confirmed credential leak.

Decision class: `PUBLIC_OPERATIONAL_METADATA_EXPOSURE / NO_CONFIRMED_SECRET_VALUE`.

### Risk interpretation

The source does not prove that any historical address, service, scheduler, API path or topology is still live. Historical publication is not current runtime evidence.

However, historical status does not make concrete host identities, addresses, service-role mapping, scheduler details and internal state paths appropriate public documentation. They create unnecessary operational reconnaissance value and should be absent from the generated public artifact unless explicitly intended for public consumption.

This source finding does not authorize credential rotation, host shutdown, firewall mutation, DNS changes, scheduler changes or any other runtime action. Those require separate current infrastructure evidence and explicit authorization.

### Public-repair disposition

- retain generic fleet-reconciliation, drift-classification, fail-closed state handling and audit concepts;
- remove concrete host aliases/IPs and host-to-service mapping from generated public copy;
- remove/generalize scheduler names/cadence, internal filenames/paths, localhost endpoint details and credential-variable names;
- do not present historical topology or implementation details as current runtime authority;
- preserve the route and provenance source; no redirect/delete.

Decision: `HISTORICAL_INFRA_SPEC / PUBLIC_REDACTION_REQUIRED / NO_CURRENT_RUNTIME_AUTHORITY`.

### Deterministic public-redaction gate — activated in source 2026-08-15

The earlier precondition to wait for real exact-head execution of the funding/public-repair and global sanitizer layers has been satisfied by subsequent Vercel builds. Source repair `fleet-coordinator-public-redaction-r1` is therefore now registered on the draft branch.

The generated `fleet-coordinator-drift-monitoring` HTML must fail verification if it contains the previously identified concrete host/IP, scheduler, internal endpoint/path, registry filename or credential-variable identifiers. It must also include the explicit boundary:

`This historical infrastructure specification is not current runtime authority.`

Exact-head BUILD/DEPLOYMENT evidence for this newly activated fleet repair remains pending until an executor runs the new branch head.

## Shared truth contract

For all three routes:
1. publication != currentness;
2. source text != active offer/runtime state;
3. historical parameters != current configuration;
4. historical product copy != current commercial authority;
5. no customer/certification/runtime/deployment/effect claim is inherited from the restored route;
6. future promotion to current status requires explicit fresh source evidence and, where applicable, build/deployment/readback/effect receipts;
7. historical operational metadata may require public redaction even when it is not proven current;
8. exposure of an environment-variable name is not equivalent to exposure of the secret value.

## Governance

- no guide deletion;
- no redirect/canonical URL change;
- no merge;
- no production promotion;
- no DNS/domain change;
- no billing/plan mutation;
- no credential/runtime/scheduler mutation;
- no customer outreach or send;
- no trading/capital effect;
- `can_trade=false`;
- `capital_permission=DENY`.
