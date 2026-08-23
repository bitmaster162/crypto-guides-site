const sharedStyle = `<style>
  .public-repair-page{padding:40px 0 60px}.public-repair-container{max-width:860px}.public-repair-header{margin-bottom:26px}.public-repair-kicker{font:800 .68rem var(--font-mono);letter-spacing:.1em;color:var(--gold);margin-bottom:10px}.public-repair-header h1{font-size:clamp(2rem,5vw,3.7rem);line-height:1.02;margin:0 0 14px}.public-repair-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}.public-repair-meta span{border:1px solid var(--line);border-radius:999px;padding:4px 8px;font:700 .58rem var(--font-mono);color:var(--muted)}.public-repair-lead{font-size:1.05rem;color:var(--muted);line-height:1.65}.public-repair-card{margin:14px 0;padding:20px;border:1px solid var(--line);border-radius:var(--radius);background:var(--paper-soft)}.public-repair-card h2{margin:0 0 10px;font-size:1.08rem}.public-repair-card p,.public-repair-card li{color:var(--muted);line-height:1.65}.public-repair-card li+li{margin-top:8px}.public-repair-card code{font-family:var(--font-mono);color:var(--ink)}.public-repair-sources a{color:var(--blue);font-weight:700}.public-repair-boundary{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;padding:16px 18px;border:1px solid rgba(255,178,46,.4);border-radius:var(--radius);background:rgba(255,178,46,.05)}.public-repair-boundary strong{color:var(--gold);font:800 .68rem var(--font-mono)}.public-repair-boundary span{color:var(--muted);font-size:.82rem}@media(max-width:620px){.public-repair-page{padding-top:28px}.public-repair-card{padding:16px}}
</style>`;

const regimeTimingArticle = String.raw`<article class="article-page public-repair-page" data-public-guide-repair="regime-timing-validation-r1" data-repair-state="BOUNDED_PUBLIC_COPY_REPAIRED_REVIEW_REMAINS">
  <div class="container public-repair-container">
    <header class="public-repair-header">
      <div class="public-repair-kicker">PUBLIC REPAIR · TRADING/YMYL · VALIDATION</div>
      <h1>Возраст рыночного режима: как проверять timing buckets без универсального окна 30–120 минут</h1>
      <div class="public-repair-meta">
        <span>Публичная редакция: 2026-08-15</span>
        <span>YMYL_TRADING_REVIEW_REQUIRED</span>
        <span>REVIEW_REQUIRED</span>
        <span>HYPOTHESIS ≠ ENTRY RULE</span>
      </div>
      <p class="public-repair-lead">Возраст режима после обнаруженной смены состояния может быть полезным исследовательским признаком. Но конкретное окно нельзя переносить из одного исторического разбиения в торговое правило без воспроизводимого датасета, определения regime change, оценки неопределённости, учёта числа испытанных вариантов и независимого out-of-sample подтверждения.</p>
    </header>

    <section class="public-repair-card" aria-labelledby="regime-hypothesis">
      <h2 id="regime-hypothesis">Что остаётся полезной гипотезой</h2>
      <p><strong>30–120 минут — исследовательская гипотеза, не универсальное окно входа.</strong> Правильный вопрос — даёт ли regime age дополнительную прогнозную информацию после того, как заранее определены сам режим, момент его смены, базовый directional signal и execution-cost model.</p>
      <p>Вместо одной «лучшей» корзины времени следует исследовать всю заранее объявленную сетку или использовать nested/walk-forward процедуру. Соседние границы должны давать понятную sensitivity-картину: если результат существует только при одной точной нарезке, это повышает риск selection bias.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="regime-data">
      <h2 id="regime-data">Что должно быть связано с каждым числом</h2>
      <ul>
        <li>immutable dataset ID/hash, период, инструменты/venues и правила очистки;</li>
        <li>точная версия regime detector и защита от look-ahead;</li>
        <li>число наблюдений/сделок и exposure в каждом timing bucket;</li>
        <li>gross и net-of-fees/slippage distribution, а не только средний PnL;</li>
        <li>confidence interval/bootstrap или другая оценка неопределённости;</li>
        <li>полный trial ledger: какие окна, фильтры и определения режима были протестированы;</li>
        <li>out-of-sample/walk-forward результаты и stability across periods.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="regime-overfit">
      <h2 id="regime-overfit">Почему «лучшее историческое окно» ещё не edge</h2>
      <p>Если несколько timing buckets, regime definitions или filters сравнивались и затем публикуется победитель, возникает selection/multiple-testing risk. Probability of Backtest Overfitting и Deflated Sharpe Ratio — примеры методов, разработанных именно для оценки того, насколько исторический победитель может быть результатом поиска по вариантам, а не устойчивого эффекта.</p>
      <p>Для торговой гипотезы важнее воспроизводимость после costs и вне выборки, чем красивый in-sample ranking. Regime age можно оставить feature; фиксированное действие появляется только после отдельной строгой валидации.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="regime-model">
      <h2 id="regime-model">Regime change тоже является модельным объектом</h2>
      <p>Смена режима не наблюдается напрямую как единая универсальная метка. Moving averages, ADX, return thresholds, HMM/change-point models и order-flow models могут давать разные timestamps и разные задержки обнаружения. Поэтому timing profile одного detector нельзя автоматически переносить на другой.</p>
      <p>Исследования online change-point detection показывают, что regime information может улучшать некоторые прогнозы market microstructure. Это поддерживает исследование признака, но не устанавливает универсальную минутную границу для крипторынка.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="regime-gate">
      <h2 id="regime-gate">Fail-closed decision contract</h2>
      <ul>
        <li>нет связанного dataset/trial receipt → timing window остаётся <strong>UNVALIDATED HYPOTHESIS</strong>;</li>
        <li>нет net-of-cost OOS evidence → никакого current edge claim;</li>
        <li>эффект неустойчив к соседним boundaries → не превращать boundary в параметр системы;</li>
        <li>нет отдельного операционного разрешения → не отправлять сигнал, ордер, alert или parameter change.</li>
      </ul>
      <p><strong>Исправление публичной копии не является сертификацией стратегии.</strong> Эта страница не является торговым разрешением и не определяет время входа в позицию.</p>
    </section>

    <section class="public-repair-card public-repair-sources" aria-labelledby="regime-sources">
      <h2 id="regime-sources">Исследовательские источники</h2>
      <ul>
        <li><a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2326253" rel="noreferrer">Bailey et al. · The Probability of Backtest Overfitting</a></li>
        <li><a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2460551" rel="noreferrer">Bailey &amp; López de Prado · The Deflated Sharpe Ratio</a></li>
        <li><a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2345489" rel="noreferrer">Harvey &amp; Liu · Backtesting</a></li>
        <li><a href="https://arxiv.org/abs/2307.02375" rel="noreferrer">Tsaknaki, Lillo &amp; Mazzarisi · Bayesian change-point detection for order flow/market impact</a></li>
      </ul>
    </section>

    <aside class="public-repair-boundary">
      <strong>TRADING/YMYL AUTHORITY BOUNDARY</strong>
      <span>This page validates a research process, not an entry window. No timing bucket, historical expectancy or regime label is current trading authority without bound out-of-sample evidence and separate operational approval.</span>
    </aside>
  </div>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Возраст рыночного режима: как проверять timing buckets без универсального окна 30–120 минут","dateModified":"2026-08-15","description":"Evidence-bound framework for validating regime-age timing hypotheses without promoting a fixed historical time bucket to a universal trading rule.","isBasedOn":["https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2326253","https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2460551","https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2345489","https://arxiv.org/abs/2307.02375"]}</script>
  ${sharedStyle}
</article>`;

export const regimeTimingTradingRepairs = [
  {
    schema: 'crypto-guides.public-guide-repair.v1',
    repairId: 'regime-timing-validation-r1',
    slug: 'regime-timing-30-120-min',
    state: 'BOUNDED_PUBLIC_COPY_REPAIRED_REVIEW_REMAINS',
    expectedReviewStatus: 'YMYL_TRADING_REVIEW_REQUIRED',
    expectedCurrentness: 'REVIEW_REQUIRED',
    expectedYmyl: true,
    evidenceDoc: 'docs/CONTENT_REPAIR_REGIME_TIMING_EVIDENCE_R1.md',
    ymylBoundaryMarkers: [
      '30–120 минут — исследовательская гипотеза, не универсальное окно входа.',
      'Исправление публичной копии не является сертификацией стратегии.'
    ],
    articleHtml: regimeTimingArticle,
    requiredMarkers: [
      'data-public-guide-repair="regime-timing-validation-r1"',
      'YMYL_TRADING_REVIEW_REQUIRED',
      'REVIEW_REQUIRED',
      '30–120 минут — исследовательская гипотеза, не универсальное окно входа.',
      'UNVALIDATED HYPOTHESIS',
      'trial ledger',
      'out-of-sample',
      'Эта страница не является торговым разрешением',
      'Исправление публичной копии не является сертификацией стратегии.',
      'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2326253'
    ],
    forbiddenPatterns: [
      { label: 'historical best-bucket expectancy', pattern: /(?:30\s*[-–]\s*120\s*(?:мин|minutes?))[^<]{0,80}\+\$?14\.88/iu },
      { label: 'historical early-bucket expectancy', pattern: /(?:0\s*[-–]\s*30\s*(?:мин|minutes?))[^<]{0,80}\+\$?4\.11/iu },
      { label: 'historical dead-zone expectancy', pattern: /(?:2\s*[-–]\s*6\s*(?:ч|hours?))[^<]{0,80}(?:−|-|&minus;)\$?2\.93/iu },
      { label: 'historical late-bucket expectancy', pattern: /(?:6\s*(?:ч|h)\+)[^<]{0,80}\+\$?9\.25/iu },
      { label: 'actionable fixed-window instruction', pattern: /(?:входи|входить|enter)[^<]{0,80}(?:30\s*[-–]\s*120)/iu },
      { label: 'universal dead-zone instruction', pattern: /(?:избегай|avoid)[^<]{0,80}(?:2\s*[-–]\s*6\s*(?:ч|hours?))/iu }
    ]
  }
];
