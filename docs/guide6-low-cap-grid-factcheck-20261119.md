# Low-cap grid guide — review and provenance, 2026-11-19

Status: **DRAFT PR ONLY**. Publication, deployment, execution, and financial authorization are **not** implied. Git baseline: main at `d3846882b3cfe13b0b17c17bd520e56bd7baf777` (clean, 2026-11-19).

## Input lineage

- Gemini RU/EN draft: `CRYPTO_GUIDE_GRID_DRAFT_20261119`, Google Doc ID `1eWEMFLDciKtsF5mUrPGVXdIT8tW0V_v9ZVPXeWAHl48`.
- Handoff: `L03_GRID_PDF_HANDOFF_OUTBOX_20261119.md` dated 2026-11-19. Its own statement: **only first PDF pinned by name** from Gemini A11; the other four are thematic neighbors/candidates, not independently confirmed exact assignment. Do not promote their parameter tables into validated statistics.
- `Grid OS — Количественные параметры и метрики 2026`, SHA-256 `41336aac8554f0959685dce8fea78c554417b5e20ffbbd3f369bf04aa08e556b`.
- `Крипто-трейдинг — Параметры и анализ`, SHA-256 `fbea641cbb09ca2842b8c5a5a0f7d5b90cee2ec244a576c3a7a3e3562924c8f4` — candidate.
- `Настройка торговой стратегии крипто-сеток`, SHA-256 `226777ff8e6f13026f0c51b83a3df151fc0603d513a9ed2e52b20c08e896174d` — candidate.
- `Grid-бот — Управление, риски, мониторинг`, SHA-256 `167a24d95f36be53226dcdb4e01f7441d24c4c07013e8bf1412df37bcbaf8896` — candidate.
- `Торговая стратегия — ATR, Fee-Drag, Recentering`, SHA-256 `c70848d3441b9e56f8136294d95bb276d925763570c55c0194041c2dce76c4b1` — candidate.

## Material PnL correction — primary internal control

Primary local report: `GRID_OS_EDGE_AFTER_COSTS_R1.md`, 18 November 2026. It audits original SQLite snapshots and historical OHLCV replay. Three paper databases (AVAXUSDT, LINKUSDT, SOLUSDT) each have zero closed trades, zero open positions, `SUM(pnl_usd)=NULL`, and cover approximately 17 minutes; these are **not** evidence of a low-cap paper-trading profit or loss.

A **separate modeled control replay**, on AVAX/LINK/SOL 1-minute OHLCV, used six consecutive 14-day windows, with five evaluation windows, fixed long grid step 0.8%, twenty $100 levels, up to $2,000 reserve per pair, baseline cost 7.5 bps per side. With no exit earlier than the following candle:
- net closed cycles for all three controls **+USD 577.97**;
- residual inventory value net of modeled costs **−USD 1,346.10**;
- full marked-to-model result **−USD 768.14**;
- stress scenario with additional 25 bps per side **−USD 1,267.59**.

Do not label 577.97 as a loss or publish "loss USD 578–760" as a reproducible low-cap result. Candle high/low touches are assumed fills; queue, depth, partial orders, gaps, basis, and funding are not fully represented. Historical low-cap Arena Grid Lab aggregate claims were not reconstructable from original fills. **Low-cap edge: UNKNOWN**. Suggested decision in primary report: CLOSE current monetization attempt pending raw low-cap evidence.

## Editorial dispositions

| Original draft claim | Disposition | Rationale |
| --- | --- | --- |
| Grid automates buys/sells within range | RETAIN with primary venue support | Binance Spot Grid FAQs |
| Maker/taker, slippage, funding and possible delisting | RETAIN; venue-specific and time-variable | Coinbase and Binance primary docs linked in frontmatter and first body use |
| Loss of USD 578–760 as paper-test fact | REPLACE | Positive +577.97 closed cycles; -768.14 full control replay; no proved low-cap fills |
| ATR p70/p90; 180-day distribution and fixed grid modes | OMIT | Original studies do not include auditable raw sample or generalizable calibration |
| Hurst, variance-ratio and universal Delist-Score thresholds | LABEL UNVALIDATED / OMIT thresholds | Internal proposed heuristics are not an exchange standard |
| Perpetual funding always positive | OMIT | Direction and interval vary; see Binance funding source |
| Monitoring Tag means inevitable delisting | CORRECT | Tag indicates increased scrutiny, not a delisting notice |
| Guaranteed profit, APR, exact safe leverage, forced market sell | OMIT | Unsupported; can increase capital risk |
| Paper evidence implies live market quality | REJECT | No live-fill receipt; control replay based on candle touches |

Public article sources are publicly navigable Binance/Coinbase provider documents. Internal PDF links and private draft references remain in review notes rather than being represented as publicly auditable venue data. The RU and EN pages must contain the same quantitative correction and no implied production authority.

## Release / sign-off

Required before production: independently reproduce control replay artifacts, obtain audited raw low-cap fills if any, review legal and financial disclaimers, run current exact-head build/CI, and obtain owner approval for merge and deploy. Draft PR must stay unmerged.