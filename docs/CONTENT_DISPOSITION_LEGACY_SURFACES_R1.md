# Crypto Guides — Legacy Surface Disposition R1

Status: SOURCE REVIEW / NO PRODUCTION EFFECT

Scope: three restored public routes whose present repository metadata already marks them as historical, volatile, or conflicting with current product/runtime authority.

Reviewed routes:

- `ai-agent-reliability-audit`
- `monetization-matrix-4x3`
- `fleet-coordinator-drift-monitoring`

This disposition is intentionally narrower than a full claim-by-claim fact check. It records what the current repository authority supports today and prevents restored material from being mistaken for current commercial or runtime truth.

## Route: ai-agent-reliability-audit

Current source status: `LEGACY_COMMERCIAL_CONFLICT`.

Currentness: `HISTORICAL`.

Repository authority already states that this route predates the canonical BitEvo Agent Authority & Evidence Audit doctrine and must not be treated as the current commercial authority.

Disposition:

- retain as historical research/provenance only;
- do not treat its product name, offer framing, scope, timing, price, proof posture, customer claims, or conversion language as current BitEvo commercial authority unless separately rebound to current BitEvo evidence;
- do not infer that historical publication equals an active offer, current capability, certification, customer result, or production-wide security claim;
- current commercial authority must come from the separately governed BitEvo product surface, not this restored guide.

Decision: `HISTORICAL_COMMERCIAL_SURFACE / NON_CANONICAL_PRODUCT_AUTHORITY`.

## Route: monetization-matrix-4x3

Current source status: `COMMERCIAL_PRODUCT_STATE_REVIEW_REQUIRED`.

Currentness: `REVERIFY_REQUIRED`.

Repository authority says the article contains time-sensitive product, pricing, guide-count and go-to-market state claims.

Disposition:

- retain as historical business-strategy research;
- product names, prices, guide counts, conversion assumptions, funnel state, package composition, customer proof and go-to-market timing require fresh product evidence before being presented as current;
- historical scenario planning must not be converted into present availability or revenue claims merely because the route remains public;
- any future current-product reuse requires a new source/effect receipt rather than inheriting truth from the restored article.

Decision: `HISTORICAL_COMMERCIAL_STRATEGY / REVERIFY_BEFORE_CURRENT_USE`.

## Route: fleet-coordinator-drift-monitoring

Current source status: `INFRASTRUCTURE_IMPLEMENTATION_REVIEW_REQUIRED`.

Currentness: `HISTORICAL_REVERIFY_REQUIRED`.

Repository authority says this historical fleet-coordination specification exposes infrastructure-era host identities, addresses, scheduler/API assumptions and implementation parameters.

### Exact public-source exposure confirmed 2026-08-14

The restored route currently contains the following operational metadata in source-visible public copy:

- host aliases plus addresses:
  - `arena-vps` → `34.70.171.152`;
  - `win185` → `185.231.154.149`;
  - `fin35` → `35.217.10.153`;
  - `old144` → `144.124.250.14`;
- role/topology descriptions tying those hosts to named services and projects;
- internal endpoint metadata: `http://localhost:8080/journal/entries`;
- scheduler semantics: `fleet_coordinator.py`, Windows Task Scheduler task `Fleet-Coordinator`, every 15 minutes;
- internal output/state filenames including `unified_state.json`, `unified_state.js` and `fleet/unified_state.json`;
- internal registry/topology identifiers such as `fleet_registry.json` and `infrastructure.json`;
- the environment-variable name `BITEVO_API_KEY` and the statement that its presence enables submission to the BitEvo audit log.

No credential value, private key, bearer token or API-key secret was observed in this review. The presence of the environment-variable **name** is therefore not classified as a confirmed credential leak.

Decision class for the observed metadata: `PUBLIC_OPERATIONAL_METADATA_EXPOSURE / NO_CONFIRMED_SECRET_VALUE`.

### Risk interpretation

The material should not be treated as proof that any listed address, service, scheduler, API path or topology is still live or reachable. Historical publication does not establish current runtime state.

However, the fact that a value may be historical does not make it appropriate public documentation. Host identities, addresses, service-role mapping, scheduler names/cadence and internal state paths create unnecessary operational reconnaissance value and should be redacted from the public artifact unless there is an explicit present-day reason to expose them.

This source finding alone does **not** justify credential rotation, host shutdown, firewall mutation, DNS changes, scheduler changes or any other runtime action. Those would require a separate current infrastructure/security assessment and explicit authorization.

### Disposition

- retain the engineering concepts as historical research/provenance only;
- do not expose concrete host aliases/IP addresses or host-to-service mapping in the repaired public copy;
- remove or generalize scheduler task names/cadence, internal filenames/paths and internal endpoint details unless they are necessary to explain a generic concept;
- the environment-variable name may be omitted because it adds no educational value; if retained in historical source, it must not be interpreted as evidence that a corresponding credential exists or is valid;
- host names, addresses, ports, scheduler cadence, API paths, deployment topology, service state and implementation constants are not current runtime authority;
- no historical infrastructure value may be used as a current operational instruction without an independent fresh runtime/source/effect receipt;
- public presentation should distinguish generic drift-monitoring concepts from historical implementation details.

Decision: `HISTORICAL_INFRA_SPEC / PUBLIC_REDACTION_REQUIRED / NO_CURRENT_RUNTIME_AUTHORITY`.

### Future deterministic public-redaction gate

Do not add another public post-build rewrite while the already implemented `funding-convergence-r1` repair is still awaiting a real exact-head build execution.

When implementation resumes, the generated `fleet-coordinator-drift-monitoring` public HTML should fail verification if it contains any of these concrete operational identifiers:

- `34.70.171.152`;
- `185.231.154.149`;
- `35.217.10.153`;
- `144.124.250.14`;
- `arena-vps`;
- `win185`;
- `fin35`;
- `old144`;
- `Fleet-Coordinator`;
- `fleet_coordinator.py`;
- `BITEVO_API_KEY`;
- `http://localhost:8080/journal/entries`;
- `fleet/unified_state.json`.

The repaired public route may retain generic concepts such as fleet reconciliation, drift categories, fail-closed state handling and audit logging, but it must not present historical implementation metadata as a current operational map.

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
