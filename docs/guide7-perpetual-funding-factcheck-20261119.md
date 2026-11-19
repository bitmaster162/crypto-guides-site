# Guide 7 — perpetual funding and liquidation risk: source and claim review

Task: L03/T05; date: 2026-11-19 (Asia/Bangkok); implementation status: **DRAFT REVIEW**, not production.

## Selection and scope

T05 says “next guide under L03” without a numbered-topic decision. After published Grid guide #6, editorially selected a **new** follow-on on perpetual funding, margin and liquidation risk, rather than copying the historical funding-convergence article. Topic selection is a documented editorial assumption for draft review, not an owner-approved release decision. The site is a source-preserving research library, not trading authority.

- RU: `/guides/perpetual-funding-and-liquidation-risk`
- EN: `/en/guides/perpetual-funding-and-liquidation-risk`
- Reviewed: 2026-11-19; recheck by 2027-02-19.
- No capital/trading permissions, no merge and no production deployment within T05.

## Sources and verified claim boundaries

1. Bybit V5 funding history (rechecked 2026-11-19):
   https://bybit-exchange.github.io/docs/v5/market/history-fund-rate
   Supports historical funding records, timestamps, and varying symbol intervals. **Does not** validate a strategy or current rate for a particular instrument.
2. Bybit V5 instruments info (rechecked 2026-11-19):
   https://bybit-exchange.github.io/docs/v5/market/instrument
   `fundingInterval` is in minutes and is instrument metadata. **Does not** establish a universal schedule.
3. Coinbase US perpetual-style futures overview (rechecked 2026-11-19):
   https://help.coinbase.com/en/coinbase/derivatives/us-perpetual-futures-overview
   Product-specific sign convention: positive rate, longs pay shorts; negative, shorts pay longs; hourly rate calculation applies to this scoped product. **Material nuance from primary source:** the US overview describes perpetual-*style* futures with a five-year expiry; it must not be presented as proof of an expiry-free contract. **Do not** generalize its settlement behavior.
4. Coinbase US perpetual-style settlement mechanics (rechecked 2026-11-19):
   https://help.coinbase.com/en/derivatives/perpetual-style-futures/settlement-and-other-mechanics
   Product-specific account settlement and realized/unrealized PnL mechanics; rate sign changes over time. This separate page says its contract has **no expiration**, unlike the five-year US overview above. The exact relationship of the two contract specifications is not established by the pages; the guide explicitly warns readers not to merge these two claims. **Not** a risk-free yield.
5. Bybit V5 Position Info (rechecked 2026-11-19):
   https://bybit-exchange.github.io/docs/v5/position
   `liqPrice` is estimated under cross-margin and can be blank under portfolio margin; the mode matters. **Not** proof of a universal safe leverage threshold.
6. Bybit margin-calculation update (published 2026-06-18, rechecked 2026-11-19):
   https://www.bybit.com/en/help-center/article/Understanding-the-Adjustment-and-Impact-of-the-New-Margin-Calculation
   Mark-price-linked margin calculations under defined modes; implementation/terms are venue- and version-specific.

Historical internal context: `docs/CONTENT_REPAIR_FUNDING_CONVERGENCE_R1.md` (2026-08-14) rejects universal eight-hour funding, magic funding/margin/delta thresholds and zero-risk claims. It is **not** current instrument data or live trading evidence.

## Illustrated arithmetic — explicitly an assumption, not measured PnL

Assume two distinct notionals of USD 5,000 each, one spot and one short perpetual. One *hypothetical* positive 0.01% funding settlement on the USD 5,000 short results in USD +0.50 before fees. Four *hypothetical* USD 5,000 fills at 0.04% each correspond to USD 20,000 fee-bearing turnover and USD 8.00 fees. USD +0.50 minus USD 8.00 = **USD -7.50** before other costs. No live venue tariff or observed fill is implied. Negative funding reverses payment direction; accounting between spot and derivative accounts must remain separate.

## Anti-overclaim and release gates

- **FACT**: funding sign and product-specific intervals; mark-price/margin-mode dependencies.
- **INFERENCE**: two-leg hedge may reduce combined directional delta; does not guarantee available margin at the short venue.
- **ASSUMPTION**: synthetic four-fill example and fee/rate numbers.
- **UNKNOWN**: expected yield, exact live order/funding fills, risk-free return, basis convergence, liquidation probability, product eligibility, future schedule/rate and current user balance.
- No guaranteed profit, “no-risk arbitrage,” promised rate or annualization of a single period.
- Neither article includes commands to place orders, issue trading credentials, execute a strategy or trade funds.
- Maintain RU/EN structural, URL and numeric parity, source metadata, dates, rendered canonical/hreflang, review badges, six source links and strict site checks.
- CI/preview only after exact Git baseline; **draft PR**. Mandatory separate human diff review and explicit `Robert: да` to merge/publish. No automatic merge.

Source confidence: high for scoped vendor descriptions above as of recheck; not evidence for outcome or any live instrument. Review verdict: **PASS WITH CONDITIONS for draft source accuracy; HOLD on publication**.
