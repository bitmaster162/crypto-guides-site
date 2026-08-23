const sharedStyle = `<style>
  .public-repair-page{padding:40px 0 60px}.public-repair-container{max-width:860px}.public-repair-header{margin-bottom:26px}.public-repair-kicker{font:800 .68rem var(--font-mono);letter-spacing:.1em;color:var(--gold);margin-bottom:10px}.public-repair-header h1{font-size:clamp(2rem,5vw,3.7rem);line-height:1.02;margin:0 0 14px}.public-repair-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}.public-repair-meta span{border:1px solid var(--line);border-radius:999px;padding:4px 8px;font:700 .58rem var(--font-mono);color:var(--muted)}.public-repair-lead{font-size:1.05rem;color:var(--muted);line-height:1.65}.public-repair-card{margin:14px 0;padding:20px;border:1px solid var(--line);border-radius:var(--radius);background:var(--paper-soft)}.public-repair-card h2{margin:0 0 10px;font-size:1.08rem}.public-repair-card p,.public-repair-card li{color:var(--muted);line-height:1.65}.public-repair-card li+li{margin-top:8px}.public-repair-card code{font-family:var(--font-mono);color:var(--ink)}.public-repair-sources a{color:var(--blue);font-weight:700}.public-repair-boundary{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;padding:16px 18px;border:1px solid rgba(255,178,46,.4);border-radius:var(--radius);background:rgba(255,178,46,.05)}.public-repair-boundary strong{color:var(--gold);font:800 .68rem var(--font-mono)}.public-repair-boundary span{color:var(--muted);font-size:.82rem}@media(max-width:620px){.public-repair-page{padding-top:28px}.public-repair-card{padding:16px}}
</style>`;

const frontierCostRoutingArticle = String.raw`<article class="article-page public-repair-page" data-public-guide-repair="frontier-cost-routing-vendor-state-r1" data-repair-state="BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS">
  <div class="container public-repair-container">
    <header class="public-repair-header">
      <div class="public-repair-kicker">PUBLIC REPAIR · DATED COST ROUTING</div>
      <h1>Frontier models и cost-routing: как не превращать ценовой snapshot в billing authority</h1>
      <div class="public-repair-meta">
        <span>Публичная редакция: 2026-08-15</span>
        <span>VOLATILE_VENDOR_STATE</span>
        <span>REVERIFY_REQUIRED</span>
      </div>
      <p class="public-repair-lead">Cost-routing полезен как архитектурный принцип, но статическая таблица моделей, цен, context limits и «лучших» ролей быстро устаревает. Эта редакция сохраняет метод: выбирать достаточную модель по измеренному workload, актуальной цене и ограничениям, а не по замороженному рейтингу середины 2026 года.</p>
    </header>

    <section class="public-repair-card" aria-labelledby="fcr-drift">
      <h2 id="fcr-drift">Почему старый matrix нельзя считать текущим</h2>
      <p>Первичные vendor docs уже демонстрируют drift относительно восстановленной таблицы: Google обновляла Gemini Flash lineup и pricing; xAI изменила модельный ряд и после Grok 4.3 выпустила Grok 4.5; DeepSeek публикует отдельные cache-hit/cache-miss цены и прямо предупреждает, что цены могут меняться. Даже когда конкретная строка сегодня совпадает с vendor page, это не превращает её в долговечный billing contract.</p>
      <p>Поэтому публичная страница не воспроизводит полный «актуальный прайс-лист». Она фиксирует источник и дату проверки, а оперативный router должен получать model ID, цену и limits из свежего provider authority или контролируемого registry snapshot.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="fcr-method">
      <h2 id="fcr-method">Нормальный cost-routing contract</h2>
      <ul>
        <li><strong>Capability gate:</strong> сначала определить обязательные возможности задачи — reasoning, coding, vision, tool use, structured output, context size, latency/SLA и safety/access constraints.</li>
        <li><strong>Current vendor state:</strong> привязать exact model ID, availability, rate limits, context/output limits и pricing к timestamp и первичному provider source.</li>
        <li><strong>Workload evidence:</strong> сравнивать модели на собственном representative eval set, а не по одной vendor benchmark chart.</li>
        <li><strong>Total cost:</strong> учитывать input, cached input, output/reasoning, tools/search, retries, long-context tiers, batch/priority modes и provider-specific surcharges, если они применимы.</li>
        <li><strong>Fallback:</strong> заранее определить поведение при retirement, alias redirect, quota exhaustion, region/provider outage или резком изменении цены.</li>
        <li><strong>Authority:</strong> router может рекомендовать или выбирать внутри заранее разрешённого model pool, но не должен сам покупать plan, повышать billing limit или добавлять нового платного provider без отдельного разрешения.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="fcr-examples">
      <h2 id="fcr-examples">Что подтверждает volatile nature прямо сейчас</h2>
      <ul>
        <li>OpenAI публикует GPT‑5.5 как API model с отдельными standard, cached-input и long-context pricing rules. Это пример того, почему одной пары input/output чисел недостаточно для полного cost estimate.</li>
        <li>Google публикует stable и preview Gemini models раздельно; актуальная models/pricing surface уже отличается от более раннего mid-2026 matrix.</li>
        <li>xAI документирует Grok 4.3 и последующий Grok 4.5, а migration docs показывают, что retired aliases могут перенаправляться на другой model с другим billing.</li>
        <li>DeepSeek V4 pricing разделяет cache-hit и cache-miss input и отдельно указывает output price, одновременно рекомендуя регулярно проверять страницу на изменения.</li>
      </ul>
      <p>Эти примеры нужны не для нового вечного рейтинга. Они доказывают, что routing registry должен быть versioned, timestamped и revalidated.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="fcr-eval">
      <h2 id="fcr-eval">Цена ≠ качество, benchmark ≠ ваш workload</h2>
      <p>«Самая дешёвая достаточная модель» определяется только после task-specific evaluation. Для agentic workload полезно измерять completion success, verifier acceptance, tool-call correctness, latency distribution, token consumption, retry rate и failure severity. Vendor benchmarks можно использовать как discovery evidence, но не как автоматический production-ranking.</p>
      <p>Фиксированные tiers вроде commodity / interactive / high-stakes могут быть удобной policy abstraction, однако принадлежность конкретной модели к tier должна следовать из текущего eval и governance, а не из названия модели или старой таблицы.</p>
    </section>

    <section class="public-repair-card public-repair-sources" aria-labelledby="fcr-sources">
      <h2 id="fcr-sources">Первичные provider sources, проверено 2026-08-15</h2>
      <ul>
        <li><a href="https://developers.openai.com/api/docs/models/gpt-5.5" rel="noreferrer">OpenAI API · GPT‑5.5 model</a> — current model ID, context/output limits and token pricing surface.</li>
        <li><a href="https://ai.google.dev/gemini-api/docs/models" rel="noreferrer">Google Gemini API · Models</a> и <a href="https://ai.google.dev/gemini-api/docs/pricing" rel="noreferrer">Pricing</a> — current stable/preview lineup and provider pricing.</li>
        <li><a href="https://docs.x.ai/developers/models" rel="noreferrer">xAI · Models</a>, <a href="https://docs.x.ai/developers/models/grok-4.3" rel="noreferrer">Grok 4.3</a> и <a href="https://x.ai/news/grok-4-5" rel="noreferrer">Grok 4.5 announcement</a> — current lineup plus later model release.</li>
        <li><a href="https://api-docs.deepseek.com/quick_start/pricing" rel="noreferrer">DeepSeek API · Models & Pricing</a> — cache-hit/cache-miss/output pricing and explicit price-change warning.</li>
        <li><a href="https://www.anthropic.com/claude/fable" rel="noreferrer">Anthropic · Claude Fable</a> — vendor product surface; exact billing/access remains independently revalidated.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="fcr-use">
      <h2 id="fcr-use">Допустимая область использования</h2>
      <p>Используйте страницу как specification для versioned model registry и workload router. Перед operational decision обновите provider facts, пересчитайте total cost на реальном token/tool profile и прогоните текущий eval set.</p>
      <p><strong>Эта страница не является разрешением на покупку подписки, увеличение billing limit, добавление платного provider, deployment или автоматическое изменение production model routing.</strong></p>
    </section>

    <aside class="public-repair-boundary">
      <strong>VENDOR-STATE BOUNDARY</strong>
      <span>This pricing snapshot is dated, not billing authority. Model IDs, availability, prices, limits, aliases, plans, provider distribution and comparative performance must be reverified before operational use.</span>
    </aside>
  </div>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Frontier models and cost routing: dated vendor-state repair","dateModified":"2026-08-15","description":"Cost-routing methodology separated from stale static model pricing, rankings and billing authority.","isBasedOn":["https://developers.openai.com/api/docs/models/gpt-5.5","https://ai.google.dev/gemini-api/docs/models","https://ai.google.dev/gemini-api/docs/pricing","https://docs.x.ai/developers/models","https://api-docs.deepseek.com/quick_start/pricing","https://www.anthropic.com/claude/fable"]}</script>
  ${sharedStyle}
</article>`;

export const frontierVendorRepairs = [
  {
    schema: 'crypto-guides.public-guide-repair.v1',
    repairId: 'frontier-cost-routing-vendor-state-r1',
    slug: 'frontier-models-cost-routing',
    state: 'BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS',
    expectedReviewStatus: 'VOLATILE_VENDOR_STATE',
    expectedCurrentness: 'REVERIFY_REQUIRED',
    evidenceDoc: 'docs/CONTENT_REVIEW_FRONTIER_COST_ROUTING_EVIDENCE_R1.md',
    articleHtml: frontierCostRoutingArticle,
    requiredMarkers: [
      'data-public-guide-repair="frontier-cost-routing-vendor-state-r1"',
      'VOLATILE_VENDOR_STATE',
      'REVERIFY_REQUIRED',
      'This pricing snapshot is dated, not billing authority.',
      'Capability gate:',
      'Workload evidence:',
      'https://developers.openai.com/api/docs/models/gpt-5.5',
      'https://ai.google.dev/gemini-api/docs/pricing',
      'https://docs.x.ai/developers/models/grok-4.3',
      'https://api-docs.deepseek.com/quick_start/pricing'
    ],
    forbiddenPatterns: [
      { label: 'legacy fixed Fable/DeepSeek ratio', pattern: /28\s*(?:x|×|раз)/iu },
      { label: 'legacy fixed context-block Fable cost', pattern: /Fable(?:\s+5)?[\s\S]{0,80}\$0\.065/iu },
      { label: 'legacy fixed context-block DeepSeek cost', pattern: /DeepSeek(?:\s+V4\s+Pro)?[\s\S]{0,80}\$0\.002/iu },
      { label: 'legacy Gemini Flash price pair', pattern: /Gemini\s+3\.5\s+Flash[\s\S]{0,100}\$0\.5[0]?\s*(?:\/|and)[\s\S]{0,30}\$3(?:\.0+)?/iu },
      { label: 'legacy Grok 4.3 output price', pattern: /Grok\s+4\.3[\s\S]{0,100}\$1\.25[\s\S]{0,40}\$2(?:\.0+)?(?:\D|$)/iu },
      { label: 'legacy DeepSeek output price', pattern: /DeepSeek\s+V4\s+Pro[\s\S]{0,100}\$0\.435[\s\S]{0,40}\$1\.2/iu },
      { label: 'automatic cheapest-model authority', pattern: /automatically\s+(?:select|choose)[\s\S]{0,80}cheapest/iu },
      { label: 'permanent best model ranking', pattern: /(?:best|лучша(?:я|ий))\s+(?:current\s+)?model[\s\S]{0,80}(?:always|всегда)/iu }
    ]
  }
];
