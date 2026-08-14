const fundingConvergenceArticle = String.raw`<article class="article-page public-repair-page" data-public-guide-repair="funding-convergence-r1" data-repair-state="BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS">
  <div class="container public-repair-container">
    <header class="public-repair-header">
      <div class="public-repair-kicker">PUBLIC REPAIR · EVIDENCE-BOUND · YMYL</div>
      <h1>Funding Convergence: что действительно можно утверждать о кросс-биржевом funding</h1>
      <div class="public-repair-meta">
        <span>Публичная редакция: 2026-08-14</span>
        <span>YMYL_TRADING_REVIEW_REQUIRED</span>
        <span>HISTORICAL_REVERIFY_REQUIRED</span>
      </div>
      <p class="public-repair-lead">Funding-rate convergence не является гарантированной или безрисковой прибылью. Эта публичная редакция оставляет только ограниченные механические утверждения, привязанные к текущей документации площадок, и явно отделяет их от торговых порогов, автоматизации и обещаний результата.</p>
    </header>

    <section class="public-repair-card" aria-labelledby="fc-verified">
      <h2 id="fc-verified">Что подтверждено текущими первичными источниками</h2>
      <ul>
        <li>Funding в perpetual-продуктах представляет собой периодические платежи между держателями long и short позиций; направление платежа зависит от знака funding rate и правил конкретного продукта.</li>
        <li>Интервал funding нельзя безопасно фиксировать как универсальные 8 часов. Bybit публикует <code>fundingInterval</code> в минутах в спецификации инструмента и отдельно указывает, что интервалы различаются по символам.</li>
        <li>Coinbase International Derivatives в своей текущей справке описывает начисление или списание funding на почасовой основе. Отдельная справка Coinbase о миграции Deribit-powered платформы описывает другую механику: непрерывное начисление с нетто-расчётом раз в сутки. Это дополнительное доказательство того, что cadence является свойством конкретного продукта и версии платформы, а не вечной константой.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="fc-removed">
      <h2 id="fc-removed">Что удалено из старой публичной версии</h2>
      <ul>
        <li>универсальный восьмичасовой cadence;</li>
        <li>формулировки о независимости результата от движения цены и гарантированной арбитражной прибыли;</li>
        <li>жёстко заданные spread, margin, rebalance и delta-drift thresholds как будто это универсальные безопасные настройки;</li>
        <li>утверждения о работающем боте, автоматическом ребалансе и переводах средств без отдельного runtime evidence.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="fc-risk">
      <h2 id="fc-risk">Почему delta-neutral не означает risk-neutral</h2>
      <p>Парные позиции могут уменьшать направленную ценовую экспозицию, но не устраняют basis risk, неполное или асинхронное исполнение, slippage, ликвидационный риск отдельного плеча, изменение знака и величины funding, различия маржинальных правил, collateral fragmentation, комиссии, задержки или блокировки переводов, API/data outages, а также venue и counterparty risk.</p>
      <p>Поэтому любые числовые входные пороги, leverage, margin buffers, rebalance bands и правила выхода требуют отдельной модели риска и текущей проверки под конкретные инструменты. В этой редакции они намеренно не публикуются как готовая конфигурация.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="fc-use">
      <h2 id="fc-use">Допустимая область использования</h2>
      <p>Материал можно использовать как исследовательскую схему для сравнения funding mechanics. Перед любым анализом конкретной пары необходимо заново получить спецификацию продукта и фактический funding interval из текущей документации или API площадки, нормализовать ставки к сопоставимому временному горизонту и отдельно учитывать исполнение, комиссии, basis и margin mechanics.</p>
      <p><strong>Эта страница не является торговым разрешением и не запускает ордера, переводы, изменение маржи или бота.</strong></p>
    </section>

    <section class="public-repair-card public-repair-sources" aria-labelledby="fc-sources">
      <h2 id="fc-sources">Первичные источники, проверено 2026-08-14</h2>
      <ul>
        <li><a href="https://bybit-exchange.github.io/docs/v5/market/instrument" rel="noreferrer">Bybit API Documentation · Get Instruments Info</a> — поле <code>fundingInterval</code> задаётся в минутах.</li>
        <li><a href="https://bybit-exchange.github.io/docs/v5/market/history-fund-rate" rel="noreferrer">Bybit API Documentation · Get Funding Rate History</a> — документация прямо указывает, что символы могут иметь разные funding intervals.</li>
        <li><a href="https://help.coinbase.com/en/coinbase/derivatives/funding-rate" rel="noreferrer">Coinbase Help · Funding rates (International Derivatives)</a> — funding charges/credits описаны как hourly для этого продукта.</li>
        <li><a href="https://help.coinbase.com/en/international-exchange/deribit/coinbase-faqs" rel="noreferrer">Coinbase Help · Deribit integration FAQ</a> — для upgraded platform описаны continuous accrual и daily net settlement.</li>
      </ul>
      <p>Текущий Binance funding interval для конкретного символа в этой редакции не заявляется и требует отдельной первичной проверки перед любым venue-specific сравнением.</p>
    </section>

    <aside class="public-repair-boundary">
      <strong>REVIEW BOUNDARY</strong>
      <span>Статус маршрута остаётся YMYL_TRADING_REVIEW_REQUIRED / HISTORICAL_REVERIFY_REQUIRED. Исправление публичной копии не является сертификацией стратегии, доходности или runtime-реализации.</span>
    </aside>
  </div>

  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Funding Convergence: evidence-bound public repair","dateModified":"2026-08-14","description":"Bounded educational review of funding-rate convergence mechanics. Venue and product funding cadence must be verified from current primary documentation; no trading thresholds or guaranteed-profit claims are published.","isBasedOn":["https://bybit-exchange.github.io/docs/v5/market/instrument","https://bybit-exchange.github.io/docs/v5/market/history-fund-rate","https://help.coinbase.com/en/coinbase/derivatives/funding-rate","https://help.coinbase.com/en/international-exchange/deribit/coinbase-faqs"]}</script>

  <style>
    .public-repair-page{padding:40px 0 60px}.public-repair-container{max-width:860px}.public-repair-header{margin-bottom:26px}.public-repair-kicker{font:800 .68rem var(--font-mono);letter-spacing:.1em;color:var(--gold);margin-bottom:10px}.public-repair-header h1{font-size:clamp(2rem,5vw,3.7rem);line-height:1.02;margin:0 0 14px}.public-repair-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}.public-repair-meta span{border:1px solid var(--line);border-radius:999px;padding:4px 8px;font:700 .58rem var(--font-mono);color:var(--muted)}.public-repair-lead{font-size:1.05rem;color:var(--muted);line-height:1.65}.public-repair-card{margin:14px 0;padding:20px;border:1px solid var(--line);border-radius:var(--radius);background:var(--paper-soft)}.public-repair-card h2{margin:0 0 10px;font-size:1.08rem}.public-repair-card p,.public-repair-card li{color:var(--muted);line-height:1.65}.public-repair-card li+li{margin-top:8px}.public-repair-card code{font-family:var(--font-mono);color:var(--ink)}.public-repair-sources a{color:var(--blue);font-weight:700}.public-repair-boundary{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;padding:16px 18px;border:1px solid rgba(255,178,46,.4);border-radius:var(--radius);background:rgba(255,178,46,.05)}.public-repair-boundary strong{color:var(--gold);font:800 .68rem var(--font-mono)}.public-repair-boundary span{color:var(--muted);font-size:.82rem}@media(max-width:620px){.public-repair-page{padding-top:28px}.public-repair-card{padding:16px}}
  </style>
</article>`;

export const publicGuideRepairs = [
  {
    schema: 'crypto-guides.public-guide-repair.v1',
    repairId: 'funding-convergence-r1',
    slug: 'funding-convergence-arbitrage',
    state: 'BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS',
    expectedReviewStatus: 'YMYL_TRADING_REVIEW_REQUIRED',
    expectedCurrentness: 'HISTORICAL_REVERIFY_REQUIRED',
    evidenceDoc: 'docs/CONTENT_REPAIR_FUNDING_CONVERGENCE_R1.md',
    articleHtml: fundingConvergenceArticle,
    requiredMarkers: [
      'data-public-guide-repair="funding-convergence-r1"',
      'data-repair-state="BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS"',
      'fundingInterval',
      'YMYL_TRADING_REVIEW_REQUIRED',
      'HISTORICAL_REVERIFY_REQUIRED',
      'https://bybit-exchange.github.io/docs/v5/market/instrument',
      'https://bybit-exchange.github.io/docs/v5/market/history-fund-rate',
      'https://help.coinbase.com/en/coinbase/derivatives/funding-rate',
      'https://help.coinbase.com/en/international-exchange/deribit/coinbase-faqs'
    ],
    forbiddenPatterns: [
      { label: 'legacy executable parameter', pattern: /min_funding_spread_annualized/iu },
      { label: 'legacy margin constant', pattern: /max_margin_ratio/iu },
      { label: 'legacy rebalance constant', pattern: /rebalance_threshold_bps/iu },
      { label: 'legacy runtime command', pattern: /rebalance_portfolio/iu },
      { label: 'legacy Binance endpoint', pattern: /fapi\.binance\.com\/fapi\/v1\/premiumIndex/iu },
      { label: 'legacy Bybit ticker endpoint', pattern: /api\.bybit\.com\/v5\/market\/tickers/iu },
      { label: 'universal eight-hour cadence', pattern: /каждые\s+8\s+часов/iu },
      { label: 'price-independent overclaim', pattern: /не\s+зависит\s+от\s+движения\s+цены/iu },
      { label: 'legacy annualized threshold literal', pattern: /15%\s+annualized\s+spread/iu },
      { label: 'legacy margin threshold literal', pattern: /50%\s+margin\s+ratio/iu },
      { label: 'legacy rebalance threshold literal', pattern: /20\s+bps\s+rebalance/iu },
      { label: 'legacy delta threshold literal', pattern: /5%\s+delta-drift/iu }
    ]
  }
];
