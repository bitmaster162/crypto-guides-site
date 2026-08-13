# Crypto Guides — content truth migration V1

Baseline: `2b19db447318a3ddf0c856889d91d0e566deafa7`
Branch: `feat/v2-content-truth-quality`
Task class: PREVIEW-ONLY SOURCE NORMALIZATION

## Goal

Turn the restored 162-guide generation into a source-controlled, evidence-aware public library without deleting historical material or projecting synthetic/protocol data as current operational truth.

## Non-negotiable boundaries

- no direct `main` writes;
- no production promotion from this branch;
- no DNS/domain changes;
- no trading/capital effects;
- no publication of credentials/private infrastructure;
- no historical page deletion until exact duplicate/canonical analysis is complete;
- no stale AI Audit page treated as the canonical BitEvo commercial offer.

## Current source problems

1. Guide content is duplicated across the root index, a ~3.5 MB dynamic guide route, a large `/api/guides` source and two competing `llms.txt` implementations.
2. The restored generation is explicitly pre-taxonomy; AI, infrastructure, research and other material leaks into a generic `Trading` category.
3. `/guides` is advertised as an index but currently does not exist.
4. `robots.txt` advertises a sitemap endpoint that currently 404s.
5. Machine-readable API records do not reliably distinguish editorial guides from protocol/spec/synthetic artifacts.
6. The old AI-Agent Reliability Audit guide conflicts with the current canonical BitEvo authority/evidence audit doctrine and commercial boundary.
7. Shared chrome contains legacy infrastructure-era links rather than registry-bound public surfaces.
8. There is no exact public build receipt or BitEvo-style quality contract.

## Target content contract

Canonical records will classify content as one of:

- `GUIDE`
- `RESEARCH`
- `DATASET`
- `PROTOCOL_SPEC`
- `SYNTHETIC_EXAMPLE`
- `HISTORICAL_ARTIFACT`
- `PRODUCT_REFERENCE`

Each canonical record should eventually expose:

- stable id and slug;
- type;
- locale;
- subject taxonomy;
- title and summary;
- provenance/source references;
- reviewed date;
- currentness/evidence class;
- YMYL flag;
- current/historical status;
- canonical locale pair where applicable;
- machine-readable exposure policy.

## Migration order

### P0 — make public discovery truthful

1. Add a real `/guides` index route.
2. Generate/fix sitemap and align `robots.txt` with the real artifact.
3. Remove the duplicate `llms.txt` source-of-truth collision and generate crawler metadata from one reviewed dataset.
4. Add a machine-readable boundary that clearly labels synthetic/non-operational records.
5. Supersede the stale AI Audit commercial authority without destroying historical provenance.

### P1 — normalize source architecture

1. Extract content from the monolithic route source into canonical content/data records.
2. Generate human pages, API output, llms and sitemap from the same records.
3. Add exact build metadata and `/version` receipt.
4. Add quality gates for broken links, metadata, content typing, YMYL, synthetic markers and build identity.

### P2 — product/IA/i18n

1. Rebuild taxonomy from verified topic clusters.
2. Exact-hash and semantic duplicate clustering before redirects/archive decisions.
3. Curate current high-quality core vs historical archive.
4. Add reciprocal RU/EN routes to retained canonical content instead of bulk-translating unreconciled history.
5. Integrate public surfaces through the verified BitEvo Universe registry.

## First acceptance gate

Before any production consideration, the branch preview must prove at minimum:

- source baseline exact;
- `/` and canonical guide pages still build;
- `/guides` exists;
- crawler index and sitemap point only to real routes;
- no synthetic identifier is exposed as verified live infrastructure;
- stale commercial audit content is not the current offer authority;
- no legacy raw-infrastructure navigation is required for primary UX;
- source/build revision is inspectable;
- no regression in failure-inclusive Sovereign Arena dataset framing.

Production remains unchanged until a later exact-head review and explicit promotion approval.
