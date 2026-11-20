---
site: crypto.bitevo.work
slug: perpetual-funding-and-liquidation-risk
path: /guides/perpetual-funding-and-liquidation-risk
alternate: /en/guides/perpetual-funding-and-liquidation-risk
lang: ru
category: Risk Management
title: "Funding perpetual-фьючерсов: платежи, хедж и риск ликвидации"
seo_title: "Funding и ликвидация perpetual | Crypto Guides"
description: "Как сверять funding, маржу, базис и затраты у perpetual-фьючерсов без обещаний безрисковой прибыли."
reviewed: "2026-11-19"
next_review: "2027-02-19"
related: [https://crypto.bitevo.work/guides/low-cap-grid-bots-costs-and-risks]
schema: [Article, BreadcrumbList]
research_source: "Internal funding-convergence repair review (2026-08-14); current Coinbase BIP/CFTC and product documentation rechecked 2026-11-20; no live fills or account evidence"
sources:
  - title: "Bybit V5 Get Funding Rate History"
    url: https://bybit-exchange.github.io/docs/v5/market/history-fund-rate
  - title: "Bybit V5 Get Instruments Info"
    url: https://bybit-exchange.github.io/docs/v5/market/instrument
  - title: "Coinbase US perpetual-style futures overview"
    url: https://help.coinbase.com/en/coinbase/derivatives/us-perpetual-futures-overview
  - title: "Coinbase perpetual-style futures settlement mechanics"
    url: https://help.coinbase.com/en/derivatives/perpetual-style-futures/settlement-and-other-mechanics
  - title: "Coinbase Derivatives submission 2026-42 Rule 1129 BIP"
    url: https://www.cftc.gov/filings/orgrules/rules0617266784.pdf#page=8
  - title: "Coinbase nano Bitcoin BIP contract specifications"
    url: https://help.coinbase.com/en/derivatives/perpetual-style-futures/contract-specifications
  - title: "Bybit V5 Get Position Info"
    url: https://bybit-exchange.github.io/docs/v5/position
  - title: "Bybit margin calculation update"
    url: https://www.bybit.com/en/help-center/article/Understanding-the-Adjustment-and-Impact-of-the-New-Margin-Calculation
toc: [{"title":"Что такое funding","id":"1-что-такое-funding"},{"title":"Ставка, знак и расписание","id":"2-ставка-знак-и-расписание"},{"title":"Почему хедж не отменяет ликвидацию","id":"3-почему-хедж-не-отменяет-ликвидацию"},{"title":"Бумажный пример затрат","id":"4-бумажный-пример-затрат"},{"title":"Протокол исследования","id":"5-протокол-исследования"},{"title":"Границы ответственности","id":"6-границы-ответственности"},{"title":"Источники и граница вывода","id":"7-источники-и-граница-вывода"}]
layout: ../../layouts/ReviewedGuideLayout.astro
---

Исследовательский гайд · механика деривативов, не торговый сигнал

# Funding perpetual-фьючерсов: почему «дельта-нейтрально» не значит «без риска»

**Проверено 19 ноября 2026 года.** Материал объясняет проверку механики бессрочных фьючерсов и бумажной модели затрат. Это не инвестиционная рекомендация, руководство к открытию позиций или обещание дохода. Плечо, риск контрагента и изменение цены способны привести к потере всего обеспечения; в отдельных сценариях обязательства могут зависеть от правил конкретного продукта. Реальную торговлю и полномочия на капитал материал не разрешает.

## 1. Что такое funding

У классического бессрочного фьючерса нет фиксированной даты экспирации. В [прежней справке Coinbase о US perpetual-style futures](https://help.coinbase.com/en/coinbase/derivatives/us-perpetual-futures-overview) сохранилось описание пятилетнего срока. **Для nano Bitcoin BIP это прежняя редакция спецификации, а не доказательство существования другого контракта:** [подача Coinbase Derivatives №2026-42 от 17 июня 2026 года в CFTC, Appendix B, Rule 1129](https://www.cftc.gov/filings/orgrules/rules0617266784.pdf#page=8) зачёркивает пятилетнюю экспирацию BIP и устанавливает отсутствие запланированной даты истечения и окончательного расчёта. [Актуальная спецификация Coinbase](https://help.coinbase.com/en/derivatives/perpetual-style-futures/contract-specifications) перечисляет тот же nano BTC Perp Futures (**BIP**) без даты экспирации; [справка о расчётах](https://help.coinbase.com/en/derivatives/perpetual-style-futures/settlement-and-other-mechanics) объясняет соответствующую механику. Отсутствие плановой экспирации не исключает принудительное завершение при делистинге. Это **история изменения BIP**, но она не доказывает идентичные условия всех других контрактов. На отдельных продуктах биржи используют **funding** — периодические денежные начисления или списания между держателями длинных и коротких позиций, связанные с механизмом сближения цены дериватива и базового рынка. Это **не** гарантированный процент по депозиту и **не** выручка, которую можно экстраполировать на год без проверки остальных денежных потоков.

В [справке Coinbase для американских perpetual-style futures](https://help.coinbase.com/en/coinbase/derivatives/us-perpetual-futures-overview) положительная ставка означает платёж от long к short, а отрицательная — в обратную сторону. Это определение относится к указанному продукту; для каждой другой биржи и типа контракта нужно читать собственные правила.

## 2. Ставка, знак и расписание

Ставка, видимая на экране сейчас, не является зафиксированной будущей серией платежей. Она может измениться, сменить знак или перестать быть применимой после закрытия позиции. Обращайте внимание на единицу измерения: ставка **за расчётный период** не равна годовой доходности.

У [Bybit V5 в истории funding](https://bybit-exchange.github.io/docs/v5/market/history-fund-rate) прямо указано, что интервал различается между инструментами; [каталог инструментов](https://bybit-exchange.github.io/docs/v5/market/instrument) возвращает поле *fundingInterval* в минутах. В то же время [Coinbase описывает почасовой расчёт ставки](https://help.coinbase.com/en/coinbase/derivatives/us-perpetual-futures-overview) для конкретной американской линейки perpetual-style futures. Следовательно, фраза «на всех биржах funding каждые 8 часов» некорректна как универсальное правило.

Даже внутри одного семейства продуктов **момент расчёта**, **момент зачисления в баланс** и **экономический период начисления** могут отличаться. [Coinbase отдельно описывает расчёты и settlement](https://help.coinbase.com/en/derivatives/perpetual-style-futures/settlement-and-other-mechanics). Для сравнения сохраняйте название инструмента, временную зону, текущую версию правил и историю фактически опубликованных ставок, а не один скриншот.

## 3. Почему хедж не отменяет ликвидацию

В исследовательской конструкции «spot + short perpetual» длинный спотовый актив может частично компенсировать движение цены короткого дериватива. **Компенсация в суммарной оценке не равна доступному обеспечению на бирже**, где находится short. Если маржа по одной ноге исчерпана, её могут ликвидировать раньше, чем предполагаемая прибыль другой ноги станет доступной для покрытия убытка.

Не исчезают риск базиса и несовпадения размеров ног, комиссии открытия и закрытия, спред и проскальзывание, недоступность перевода залога, риски API и площадки. Funding может сменить знак, а ограничения плеча и требования обеспечения — измениться. Называть такую конструкцию «полностью безрисковой» нельзя.

В [Bybit V5 Position Info](https://bybit-exchange.github.io/docs/v5/position) *liqPrice* для cross margin описывается как оценочная величина, а для portfolio margin поле может не предоставляться. [Документ Bybit об изменении расчёта маржи](https://www.bybit.com/en/help-center/article/Understanding-the-Adjustment-and-Impact-of-the-New-Margin-Calculation) связывает отдельные требования с mark price и режимом маржи. Поэтому фиксированное «безопасное плечо» или один универсальный процент до ликвидации здесь не предлагаются.

## 4. Бумажный пример затрат

**Синтетический пример**, не котировка и не результат теста: спот на **$5 000** и отдельный short perpetual номиналом **$5 000**. Если *условная* ставка за один расчётный период составила **+0,01%**, выплата в пользу short при неизменном номинале могла бы составить около **+$0,50** до издержек. При отрицательной ставке направление платежа поменялось бы.

Предположим исключительно для расчёта, что каждая из **4** операций открытия и закрытия двух ног имеет номинал $5 000 и *условную* комиссию **0,04%**. Совокупный оборот для комиссий — **$20 000**, условные комиссии — **$8,00**. Это не тариф какой-либо площадки.

| Условный компонент одного сценария | USD |
| --- | ---: |
| Funding на short за период | +0,50 |
| Комиссии четырёх операций | −8,00 |
| Разница до спреда, базиса и прочих издержек | **−7,50** |

**Не делайте из таблицы доходность стратегии.** Пример намеренно не моделирует изменение mark price, реальный график начислений, проценты на заём, ликвидацию, налоги, потери при переводе и неполные исполнения. Нельзя прибавлять один гипотетический funding-платёж к неподтверждённым закрытым PnL или считать платёж дважды после включения его в баланс.

## 5. Протокол исследования

Для paper-аудита, не для запуска реальных ордеров, полезно сохранять:

- **Договорный объект.** Точная биржа, тип контракта, валюта расчётов, режим маржи, источник и время версии правил.
- **Историю ставок.** Ставки с временными метками и интервалы инструмента; пропуски и неподтверждённые значения отмечать UNKNOWN.
- **Обе ноги.** Размеры, фактические или модельные цены исполнения, спред, комиссии, остатки и доступность обеспечения по каждой площадке.
- **Стресс-состояния.** Смена знака funding, резкий basis, недоступность API, задержка перевода залога и ликвидация одной ноги.
- **Проверяемый итог.** Equity, реальные и нереализованные компоненты, дебеты и кредиты funding, стоимость выхода и воспроизводимые исходные данные.

Моделируемое касание цены не является доказательством исполнения. Отсутствующий расчёт ставки, неопределённый статус позиции или недоступная маржа должны давать **UNKNOWN/HOLD**, а не фиктивный положительный результат. Тестируйте гипотезу на периоде, который не использовался для выбора её параметров.

## 6. Границы ответственности

Документы Bybit и Coinbase подтверждают описанные механики **только в рамках названных продуктов и версий**; они не подтверждают прибыльность конкретной пары или стратегии. Внутренний обзор Crypto Guides по funding-convergence от 14 августа 2026 года классифицировал универсальную восьмичасовую периодичность, фиксированные пороги и «безрисковую» прибыль как неподтверждённые заявления. Этот гайд их **не восстанавливает**.

**Проверка ≠ торговое разрешение.** Здесь нет текущего расчёта по реальному счёту, проверенных сделок, безопасного коэффициента плеча или сигнала на покупку/продажу. Возможна полная потеря капитала. Перед любым самостоятельным финансовым решением требуется изучить конкретные договорные условия и риски; проект не предоставляет полномочия на операции с капиталом.

## 7. Источники и граница вывода

Первичные источники: [Bybit funding history](https://bybit-exchange.github.io/docs/v5/market/history-fund-rate), [Bybit instruments info](https://bybit-exchange.github.io/docs/v5/market/instrument), [Coinbase perpetual-style futures overview](https://help.coinbase.com/en/coinbase/derivatives/us-perpetual-futures-overview), [Coinbase settlement mechanics](https://help.coinbase.com/en/derivatives/perpetual-style-futures/settlement-and-other-mechanics), [подача Coinbase Derivatives №2026-42, Rule 1129 (BIP)](https://www.cftc.gov/filings/orgrules/rules0617266784.pdf#page=8), [актуальная спецификация nano Bitcoin BIP](https://help.coinbase.com/en/derivatives/perpetual-style-futures/contract-specifications), [Bybit position info](https://bybit-exchange.github.io/docs/v5/position) и [обновление расчёта маржи Bybit](https://www.bybit.com/en/help-center/article/Understanding-the-Adjustment-and-Impact-of-the-New-Margin-Calculation). Из этих документов не следует ожидаемая доходность, отсутствие риска ликвидации или корректность какой-либо торговой системы. Варианты и условия продуктов способны меняться; следующая проверка — 19 февраля 2027 года.
