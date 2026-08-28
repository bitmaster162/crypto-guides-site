const sharedStyle = `<style>
  .public-repair-page{padding:40px 0 60px}.public-repair-container{max-width:860px}.public-repair-header{margin-bottom:26px}.public-repair-kicker{font:800 .68rem var(--font-mono);letter-spacing:.1em;color:var(--gold);margin-bottom:10px}.public-repair-header h1{font-size:clamp(2rem,5vw,3.7rem);line-height:1.02;margin:0 0 14px}.public-repair-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}.public-repair-meta span{border:1px solid var(--line);border-radius:999px;padding:4px 8px;font:700 .58rem var(--font-mono);color:var(--muted)}.public-repair-lead{font-size:1.05rem;color:var(--muted);line-height:1.65}.public-repair-card{margin:14px 0;padding:20px;border:1px solid var(--line);border-radius:var(--radius);background:var(--paper-soft)}.public-repair-card h2{margin:0 0 10px;font-size:1.08rem}.public-repair-card p,.public-repair-card li{color:var(--muted);line-height:1.65}.public-repair-card li+li{margin-top:8px}.public-repair-card code{font-family:var(--font-mono);color:var(--ink)}.public-repair-table{width:100%;border-collapse:collapse;margin-top:12px}.public-repair-table th,.public-repair-table td{border:1px solid var(--line);padding:10px;vertical-align:top;text-align:left}.public-repair-table th{font:800 .62rem var(--font-mono);color:var(--ink)}.public-repair-boundary{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;padding:16px 18px;border:1px solid rgba(255,178,46,.4);border-radius:var(--radius);background:rgba(255,178,46,.05)}.public-repair-boundary strong{color:var(--gold);font:800 .68rem var(--font-mono)}.public-repair-boundary span{color:var(--muted);font-size:.82rem}@media(max-width:620px){.public-repair-page{padding-top:28px}.public-repair-card{padding:16px}.public-repair-table{font-size:.82rem}}
</style>`;

const quantArticleHtml = String.raw`<article class="article-page public-repair-page" data-public-guide-repair="quant-research-unsupported-removal-r1" data-repair-state="BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS">
  <div class="container public-repair-container">
    <header class="public-repair-header">
      <div class="public-repair-kicker">PUBLIC REPAIR · RESEARCH METHODS · YMYL</div>
      <h1>Криптотрейдинг и Quant-Исследования</h1>
      <div class="public-repair-meta">
        <span>Публичная редакция: 2026-08-28</span>
        <span>YMYL_TRADING_REVIEW_REQUIRED</span>
        <span>REVIEW_REQUIRED</span>
      </div>
      <p class="public-repair-lead">Quant research — это процесс формулирования гипотез, проверки данных, оценки ошибок и попытки опровергнуть собственный результат. Ни статистический тест, ни модель, ни архитектура сами по себе не доказывают прибыльность и не создают разрешение на live execution.</p>
    </header>

    <section class="public-repair-card" aria-labelledby="qr-boundary">
      <h2 id="qr-boundary">1. LATEST_VERDICT_NOT_PROPAGATED_UNIVERSAL_THRESHOLD_OVERREACH</h2>
      <p><strong>Эта страница не является торговым разрешением.</strong> Ранее восстановленная копия смешивала исследовательские методы с универсальными критериями допуска и implementation-state утверждениями. Публичная версия оставляет только research methodology. <strong>validation method ≠ universal deployment gate.</strong></p>
    </section>

    <section class="public-repair-card" aria-labelledby="qr-validation">
      <h2 id="qr-validation">2. Валидация — набор тестов, а не магический порог</h2>
      <ul>
        <li><strong>DSR, PBO и CPCV:</strong> полезны как способы анализировать multiple testing, selection bias и устойчивость результата, но их интерпретация зависит от дизайна исследования, числа попыток, выборки и assumptions.</li>
        <li><strong>Train / validation / untouched OOS:</strong> границы должны задаваться до финальной оценки. Повторный подбор после просмотра OOS превращает его в часть исследовательского цикла.</li>
        <li><strong>Forward evidence:</strong> независимые paper/live observations могут выявить расхождение между исследовательской моделью и исполнением, но не превращают отдельный backtest в доказанную стратегию.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="qr-models">
      <h2 id="qr-models">3. Модельные семейства остаются кандидатами</h2>
      <table class="public-repair-table">
        <thead><tr><th>Семейство</th><th>Допустимый публичный статус</th><th>Что требуется до любого promotion</th></tr></thead>
        <tbody>
          <tr><td>Regime models</td><td>RESEARCH_ONLY</td><td>Стабильная идентификация режима, sensitivity tests и независимая проверка.</td></tr>
          <tr><td>Portfolio-risk methods</td><td>RESEARCH_ONLY</td><td>Проверка covariance/tail assumptions, turnover, liquidity и stress behaviour.</td></tr>
          <tr><td>ML / RL</td><td>RESEARCH_ONLY</td><td>Сильные baselines, leakage controls, multiple-testing accounting и untouched evaluation.</td></tr>
          <tr><td>Cross-venue / on-chain execution concepts</td><td>UNVERIFIED_UNTIL_SOURCE_BOUND</td><td>Точные venue, fee, latency, custody, failure-mode и execution observations.</td></tr>
        </tbody>
      </table>
    </section>

    <section class="public-repair-card" aria-labelledby="qr-costs">
      <h2 id="qr-costs">4. Экономика результата должна пережить реалистичные издержки</h2>
      <p>Research result следует пересчитывать с комиссиями, funding/borrow там, где они применимы, spread, slippage, rejects, partial fills, latency sensitivity и capacity assumptions. Эти параметры являются venue/account/path-specific и требуют датированного источника или собственного измерения.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="qr-failure">
      <h2 id="qr-failure">5. Failure-first evidence</h2>
      <ol>
        <li>Зафиксировать гипотезу и baseline до настройки сложной модели.</li>
        <li>Хранить immutable dataset identity и provenance.</li>
        <li>Отдельно считать research selection и финальную untouched evaluation.</li>
        <li>Проверять stability по времени, активам и regimes без постфактум выбора удобного окна.</li>
        <li>Записывать rejected и inconclusive результаты, а не только surviving candidates.</li>
        <li>Не переносить research candidate в live без отдельного evidence receipt и отдельной owner authority.</li>
      </ol>
      <p><strong>no trading authorization.</strong> Эта публикация не задаёт entry, exit, leverage, position size, venue, deployment или движение капитала.</p>
    </section>

    <aside class="public-repair-boundary">
      <strong>RESEARCH_METHODS_NOT_UNIVERSAL_DEPLOYMENT_GATES</strong>
      <span>Публичная копия сохраняет методы исследования и удаляет unsupported production/performance promotion. primarySourceRequired=true; currentness остаётся REVIEW_REQUIRED.</span>
    </aside>
  </div>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Криптотрейдинг и Quant-Исследования","dateModified":"2026-08-28","description":"Research-only quantitative trading methodology with explicit validation limits and no live or capital authority."}</script>
  ${sharedStyle}
</article>`;

const strategyOverviewArticleHtml = String.raw`<article class="article-page public-repair-page" data-public-guide-repair="strategy-overview-education-only-r1" data-repair-state="BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS">
  <div class="container public-repair-container">
    <header class="public-repair-header">
      <div class="public-repair-kicker">PUBLIC REPAIR · EDUCATION ONLY · YMYL</div>
      <h1>Обзор всех торговых стратегий</h1>
      <div class="public-repair-meta">
        <span>Публичная редакция: 2026-08-28</span>
        <span>YMYL_TRADING_REVIEW_REQUIRED</span>
        <span>REVIEW_REQUIRED</span>
      </div>
      <p class="public-repair-lead">Таксономия помогает понимать, откуда стратегия пытается получить экономический результат и при каких условиях она ломается. Она не является меню готовых сделок: принадлежность идеи к известному классу не доказывает edge, current profitability или пригодность к live execution.</p>
    </header>

    <section class="public-repair-card" aria-labelledby="so-boundary">
      <h2 id="so-boundary">1. EDUCATION_ONLY_NOT_RUNNABLE_COOKBOOK</h2>
      <p><strong>Эта страница не является торговым разрешением.</strong> Публичная версия намеренно не содержит runnable exchange code, фиксированных торговых порогов и инструкций «какую стратегию включить сейчас». <strong>REJECTED / TRAIN_FAIL / RESEARCH_ONLY states are not promotions.</strong></p>
    </section>

    <section class="public-repair-card" aria-labelledby="so-taxonomy">
      <h2 id="so-taxonomy">2. Таксономия по источнику риска и предполагаемого результата</h2>
      <table class="public-repair-table">
        <thead><tr><th>Семейство</th><th>Исследовательская идея</th><th>Типичный failure mode</th></tr></thead>
        <tbody>
          <tr><td>Trend / momentum</td><td>Устойчивость движения на выбранном горизонте.</td><td>Развороты, crowded positioning, издержки и regime shift.</td></tr>
          <tr><td>Mean reversion</td><td>Возврат статистического отношения к локальной норме.</td><td>Structural break: старая «норма» перестаёт существовать.</td></tr>
          <tr><td>Relative-value / market-neutral</td><td>Разница между связанными инструментами или cash flows.</td><td>Basis/funding divergence, borrow/custody risk, legging и liquidity mismatch.</td></tr>
          <tr><td>Event / microstructure</td><td>Реакция цены и ликвидности на события и order-flow structure.</td><td>Data incompleteness, latency, adverse selection и disappearing capacity.</td></tr>
          <tr><td>ML / policy learning</td><td>Поиск условных зависимостей или decision policies.</td><td>Leakage, overfitting, unstable labels, distribution shift и multiple testing.</td></tr>
        </tbody>
      </table>
    </section>

    <section class="public-repair-card" aria-labelledby="so-status">
      <h2 id="so-status">3. Research status важнее названия стратегии</h2>
      <ul>
        <li><code>REJECT</code> — evidence против promotion; идея не должна возвращаться как рекомендация без нового заранее определённого исследования.</li>
        <li><code>TRAIN_FAIL</code> — кандидат не прошёл внутренний train/gate и не становится viable только потому, что похожая стратегия известна в литературе.</li>
        <li><code>RESEARCH_ONLY</code> — допустимо изучать механизм, но нет evidence для live promotion.</li>
        <li><code>UNVERIFIED</code> — утверждение требует первичного источника или независимого измерения.</li>
      </ul>
      <p>В частности, later-rejected residual mean-reversion family остаётся rejected/non-promoted, пока новый заранее определённый evidence path не установит иное.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="so-evidence">
      <h2 id="so-evidence">4. Что нужно проверять у любой стратегии</h2>
      <ol>
        <li>Экономическую гипотезу и простой baseline.</li>
        <li>Dataset identity, survivorship/look-ahead/leakage controls.</li>
        <li>Train, validation и untouched OOS separation.</li>
        <li>Fees, spread, slippage, borrow/funding и execution realism.</li>
        <li>Capacity, liquidity, concentration, tail and operational failure modes.</li>
        <li>Stability across time/regimes и independent forward observations.</li>
      </ol>
    </section>

    <section class="public-repair-card" aria-labelledby="so-choice">
      <h2 id="so-choice">5. Таксономия не выбирает сделку за пользователя</h2>
      <p>Название семейства не задаёт сигнал. Сравнивать исследовательские идеи следует по качеству evidence, устойчивости after-cost результата, прозрачности assumptions и заранее определённым rejection criteria. Положительный historical result не равен разрешению на production deployment.</p>
      <p><strong>no trading authorization.</strong> Эта публикация не предоставляет сигнал, позицию, размер риска, venue selection, deployment instruction или capital authority.</p>
    </section>

    <aside class="public-repair-boundary">
      <strong>STRATEGY_TAXONOMY_AND_FAILURE_MODES_ONLY</strong>
      <span>Публичная копия сохраняет образовательную taxonomy и failure modes, но удаляет runnable cookbook и unsupported performance/edge promotion. primarySourceRequired=true; currentness остаётся REVIEW_REQUIRED.</span>
    </aside>
  </div>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Обзор всех торговых стратегий","dateModified":"2026-08-28","description":"Educational trading-strategy taxonomy with explicit rejected/research-only states and no live or capital authority."}</script>
  ${sharedStyle}
</article>`;

export const unsupportedStrategySurfaceRepairs = [
  {
    schema: 'crypto-guides.public-guide-repair.v1',
    repairId: 'quant-research-unsupported-removal-r1',
    slug: 'kriptotreyding-i-quant-issledovaniya',
    state: 'BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS',
    expectedReviewStatus: 'YMYL_TRADING_REVIEW_REQUIRED',
    expectedCurrentness: 'REVIEW_REQUIRED',
    expectedYmyl: true,
    evidenceDoc: 'docs/CONTENT_CLAIM_REVIEW_UNSUPPORTED_STRATEGY_SURFACES_R1.md',
    articleHtml: quantArticleHtml,
    requiredMarkers: [
      'data-public-guide-repair="quant-research-unsupported-removal-r1"',
      'PUBLIC REPAIR · RESEARCH METHODS · YMYL',
      'LATEST_VERDICT_NOT_PROPAGATED_UNIVERSAL_THRESHOLD_OVERREACH',
      'validation method ≠ universal deployment gate',
      'no trading authorization',
      'Эта страница не является торговым разрешением'
    ],
    ymylBoundaryMarkers: [
      'LATEST_VERDICT_NOT_PROPAGATED_UNIVERSAL_THRESHOLD_OVERREACH',
      'validation method ≠ universal deployment gate',
      'no trading authorization'
    ],
    forbiddenPatterns: [
      { label: 'legacy universal DSR threshold', pattern: /DSR\s*<\s*0\.95/iu },
      { label: 'legacy absolute overfit exclusion', pattern: /абсолютно\s+исключ\w*[\s\S]{0,80}переобуч/iu },
      { label: 'legacy uptime claim', pattern: /99\.9\s*%/iu },
      { label: 'legacy extra-profit claim', pattern: /2\s*[–-]\s*5\s*bps/iu },
      { label: 'legacy daily-loss claim', pattern: /10\s*[–-]\s*15\s*bps/iu },
      { label: 'legacy universal production gate phrase', pattern: /production\s+gate\s*[:=]\s*DSR/iu },
      { label: 'legacy live-ready promotion', pattern: /(?:ready|готов\w*)[\s\S]{0,50}(?:live|production)/iu }
    ]
  },
  {
    schema: 'crypto-guides.public-guide-repair.v1',
    repairId: 'strategy-overview-education-only-r1',
    slug: 'obzor-vsekh-torgovykh-strategiy',
    state: 'BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS',
    expectedReviewStatus: 'YMYL_TRADING_REVIEW_REQUIRED',
    expectedCurrentness: 'REVIEW_REQUIRED',
    expectedYmyl: true,
    evidenceDoc: 'docs/CONTENT_CLAIM_REVIEW_UNSUPPORTED_STRATEGY_SURFACES_R1.md',
    articleHtml: strategyOverviewArticleHtml,
    requiredMarkers: [
      'data-public-guide-repair="strategy-overview-education-only-r1"',
      'PUBLIC REPAIR · EDUCATION ONLY · YMYL',
      'EDUCATION_ONLY_NOT_RUNNABLE_COOKBOOK',
      'REJECTED / TRAIN_FAIL / RESEARCH_ONLY states are not promotions',
      'no trading authorization',
      'Эта страница не является торговым разрешением'
    ],
    ymylBoundaryMarkers: [
      'EDUCATION_ONLY_NOT_RUNNABLE_COOKBOOK',
      'REJECTED / TRAIN_FAIL / RESEARCH_ONLY states are not promotions',
      'no trading authorization'
    ],
    forbiddenPatterns: [
      { label: 'legacy runnable ccxt surface', pattern: /\bccxt\b/iu },
      { label: 'legacy exchange-specific Binance surface', pattern: /\bBinance\b/iu },
      { label: 'legacy websocket implementation surface', pattern: /\bWebSocket\b/iu },
      { label: 'legacy RSI recipe', pattern: /RSI\s*[<>]=?\s*(?:30|70)/iu },
      { label: 'legacy numeric Sharpe promotion', pattern: /Sharpe(?:\s+ratio)?\s*[:=]?\s*\d/iu },
      { label: 'legacy numeric win-rate promotion', pattern: /win[\s-]?rate\s*[:=]?\s*\d/iu },
      { label: 'legacy current-strategy recommendation', pattern: /какую\s+стратегию[\s\S]{0,60}(?:выбрать|использовать|включить)/iu }
    ]
  }
];
