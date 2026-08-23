const sharedStyle = `<style>
  .public-repair-page{padding:40px 0 60px}.public-repair-container{max-width:860px}.public-repair-header{margin-bottom:26px}.public-repair-kicker{font:800 .68rem var(--font-mono);letter-spacing:.1em;color:var(--gold);margin-bottom:10px}.public-repair-header h1{font-size:clamp(2rem,5vw,3.7rem);line-height:1.02;margin:0 0 14px}.public-repair-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}.public-repair-meta span{border:1px solid var(--line);border-radius:999px;padding:4px 8px;font:700 .58rem var(--font-mono);color:var(--muted)}.public-repair-lead{font-size:1.05rem;color:var(--muted);line-height:1.65}.public-repair-card{margin:14px 0;padding:20px;border:1px solid var(--line);border-radius:var(--radius);background:var(--paper-soft)}.public-repair-card h2{margin:0 0 10px;font-size:1.08rem}.public-repair-card p,.public-repair-card li{color:var(--muted);line-height:1.65}.public-repair-card li+li{margin-top:8px}.public-repair-card code{font-family:var(--font-mono);color:var(--ink)}.public-repair-sources a{color:var(--blue);font-weight:700}.public-repair-boundary{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;padding:16px 18px;border:1px solid rgba(255,178,46,.4);border-radius:var(--radius);background:rgba(255,178,46,.05)}.public-repair-boundary strong{color:var(--gold);font:800 .68rem var(--font-mono)}.public-repair-boundary span{color:var(--muted);font-size:.82rem}@media(max-width:620px){.public-repair-page{padding-top:28px}.public-repair-card{padding:16px}}
</style>`;

const bitcoinFutures2026Article = String.raw`<article class="article-page public-repair-page" data-public-guide-repair="bitcoin-futures-2026-r1" data-repair-state="BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS">
  <div class="container public-repair-container">
    <header class="public-repair-header">
      <div class="public-repair-kicker">PUBLIC REPAIR · EVIDENCE-BOUND · YMYL</div>
      <h1>Bitcoin Futures: текущие механики без универсальных доходностей и плеч</h1>
      <div class="public-repair-meta">
        <span>Публичная редакция: 2026-08-15</span>
        <span>YMYL_TRADING_REVIEW_REQUIRED</span>
        <span>HISTORICAL_REVERIFY_REQUIRED</span>
      </div>
      <p class="public-repair-lead">Фьючерсы и perpetual-контракты полезно разбирать через механику конкретного продукта: funding, margin, settlement, fees и доступность меняются по площадкам и инструментам. Эта редакция не публикует восстановленные win-rate, per-trade return, универсальные leverage ranges или «рабочую стратегию» как текущий факт.</p>
    </header>

    <section class="public-repair-card" aria-labelledby="bf-mechanics">
      <h2 id="bf-mechanics">Что подтверждено и как это правильно ограничить</h2>
      <ul>
        <li>В perpetual-продуктах funding переносит стоимость между long и short сторонами по правилам конкретного контракта; знак и расчёт не являются обещанием доходности.</li>
        <li>Funding cadence нельзя превращать в универсальную константу. Bybit указывает, что интервалы различаются по символам, и публикует <code>fundingInterval</code> в минутах в instrument metadata.</li>
        <li>Coinbase для своих scoped perpetual products описывает hourly funding. Это подтверждает механику конкретного продукта, но не общий стандарт для всех бирж.</li>
        <li>Leverage повышает чувствительность позиции к adverse move и liquidation mechanics. Текущие margin, risk-limit и liquidation rules должны проверяться по спецификации конкретного контракта перед любым числовым анализом.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="bf-history">
      <h2 id="bf-history">Датированный пример продуктового события</h2>
      <p>Московская биржа объявила запуск с 18 ноября 2025 года расчётных фьючерсов на индексы биткоина и эфира. В официальном сообщении указано, что эти инструменты были доступны только квалифицированным инвесторам и не предполагали поставку цифровой валюты.</p>
      <p>Это исторический факт с датой и scope, а не универсальное утверждение о текущем доступе любого инвестора к любому crypto-futures продукту.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="bf-removed">
      <h2 id="bf-removed">Что не переносится в текущую публичную рекомендацию</h2>
      <ul>
        <li>неподтверждённые win-rate и return-per-trade показатели;</li>
        <li>generic expected-return ranges для basis, carry, scalping или других стратегий;</li>
        <li>фиксированные OI/funding triggers и leverage ranges без strategy-specific dataset и out-of-sample оценки;</li>
        <li>статические fee, venue-share, throughput и jurisdiction claims без текущей первичной проверки;</li>
        <li>утверждения о намеренном движении рынка конкретными участниками как универсальной причинности.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="bf-risk">
      <h2 id="bf-risk">Почему delta-neutral не означает risk-neutral</h2>
      <p>Хеджированная futures-конструкция может уменьшать directional exposure, но сохраняет basis risk, execution mismatch, slippage, fees, funding changes, margin/liquidation risk, collateral fragmentation, venue/counterparty risk и operational failure. Любой performance claim требует воспроизводимого периода, dataset lineage, leverage, costs и out-of-sample evidence.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="bf-use">
      <h2 id="bf-use">Допустимая область использования</h2>
      <p>Используйте материал как карту вопросов к конкретному futures/perpetual продукту: какой contract type, settlement, funding cadence, margin model, fee tier, jurisdiction/access и источник market data. Числовые параметры должны приходить из текущей спецификации или отдельной проверенной модели, а не из восстановленного текста.</p>
      <p><strong>Эта страница не является торговым разрешением и не запускает ордера, изменение плеча, маржи, переводов или капитала.</strong></p>
    </section>

    <section class="public-repair-card public-repair-sources" aria-labelledby="bf-sources">
      <h2 id="bf-sources">Первичные источники, проверено 2026-08-15</h2>
      <ul>
        <li><a href="https://bybit-exchange.github.io/docs/v5/market/history-fund-rate" rel="noreferrer">Bybit V5 · Funding Rate History</a> — интервалы funding различаются по символам.</li>
        <li><a href="https://bybit-exchange.github.io/docs/v5/market/instrument" rel="noreferrer">Bybit V5 · Instruments Info</a> — <code>fundingInterval</code> публикуется в минутах.</li>
        <li><a href="https://help.coinbase.com/en/coinbase/derivatives/funding-rate" rel="noreferrer">Coinbase · International Derivatives funding</a> — hourly funding для указанного продукта.</li>
        <li><a href="https://www.moex.com/n95316" rel="noreferrer">Moscow Exchange · 14 Nov 2025 announcement</a> — запуск расчётных BTC/ETH index futures 18 Nov 2025, qualified investors only, no digital-currency delivery.</li>
      </ul>
    </section>

    <aside class="public-repair-boundary">
      <strong>REVIEW BOUNDARY</strong>
      <span>Статус маршрута остаётся YMYL_TRADING_REVIEW_REQUIRED / HISTORICAL_REVERIFY_REQUIRED. Исправление публичной копии не является сертификацией стратегии, доходности, leverage policy или runtime-реализации.</span>
    </aside>
  </div>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Bitcoin Futures: evidence-bound public repair","dateModified":"2026-08-15","description":"Educational futures mechanics with venue-scoped funding evidence and no unsupported performance or leverage recommendation.","isBasedOn":["https://bybit-exchange.github.io/docs/v5/market/history-fund-rate","https://bybit-exchange.github.io/docs/v5/market/instrument","https://help.coinbase.com/en/coinbase/derivatives/funding-rate","https://www.moex.com/n95316"]}</script>
  ${sharedStyle}
</article>`;

const btcFuturesStrategiesArticle = String.raw`<article class="article-page public-repair-page" data-public-guide-repair="btc-futures-trading-strategies-r1" data-repair-state="BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS">
  <div class="container public-repair-container">
    <header class="public-repair-header">
      <div class="public-repair-kicker">PUBLIC REPAIR · EVIDENCE-BOUND · YMYL</div>
      <h1>BTC Futures Strategies: как отделять метод от обещаний доходности</h1>
      <div class="public-repair-meta">
        <span>Публичная редакция: 2026-08-15</span>
        <span>YMYL_TRADING_REVIEW_REQUIRED</span>
        <span>HISTORICAL_REVERIFY_REQUIRED</span>
      </div>
      <p class="public-repair-lead">Название стратегии, красивый backtest или таблица параметров не доказывают ожидаемую доходность. Эта редакция оставляет только методологию проверки futures-идей и датированные product facts; восстановленные annual-return ranges, static tax claims, универсальные leverage/fee settings и stale venue lists не считаются текущей рекомендацией.</p>
    </header>

    <section class="public-repair-card" aria-labelledby="bfs-method">
      <h2 id="bfs-method">Минимальный evidence contract для стратегии</h2>
      <ul>
        <li>Определите instrument universe, contract type, venue, период и источник данных.</li>
        <li>Разделите model development и out-of-sample evaluation; раскройте sample size и правила исключения данных.</li>
        <li>Включите fees, spread, slippage, funding и liquidation/margin mechanics, соответствующие продукту и дате теста.</li>
        <li>Покажите sensitivity к costs, leverage и execution assumptions вместо одного «лучшего» набора параметров.</li>
        <li>Любые target metrics или thresholds являются strategy-specific hypotheses, пока не связаны с воспроизводимым evidence set.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="bfs-history">
      <h2 id="bfs-history">Что можно оставить как датированный факт</h2>
      <p>18 ноября 2025 года Московская биржа начала заявленный ранее запуск расчётных фьючерсов на индексы биткоина и эфира; исходное объявление ограничивало доступ квалифицированными инвесторами и прямо указывало отсутствие поставки цифровой валюты.</p>
      <p>Этот пример показывает, почему venue/product access должен иметь дату и scope. Он не заменяет текущую проверку доступности, спецификации, margin или fees.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="bfs-removed">
      <h2 id="bfs-removed">Что удалено из роли «текущего совета»</h2>
      <ul>
        <li>generic annual-return tables для scalping, intraday, swing, position или arbitrage;</li>
        <li>универсальные leverage bands, risk-per-trade и R:R values как будто они подходят любой стратегии;</li>
        <li>фиксированные maker/taker fees без venue, product, tier и даты;</li>
        <li>списки бирж в роли «подходят сейчас» без fresh availability review;</li>
        <li>статические налоговые утверждения без отдельного датированного official-source legal/tax review;</li>
        <li>формулировки, превращающие arbitrage, cash-and-carry или hedge в гарантированную прибыль.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="bfs-risk">
      <h2 id="bfs-risk">Почему delta-neutral не означает risk-neutral</h2>
      <p>Даже market-neutral design сохраняет execution, basis, funding, spread/slippage, margin, liquidation, collateral, venue, counterparty и operational risk. В backtest эти риски нельзя заменять disclaimer-ом: они должны входить в данные, cost model и failure assumptions.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="bfs-use">
      <h2 id="bfs-use">Как использовать эту страницу</h2>
      <p>Используйте её как checklist для исследования: сформулировать hypothesis, собрать текущую спецификацию продукта, определить costs, построить reproducible backtest, заморозить out-of-sample период и отдельно решить, какие параметры являются примерами, а какие подтверждены данными.</p>
      <p><strong>Эта страница не является торговым разрешением и не задаёт live leverage, position size, entry, exit, stop-loss или движение капитала.</strong></p>
    </section>

    <section class="public-repair-card public-repair-sources" aria-labelledby="bfs-sources">
      <h2 id="bfs-sources">Первичные источники, проверено 2026-08-15</h2>
      <ul>
        <li><a href="https://bybit-exchange.github.io/docs/v5/market/history-fund-rate" rel="noreferrer">Bybit V5 · Funding Rate History</a> — product/symbol funding cadence must be scoped.</li>
        <li><a href="https://bybit-exchange.github.io/docs/v5/market/instrument" rel="noreferrer">Bybit V5 · Instruments Info</a> — current instrument metadata includes funding interval.</li>
        <li><a href="https://help.coinbase.com/en/derivatives/perpetual-style-futures/funding-rate" rel="noreferrer">Coinbase · US Perpetual-Style Futures funding</a> — hourly funding mechanics for that scoped product.</li>
        <li><a href="https://www.moex.com/n95316" rel="noreferrer">Moscow Exchange · BTC/ETH index futures launch announcement</a> — dated product/access/settlement facts.</li>
      </ul>
      <p>Текущие налоги, fee tiers и leverage limits намеренно не заявляются без отдельной official-source проверки конкретной юрисдикции, продукта и аккаунтного уровня.</p>
    </section>

    <aside class="public-repair-boundary">
      <strong>REVIEW BOUNDARY</strong>
      <span>Статус маршрута остаётся YMYL_TRADING_REVIEW_REQUIRED / HISTORICAL_REVERIFY_REQUIRED. Исправление публичной копии не является сертификацией стратегии, доходности, налогового совета или runtime-реализации.</span>
    </aside>
  </div>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"BTC Futures Strategies: evidence-bound public repair","dateModified":"2026-08-15","description":"Research methodology for BTC futures strategies without generic expected returns, universal leverage or current tax claims.","isBasedOn":["https://bybit-exchange.github.io/docs/v5/market/history-fund-rate","https://bybit-exchange.github.io/docs/v5/market/instrument","https://help.coinbase.com/en/derivatives/perpetual-style-futures/funding-rate","https://www.moex.com/n95316"]}</script>
  ${sharedStyle}
</article>`;

export const btcFuturesRepairs = [
  {
    schema: 'crypto-guides.public-guide-repair.v1',
    repairId: 'bitcoin-futures-2026-r1',
    slug: 'bitcoin-futures-2026',
    state: 'BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS',
    expectedReviewStatus: 'YMYL_TRADING_REVIEW_REQUIRED',
    expectedCurrentness: 'HISTORICAL_REVERIFY_REQUIRED',
    evidenceDoc: 'docs/CONTENT_REPAIR_BTC_FUTURES_EVIDENCE_R1.md',
    articleHtml: bitcoinFutures2026Article,
    requiredMarkers: [
      'data-public-guide-repair="bitcoin-futures-2026-r1"',
      'YMYL_TRADING_REVIEW_REQUIRED',
      'HISTORICAL_REVERIFY_REQUIRED',
      'fundingInterval',
      'https://bybit-exchange.github.io/docs/v5/market/history-fund-rate',
      'https://bybit-exchange.github.io/docs/v5/market/instrument',
      'https://help.coinbase.com/en/coinbase/derivatives/funding-rate',
      'https://www.moex.com/n95316'
    ],
    forbiddenPatterns: [
      { label: 'legacy win-rate claim', pattern: /75%\s+win\s*rate/iu },
      { label: 'legacy per-trade return', pattern: /3\.8%\s+per\s+trade/iu },
      { label: 'legacy fixed funding trigger', pattern: /0\.05%\s*\/\s*8h/iu },
      { label: 'legacy generic leverage range', pattern: /(?:2|3|5)\s*[xх]\s*[–-]\s*(?:5|10|20)\s*[xх]/iu },
      { label: 'risk-free wording', pattern: /risk[- ]?free\s+(?:arbitrage|profit)/iu },
      { label: 'stale venue reference', pattern: /\bFTX\b/iu }
    ]
  },
  {
    schema: 'crypto-guides.public-guide-repair.v1',
    repairId: 'btc-futures-trading-strategies-r1',
    slug: 'btc-futures-trading-strategies',
    state: 'BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS',
    expectedReviewStatus: 'YMYL_TRADING_REVIEW_REQUIRED',
    expectedCurrentness: 'HISTORICAL_REVERIFY_REQUIRED',
    evidenceDoc: 'docs/CONTENT_REPAIR_BTC_FUTURES_EVIDENCE_R1.md',
    articleHtml: btcFuturesStrategiesArticle,
    requiredMarkers: [
      'data-public-guide-repair="btc-futures-trading-strategies-r1"',
      'YMYL_TRADING_REVIEW_REQUIRED',
      'HISTORICAL_REVERIFY_REQUIRED',
      'out-of-sample',
      'https://bybit-exchange.github.io/docs/v5/market/history-fund-rate',
      'https://bybit-exchange.github.io/docs/v5/market/instrument',
      'https://help.coinbase.com/en/derivatives/perpetual-style-futures/funding-rate',
      'https://www.moex.com/n95316'
    ],
    forbiddenPatterns: [
      { label: 'legacy annual return 10-30', pattern: /10\s*[–-]\s*30%/iu },
      { label: 'legacy annual return 10-50', pattern: /10\s*[–-]\s*50%/iu },
      { label: 'legacy annual return 20-100', pattern: /20\s*[–-]\s*100%/iu },
      { label: 'legacy annual return 5-15', pattern: /5\s*[–-]\s*15%/iu },
      { label: 'legacy static tax', pattern: /13%\s*(?:НДФЛ|NDFL)/iu },
      { label: 'legacy generic leverage range', pattern: /(?:2|3|5)\s*[xх]\s*[–-]\s*(?:5|10|20)\s*[xх]/iu },
      { label: 'risk-free wording', pattern: /risk[- ]?free\s+(?:arbitrage|profit)/iu },
      { label: 'stale venue reference', pattern: /\bFTX\b/iu }
    ]
  }
];
