# PUBLIC_TITLE_AUTHORITY_AUDIT_R1

State: `R11_METADATA_AUTHORITY_REPAIR_READY`
Checked: 2026-08-15
Scope: already BUILD-validated public-guide repairs only

## Finding

The bounded article-repair pipeline originally replaced the generated `<article>` but left source-derived discovery/title metadata unchanged. An exact preview readback demonstrated that this can create an authority split: the repaired body removes an unsupported claim while the direct HTML `<title>` and reviewed `/api/public-guides.json` title can still repeat it.

R10 introduced a deterministic title-repair path and validated it on `hyperliquid-l1-tokyo-deploy`, where `Equinix TY3` survived in the source title after the body had been bounded to current Hyperliquid documentation.

R11 applies the same mechanism only to already repaired routes whose source titles materially overstate the bounded public article.

## R11 title repairs

| Slug | Source-derived title | Bounded public title |
|---|---|---|
| `liquidation-cascades-arbitrage` | `Liquidation Cascades & Funding Arbitrage: Использование каскадов принудительного закрытия позиций` | `Liquidation Cascades: что действительно можно утверждать о публичных liquidation feeds` |
| `bitcoin-futures-2026` | `Комплексный анализ микроструктуры рынка и рабочие стратегии торговли фьючерсами на Bitcoin в 2026 году` | `Bitcoin Futures: текущие механики без универсальных доходностей и плеч` |
| `btc-futures-trading-strategies` | `GEO-оптимизированный гид по стратегиям торговли фьючерсами на биткоин` | `BTC Futures Strategies: как отделять метод от обещаний доходности` |
| `anthropic-models-and-upgrade` | `Аналитический отчёт по моделям уровня Fable Mythos и по апгрейду Sovereign Arena до Hybrid LLM plus RL` | `Anthropic models: как читать upgrade-рекомендации без устаревшего vendor snapshot` |
| `fable-mythos-agents-2026` | `Как поднять агентов до уровня Fable/Mythos: target-архитектура 2026` | `Fable 5 и Mythos 5: доступ, safeguards и границы текущих утверждений` |
| `pochemu-strategii-teryayut-dengi` | `Почему 90% paper-trading стратегий теряют деньги: 3 механических дефекта на данных 66 000 сделок` | `Почему paper-trading стратегии теряют деньги: механика вместо headline-цифр` |
| `why-90-percent-strategies-lose` | `Почему 90% paper-trading стратегий теряют: 3 механических дефекта на 66k сделок` | `Почему торговые стратегии ломаются: проверяем издержки, геометрию и wiring` |
| `tee-agent-secrets` | `TEE & MPC: Безопасное управление ключами автономных ИИ-агентов` | `TEE и threshold cryptography для agent secrets: defense in depth, а не гарантия` |

Hyperliquid remains the ninth metadata repair from R10:

- `hyperliquid-l1-tokyo-deploy` → `Hyperliquid L1 non-validator: текущие требования ноды и границы low-latency tuning`.

## Deliberately unchanged repaired titles

The following repaired routes do not require a title override in R11 because their source title does not itself reassert a removed numeric/performance/runtime/vendor claim strongly enough to justify mutation:

- `funding-convergence-arbitrage`;
- `risk-freymvork-dlya-kripto-botov`;
- `frontier-models-cost-routing`;
- `fleet-coordinator-drift-monitoring`.

This is a bounded metadata correction, not a general SEO rewrite.

## Deterministic contract

For every declared title repair the build must prove:

1. the route is already present in the public-guide repair registry;
2. the generated source title equals the recorded `sourceTitle` before mutation;
3. the direct generated `<title>` is changed to `publicTitle`;
4. `dist/guides-index.json` title is changed to `publicTitle`;
5. `dist/api/public-guides.json` title is changed to `publicTitle`;
6. the old direct `<title>` is absent;
7. the repaired article `<h1>` equals the bounded `publicTitle`;
8. review/currentness/YMYL state is unchanged.

## Authority boundary

R11 changes generated preview metadata only. It does not change source historical content, route identity, canonical selection, review state, runtime, credentials, node configuration, trading, capital, DNS or production.

`can_trade=false`
`capital_permission=DENY`
