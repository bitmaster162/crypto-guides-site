# Guide #5 fact-check — 2026-10-28

Source: Google Doc GUIDE_DRAFT_G3_counter-trading-and-signing-chain-safety_20261027, ID 1fIwT4FKiTo1830OAtPhyZin5YB4x5q0RZFEgSvnj2CE. Parts I–II were revised to remove disputed statements. All Part IV unverified assertions excluded.

| Claim | Source | Decision |
| --- | --- | --- |
| Bitget unauthorized hot/warm transfers, 24 September 2026; initial $351.6m; reconciliation 19:05 UTC | https://www.bitget.com/support/articles/12560603896024 | RETAIN as September 24 provider statement; no independent proof of completeness |
| Bitget updated estimate approximately $388m, transfers began 18:31 UTC; third-party security-product vulnerability led to access | https://www.bitget.com/academy/bitget-security-incident-what-happened-timeline-impact-response | RETAIN attributed to October 20 provider report, NOT silently conflated with initial amount |
| Bitget exact $387.5m and $185m/min, attack duration 172 min, 8 networks | Secondary sources https://www.cryptotimes.io/2026/09/28/bitget-387-5m-hack-how-attackers-moved-185m-in-one-minute-without-stealing-private-keys/ | OMIT numerical rate/duration/networks, insufficient independent cross-check |
| XRPL 16 transfers 100,727,808.56 XRP, 20:28 and 21:19 timestamps, balance, treasury auto-top-up | Google Doc ledger account and transaction hashes without independently reproduced batch scan | OMIT; no direct independent XRPL ledger receipts verified |
| Bybit theft about $1.5bn, about February 21, FBI February 26 2025 | https://www.fbi.gov/investigate/cyber/alerts/2025/north-korea-responsible-for-1-5-billion-bybit-hack | RETAIN attributed to FBI |
| Bybit exact delegatecall details / compromised developer pipeline | https://www.bybit.com/en/learn/this-week-in-bybit/bybit-security-incident-timeline | OMIT details not confirmed against currently accessible original evidence |
| WazirX $234.9m, Banana Gun $3m, Solareum 2,800 SOL, Aggr $1m | CloudSEK, SolidityScan, ForkLog, AMLCrypto and Binance Square URLs in source | OMIT exact amounts/mechanisms absent full primary corroboration |
| Binance USD-M depth diff / snapshot update semantics | https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Diff-Book-Depth-Streams | RETAIN as product-specific API reference; DO NOT transfer rules to Spot/Bybit |
| Seaport offer/consideration/zone/conduitKey/counter semantics | https://github.com/ProjectOpenSea/seaport/blob/main/docs/SeaportDocumentation.md | RETAIN; primary repository docs |
| 5 domains / 18 checks | Source Doc proposed framework; no provider cert | RETAIN as illustrative review checklist, NOT standardized thresholds or guarantees |
| Hard-coded 0.2–0.3% slippage, 1–2% depth, 80–90% vault, <500ms kill | No primary validation for universal deployment | OMIT; owner-calibrated controls instead |
| Part IV — unverified claims | Source Doc Part IV | EXCLUDED completely |

Scope: technical architecture, synthetic tests only. No investment advice, real trades, real credentials, order execution or production changes. Source links in frontmatter and body; review dates 2026-10-27 / 2027-01-27.
