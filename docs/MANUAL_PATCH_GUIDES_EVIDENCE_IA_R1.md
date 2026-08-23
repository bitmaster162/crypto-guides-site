# Crypto Guides — Evidence-Aware Library IA R1

Status: `SOURCE SPEC / INDEX INTEGRATION BLOCKED / NO PUBLIC EFFECT CLAIM`

## Objective

The `/guides` index already exposes `reviewStatus`, `currentness` and `ymyl` from the generated route manifest. The reviewed metadata API `/api/public-guides.json` also carries stronger authority fields such as:

- `claimReview`
- `canonicalGroup`
- `canonicalDecision`
- `canonicalSlug`
- `canonicalRole`

Those stronger evidence/canonical fields are not currently surfaced in the library UI.

## Intended index behavior

The index should join two generated sources by exact slug:

1. `/guides-index.json` for route/title/date/tags and route existence;
2. `/api/public-guides.json` for review authority and claim/canonical metadata.

The join must fail closed if:

- either source fails to load;
- record counts differ;
- any route from the index lacks a matching reviewed-authority record.

Authority fields from `/api/public-guides.json` must override any duplicate review fields from the route index.

## Intended card semantics

For each guide card:

- always show `reviewStatus` and `currentness`;
- show `YMYL REVIEW` only when `ymyl=true`;
- show `CLAIM REVIEW BOUND` when `claimReview` is non-null;
- show `CANONICAL PENDING` when `canonicalDecision=PENDING_CLAIM_LEVEL_REVIEW`;
- do not display the presence of a claim-review document as `CURRENT_VERIFIED`, certification, profitability proof, safety proof or trading permission;
- copy should state that claim-level evidence binding does not by itself establish currentness.

Search should include review status, currentness, claim-review binding, canonical decision and canonical role in addition to title/slug/tags/public category.

## Intended authority join

```js
Promise.all([
  fetch('/guides-index.json', { cache: 'no-store' }).then((response) => {
    if (!response.ok) throw new Error(`guides-index ${response.status}`);
    return response.json();
  }),
  fetch('/api/public-guides.json', { cache: 'no-store' }).then((response) => {
    if (!response.ok) throw new Error(`public-guides ${response.status}`);
    return response.json();
  })
]).then(([indexPayload, reviewPayload]) => {
  const indexRecords = Array.isArray(indexPayload.records) ? indexPayload.records : [];
  const reviewRecords = Array.isArray(reviewPayload.records) ? reviewPayload.records : [];
  if (!indexRecords.length || indexRecords.length !== reviewRecords.length) {
    throw new Error(`authority/index count mismatch ${indexRecords.length}/${reviewRecords.length}`);
  }
  const reviewBySlug = new Map(reviewRecords.map((record) => [record.slug, record]));
  records = indexRecords.map((record) => {
    const authority = reviewBySlug.get(record.slug);
    if (!authority) throw new Error(`review authority missing for ${record.slug}`);
    return {
      ...record,
      reviewStatus: authority.reviewStatus,
      currentness: authority.currentness,
      ymyl: authority.ymyl === true,
      canonicalGroup: authority.canonicalGroup || null,
      canonicalDecision: authority.canonicalDecision || null,
      canonicalSlug: authority.canonicalSlug || null,
      canonicalRole: authority.canonicalRole || null,
      claimReview: authority.claimReview || null,
      reviewRule: authority.reviewRule || null
    };
  });
});
```

## Connector blocker

A normal `update_file` attempt to apply this evidence-aware IA directly to `src/pages/guides/index.astro` was blocked by the OpenAI connector safety interlock.

No low-level Git tree/blob/ref workaround and no alternate equivalent integration path was attempted.

Therefore `/guides` remains unchanged on the current source head and no visual/build/readback effect is claimed from this document.

## Post-integration verification

An acceptable successor must prove on one exact Git head that:

1. index count equals reviewed-authority count;
2. every index slug resolves to exactly one reviewed-authority record;
3. all five high-risk trading routes show `CLAIM REVIEW BOUND` plus `YMYL REVIEW` and remain `HISTORICAL_REVERIFY_REQUIRED`;
4. both revision-pair groups show `CANONICAL PENDING` and no canonical winner;
5. guides without claim-level evidence do not receive the claim-review badge;
6. search/filter behavior still works;
7. no runtime/order/exchange/capital call is introduced;
8. no production promotion occurs without separate approval.

## Governance

- no merge;
- no production promotion;
- no DNS/domain/canonical-origin change;
- no billing/plan change;
- no guide deletion/redirect;
- no runtime/trading/capital effect;
- `can_trade=false`;
- `capital_permission=DENY`.
