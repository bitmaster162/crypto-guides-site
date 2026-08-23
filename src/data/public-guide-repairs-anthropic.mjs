const sharedStyle = `<style>
  .public-repair-page{padding:40px 0 60px}.public-repair-container{max-width:860px}.public-repair-header{margin-bottom:26px}.public-repair-kicker{font:800 .68rem var(--font-mono);letter-spacing:.1em;color:var(--gold);margin-bottom:10px}.public-repair-header h1{font-size:clamp(2rem,5vw,3.7rem);line-height:1.02;margin:0 0 14px}.public-repair-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}.public-repair-meta span{border:1px solid var(--line);border-radius:999px;padding:4px 8px;font:700 .58rem var(--font-mono);color:var(--muted)}.public-repair-lead{font-size:1.05rem;color:var(--muted);line-height:1.65}.public-repair-card{margin:14px 0;padding:20px;border:1px solid var(--line);border-radius:var(--radius);background:var(--paper-soft)}.public-repair-card h2{margin:0 0 10px;font-size:1.08rem}.public-repair-card p,.public-repair-card li{color:var(--muted);line-height:1.65}.public-repair-card li+li{margin-top:8px}.public-repair-card code{font-family:var(--font-mono);color:var(--ink)}.public-repair-sources a{color:var(--blue);font-weight:700}.public-repair-boundary{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;padding:16px 18px;border:1px solid rgba(255,178,46,.4);border-radius:var(--radius);background:rgba(255,178,46,.05)}.public-repair-boundary strong{color:var(--gold);font:800 .68rem var(--font-mono)}.public-repair-boundary span{color:var(--muted);font-size:.82rem}@media(max-width:620px){.public-repair-page{padding-top:28px}.public-repair-card{padding:16px}}
</style>`;

const anthropicModelsArticle = String.raw`<article class="article-page public-repair-page" data-public-guide-repair="anthropic-models-vendor-state-r1" data-repair-state="BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS">
  <div class="container public-repair-container">
    <header class="public-repair-header">
      <div class="public-repair-kicker">PUBLIC REPAIR · DATED VENDOR STATE</div>
      <h1>Anthropic models: как читать upgrade-рекомендации без устаревшего vendor snapshot</h1>
      <div class="public-repair-meta">
        <span>Публичная редакция: 2026-08-15</span>
        <span>VOLATILE_VENDOR_STATE</span>
        <span>REVERIFY_REQUIRED</span>
      </div>
      <p class="public-repair-lead">Модельный lineup, доступность, цены, plan inclusion и provider distribution меняются быстрее, чем архитектурные принципы. Поэтому эта страница фиксирует только датированные факты из Anthropic и не превращает snapshot середины 2026 года в вечный рейтинг «best/default».</p>
    </header>

    <section class="public-repair-card" aria-labelledby="am-timeline">
      <h2 id="am-timeline">Датированная timeline, а не present-tense миф</h2>
      <ul>
        <li><strong>2026-06-09:</strong> Anthropic объявила Claude Fable 5 и Claude Mythos 5.</li>
        <li><strong>2026-06-12:</strong> после правительственной export-control directive Anthropic временно отключила доступ к Fable 5 и Mythos 5 для пользователей.</li>
        <li><strong>2026-06-30:</strong> Anthropic сообщила, что export controls сняты, и объявила восстановление Fable 5 с 1 июля.</li>
        <li><strong>2026-07-01:</strong> официальный update зафиксировал восстановление доступа к Fable 5 и Mythos 5.</li>
        <li><strong>2026-06-30:</strong> отдельно был представлен Claude Sonnet 5, поэтому более ранний lineup, ограниченный Sonnet 4.6 и Opus 4.8, уже не является полным current-model inventory.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="am-models">
      <h2 id="am-models">Что можно утверждать про Fable, Mythos и Sonnet</h2>
      <p>Anthropic описывает Fable 5 и Mythos 5 как варианты одного underlying model с разными safeguard/access profiles. Fable предназначен для более общего использования с safeguards, а Mythos — для более ограниченных trusted/research contexts с ослабленными safeguards в разрешённых областях.</p>
      <p>Anthropic также объявила Sonnet 5 как новый Sonnet-class model и указала API identifier <code>claude-sonnet-5</code> в announcement от 30 июня 2026 года. Это датированный vendor fact, а не гарантия неизменности идентификатора, plan policy или cloud availability.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="am-upgrade">
      <h2 id="am-upgrade">Правильная upgrade-логика</h2>
      <p>Выбор модели должен исходить из текущего task profile и свежей vendor документации: quality, latency, tool use, context/output limits, safety profile, API availability, rate limits и total cost. Нельзя автоматически назначать одну модель «текущим дефолтом» только потому, что она была сильнейшей в старом snapshot.</p>
      <p>Если upgrade зависит от benchmark или цены, эти параметры нужно привязать к дате, методологии и текущей официальной странице. В этой bounded версии статическая pricing table намеренно не используется как billing authority.</p>
    </section>

    <section class="public-repair-card public-repair-sources" aria-labelledby="am-sources">
      <h2 id="am-sources">Официальные источники Anthropic, проверено 2026-08-15</h2>
      <ul>
        <li><a href="https://www.anthropic.com/news/claude-fable-5-mythos-5" rel="noreferrer">Claude Fable 5 and Claude Mythos 5</a> — launch, model relationship and access framing.</li>
        <li><a href="https://www.anthropic.com/news/fable-mythos-access" rel="noreferrer">Statement on the US government directive</a> — June 12 suspension.</li>
        <li><a href="https://www.anthropic.com/news/redeploying-fable-5" rel="noreferrer">Redeploying Fable 5</a> — export controls lifted and July 1 restoration.</li>
        <li><a href="https://www.anthropic.com/news/fable-safeguards-jailbreak-framework" rel="noreferrer">Fable 5 safeguards update</a> — post-redeployment global-availability statement.</li>
        <li><a href="https://www.anthropic.com/news/claude-sonnet-5" rel="noreferrer">Introducing Claude Sonnet 5</a> — dated Sonnet 5 availability/API announcement.</li>
      </ul>
    </section>

    <aside class="public-repair-boundary">
      <strong>VENDOR-STATE BOUNDARY</strong>
      <span>This vendor snapshot is dated, not durable authority. Exact pricing, model IDs, context/output limits, plan inclusion, cloud-provider availability, rate limits and comparative benchmark claims must be reverified from current Anthropic documentation before operational use.</span>
    </aside>
  </div>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Anthropic models and upgrades: dated vendor-state repair","dateModified":"2026-08-15","description":"Dated Anthropic model-state timeline separated from durable upgrade guidance.","isBasedOn":["https://www.anthropic.com/news/claude-fable-5-mythos-5","https://www.anthropic.com/news/fable-mythos-access","https://www.anthropic.com/news/redeploying-fable-5","https://www.anthropic.com/news/fable-safeguards-jailbreak-framework","https://www.anthropic.com/news/claude-sonnet-5"]}</script>
  ${sharedStyle}
</article>`;

const fableMythosArticle = String.raw`<article class="article-page public-repair-page" data-public-guide-repair="fable-mythos-vendor-state-r1" data-repair-state="BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS">
  <div class="container public-repair-container">
    <header class="public-repair-header">
      <div class="public-repair-kicker">PUBLIC REPAIR · DATED VENDOR STATE</div>
      <h1>Fable 5 и Mythos 5: доступ, safeguards и границы текущих утверждений</h1>
      <div class="public-repair-meta">
        <span>Публичная редакция: 2026-08-15</span>
        <span>VOLATILE_VENDOR_STATE</span>
        <span>REVERIFY_REQUIRED</span>
      </div>
      <p class="public-repair-lead">История Fable/Mythos в июне–июле 2026 года показывает, почему vendor availability нельзя описывать одной недатированной фразой. Была реальная приостановка доступа, но затем export controls были сняты и доступ восстановлен.</p>
    </header>

    <section class="public-repair-card" aria-labelledby="fm-timeline">
      <h2 id="fm-timeline">Что произошло</h2>
      <ul>
        <li><strong>9 июня 2026:</strong> Anthropic представила Claude Fable 5 и Claude Mythos 5.</li>
        <li><strong>12 июня 2026:</strong> Anthropic сообщила о directive, из-за которой доступ к обеим моделям был остановлен.</li>
        <li><strong>30 июня 2026:</strong> компания объявила, что export controls сняты.</li>
        <li><strong>1 июля 2026:</strong> Anthropic зафиксировала восстановление доступа к Fable 5 и Mythos 5.</li>
      </ul>
      <p>Поэтому июньская suspension — исторический факт, но её нельзя переносить в текущую страницу как бессрочное состояние «модель недоступна/нестабильна».</p>
    </section>

    <section class="public-repair-card" aria-labelledby="fm-relationship">
      <h2 id="fm-relationship">Один underlying model, разные access/safeguard profiles</h2>
      <p>Anthropic описывает Mythos 5 как тот же underlying model, что и Fable 5, но с иным safeguard profile для ограниченных trusted contexts. Общедоступность Fable и доступ к Mythos — разные вещи; Mythos остаётся более ограниченным и зависит от допуска/программы.</p>
      <p>Это distinction можно использовать как design lesson для agent routing: model capability, safety policy и access authority должны храниться раздельно. Но точная plan/provider availability всё равно требует fresh vendor read.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="fm-agents">
      <h2 id="fm-agents">Что это значит для agent architecture</h2>
      <p>Нельзя кодировать routing вокруг предположения, что одна конкретная frontier-модель всегда доступна. Надёжнее иметь capability-based routing, explicit fallback policy, vendor-state timestamp и fail-closed handling для недоступной модели.</p>
      <p>Это архитектурная рекомендация, а не утверждение, что Fable/Mythos сейчас должен быть выбран вашим production system.</p>
    </section>

    <section class="public-repair-card public-repair-sources" aria-labelledby="fm-sources">
      <h2 id="fm-sources">Официальные источники Anthropic, проверено 2026-08-15</h2>
      <ul>
        <li><a href="https://www.anthropic.com/news/claude-fable-5-mythos-5" rel="noreferrer">Claude Fable 5 and Claude Mythos 5</a>.</li>
        <li><a href="https://www.anthropic.com/news/fable-mythos-access" rel="noreferrer">June 12 access suspension statement</a>.</li>
        <li><a href="https://www.anthropic.com/news/redeploying-fable-5" rel="noreferrer">June 30 redeployment announcement</a>.</li>
        <li><a href="https://www.anthropic.com/claude/mythos" rel="noreferrer">Claude Mythos product page</a> — restricted-access framing.</li>
        <li><a href="https://www.anthropic.com/claude/fable" rel="noreferrer">Claude Fable product page</a> — restored rollout/current product surface.</li>
      </ul>
    </section>

    <aside class="public-repair-boundary">
      <strong>VENDOR-STATE BOUNDARY</strong>
      <span>This vendor snapshot is dated, not durable authority. Availability, trusted-access eligibility, safeguards, pricing, plans, model IDs and provider distribution can change and must be reverified before operational use.</span>
    </aside>
  </div>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Fable 5 and Mythos 5: dated vendor-state repair","dateModified":"2026-08-15","description":"Dated availability and safeguard profile history for Claude Fable 5 and Mythos 5.","isBasedOn":["https://www.anthropic.com/news/claude-fable-5-mythos-5","https://www.anthropic.com/news/fable-mythos-access","https://www.anthropic.com/news/redeploying-fable-5","https://www.anthropic.com/claude/mythos","https://www.anthropic.com/claude/fable"]}</script>
  ${sharedStyle}
</article>`;

const sharedForbidden = [
  { label: 'stale unstable-availability blanket', pattern: /availability\s+is\s+unstable/iu },
  { label: 'stale unavailable present tense', pattern: /Fable\s+5\s+(?:is|remains)\s+(?:currently\s+)?unavailable/iu },
  { label: 'stale Opus default ranking', pattern: /Opus\s+4\.8[\s\S]{0,120}(?:best|default|most\s+reliable|most\s+powerful)[\s\S]{0,80}(?:Anthropic|Claude)/iu },
  { label: 'stale complete-frontier framing', pattern: /Sonnet\s+4\.6[\s\S]{0,120}Opus\s+4\.8[\s\S]{0,120}(?:current\s+frontier|complete\s+lineup)/iu },
  { label: 'static Fable pricing authority', pattern: /\$10[\s\S]{0,80}(?:million|1M)[\s\S]{0,120}\$50[\s\S]{0,80}(?:million|1M)/iu }
];

export const anthropicVendorRepairs = [
  {
    schema: 'crypto-guides.public-guide-repair.v1',
    repairId: 'anthropic-models-vendor-state-r1',
    slug: 'anthropic-models-and-upgrade',
    state: 'BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS',
    expectedReviewStatus: 'VOLATILE_VENDOR_STATE',
    expectedCurrentness: 'REVERIFY_REQUIRED',
    evidenceDoc: 'docs/CONTENT_REVIEW_ANTHROPIC_VENDOR_STATE_EVIDENCE_R1.md',
    articleHtml: anthropicModelsArticle,
    requiredMarkers: [
      'data-public-guide-repair="anthropic-models-vendor-state-r1"',
      'VOLATILE_VENDOR_STATE',
      'REVERIFY_REQUIRED',
      '2026-06-12',
      '2026-07-01',
      'Claude Sonnet 5',
      'claude-sonnet-5',
      'This vendor snapshot is dated, not durable authority.',
      'https://www.anthropic.com/news/claude-fable-5-mythos-5',
      'https://www.anthropic.com/news/redeploying-fable-5',
      'https://www.anthropic.com/news/claude-sonnet-5'
    ],
    forbiddenPatterns: sharedForbidden
  },
  {
    schema: 'crypto-guides.public-guide-repair.v1',
    repairId: 'fable-mythos-vendor-state-r1',
    slug: 'fable-mythos-agents-2026',
    state: 'BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS',
    expectedReviewStatus: 'VOLATILE_VENDOR_STATE',
    expectedCurrentness: 'REVERIFY_REQUIRED',
    evidenceDoc: 'docs/CONTENT_REVIEW_ANTHROPIC_VENDOR_STATE_EVIDENCE_R1.md',
    articleHtml: fableMythosArticle,
    requiredMarkers: [
      'data-public-guide-repair="fable-mythos-vendor-state-r1"',
      'VOLATILE_VENDOR_STATE',
      'REVERIFY_REQUIRED',
      '9 июня 2026',
      '12 июня 2026',
      '1 июля 2026',
      'underlying model',
      'This vendor snapshot is dated, not durable authority.',
      'https://www.anthropic.com/news/claude-fable-5-mythos-5',
      'https://www.anthropic.com/news/redeploying-fable-5',
      'https://www.anthropic.com/claude/mythos'
    ],
    forbiddenPatterns: sharedForbidden
  }
];
