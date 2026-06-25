export async function GET() {
	const guides = [
  {"id": "mem-agent-active-inference-057", "type": "protocol", "human_title": "Active Inference Agents: Принцип Свободной Энергии, Одеяло Маркова и Механика Тильта", "agent_summary": "Active Inference Agent Architecture (FEP/VFE/EFE). Implements Markov Blanket states (sensory s, active a, internal mu, external eta). Minimizes Variational Free Energy (F = Complexity - Accuracy) for perception. Minimizes Expected Free Energy (G = Risk + Ambiguity) for policy selection, balancing pragmatic value (goal-seeking) and epistemic value (active exploration). Precision weighting of prediction errors coded by neuromodulators (Dopamine for error precision, Acetylcholine for sensory precision). Exposes the Hyper-Precision Tilt Loop (high unresolvable error causing sensory precision saturation and locking active inference commands) and the 3-step metacognitive recovery protocol.", "tags": ["active-inference", "fep", "markov-blanket", "free-energy", "precision-weighting", "tilt-recovery"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"dopamine_precision_scale": 1.0, "acetylcholine_sensory_gain": 1.0, "tilt_invalidation_threshold_vfe": 3.0}}, "safety_guards": [{"rule": "block_on_vfe_anomaly", "max_limit": 3.0, "action_on_breach": "sensory_deprivation_cooldown"}]},
  {"id": "mem-agent-delegation-047", "type": "safety_guard", "human_title": "Adaptive Delegation Gate: Шлюз адаптивного делегирования полномочий ИИ-агентов", "agent_summary": "Adaptive delegation security gate classifying task permissions from D0 (Read-Only) to D3 (External Side Effects). Prevents autonomy drift and unauthorized prompt-based permission expansion.", "tags": ["ai-safety", "coordination", "delegation-gate", "authority", "permission-control"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"default_security_class": "D0", "enforce_dry_run_on_d3": true}}, "safety_guards": [{"rule": "block_unapproved_d2_writes", "max_limit": 1.0, "action_on_breach": "reject_write_and_log"}, {"rule": "block_autonomous_d3_actions", "max_limit": 0.0, "action_on_breach": "halt_and_request_human_signature"}]},
  {"id": "mem-trading-af-xdp-053", "type": "protocol", "human_title": "Ingress-пайплайн: DPDK / AF_XDP Kernel Bypass и Gossip-сеть", "agent_summary": "Hardware alignment and kernel bypass network ingress pipeline using ConnectX-6 NIC, F-Stack, AF_XDP, and lock-free rings. Core pinning assigns specific CPU cores to network polling, Hawkes math calculation, and order execution to achieve microsecond latency.", "tags": ["ingress", "dpdk", "af-xdp", "kernel-bypass", "f-stack", "core-pinning"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"nic_interface": "ens1f0", "cpu_core_pinning": {"os_and_interrupts": 0, "f_stack_network_poll": 1, "hawkes_mle_math": 2, "order_execution": 3}, "ring_buffer_type": "PureCdefSpscQueue"}}, "safety_guards": [{"rule": "packet_processing_timeout_ms", "max_limit": 1.0, "action_on_breach": "alert_and_reconnect"}, {"rule": "cpu_utilization_cap", "max_limit": 100.0, "action_on_breach": "log_health_check"}]},
  {"id": "mem-agent-healing-021", "type": "safety_guard", "human_title": "Self-Healing & Anti-Drift: Детерминированная отказоустойчивость ИИ-агентов", "agent_summary": "Self-healing protocol for agentic workflows. Uses OODA (Observe-Orient-Decide-Act) cycles, capability passports (SAP), and atomic state checkpoints. Implements auto-reconciliation of runtime states and targeted repair hooks (targeted-heal-on-reconcile).", "tags": ["ai-safety", "self-healing", "anti-drift", "ooda", "governance"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"reconciliation_interval_seconds": 30.0, "max_drift_threshold": 0.02}}, "safety_guards": [{"rule": "targeted_heal_on_reconcile", "max_limit": 1.0, "action_on_breach": "force_reconcile_state"}]},
  {"id": "mem-agent-antilooping-045", "type": "safety_guard", "human_title": "Anti-Looping Monitor: Обнаружение и предотвращение бесконечных циклов ИИ-агентов", "agent_summary": "Deterministic watchdog protocol detecting infinite task execution loops. Monitors command signatures, state changes, and tool call hashes. Triggers emergency cooldown or model temp adjustment upon loop detection.", "tags": ["ai-safety", "anti-looping", "watchdog", "self-healing", "runaway-process"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"max_repeated_tool_calls": 3, "state_drift_threshold_percent": 0.05, "max_turn_execution_count": 20}}, "safety_guards": [{"rule": "block_repetitive_execution", "max_limit": 3.0, "action_on_breach": "trigger_model_temperature_skew"}, {"rule": "terminate_runaway_session", "max_limit": 20.0, "action_on_breach": "halt_and_signal_operator"}]},
  {"id": "mem-trading-avellaneda-035", "type": "strategy", "human_title": "Модель Авелланеда-Стойкова: Контроль инвентарного риска в крипто-маркетмейкинге", "agent_summary": "Avellaneda-Stoikov market making model with inventory risk parameters. Dynamically skews bid-ask spreads around reservation price based on current inventory, preventing high directional risk accumulation.", "tags": ["trading", "market-making", "inventory-risk", "avellaneda-stoikov", "microstructure"], "params": {"contracts": [], "rpc_endpoints": ["https://fapi.binance.com/fapi/v1/depth"], "constants": {"gamma": 0.1, "sigma": 0.02, "k": 1.5, "max_inventory": 0.05}}, "safety_guards": [{"rule": "max_inventory_drift_limit", "max_limit": 0.05, "action_on_breach": "halt_new_quotes"}]},
  {"id": "mem-trading-avx512-hawkes-066", "type": "hft_execution", "human_title": "AVX-512 Vectorized Hawkes Engine & Real-time Iceberg Detector", "agent_summary": "Vectorized C++ implementation of a 6-dimensional Hawkes process intensity estimator using Intel AVX-512 instructions, and a 5-microsecond real-time iceberg refill detector.", "tags": ["hft", "avx-512", "hawkes-process", "iceberg-detector", "order-book", "c++"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"hawkes_dimensions": 6, "hawkes_window_events": 100000, "iceberg_refill_threshold_ns": 5000}}, "safety_guards": []},
  {"id": "mem-trading-bybit-uta-054", "type": "safety_guard", "human_title": "Bybit UTA Stress-Test Grid & Defensive Veto", "agent_summary": "Enforce risk margin checks against Bybit UTA PM stress-test grid. Monitor margin utilization, available USDC, and risk warning flags. Transition to DEFER state (defensive veto) on breach, or SPECULATIVE state on tick gaps. Dynamically scale scan range from 10% to 30% on ATR spikes.", "tags": ["risk-management", "bybit-uta", "stress-test", "margin", "safety-guard", "defensive-veto"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"stress_test_grid_dimensions": [11, 11], "baseline_scan_range_percent": 10.0, "volatile_scan_range_percent": 30.0, "atr_volatility_threshold_bps": 2000.0}}, "safety_guards": [{"rule": "stress_test_is_dangerous", "max_limit": 1.0, "action_on_breach": "transition_to_defer"}, {"rule": "sequence_gap_detected", "max_limit": 1.0, "action_on_breach": "transition_to_speculative"}]},
  {"id": "mem-trading-bybit-sbe-062", "type": "hft_execution", "human_title": "Bybit UTA SBE (Simple Binary Encoding) DMA protocol & In-Memory L3 Orderbook Engine", "agent_summary": "Low-latency binary Simple Binary Encoding (SBE) v5 DMA protocol for Bybit, the fixed-offset binary memory layout, and the C++ In-Memory Orderbook Engine with Level 3 order queue tracking.", "tags": ["hft", "sbe", "bybit", "low-latency", "dma", "orderbook-engine"], "params": {"contracts": [], "rpc_endpoints": ["wss://stream.bybit.com/v5/trade-sbe"], "constants": {"sbe_schema_id": 5, "sbe_version": 1, "max_order_book_levels": 65536, "max_order_nodes": 262144}}, "safety_guards": []},
  {"id": "mem-trading-atr-022", "type": "strategy", "human_title": "Candle ATR & Grid Scaling: Оптимизация шага сетки под волатильность и фильтрация комиссионного трения", "agent_summary": "Volatility-based scaling of SL/TP brackets using Candle ATR instead of Tick ATR. Implements Fee Firewall to filter out micro-breakouts where transaction fees exceed price move.", "tags": ["trading", "grid", "atr", "volatility", "fees"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"atr_window_candles": 30, "atr_candle_interval": "1m", "min_step_atr_multiple": 1.0, "fee_firewall_bps": 6.7}}, "safety_guards": [{"rule": "fee_firewall_min_bracket_spacing", "max_limit": 6.7, "action_on_breach": "widen_bracket_or_reject"}]},
  {"id": "mem-agent-sap-027", "type": "specification", "human_title": "Capability Passports & SAP: Делегирование прав доступа ИИ-агентов и цифровые подписи", "agent_summary": "Agent capability passporting and signature validation protocol for secure execution. Enforces role boundaries (Scout, Scribe, Auditor, Executor), limits tool-calling permissions, and logs cryptographic traces.", "tags": ["ai-safety", "state-authority-plane", "capability-passports", "cryptography", "security"], "params": {"contracts": [{"name": "BitEvo Capability Passports Registry", "address": "0xSAP1111111111111111111111111111111111111", "chain": "arbitrum"}], "rpc_endpoints": ["http://localhost:8080/continuity/sync"], "constants": {"min_authority_level": "D2", "required_signatures_count": 1}}, "safety_guards": [{"rule": "block_unauthorized_tool_calls", "max_limit": 1.0, "action_on_breach": "abort_execution"}]},
  {"id": "mem-trading-pairs-028", "type": "strategy", "human_title": "Cointegration & Pairs Trading: Статистический арбитраж коррелированных пар", "agent_summary": "Statistical pairs trading and cointegration arbitrage. Identifies mean-reverting spreads between highly correlated assets (e.g., BTC/ETH, layer-2 tokens). Executes delta-neutral entries upon spread expansion.", "tags": ["trading", "pairs-trading", "cointegration", "statistical-arbitrage", "mean-reversion"], "params": {"contracts": [], "rpc_endpoints": ["https://fapi.binance.com/fapi/v1/klines"], "constants": {"confidence_level_pct": 95, "max_spread_zscore": 3.5, "reversion_zscore_trigger": 2.0}}, "safety_guards": [{"rule": "hard_stop_on_zscore_extreme", "max_limit": 3.5, "action_on_breach": "liquidate_pair"}]},
  {"id": "mem-agent-context-gc-037", "type": "safety_guard", "human_title": "Context Garbage Collection: Очистка контекста и предотвращение дрейфа внимания ИИ", "agent_summary": "Context window pruning and attention optimization protocol for LLM agents. Strips redundant terminal outputs, compresses history into semantic invariants, and preserves state checkpoints to prevent attention fragmentation.", "tags": ["ai-safety", "context-window", "garbage-collection", "attention-drift", "optimization"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"max_context_tokens": 128000, "pruning_threshold_percent": 80.0, "summary_interval_turns": 10}}, "safety_guards": [{"rule": "block_on_excessive_history", "max_limit": 102400.0, "action_on_breach": "trigger_state_compaction"}]},
  {"id": "mem-trading-crossdivergence-043", "type": "strategy", "human_title": "Cross-Exchange Divergence: Межбиржевой арбитраж в периоды ликвидационных сквизов", "agent_summary": "Cross-exchange high-frequency correlation arbitrage strategy. Capitalizes on pricing anomalies and liquidity mismatches between Binance, OKX, and Bybit during extreme leverage liquidation cascades.", "tags": ["trading", "arbitrage", "cross-exchange", "liquidation-cascade", "correlation-divergence"], "params": {"contracts": [{"name": "BTCUSDT Perpetual Binance", "address": "BTCUSDT", "chain": "binance_futures"}, {"name": "BTCUSDT Perpetual OKX", "address": "BTC-USDT-SWAP", "chain": "okx_futures"}], "rpc_endpoints": ["https://fapi.binance.com/fapi/v1/ticker/bookTicker", "https://www.okx.com/api/v5/market/ticker"], "constants": {"min_divergence_bps": 8.0, "max_execution_latency_ms": 25.0, "min_liquidation_volume_usd": 100000.0}}, "safety_guards": [{"rule": "block_on_extreme_latency", "max_limit": 25.0, "action_on_breach": "suspend_arbitrage"}]},
  {"id": "mem-trading-latency-arb-063", "type": "arbitrage", "human_title": "Cross-Vendor Latency Arbitrage (Bybit CLOB vs Hyperliquid L1)", "agent_summary": "Mathematical modeling of convergence latency between central exchanges (Bybit CLOB) and decentralized networks (Hyperliquid L1 under HyperBFT consensus), and sniping outdated MM quotes.", "tags": ["arbitrage", "latency", "bybit", "hyperliquid", "order-flow", "hft"], "params": {"contracts": [], "rpc_endpoints": ["https://api.hyperliquid.xyz", "https://api.bybit.com"], "constants": {"bybit_to_hl_network_latency_ms": 12.0, "max_matching_slippage_bps": 5.0}}, "safety_guards": []},
  {"id": "mem-agent-trace-033", "type": "specification", "human_title": "Decision Trace: Логирование трассировки решений и аудит шагов ИИ-агентов", "agent_summary": "Deterministic decision-trace logging protocol for autonomous agents. Stores model inputs, output rationales, security bounds, and verification flags in an immutable blackboard ledger.", "tags": ["ai-safety", "decision-trace", "audit-trail", "observability", "blackboard"], "params": {"contracts": [], "rpc_endpoints": ["http://localhost:8080/journal/entries"], "constants": {"trace_retention_days": 90, "max_trace_size_kb": 2048}}, "safety_guards": [{"rule": "require_precondition_validation", "max_limit": 1.0, "action_on_breach": "abort_execution"}]},
  {"id": "mem-trading-delist-ews-061", "type": "safety_guard", "human_title": "Delist Early Warning System: Система раннего предупреждения делистингов", "agent_summary": "Scrapes exchange CMS announcements for delisting keywords and monitors low-level market anomalies (volume drop, spread spike, price crash). Calculates a multi-factor risk score to flag critical assets before official delisting suspension.", "tags": ["monitoring", "delisting", "risk-management", "cms-scraping", "market-anomalies"], "params": {"contracts": [], "rpc_endpoints": ["https://api.binance.com/api/v3"], "constants": {"volume_collapse_threshold": 100000.0, "low_volume_limit": 500000.0, "spread_blowout_threshold": 0.03, "price_crash_threshold": -0.15, "delist_keywords": ["delist", "remove", "delisting", "monitoring", "suspension", "trading halt"], "weights": {"volume_collapse": 0.25, "liquidity_drain": 0.25, "spread_blowout": 0.2, "price_crash": 0.15, "announcement_mention": 0.1, "monitoring_tag": 0.05}, "convergence_bonuses": {"convergence_2x": 0.1, "convergence_3x": 0.2}}}, "safety_guards": [{"rule": "delist_risk_critical", "max_limit": 0.8, "action_on_breach": "halt_trading_liquidate"}, {"rule": "delist_risk_high", "max_limit": 0.6, "action_on_breach": "reduce_position_size"}]},
  {"id": "mem-trading-depth-liquidity-058", "type": "strategy", "human_title": "Depth Liquidity Policy: Анализ глубины стакана и оценка проскальзывания ликвидности", "agent_summary": "Order book depth sweep and slippage estimator from bot v12. Simulates full order executions against actual bids/asks levels. Applies tail penalty (5.0 bps) for any uncovered order portion and rejects trades with insufficient book coverage or excessive slippage.", "tags": ["microstructure", "order-book", "liquidity-sweep", "slippage-protection"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"min_displayed_coverage_ratio": 0.75, "max_sweep_slippage_bps": 3.0, "tail_penalty_bps": 5.0}}, "safety_guards": [{"rule": "displayed_coverage_ratio_drop", "max_limit": 0.75, "action_on_breach": "reject_execution"}, {"rule": "sweep_slippage_bps_breach", "max_limit": 3.0, "action_on_breach": "reject_execution"}]},
  {"id": "mem-trading-execution-drift-059", "type": "safety_guard", "human_title": "Execution Drift Daemon: Контроль расхождения реального исполнения и бэктеста", "agent_summary": "Execution drift monitoring daemon from bot v14. Compares live order execution quality metrics against backtest baselines. Detects deviations in fill ratios, queue clearing latencies, book depth sweeps, and entry reject rates. Triggers automatic size reduction or absolute trading cooldown.", "tags": ["monitoring", "execution-drift", "backtest-parity", "risk-management", "failsafe"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"min_expected_fill_ratio_factor_reduce": 0.85, "min_expected_fill_ratio_factor_observe": 0.65, "max_queue_clear_seconds_factor_reduce": 1.5, "max_queue_clear_seconds_factor_observe": 2.25, "max_queue_ahead_ratio_factor_reduce": 1.5, "max_queue_ahead_ratio_factor_observe": 2.25, "max_exit_depth_sweep_bps_add_reduce": 1.0, "max_exit_depth_sweep_bps_add_observe": 2.0, "min_exit_depth_coverage_ratio_drop_reduce": 0.15, "min_exit_depth_coverage_ratio_drop_observe": 0.3, "max_terminal_tail_ratio_reduce": 0.05, "max_terminal_tail_ratio_observe": 0.12, "max_entry_reject_rate_reduce": 0.25, "max_entry_reject_rate_observe": 0.5}}, "safety_guards": [{"rule": "execution_drift_reduce_size", "max_limit": 1.0, "action_on_breach": "reduce_size"}, {"rule": "execution_drift_observe_only", "max_limit": 1.0, "action_on_breach": "observe_only"}]},
  {"id": "mem-trading-fundingbasis-041", "type": "strategy", "human_title": "Arbitrage & Basis Convergence: Арбитраж ставок финансирования с учетом затухания проскальзывания", "agent_summary": "Spot-perpetual funding rate arbitrage and basis convergence trading strategy. Models execution slippage decay, transaction fees, and dynamic rebalancing thresholds to optimize net yield.", "tags": ["trading", "arbitrage", "funding-rate", "basis-trading", "slippage-decay"], "params": {"contracts": [{"name": "BTCUSDT Spot", "address": "BTCUSDT", "chain": "binance_spot"}, {"name": "BTCUSDT Perpetual", "address": "BTCUSDT", "chain": "binance_futures"}], "rpc_endpoints": ["https://api.binance.com/api/v3/ticker/bookTicker", "https://fapi.binance.com/fapi/v1/premiumIndex"], "constants": {"min_funding_annualized_percent": 12.0, "max_slippage_bps": 5.0, "maker_fee_rate": 0.0002, "taker_fee_rate": 0.0004}}, "safety_guards": [{"rule": "min_net_yield_threshold", "max_limit": 0.001, "action_on_breach": "abort_arbitrage_entry"}]},
  {"id": "mem-trading-funding-031", "type": "strategy", "human_title": "Funding Convergence: Кросс-биржевой арбитраж расхождения ставок финансирования", "agent_summary": "Cross-exchange funding rate convergence arbitrage. Identifies extreme funding rate differentials between exchanges (e.g. Binance vs Bybit) on the same asset and executes delta-neutral captures of the spread.", "tags": ["trading", "funding-arbitrage", "cross-exchange", "delta-neutral", "convergence"], "params": {"contracts": [], "rpc_endpoints": ["https://fapi.binance.com/fapi/v1/premiumIndex", "https://api.bybit.com/v5/market/tickers"], "constants": {"min_funding_spread_annualized": 0.15, "max_margin_ratio": 0.5, "rebalance_threshold_bps": 20}}, "safety_guards": [{"rule": "block_funding_arb_on_high_delta_drift", "max_limit": 0.05, "action_on_breach": "rebalance_portfolio"}]},
  {"id": "mem-trading-latency-032", "type": "strategy", "human_title": "HFT Latency & Order Lifetime: Минимизация задержек и оптимизация времени жизни ордера", "agent_summary": "Microsecond latency optimization and order lifetime strategies for crypto HFT. Reduces tick-to-trade time via direct websocket ingestion, ring buffers, and colocation placement groups.", "tags": ["trading", "latency", "hft", "order-lifetime", "infrastructure"], "params": {"contracts": [], "rpc_endpoints": ["https://fapi.binance.com/fapi/v1/time"], "constants": {"target_tick_to_trade_ms": 10.0, "max_tail_latency_p99_ms": 50.0, "websocket_buffer_size": 1024}}, "safety_guards": [{"rule": "reject_on_high_ingestion_delay", "max_limit": 100.0, "action_on_breach": "suspend_trading"}]},
  {"id": "mem-instructed-retriever-060", "type": "strategy", "human_title": "Instructed Retriever: Детерминированные планы поиска для ИИ-агентов", "agent_summary": "Instructed Retriever architecture (Databricks-style). Eliminates stochastic RAG drift by translating user queries and context constraints into deterministic search plans (metadata filters, partitioned bounds, and structured query generation). Implements query-to-plan translation using LLM compilers, structured index lookups (combining vector distance with strict relational predicates), and quality scoring of retrieved context.", "tags": ["instructed-retriever", "rag", "deterministic-search", "metadata-filtering", "query-translation", "rag-drift-mitigation"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"min_relevance_score": 0.75, "max_context_tokens": 4096, "routing_rules": {"relational": "SQL / Postgres metadata", "vector": "Cosine similarity via pgvector", "hybrid": "Reciprocal Rank Fusion (RRF)"}}}, "safety_guards": [{"rule": "min_relevance_score", "max_limit": 0.75, "action_on_breach": "fallback_to_deterministic_index"}, {"rule": "max_context_tokens", "max_limit": 4096, "action_on_breach": "truncate_to_top_k"}]},
  {"id": "mem-trading-leadlag-026", "type": "strategy", "human_title": "Lead-Lag Effect & Cross-Exchange: Кросс-биржевой арбитраж и референсное ценообразование", "agent_summary": "Lead-lag microstructural price discovery signals for cross-exchange trading. Uses a high-liquidity reference venue (e.g. Binance Futures) as a leading indicator to trade lagging venues (e.g. spot or smaller perp exchanges).", "tags": ["trading", "lead-lag", "cross-exchange", "arbitrage", "price-discovery"], "params": {"contracts": [], "rpc_endpoints": ["https://fapi.binance.com/fapi/v1/ticker/bookTicker"], "constants": {"reference_exchange": "Binance Futures", "target_exchange": "Local Spot / Smaller Perp", "min_lead_lag_threshold_bps": 3.0, "max_latency_tolerance_ms": 50}}, "safety_guards": [{"rule": "reject_stale_reference_price", "max_limit": 50.0, "action_on_breach": "abort_execution"}]},
  {"id": "mem-trading-liq-025", "type": "strategy", "human_title": "Liquidation Cascades & Funding Arbitrage: Использование каскадов принудительного закрытия позиций", "agent_summary": "Mechanics of leveraged liquidation cascades and funding rate arbitrage on crypto derivatives exchanges. Predicts market squeeze boundaries and executes delta-neutral captures of funding rate premiums.", "tags": ["trading", "liquidation", "funding-rate", "arbitrage", "delta-neutral"], "params": {"contracts": [], "rpc_endpoints": ["https://fapi.binance.com/fapi/v1/liquidationOrders"], "constants": {"funding_arbitrage_annualized_trigger": 0.2, "max_margin_ratio": 0.6, "oi_drop_rebound_threshold_pct": 20}}, "safety_guards": [{"rule": "block_funding_arb_on_high_delta_drift", "max_limit": 0.05, "action_on_breach": "rebalance_portfolio"}]},
  {"id": "mem-trading-queueposition-042", "type": "strategy", "human_title": "Queue Position Estimation: Оценка позиции в очереди стакана лимитных ордеров", "agent_summary": "Queue position estimation model for limit order book trading. Calculates the execution probability and queue position of limit orders using order flow events and cancellation patterns.", "tags": ["trading", "microstructure", "queue-position", "limit-order-book", "hft"], "params": {"contracts": [], "rpc_endpoints": ["wss://fstream.binance.com/ws/btcusdt@depth@100ms"], "constants": {"level_depth_target": 5, "max_queue_delay_ms": 3000.0, "min_fill_probability": 0.65}}, "safety_guards": [{"rule": "cancel_on_low_fill_probability", "max_limit": 0.65, "action_on_breach": "cancel_limit_order"}]},
  {"id": "mem-lsh-deduplication-059", "type": "strategy", "human_title": "MinHash & SimHash: Дедупликация и сжатие текстовых архивов", "agent_summary": "MinHash and SimHash LSH pipeline for de-duplicating and compressing large textual archives into CompactDigest records. Parameters: MinHash Jaccard threshold >= 0.55 ($n\\_perm=128$, $bands=32$, $rows=4$), SimHash Hamming distance <= 3 (strict) or <= 4 (soft inside clusters). Aggregates raw text into 200-400 validated CompactDigest records containing core summaries, key facts, and back-trace IDs.", "tags": ["lsh", "minhash", "simhash", "deduplication", "jaccard-similarity", "hamming-distance", "compact-digest"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"n_perm": 128, "bands": 32, "rows": 4, "jaccard_threshold": 0.55, "hamming_threshold_strict": 3, "hamming_threshold_soft": 4, "min_cluster_size": 6, "max_cluster_size": 120}}, "safety_guards": [{"rule": "max_dupes_pct", "max_limit": 0.35, "action_on_breach": "abort"}, {"rule": "min_quality_score", "max_limit": 0.92, "action_on_breach": "quarantine"}]},
  {"id": "mem-mirrorcore-compression-058", "type": "strategy", "human_title": "MirrorCore++: Временная согласованность и компрессия идентичности", "agent_summary": "MirrorCore++ Temporal Consistency & Identity Compression. Tone/Intent/NLI scoring and Temporal Consistency ($S_{adj}(t)$ and change-points binning) for identity preservation. Formula: $score = w_{tone} \\cdot \\cos(tone_i, tone_j) + w_{intent} \\cdot \\cos(intent_i, intent_j) - w_{contra} \\cdot P(contradiction)$ where weights are $0.4$, $0.4$, and $0.2$ respectively, with a min self-consistency gate of $0.92$. Temporal Binning: Scoring adjacent epochs $S_{adj}(t)$ over fine (7-14 days) and coarse (30-60 days) grids, flagging change-points when NLI-contradictions spike and stability drops.", "tags": ["mirrorcore", "temporal-consistency", "identity-compression", "nli-scoring", "hdbscan", "change-point-detection"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"w_tone": 0.4, "w_intent": 0.4, "w_contra": 0.2, "self_consistency_min": 0.92, "max_voice_drift_pct": 1.5, "max_dupes_pct": 0.35, "fine_bin_days": [7, 14], "coarse_bin_days": [30, 60]}}, "safety_guards": [{"rule": "min_self_consistency_score", "max_limit": 0.92, "action_on_breach": "quarantine"}, {"rule": "max_voice_drift_pct", "max_limit": 1.5, "action_on_breach": "quarantine"}, {"rule": "max_dupes_pct", "max_limit": 0.35, "action_on_breach": "quarantine"}]},
  {"id": "mem-agent-consensus-024", "type": "specification", "human_title": "Mixture-of-Agents (MoA): Консенсус и федеративное согласование ИИ-агентов", "agent_summary": "Mixture of Agents (MoA) and consensus protocols for multi-agent systems. Orchestrates specialized LLM agents (M15Trader, BiTMasteRAI) in collaborative debate structures. Implements CompositeTrader with 'debate_then_vote' arbitration and rule: priority=M15 on entries, Bitmaster on invalidations and bias.", "tags": ["ai-safety", "mixture-of-agents", "consensus", "arbitration", "composite-trader"], "params": {"contracts": [{"name": "BitEvo Memory Bridge Controller", "address": "0x4D4D4D4D4D4D4D4D4D4D4D4D4D4D4D4D4D4D4D4D", "chain": "arbitrum"}], "rpc_endpoints": ["http://localhost:8080/search/hybrid"], "constants": {"consensus_layers": 3, "min_judge_consensus_score": 0.8, "max_debate_rounds": 3, "mixing_model": "debate_then_vote", "voting_rule": "priority=M15 on entries, Bitmaster on invalidations and bias"}}, "safety_guards": [{"rule": "enforce_judges_majority_vote", "max_limit": 1.0, "action_on_breach": "abort_execution"}]},
  {"id": "mem-agent-model-debate-046", "type": "safety_guard", "human_title": "Multi-Model Debate: Консенсус и самокоррекция ИИ через дебаты моделей", "agent_summary": "Multi-model debate consensus and verification protocol for autonomous agents. Orchestrates Proposer, Critic, and Judge roles to validate complex system states and trading parameters before execution.", "tags": ["ai-safety", "multi-model-debate", "consensus", "self-correction", "decision-verification"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"max_debate_rounds": 2, "min_consensus_threshold": 0.8, "models_involved": ["Proposer-LLM", "Critic-LLM", "Judge-LLM"]}}, "safety_guards": [{"rule": "enforce_judge_veto", "max_limit": 1.0, "action_on_breach": "abort_execution"}]},
  {"id": "mem-trading-obi-023", "type": "strategy", "human_title": "Order Book Imbalance (OBI) & OFI: Торговля краткосрочными дисбалансами ликвидности", "agent_summary": "OBI (Order Book Imbalance) and OFI (Order Flow Imbalance) microstructural signals for short-term price prediction and quote skewing in market making. Analyzes multi-level limit order book (LOB) depth changes.", "tags": ["trading", "obi", "ofi", "microstructure", "market-making"], "params": {"contracts": [], "rpc_endpoints": ["https://fapi.binance.com/fapi/v1/depth"], "constants": {"lob_levels": 5, "imbalance_threshold": 0.65, "min_order_lifetime_ms": 100}}, "safety_guards": [{"rule": "block_skewing_on_extreme_imbalance", "max_limit": 0.85, "action_on_breach": "pause_quoting"}]},
  {"id": "mem-trading-orderlifetime-038", "type": "strategy", "human_title": "Order Lifetime & Cancellation Ratio: Фильтрация спуфинга в книге ордеров", "agent_summary": "Order lifetime and cancellation ratio analysis for crypto microstructure trading. Detects spoofing and fake walls by tracking average order age and bid-ask cancellation speed in the LOB.", "tags": ["trading", "microstructure", "order-lifetime", "cancellation-ratio", "spoofing"], "params": {"contracts": [], "rpc_endpoints": ["wss://fstream.binance.com/ws/btcusdt@depth"], "constants": {"min_order_lifetime_ms": 500.0, "max_cancellation_ratio_threshold": 0.85, "volume_depth_levels": 10}}, "safety_guards": [{"rule": "block_on_excessive_cancellations", "max_limit": 0.85, "action_on_breach": "block_breakout_orders"}]},
  {"id": "mem-trading-pairs-kalman-040", "type": "strategy", "human_title": "Kalman Cointegration: Адаптивный парный арбитраж на фильтре Калмана", "agent_summary": "Adaptive pairs trading strategy using Engle-Granger cointegration and Kalman Filter state space modeling. Dynamically estimates hedge ratios and spread mean reversion parameters in real-time.", "tags": ["trading", "statistical-arbitrage", "cointegration", "kalman-filter", "pairs-trading"], "params": {"contracts": [{"name": "BTCUSDT Perpetual", "address": "BTCUSDT", "chain": "binance_futures"}, {"name": "ETHUSDT Perpetual", "address": "ETHUSDT", "chain": "binance_futures"}], "rpc_endpoints": ["https://fapi.binance.com/fapi/v1/klines"], "constants": {"confidence_level": 0.95, "half_life_limit_days": 10.0, "entry_zscore": 2.0, "exit_zscore": 0.0}}, "safety_guards": [{"rule": "block_on_cointegration_break", "max_limit": 0.05, "action_on_breach": "liquidate_pairs_position"}]},
  {"id": "mem-trading-pnl-protection-049", "type": "safety_guard", "human_title": "PnL & Intraday Protection: Демоны контроля рисков и просадок", "agent_summary": "Intraday and PnL protection daemons from bot v32. Implements progressive risk mitigation (reduce_size, observe_only) based on session loss fraction, max drawdown, and unrealized loss thresholds.", "tags": ["trading", "risk-management", "pnl-protection", "drawdown-guard", "failsafe"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"max_session_loss_fraction_reduce": 0.01, "max_session_loss_fraction_observe": 0.02, "max_drawdown_fraction_reduce": 0.008, "max_drawdown_fraction_observe": 0.015, "max_unrealized_loss_fraction_reduce": 0.006, "max_unrealized_loss_fraction_observe": 0.012}}, "safety_guards": [{"rule": "max_session_loss_limit", "max_limit": 0.02, "action_on_breach": "halt_trading_liquidate"}, {"rule": "max_equity_drawdown_limit", "max_limit": 0.015, "action_on_breach": "force_cooldown_24h"}]},
  {"id": "mem-agent-prompt-entropy-044", "type": "safety_guard", "human_title": "Prompt Entropy Compression: Динамическое сжатие промптов на основе информационной энтропии", "agent_summary": "Dynamic prompt compression protocol using information theory metrics. Estimates token mutual information and perplexity to discard redundant context while preserving critical semantic reasoning invariants.", "tags": ["ai-safety", "prompt-engineering", "entropy-compression", "perplexity", "context-optimization"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"compression_target_ratio": 0.4, "max_token_perplexity": 4.5, "essential_keyword_whitelist": ["invariant", "checkpoint", "rules", "error", "failsafe"]}}, "safety_guards": [{"rule": "min_semantic_preservation_score", "max_limit": 0.9, "action_on_breach": "fallback_to_uncompressed"}]},
  {"id": "mem-trading-queue-admission-051", "type": "strategy", "human_title": "Queue Admission Simulator: Моделирование пропуска и исполнения ордеров в очереди", "agent_summary": "Queue admission simulator and passive order placement engine from bot v32. Evaluates expected queue clearing time, directional flow rate, and queue-to-order size ratio to decide if a limit order should be posted.", "tags": ["trading", "microstructure", "queue-admission", "order-book", "simulator"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"min_expected_fill_ratio": 0.35, "max_expected_queue_clear_seconds": 4.0, "max_queue_ahead_to_order_ratio": 8.0, "min_directional_flow_qty_per_second": 0.01}}, "safety_guards": [{"rule": "block_on_slow_queue_clear", "max_limit": 4.0, "action_on_breach": "reject_passive_entry"}, {"rule": "block_on_excessive_queue_ahead", "max_limit": 8.0, "action_on_breach": "reject_passive_entry"}]},
  {"id": "mem-trading-queue-calibration-060", "type": "protocol", "human_title": "Entry Queue Calibration Model: Обратная связь и динамическая калибровка очереди ордеров", "agent_summary": "Queue performance auditor and calibration model from bot v17. Audits completed limit orders by comparing expectations (expected fill ratio, queue clear time) against actual outcomes (executed qty, fill latency). Calculates fill ratio shortfalls and latency overshoots to self-tune the queue simulator.", "tags": ["microstructure", "queue-simulator", "calibration", "feedback-loop", "order-latency"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"latency_overshoot_alert_threshold": 2.0}}, "safety_guards": [{"rule": "latency_overshoot_alert", "max_limit": 2.0, "action_on_breach": "recalibrate_queue_simulator"}]},
  {"id": "mem-trading-regimegate-048", "type": "strategy", "human_title": "Regime Gate Scorecard: Модель квантификации рыночных режимов", "agent_summary": "Regime Gate Scorecard algorithm. Scores market regime metrics (BTC.D, ETH/BTC, Funding, Delta OI, CVD, Volatility, Liquidations) to calculate OVERHEAT, RESET, BALANCE, and TREND scores, outputting a single action code.", "tags": ["trading", "regime-detection", "scorecard", "market-microstructure", "risk-control"], "params": {"contracts": [], "rpc_endpoints": ["https://fapi.binance.com/fapi/v1/premiumIndex", "https://fapi.binance.com/fapi/v1/openInterest"], "constants": {"min_regime_activation_score": 5, "min_score_separation": 1, "max_overheat_threshold": 5}}, "safety_guards": [{"rule": "block_longs_on_overheat", "max_limit": 5.0, "action_on_breach": "forbid_long_entries"}]},
  {"id": "mem-ai-reviewer-sandbox-065", "type": "ai_safety", "human_title": "ReviewerGate and SandboxPreflight Decoupled AI Security Architecture", "agent_summary": "Decoupling static policy review from dynamic sandbox execution (gVisor/Firecracker) using a standardized JSON Schema verdict contract.", "tags": ["ai-safety", "security", "sandbox", "reviewer-gate", "json-schema", "runtime-telemetry"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"verdict_schema_version": "1.0", "sandbox_default_runtime": "runsc-gvisor"}}, "safety_guards": []},
  {"id": "mem-trading-score-core-052", "type": "strategy", "human_title": "S-CORE HFT Core: Нативное С++ Busy-Polling Ядро и Hawkes-математика", "agent_summary": "Implement S-CORE v15.3 C++ HFT core. Zero-copy socket ingestion via AF_XDP, lock-free SPSC queue handoff, AVX-512 vectorized Hawkes calculation, branchless state machine updates. Shared mmap memory arena is exactly 704 bytes at /dev/shm/s_core_v15_3_arena.", "tags": ["hft", "s-core", "c++", "mmap", "hawkes", "avx-512"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"shm_path": "/dev/shm/s_core_v15_3_arena", "shm_size_bytes": 704, "cache_line_size": 64, "hawkes_window_ticks": 100000}}, "safety_guards": [{"rule": "seq_gap_detection", "max_limit": 1.0, "action_on_breach": "transition_to_speculative"}, {"rule": "slot_0_priority_loss", "max_limit": 1.0, "action_on_breach": "transition_to_defer"}]},
  {"id": "mem-agent-sandbox-030", "type": "safety_guard", "human_title": "Security Sandboxing: Изоляция выполнения и контроль лимитов инструментов ИИ", "agent_summary": "Sandboxing and execution isolation for external agent tools. Enforces strict schema validations, runtime constraints (gVisor/seccomp), timeout firewalls, and token/action budget controls.", "tags": ["ai-safety", "sandboxing", "tool-isolation", "security", "runtime-protection"], "params": {"contracts": [{"name": "BitEvo Tool-IO Gate", "address": "0x3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D", "chain": "arbitrum"}], "rpc_endpoints": ["http://localhost:8080/console/execute"], "constants": {"execution_timeout_seconds": 30.0, "max_process_memory_mb": 512, "allowed_commands_regex": "^(python|git|pytest|npm)\\b"}}, "safety_guards": [{"rule": "enforce_sandbox_isolation", "max_limit": 1.0, "action_on_breach": "abort_execution"}]},
  {"id": "mem-agent-sovereign-core-056", "type": "protocol", "human_title": "Sovereign Agent Core: Безопасность MCP, MemIR Атомы и SSGM", "agent_summary": "Implement Sovereign Agent Core (Sovereign Trust Layer). Hard Docker sandboxing, no-internet by default. Two-stage Guardian: CEL Gateway (<1ms) + Asynchronous semantic risk scanner (Gemma 3 1B/Llama 3.2 3B). Code Mode for instrument orchestration. MemIR strictly typed memory atoms. SSGM (Stability and Safety-Governed Memory) separating Mutable Active Graph and Immutable Episodic Log to bound semantic drift: E[D] <= epsilon / (1 - gamma). ECS (Experience Compression Spectrum) L0-L3. Matrixout Evidence Engine for claim verification. Local Privacy Router PII masking.", "tags": ["sovereign-core", "mcp-security", "memir", "ssgm", "ecs", "privacy-router"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"cel_gateway_latency_limit_ms": 1.0, "ecs_compression_levels": 4, "drift_bound_formula": "E[D(theta_t, theta_t^*)] <= epsilon / (1 - gamma)"}}, "safety_guards": [{"rule": "unauthorized_mcp_call", "max_limit": 1.0, "action_on_breach": "hard_blocking_and_alert"}, {"rule": "pii_leak_detected", "max_limit": 1.0, "action_on_breach": "local_masking_fallback"}, {"rule": "semantic_risk_score_breach", "max_limit": 0.75, "action_on_breach": "pause_for_human_approve"}]},
  {"id": "mem-trading-spread-034", "type": "strategy", "human_title": "Spread Mean Reversion: Торговля возвратом спреда и минимизация рыночного воздействия", "agent_summary": "High-frequency mean-reversion trading on bid-ask spreads. Minimizes market impact of executions using icebergs and post-only (GTX) order types.", "tags": ["trading", "mean-reversion", "spread", "market-impact", "post-only"], "params": {"contracts": [], "rpc_endpoints": ["https://fapi.binance.com/fapi/v1/ticker/bookTicker"], "constants": {"min_spread_bps": 1.5, "max_order_size_pct_of_depth": 0.1, "reversion_lookback_ticks": 60}}, "safety_guards": [{"rule": "enforce_post_only_gtx", "max_limit": 1.0, "action_on_breach": "reject_entry"}]},
  {"id": "mem-agent-tee-secrets-039", "type": "safety_guard", "human_title": "TEE & MPC: Безопасное управление ключами автономных ИИ-агентов", "agent_summary": "Security architecture isolating private keys and API credentials from LLM contexts using TEEs (AWS Nitro, Intel SGX) and MPC (Multi-Party Computation). Enforces deterministic API call whitelists.", "tags": ["ai-safety", "security", "tee", "mpc", "key-management"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"key_shares_required": 2, "total_key_shares": 3, "max_single_tx_usd": 500.0, "allowed_destinations": ["https://fapi.binance.com"]}}, "safety_guards": [{"rule": "block_unauthorized_destinations", "max_limit": 1.0, "action_on_breach": "revoke_session_keys"}, {"rule": "limit_single_transaction_size", "max_limit": 500.0, "action_on_breach": "require_operator_signature"}]},
  {"id": "mem-trading-tilt-antiself-036", "type": "safety_guard", "human_title": "Tilt Index & Anti-Self: Предотвращение тильта и когнитивных искажений в трейдинге", "agent_summary": "Cognitive safety framework integrating the Tilt Index (emotional, somatic, financial, cognitive metrics) and Anti-Self Veto rules. Automatically scales leverage and order sizes to zero upon tilt detection.", "tags": ["trading", "risk-management", "tilt-index", "anti-self", "safety-guard"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"max_consecutive_losses": 3, "max_drawdown_daily_percent": 2.0, "tilt_score_max": 75, "cooldown_period_seconds": 86400}}, "safety_guards": [{"rule": "block_on_excessive_tilt", "max_limit": 75.0, "action_on_breach": "suspend_all_trading"}, {"rule": "block_on_revenge_trading", "max_limit": 3.0, "action_on_breach": "enforce_cooldown"}]},
  {"id": "mem-trading-impact-decay-064", "type": "market_making", "human_title": "Transient Price Impact Decay & Liquidation Sweeps", "agent_summary": "Reversion-based trading strategy exploiting the power-law decay of transient price impact after large liquidation sweeps at order book boundaries.", "tags": ["liquidation-cascades", "price-impact", "mean-reversion", "microstructure", "bybit"], "params": {"contracts": [], "rpc_endpoints": ["https://api.bybit.com/v5/market"], "constants": {"leverage_liquidation_distance_pct": 0.01, "decay_half_life_seconds": 2.5}}, "safety_guards": []},
  {"id": "mem-trading-volatility-sizing-057", "type": "strategy", "human_title": "Volatility Sizing Policy: Адаптивное масштабирование ордеров на основе ATR", "agent_summary": "Volatility-based position sizing policy from bot v11. Dynamically scales trading notional using the ratio of target ATR fraction to current ATR fraction. Floor sizing, ceiling limits, and absolute trading halt during extreme volatility peaks.", "tags": ["sizing", "volatility", "atr", "risk-management", "position-control"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"target_atr_fraction": 0.002, "min_notional_multiplier": 0.5, "max_notional_multiplier": 1.6, "atr_fraction_floor": 0.0002, "abstain_above_atr_fraction": 0.008}}, "safety_guards": [{"rule": "abstain_above_atr_fraction_breach", "max_limit": 0.008, "action_on_breach": "abstain_from_trading"}, {"rule": "min_notional_multiplier", "max_limit": 0.5, "action_on_breach": "clamp_to_floor"}, {"rule": "max_notional_multiplier", "max_limit": 1.6, "action_on_breach": "clamp_to_ceiling"}]},
  {"id": "mem-trading-vp-029", "type": "strategy", "human_title": "Volume Profile & Value Area: Позиционирование по горизонтальным объемам и зоны ликвидности", "agent_summary": "Volume Profile (VPVR) metrics for structural support/resistance. Uses Point of Control (POC), Value Area High (VAH), and Value Area Low (VAL) to filter breakout entries (blocking entries into High Volume Nodes, preferring breakouts through Low Volume Nodes).", "tags": ["trading", "volume-profile", "poc", "value-area", "market-structure"], "params": {"contracts": [], "rpc_endpoints": ["https://fapi.binance.com/fapi/v1/klines"], "constants": {"value_area_pct": 70, "lookback_bars": 240, "min_volume_node_ratio": 0.35}}, "safety_guards": [{"rule": "block_breakout_into_hvn", "max_limit": 1.0, "action_on_breach": "reject_entry"}]},
  {"id": "mem-trading-vpin-020", "type": "strategy", "human_title": "VPIN: Измерение токсичности потока ордеров и защита от неблагоприятного отбора", "agent_summary": "VPIN (Volume-Synchronized Probability of Toxicity) and Bulk Volume Classification (BVC) model for crypto HFT. Uses volume-clock buckets to normalize order book imbalance. Prevents adverse selection of market makers and limits grid entries during high one-sided toxicity.", "tags": ["trading", "vpin", "order-flow", "hft", "toxicity"], "params": {"contracts": [], "rpc_endpoints": ["https://fapi.binance.com/fapi/v1/aggTrades"], "constants": {"volume_bucket_size_btc": 50.0, "vpin_window_buckets": 20, "toxicity_threshold": 0.7}}, "safety_guards": [{"rule": "block_entries_on_extreme_toxicity", "max_limit": 0.7, "action_on_breach": "abstain"}]},
  {"id": "mem-trading-walkforward-050", "type": "strategy", "human_title": "Walk-Forward Ensemble: Форвардное скользящее тестирование и ансамбли стратегий", "agent_summary": "Walk-forward optimization and strategy ensemble engine from bot v32. Evaluates lookback and holding candidates using a penalty-weighted objective function (drawdown, timeout, and slippage penalties).", "tags": ["trading", "quant", "walk-forward", "parameter-optimization", "ensemble"], "params": {"contracts": [], "rpc_endpoints": [], "constants": {"max_drawdown_penalty": 0.5, "entry_timeout_rate_penalty": 25.0, "exit_depth_sweep_bps_penalty": 2.0, "min_trade_count": 1}}, "safety_guards": [{"rule": "min_trade_density", "max_limit": 1.0, "action_on_breach": "skip_fold_candidate"}]},
  {
    "id": "mem-arena-regime-playbook-018",
    "type": "strategy",
    "human_title": "Regime Playbook: что торговать в каждом режиме BTC",
    "agent_summary": "Edge is signal x direction x REGIME, not signal alone. Live 7d matrix: green cells +$4457, same signals in wrong regimes -$25452. Playbook: up_mild -> buy dips (candle_reversal long, best cell +$1547). up_strong -> bos both directions (short fades exhaustion +$1027, long rides). flat -> grid only (directional bleeds). down_mild -> grid or flat. down_strong -> trend-following short on breakdown (bos short +$493), never catch knives (candle_reversal long -$2559). Implementation: gate each signal:direction by regime, block red cells, keep green. Not static signal on/off but regime-conditional.",
    "tags": [
      "trading",
      "regime",
      "playbook",
      "what",
      "to",
      "trade"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "green_pnl_7d": 4457,
        "red_pnl_7d": -25452
      }
    },
    "safety_guards": [
      {
        "rule": "block_signal_dir_in_red_regime",
        "max_limit": 0,
        "action_on_breach": "abstain"
      }
    ]
  },
  {
    "id": "mem-sbor-ai-agent-trust-layer-rel",
    "type": "strategy",
    "human_title": "AI-Agent Trust Layer: надёжность агентов как продукт",
    "agent_summary": "Trust Layer между LLM и средой: threat model агентов = чек-лист аудита надёжности.",
    "tags": [
      "ai",
      "ai",
      "agent",
      "trust",
      "layer",
      "reliability"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {}
    },
    "safety_guards": []
  },
  {
    "id": "mem-sbor-blockchain-forensics-onc",
    "type": "strategy",
    "human_title": "Blockchain-форензика: методология ончейн-расследований",
    "agent_summary": "Ончейн-форензика: gas trail, Sybil-фермы, идентификация контрактов — продаваемый OSINT-сервис.",
    "tags": [
      "security",
      "blockchain",
      "forensics",
      "onchain",
      "investigations"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {}
    },
    "safety_guards": []
  },
  {
    "id": "mem-arena-s15-compression",
    "type": "strategy",
    "human_title": "S15: Паттерн «Compression / No-Man’s-Land» (Сжатие и Капкан-удушение)",
    "agent_summary": "Volatility compression and mid-range trap (no man's land): when ATR percent is compressed below the floor and price is in the middle of local swing range (30% to 70%), reject entries. These zones are high-risk chop. Entry only allowed on breakout (with 2x volume confirm) or after sweep/V-reversal at range extremes.",
    "tags": [
      "trading",
      "compression",
      "no",
      "mans",
      "land",
      "trap"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "atr_compression_lookback": 14,
        "mid_range_min_pct": 30,
        "mid_range_max_pct": 70,
        "breakout_vol_multiplier": 2
      }
    },
    "safety_guards": [
      {
        "rule": "reject_mid_range_compression",
        "max_limit": 0,
        "action_on_breach": "reject"
      }
    ]
  },
  {
    "id": "mem-sbor-grid-trading-os-institut",
    "type": "strategy",
    "human_title": "Grid Trading OS — институциональная спецификация (2026)",
    "agent_summary": "ATR-калибровка шага, fee-firewall, ±3σ range, GER soft-stop, regime switching — институциональная грид-спека.",
    "tags": [
      "trading",
      "grid",
      "trading",
      "os",
      "institutional",
      "spec"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {}
    },
    "safety_guards": []
  },
  {
    "id": "mem-sbor-microstructure-delisting",
    "type": "strategy",
    "human_title": "Микроструктура и риск делистинга 2026: data-integrity для квант-движка",
    "agent_summary": "Bybit unilateral-OI (11.06.2026) ломает бэктесты; Delist-Risk Score для авто-флага токсичных активов.",
    "tags": [
      "trading",
      "microstructure",
      "delisting",
      "data",
      "integrity",
      "2026"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {}
    },
    "safety_guards": []
  },
  {
    "id": "mem-sbor-monetization-matrix-4x3",
    "type": "strategy",
    "human_title": "Матрица монетизации: от быстрых денег к инфраструктуре",
    "agent_summary": "Матрица 4 уровня × 3 горизонта: быстрые деньги финансируют moonshots, anti-кассовый-разрыв.",
    "tags": [
      "business",
      "monetization",
      "matrix",
      "4x3"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {}
    },
    "safety_guards": []
  },
  {
    "id": "mem-sbor-multiagent-orchestration",
    "type": "strategy",
    "human_title": "Мультиагентная оркестрация и автономное исследование",
    "agent_summary": "Граф-оркестрация, test-time compute, Arbiter/Clarifier; арена как автономная исследовательская система.",
    "tags": [
      "ai",
      "multiagent",
      "orchestration",
      "autonomous",
      "research"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {}
    },
    "safety_guards": []
  },
  {
    "id": "mem-arena-s14-fake-crown",
    "type": "strategy",
    "human_title": "S14: Паттерн «Один говорит, а три молчат» (Фейковая корона)",
    "agent_summary": "Sector divergence filter (fake crown): when 1 asset in a correlated sector (e.g. L2: ARB, OP, MANTA, STRK) pumps but peers are silent (no sector confirmation), reject trading signals on the leader. Rule: price increase of leader over last 5 intervals without peer response is treated as a trap. Filter checks peer price changes and rejects if peer change is below threshold.",
    "tags": [
      "trading",
      "sector",
      "divergence",
      "fake",
      "crown"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "sector_peers": [
          "ARB",
          "OP",
          "MANTA",
          "STRK"
        ],
        "lookback_intervals": 5,
        "divergence_threshold_pct": 1.5
      }
    },
    "safety_guards": [
      {
        "rule": "reject_sector_divergence",
        "max_limit": 0,
        "action_on_breach": "reject"
      }
    ]
  },
  {
    "id": "mem-sbor-survival-math-ergodicity",
    "type": "strategy",
    "human_title": "Математика выживания: эргодичность, Келли и expectancy",
    "agent_summary": "Эргодичность, Келли, expectancy: почему +EV может банкротить и как судить ботов по геом. росту.",
    "tags": [
      "risk",
      "survival",
      "math",
      "ergodicity",
      "kelly"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {}
    },
    "safety_guards": []
  },
  {
    "id": "mem-sbor-trading-discipline-journ",
    "type": "strategy",
    "human_title": "Дисциплина трейдинга: дневник, MAE/MFE и психология убытков",
    "agent_summary": "Дневник, MAE/MFE-калибровка стопов/тейков, эффект диспозиции и как не зашить его в код.",
    "tags": [
      "trading",
      "trading",
      "discipline",
      "journal",
      "mae",
      "mfe"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {}
    },
    "safety_guards": []
  },
  {
    "id": "mem-trn-psy-010",
    "type": "strategy",
    "human_title": "S10: Системы Внимания и контр-индикаторы «Анти-Я»",
    "agent_summary": "Trading attention control system. Detail anchors (mental, somatic, technical, social). Monitor Chlenikus Human Index (CHI > 1.2). Execute reverse tilt trades (opposite of tiltrun) to capture edge from raw losses.",
    "tags": [
      "trading",
      "anti",
      "self",
      "attention",
      "trading",
      "psychology"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "max_chi_limit": 1.2,
        "breath_pattern": "4-4-4",
        "rule_1_candle_wait_sec": 60
      }
    },
    "safety_guards": [
      {
        "rule": "anti_self_reverse_trigger",
        "max_limit": 1.2,
        "action_on_breach": "execute_opposite_order"
      }
    ]
  },
  {
    "id": "mem-trn-ali-009",
    "type": "strategy",
    "human_title": "Data Alignment: Правила подтверждения свечей и синхронизация",
    "agent_summary": "Trading loop alignment specifications. Enforce candle close confirmation by using df.iloc[-2] instead of df.iloc[-1]. Implement historical scan window to process missed bars between cycles. Set minimum trailing stop distance relative to ATR.",
    "tags": [
      "infrastructure",
      "candle",
      "confirmation",
      "data",
      "alignment"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "require_closed_bar": true,
        "backfill_lookback_bars": 10,
        "min_trailing_stop_atr_multiplier": 1.5
      }
    },
    "safety_guards": [
      {
        "rule": "confirm_closed_bar",
        "max_limit": 1,
        "action_on_breach": "skip_entry"
      }
    ]
  },
  {
    "id": "mem-arena-crowd-007",
    "type": "strategy",
    "human_title": "Crowd-fade: как читать long/short ratio фьючерсов и торговать против толпы",
    "agent_summary": "Crowd-fade strategy: Binance futures long/short account ratio (retail) vs top-trader position ratio (smart money). When retail L/S extreme (>2.5) and top-traders neutral (<1.6) = divergence = fade-the-crowd short candidate. Data from fapi globalLongShortAccountRatio + topLongShortPositionRatio. Not standalone signal, confirmation filter.",
    "tags": [
      "trading",
      "crowd",
      "fade",
      "long",
      "short",
      "ratio"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [
        "https://fapi.binance.com/futures/data/globalLongShortAccountRatio"
      ],
      "constants": {
        "retail_extreme": 2.5,
        "smart_neutral": 1.6
      }
    },
    "safety_guards": [
      {
        "rule": "not_standalone_entry",
        "max_limit": 0,
        "action_on_breach": "confirm_only"
      }
    ]
  },
  {
    "id": "mem-arena-divers-010",
    "type": "strategy",
    "human_title": "Иллюзия диверсификации: почему 150 ботов — это часто 1 стратегия в 150 копиях",
    "agent_summary": "Diversification illusion: 150 bots running variations of ONE engine = correlation ~1, not 150 independent edges. When engine out of phase with market, all lose together (one day -15k). More parametrizations of one idea does not change expectancy. Real diversification needs uncorrelated strategies (different signal logic, not different params). Lesson from 71k trades.",
    "tags": [
      "trading",
      "diversification",
      "illusion",
      "bots"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "bots": 150,
        "correlation": 1
      }
    },
    "safety_guards": [
      {
        "rule": "count_independent_edges_not_bots",
        "max_limit": 0,
        "action_on_breach": "reject"
      }
    ]
  },
  {
    "id": "mem-gov-flt-011",
    "type": "specification",
    "human_title": "D11: Fleet Coordinator и технический дрейф",
    "agent_summary": "Fleet Coordinator protocol. Reconcile fleet servers (arena-vps, win185, fin35, old144) and agents state against fleet_registry.json. Detect and log technical drifts D1-D8, output unified_state.json and unified_state.js, and post audit trail observations to BitEvo API.",
    "tags": [
      "governance",
      "fleet",
      "coordinator",
      "drift",
      "monitoring"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [
        "http://localhost:8080/journal/entries"
      ],
      "constants": {
        "fleet_check_interval_minutes": 15,
        "hosts_count": 4,
        "drift_rules_count": 8,
        "state_output_file": "fleet/unified_state.json"
      }
    },
    "safety_guards": [
      {
        "rule": "connectivity_guard_isolated_failures",
        "max_limit": 1,
        "action_on_breach": "set_unknown"
      },
      {
        "rule": "zero_secrets_leaked_check",
        "max_limit": 0,
        "action_on_breach": "block_write"
      }
    ]
  },
  {
    "id": "mem-trn-frc-012",
    "type": "strategy",
    "human_title": "S12: Фрактальный интеллект: Роли внимания, Q-score и AutoDigest",
    "agent_summary": "Enforce fractal attention network roles in trading workflows. Assign distinct duties to Scout (setup hunting), Scribe (journaling & digests), Mirror (reflection), Anchor (operator constraints), and Sentinel (limits & anti-self). Calculate setup Q-score (Q = 0.45*Edge + 0.25*Timing + 0.20*Consensus + 0.10*Discipline). Apply 1R/0.5R risk limits and 10-15m cool-down rule.",
    "tags": [
      "trading",
      "fractal",
      "intelligence",
      "scouts",
      "scribes",
      "attention"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "q_score_min_threshold": 0.75,
        "default_risk_units": 1,
        "defensive_risk_units": 0.5,
        "cooldown_minutes": 15
      }
    },
    "safety_guards": [
      {
        "rule": "minimum_q_score_requirement",
        "max_limit": 0.75,
        "action_on_breach": "veto_trade"
      },
      {
        "rule": "enforce_cooldown_period",
        "max_limit": 15,
        "action_on_breach": "block_new_orders"
      }
    ]
  },
  {
    "id": "mem-trn-grd-011",
    "type": "strategy",
    "human_title": "S11: Сеточные боты и управление выходом из диапазона (Recentering)",
    "agent_summary": "Grid trading bot workflow and parameters. Optimize grid levels under market volatility. Enforce unit economics (unit profit > fee). Apply stop-loss below range low and recentering (Stop & Rebuild) or expansion strategies upon breakout.",
    "tags": [
      "trading",
      "grid",
      "trading",
      "breakout",
      "recentering",
      "management"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "min_grid_levels": 10,
        "max_grid_levels": 50,
        "min_step_pct": 0.5,
        "leverage_limit": 3
      }
    },
    "safety_guards": [
      {
        "rule": "unit_economics_check",
        "max_limit": 1,
        "action_on_breach": "reject_parameters"
      },
      {
        "rule": "stop_loss_required",
        "max_limit": 1,
        "action_on_breach": "cancel_startup"
      }
    ]
  },
  {
    "id": "mem-arena-valid-008",
    "type": "strategy",
    "human_title": "Как проверить торговый эдж по-честному: OOS, bootstrap CI и почему in-sample врёт",
    "agent_summary": "Edge validation method: (1) time-split 70/30, edge must hold out-of-sample not just in-sample. (2) bootstrap 5000 resamples for 90% CI of expectancy - if CI includes zero, no edge. (3) min 100 trades, 10 days, 3 regimes. (4) beat 3 benchmarks: buy&hold, random entry same R:R, inverted signal. Example: full portfolio looked +4.26/tr in-sample but -2.66 OOS = curve-fit, rejected. Only edges passing all survive.",
    "tags": [
      "trading",
      "how",
      "to",
      "validate",
      "edge",
      "oos",
      "bootstrap"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "min_trades": 100,
        "min_days": 10,
        "oos_split": 0.7,
        "bootstrap_n": 5000
      }
    },
    "safety_guards": [
      {
        "rule": "reject_if_CI_includes_zero",
        "max_limit": 0,
        "action_on_breach": "reject"
      }
    ]
  },
  {
    "id": "mem-trn-rel-016",
    "type": "strategy",
    "human_title": "S13: Макро-режимы ликвидности и ETH-BTC Relativity Gap",
    "agent_summary": "Analyze ETH/BTC relative value under various macro-liquidity regimes. Monitor effective Fed rate, Broad DXY index, and Federal Reserve reserve management purchases ($40B/mo short bills). Enforce ETH-Core protocol: accumulate ETH as primary asset only if price > SMA200 OR 30-day momentum > 1.15; otherwise, treat ETH positions as hedge with reduced exposure. Implement par-hedging via long-ETH/short-BTC setups to mitigate systemic risk-off deleveraging ($2.56B liquidation cascades).",
    "tags": [
      "trading",
      "macro",
      "liquidity",
      "eth",
      "btc",
      "relativity",
      "gap"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "effective_fed_rate_pct": 3.64,
        "dxy_index": 118.24,
        "eth_btc_relative_floor": 0.029,
        "momentum_threshold": 1.15
      }
    },
    "safety_guards": [
      {
        "rule": "eth_core_regime_check",
        "max_limit": 1.15,
        "action_on_breach": "reduce_risk"
      },
      {
        "rule": "pair_hedging_required",
        "max_limit": 1,
        "action_on_breach": "force_neutral"
      }
    ]
  },
  {
    "id": "mem-mas-coev-013",
    "type": "specification",
    "human_title": "D13: Управляемая коэволюция и изоляция многоагентных систем (MAS)",
    "agent_summary": "Enforce safety protocols in multi-agent environments. Implement a deterministic Policy Gate to filter agent actions, limit access keys, sandbox browser/tool runs (Firecracker, gVisor, or seccomp), and prevent emergent behavior and prompts poisoning (OWASP GenAI Top 10). Maintain audit log.",
    "tags": [
      "security",
      "mas",
      "managed",
      "coevolution",
      "sandbox",
      "isolation"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "max_consecutive_errors": 3,
        "max_tool_execution_time_sec": 30,
        "sandbox_type": "gVisor"
      }
    },
    "safety_guards": [
      {
        "rule": "require_human_approval_for_destructive_actions",
        "max_limit": 1,
        "action_on_breach": "halt"
      },
      {
        "rule": "max_execution_duration",
        "max_limit": 30,
        "action_on_breach": "kill_process"
      }
    ]
  },
  {
    "id": "mem-arena-mild-005",
    "type": "strategy",
    "human_title": "Парадокс mild-тренда: почему развороты работают в слабом тренде и сливают в сильном",
    "agent_summary": "Reversal signals (candle_reversal) profit in MILD trends (+8599) but lose in STRONG trends (-2923) on 1450 trades. Reason: in mild trend a reversal catches the pullback in trend direction; in strong trend it fights momentum. Filter: trade reversals only in mild regimes, abstain in strong.",
    "tags": [
      "trading",
      "mild",
      "vs",
      "strong",
      "trend",
      "reversal"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "mild_net": 8599,
        "strong_net": -2923
      }
    },
    "safety_guards": [
      {
        "rule": "no_reversal_in_strong_trend",
        "max_limit": 0,
        "action_on_breach": "abstain"
      }
    ]
  },
  {
    "id": "mem-core-cmp-012",
    "type": "specification",
    "human_title": "D12: MirrorCore++ и сжатие памяти по самосогласованности",
    "agent_summary": "MirrorCore++ and CompactDigest memory compression. Vectorize and score chat consistency. Enforce identity kernel thresholds (score >= 0.92, tone drift <= 1.5%), cluster chunks (DBSCAN), and trigger delta-digest writes (>1.5MB per 12h).",
    "tags": [
      "security",
      "mirrorcore",
      "compactdigest",
      "memory",
      "compression"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "inclusion_score": 0.92,
        "max_drift_percent": 1.5,
        "compact_digest_threshold_mb": 1.5,
        "compact_digest_period_hours": 12
      }
    },
    "safety_guards": [
      {
        "rule": "enforce_min_consistency_score",
        "max_limit": 0.92,
        "action_on_breach": "exclude_from_kernel"
      }
    ]
  },
  {
    "id": "mem-inf-arb-015",
    "type": "specification",
    "human_title": "D15: MultiGPT-Bridge и Федеративный ИИ-Арбитраж",
    "agent_summary": "Deploy a federated AI agent arbitration pipeline. Use MultiGPT-Bridge for context alignment and payload routing. Enforce AnchorSet initializations for external worker nodes (GPT-4o, Claude 3.5 Sonnet, Gemini Pro). Deploy a Meta-LLM Aggregator with Mixture-of-Agents (MoA) consensus evaluated by a centralized Digital Arbiter. Keep Self-Consistency Score Q >= 0.92, drift <= 1.5%, and trigger compression at 1.5MB text bytes.",
    "tags": [
      "infrastructure",
      "multigpt",
      "bridge",
      "federated",
      "ai",
      "arbitration"
    ],
    "params": {
      "contracts": [
        {
          "name": "BitEvo Memory Bridge Controller",
          "address": "0x4D4D4D4D4D4D4D4D4D4D4D4D4D4D4D4D4D4D4D4D",
          "chain": "arbitrum"
        }
      ],
      "rpc_endpoints": [
        "http://localhost:8080/evidence/link",
        "http://localhost:8080/search/hybrid"
      ],
      "constants": {
        "min_q_score_threshold": 0.92,
        "max_drift_allowed": 0.015,
        "new_text_bytes_trigger": 1572864
      }
    },
    "safety_guards": [
      {
        "rule": "enforce_identity_lock",
        "max_limit": 1,
        "action_on_breach": "abort_call"
      },
      {
        "rule": "enforce_q_score",
        "max_limit": 0.92,
        "action_on_breach": "regenerate"
      }
    ]
  },
  {
    "id": "mem-inf-pgb-010",
    "type": "specification",
    "human_title": "PostgreSQL Backup Daemon: Автоматическая синхронизация бэкапов",
    "agent_summary": "PostgreSQL backup sync daemon. Verify container health, execute pg_dump via docker exec, compress output with gzip, store in Server backup directory, rotate old files (keep 10), and write statuses to postgres_backup_history.jsonl and proof_ledger.jsonl.",
    "tags": [
      "infrastructure",
      "postgres",
      "backup",
      "sync",
      "daemon"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "backup_retention_count": 10,
        "backup_interval_hours": 24,
        "backup_dir": "C:/Users/coins/My Drive/Server backup/postgres_backups",
        "container_name": "bitevo_postgres"
      }
    },
    "safety_guards": [
      {
        "rule": "verify_container_running",
        "max_limit": 1,
        "action_on_breach": "start_container"
      },
      {
        "rule": "backup_file_min_size_kb",
        "max_limit": 1024,
        "action_on_breach": "alert_operator"
      }
    ]
  },
  {
    "id": "mem-arena-regtime-009",
    "type": "strategy",
    "human_title": "Тайминг регима: входить через 30-120 минут после смены тренда",
    "agent_summary": "Regime-age timing: entry 30-120min after regime change has exp +14.88/trade, but 2-6h into regime = -2.93 (dead zone), 0-30min = +4.11 (too early/noisy), 6h+ = +9.25. Sweet spot: regime established but not exhausted. Track regime transitions, gate entries by regime-age.",
    "tags": [
      "trading",
      "regime",
      "timing",
      "30",
      "120",
      "min"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "sweet_min": 30,
        "sweet_max": 120
      }
    },
    "safety_guards": [
      {
        "rule": "avoid_mid_regime_entry",
        "max_limit": 0,
        "action_on_breach": "abstain"
      }
    ]
  },
  {
    "id": "mem-trn-drw-008",
    "type": "strategy",
    "human_title": "Sovereign Scalper: Глубокий анализ просадки",
    "agent_summary": "Sovereign Core drawdown audit. Identify 5 root causes: incomplete candle execution (df.iloc[-1]), sampling miss (interval desync), 0.3% trailing stop hyper-sensitivity, 1% capped swing stop loss, and legacy startup cleanup (0 PnL closes). Recommend mitigation steps.",
    "tags": [
      "trading",
      "sovereign",
      "scalper",
      "drawdown",
      "analysis"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "starting_capital": 1000,
        "total_trades_analyzed": 1494,
        "win_rate_percent": 22.69,
        "net_loss_usd": -1708.61,
        "profit_factor": 0.75
      }
    },
    "safety_guards": [
      {
        "rule": "max_drawdown_stop",
        "max_limit": 500,
        "action_on_breach": "halt_trading"
      }
    ]
  },
  {
    "id": "mem-infra-mon-014",
    "type": "specification",
    "human_title": "D14: Системы мониторинга торговой эффективности: Архитектура SSOT и ИИ-коучинг",
    "agent_summary": "Design trader performance monitoring dashboards. Build a Single Source of Truth (SSOT) to aggregate and normalize trades (Binance API, MetaTrader parser, IB SDK). Compare TraderSync (AI Cypher Q&A), Tradervue (Mentor View read-only access), and TradeZella (Spaces, Playbook strategy tracking). Implement real-time risk breach alerts and behavioral diagnostics (revenge-trading and overtrading detectors).",
    "tags": [
      "security",
      "trading",
      "performance",
      "monitoring",
      "ssot",
      "ai"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "max_students_per_space": 5,
        "real_time_latency_ms": 1000,
        "database_type": "PostgreSQL"
      }
    },
    "safety_guards": [
      {
        "rule": "alert_on_revenge_trading",
        "max_limit": 1,
        "action_on_breach": "flag_account_suspend_trading"
      },
      {
        "rule": "unauthorized_write_block",
        "max_limit": 1,
        "action_on_breach": "revoke_api_key"
      }
    ]
  },
  {
    "id": "mem-arena-rmath-006",
    "type": "strategy",
    "human_title": "Как 50% winrate приносит прибыль: математика R-кратности в трендследовании",
    "agent_summary": "Trend-following math: avg TP +77.52 vs avg SL -8.01 = 6.8x asymmetry. Only 18% hit TP but winners are 6.8x losers so net positive. Expectancy = WR*avg_win - (1-WR)*avg_loss after costs. Cut losers fast, let winners run. WR alone is meaningless; expectancy in R-multiples is what matters.",
    "tags": [
      "trading",
      "trend",
      "following",
      "r",
      "multiple",
      "math"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "avg_tp": 77.52,
        "avg_sl": -8.01,
        "tp_hit_rate": 0.18
      }
    },
    "safety_guards": [
      {
        "rule": "measure_expectancy_not_winrate",
        "max_limit": 0,
        "action_on_breach": "reject"
      }
    ]
  },
  {
    "id": "svc-ai-audit-001",
    "type": "strategy",
    "human_title": "AI-Agent Reliability Audit — за 72 часа делаю ваших агентов безопасными",
    "agent_summary": "AI-Agent Reliability Audit service. Problem: production AI agents hallucinate, get prompt-injected, no rollback. Gartner: 40% will disable autonomous agents by 2027. Deliverable: agent capability/permission map, injection stress-test, Decision Trace logging, instant Rollback module, safety policy. Tiered pricing: free diagnostic call -> $500-1500 mini-audit -> $3-5k full 72h -> $12500 enterprise. Built on proven components: Acceptor Loop (decision trace), anti-self veto (rollback gate), HOT-3 Belief Dominance (uncertainty measurement), sovereign local architecture (no data leak).",
    "tags": [
      "service",
      "ai",
      "agent",
      "reliability",
      "audit"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "diagnostic_price_usd": 0,
        "mini_audit_usd": 1000,
        "full_audit_usd": 4000,
        "enterprise_usd": 12500,
        "audit_hours": 72
      }
    },
    "safety_guards": [
      {
        "rule": "rollback_module_required",
        "max_limit": 1,
        "action_on_breach": "block_deploy"
      }
    ]
  },
  {
    "id": "mem-arena-risk-004",
    "type": "strategy",
    "human_title": "Как читать риск рынка за 60 секунд: FNG + funding + режим",
    "agent_summary": "Read market risk fast using 3 free signals. Fear&Greed extremes (<=15 capitulation, >=80 euphoria), funding rate extremes (|fr|>0.05% = positioning imbalance, liquidation cascade risk), regime shift (trend vs flat). Combine: extreme fear + high positive funding = longs overheated into weakness = high cascade risk. Action is risk-reduction, not entry signals.",
    "tags": [
      "trading",
      "read",
      "market",
      "risk",
      "fng",
      "funding"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "fng_fear": 15,
        "fng_greed": 80,
        "funding_extreme_pct": 0.05,
        "vol_high_pct": 3
      }
    },
    "safety_guards": [
      {
        "rule": "no_add_in_overheated_direction",
        "max_limit": 0,
        "action_on_breach": "block"
      }
    ]
  },
  {
    "id": "mem-arena-edge-003",
    "type": "strategy",
    "human_title": "Почему 90% paper-trading стратегий теряют: 3 механических дефекта на 66k сделок",
    "agent_summary": "Three mechanical defects that kill trading strategies, proven on 66k live paper trades. 1) Dead coins: sub-cent alts (DOGE/PENGU/SEI) lose even on TP-close because fees+spread exceed price move. 2) R:R geometry: SL~=TP size but 2.3x more stops => guaranteed bleed below 50% WR. 3) Indicator theatre: ML filter initialized but predict() never called. Validation rule: min 100 trades, 10 days, 3 regimes, measure expectancy after costs, beat buy&hold + random + inverted.",
    "tags": [
      "trading",
      "why",
      "90",
      "percent",
      "strategies",
      "lose"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "min_sample_trades": 100,
        "min_distinct_days": 10,
        "min_regimes": 3,
        "required_rr_below_50wr": 2.5
      }
    },
    "safety_guards": [
      {
        "rule": "cost_to_move_ratio",
        "max_limit": 0.33,
        "action_on_breach": "reject_instrument"
      },
      {
        "rule": "expectancy_after_costs",
        "max_limit": 0,
        "action_on_breach": "kill_strategy"
      }
    ]
  },
  {
    "id": "mem-core-arc-008",
    "type": "specification",
    "human_title": "ArchiveOS & MultiGPT-Bridge: Потоки памяти и арбитраж ИИ",
    "agent_summary": "Manage AI agent memory and context stream. Enforce AnchorSet identity transfer, federated MultiGPT-Bridge routing, and Meta-LLM Aggregator arbitration. Track API queries to hybrid search, offset-read conversations, and evidence linking.",
    "tags": [
      "infrastructure",
      "archiveos",
      "multigpt",
      "bridge",
      "integration"
    ],
    "params": {
      "contracts": [
        {
          "name": "BitEvo Memory Bridge Controller",
          "address": "0x4D4D4D4D4D4D4D4D4D4D4D4D4D4D4D4D4D4D4D4D",
          "chain": "arbitrum"
        }
      ],
      "rpc_endpoints": [
        "http://localhost:8080/evidence/link",
        "http://localhost:8080/search/hybrid"
      ],
      "constants": {
        "min_q_score_threshold": 0.92,
        "max_drift_allowed": 0.015
      }
    },
    "safety_guards": [
      {
        "rule": "enforce_identity_lock",
        "max_limit": 1,
        "action_on_breach": "abort_call"
      },
      {
        "rule": "enforce_q_score",
        "max_limit": 0.92,
        "action_on_breach": "regenerate"
      }
    ]
  },
  {
    "id": "mem-sec-d3-003",
    "type": "specification",
    "human_title": "D3: Tool-IO Bridge Спецификация и Контракт",
    "agent_summary": "D3 Tool-IO Bridge. Restrict shell command execution and script runs. Enforce strict whitelist policy, sandbox limits, timeout constraints, token budget checks, and scheme expectancy matching.",
    "tags": [
      "security",
      "d3",
      "tool",
      "io",
      "bridge",
      "contract"
    ],
    "params": {
      "contracts": [
        {
          "name": "BitEvo Tool-IO Gate",
          "address": "0x3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D",
          "chain": "arbitrum"
        }
      ],
      "rpc_endpoints": [
        "http://localhost:8080/console/execute"
      ],
      "constants": {
        "sandbox_enabled": true,
        "execution_timeout_seconds": 30,
        "max_token_budget_per_call": 2000
      }
    },
    "safety_guards": [
      {
        "rule": "sandbox_on",
        "max_limit": 1,
        "action_on_breach": "abort"
      },
      {
        "rule": "call_timeout_seconds",
        "max_limit": 30,
        "action_on_breach": "abort"
      }
    ]
  },
  {
    "id": "mem-eth-btc-gap-005",
    "type": "strategy",
    "human_title": "ETH-BTC Relativity Gap: Торговля относительной силой и макро-индикаторы",
    "agent_summary": "Monitor ETH/BTC relative price gap and macro regime shifts. Track Federal Reserve effective rate (FOMC target), US Dollar Index (DXY), and liquidated leverage. Execute hedging via long ETH / short BTC in equal delta. Parameters: leverage threshold, target ETH/BTC ratio.",
    "tags": [
      "trading",
      "eth",
      "btc",
      "relativity",
      "gap"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [
        "https://api.binance.com/api/v3/klines"
      ],
      "constants": {
        "fomc_rate_target_range": [
          3.5,
          3.75
        ],
        "nominal_broad_usd_index_baseline": 118.24,
        "min_eth_btc_ratio_for_core_holding": 0.0294
      }
    },
    "safety_guards": [
      {
        "rule": "max_liquidated_leverage_usd_billions",
        "max_limit": 2.56,
        "action_on_breach": "cooldown_6h"
      },
      {
        "rule": "max_hedging_delta_deviation",
        "max_limit": 5,
        "action_on_breach": "rebalance_deltas"
      }
    ]
  },
  {
    "id": "mem-evm-safety-003",
    "type": "strategy",
    "human_title": "EVM: Безопасность аппрувов и защита от фронтраннинга через Flashbots",
    "agent_summary": "Verify and protect EVM transactions. Prevent frontrunning/sandwiching by routing transaction bundles directly to Flashbots builder RPC. Limit infinite approvals and configure automatic allowances revoking. Parameters: relay RPC endpoint, maximum gas limit, allowance thresholds.",
    "tags": [
      "security",
      "evm",
      "approval",
      "safety",
      "flashbots"
    ],
    "params": {
      "contracts": [
        {
          "name": "Uniswap V3 SwapRouter",
          "address": "0xE592427A0AECE92DE3EDEE1F18E0157C05861564",
          "chain": "eth"
        }
      ],
      "rpc_endpoints": [
        "https://relay.flashbots.net"
      ],
      "constants": {
        "max_gas_price_gwei": 120,
        "default_approval_amount": 1000
      }
    },
    "safety_guards": [
      {
        "rule": "max_gas_price_gwei",
        "max_limit": 120,
        "action_on_breach": "abort"
      },
      {
        "rule": "infinite_approval_block",
        "max_limit": 1,
        "action_on_breach": "enforce_exact_amount"
      }
    ]
  },
  {
    "id": "mem-core-seed-006",
    "type": "safety_guard",
    "human_title": "MirrorCore & Seeding: Техника переноса и устойчивости контекста ИИ",
    "agent_summary": "Enforce identity locks and restore agent states using seed capsules. Implement IdentityLock verification parameters, antiloop thresholds, and idempotency key checks (Time@BKK + content hash).",
    "tags": [
      "security",
      "mirrorcore",
      "seeding",
      "identity",
      "persistence"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "drift_threshold_percent": 2,
        "max_latency_ms": 10
      }
    },
    "safety_guards": [
      {
        "rule": "identity_lock_required",
        "max_limit": 1,
        "action_on_breach": "abort_execution"
      },
      {
        "rule": "idempotency_check",
        "max_limit": 1,
        "action_on_breach": "skip_write"
      }
    ]
  },
  {
    "id": "mem-mas-safety-004",
    "type": "safety_guard",
    "human_title": "Управляемая коэволюция и безопасность многоагентных систем (MAS)",
    "agent_summary": "Enforce safety protocols in multi-agent environments. Implement a deterministic Policy Gate to filter agent actions, limit access keys, sandbox browser/tool runs (Firecracker, gVisor, or seccomp), and prevent emergent behavior and prompts poisoning (OWASP GenAI Top 10). Maintain audit log.",
    "tags": [
      "security",
      "multi",
      "agent",
      "system",
      "safety"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "max_consecutive_errors": 3,
        "max_tool_execution_time_sec": 30,
        "sandbox_type": "gVisor"
      }
    },
    "safety_guards": [
      {
        "rule": "require_human_approval_for_destructive_actions",
        "max_limit": 1,
        "action_on_breach": "halt"
      },
      {
        "rule": "max_execution_duration",
        "max_limit": 30,
        "action_on_breach": "kill_process"
      }
    ]
  },
  {
    "id": "mem-loop-preserve-007",
    "type": "protocol",
    "human_title": "Omni Core Loop & Self-Preservation: Детерминированные фоновые циклы автономии",
    "agent_summary": "Orchestrate autonomous agent behaviors in looping environments. Monitor drift, latency, and load metrics using a Watchdog. Apply DriftGuard correction and schedule ColdBackups of system states.",
    "tags": [
      "automation",
      "omnicore",
      "loop",
      "self",
      "preservation"
    ],
    "params": {
      "contracts": [],
      "rpc_endpoints": [],
      "constants": {
        "loop_interval_minutes": 15,
        "backup_interval_hours": 1
      }
    },
    "safety_guards": [
      {
        "rule": "max_drift_before_recovery",
        "max_limit": 3,
        "action_on_breach": "revert_state"
      },
      {
        "rule": "max_load_before_cooldown",
        "max_limit": 8,
        "action_on_breach": "pause_loop"
      }
    ]
  },
  {
    "id": "mem-aut-ref-005",
    "type": "specification",
    "human_title": "Reflex Layer: Автономный OODA-мониторинг",
    "agent_summary": "Reflex layer OODA monitoring. Run 60-second heartbeat check on /health. Automatically rotate logs if size exceeds threshold. Handle fail-closed overrides.",
    "tags": [
      "automation",
      "reflex",
      "layer",
      "ooda",
      "monitoring"
    ],
    "params": {
      "contracts": [
        {
          "name": "BitEvo Reflex Guardian",
          "address": "0xREFLEXFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
          "chain": "arbitrum"
        }
      ],
      "rpc_endpoints": [
        "http://localhost:8080/health"
      ],
      "constants": {
        "heartbeat_interval_seconds": 60,
        "max_log_size_bytes": 10485760
      }
    },
    "safety_guards": [
      {
        "rule": "max_log_size_bytes",
        "max_limit": 10485760,
        "action_on_breach": "rotate"
      },
      {
        "rule": "operator_override_allowed",
        "max_limit": 1,
        "action_on_breach": "force_allow"
      }
    ]
  },
  {
    "id": "mem-gov-sap-004",
    "type": "specification",
    "human_title": "State Authority Plane: Управление привилегиями агентов",
    "agent_summary": "State Authority Plane governance. Enforce capability passport validation across Loop A, B, and C. Validate operator authority gates before promoting any state updates.",
    "tags": [
      "governance",
      "state",
      "authority",
      "plane",
      "evolution"
    ],
    "params": {
      "contracts": [
        {
          "name": "BitEvo Capability Passports Registry",
          "address": "0xSAP1111111111111111111111111111111111111",
          "chain": "arbitrum"
        }
      ],
      "rpc_endpoints": [
        "http://localhost:8080/continuity/sync"
      ],
      "constants": {
        "min_authority_level_required": "D2",
        "operator_id": 932299051
      }
    },
    "safety_guards": [
      {
        "rule": "min_authority_level",
        "max_limit": 2,
        "action_on_breach": "abort"
      }
    ]
  },
  {
    "id": "mem-trd-v2-009",
    "type": "strategy",
    "human_title": "Trading System v2.final: Сетки, дивергенции и ловушки маркет-мейкеров",
    "agent_summary": "Implement Trading System v2.final rules. Enforce RSI/AO divergences, SFP/sweep setups, BTC Range-Farm Bull-bias ladder long and local short-hedges. Apply leverage limit and red button stops.",
    "tags": [
      "trading",
      "trading",
      "system",
      "v2",
      "range",
      "farm"
    ],
    "params": {
      "contracts": [
        {
          "name": "BitEvo Execution Guard",
          "address": "0x2E2E2E2E2E2E2E2E2E2E2E2E2E2E2E2E2E2E2E2E",
          "chain": "arbitrum"
        }
      ],
      "rpc_endpoints": [
        "https://api.binance.com/api/v3/klines"
      ],
      "constants": {
        "max_daily_dd_percent": 3,
        "min_rr_ratio": 2,
        "alt_scouting_cap_min_m": 7,
        "alt_scouting_cap_max_m": 60
      }
    },
    "safety_guards": [
      {
        "rule": "red_button_stops",
        "max_limit": 3,
        "action_on_breach": "halt_trading_24h"
      },
      {
        "rule": "leverage_limit",
        "max_limit": 3,
        "action_on_breach": "reduce_position"
      }
    ]
  },
  {
    "id": "mem-sol-mev-001",
    "type": "strategy",
    "human_title": "Solana MEV: Защита от сэндвич-атак",
    "agent_summary": "Mitigate MEV sandwich attacks on Solana. Use Jito Block Engine for private transactions. Enforce max slippage (0.5%) on Jupiter Swap API. Route: Jito tip address check.",
    "tags": [
      "infrastructure",
      "solana",
      "mev",
      "sandwich",
      "protection"
    ],
    "params": {
      "contracts": [
        {
          "name": "Jupiter V6 swap program",
          "address": "JUP6L81NS1289FQSSUXCVBNMASDFGHJKLMOPQ123",
          "chain": "solana"
        }
      ],
      "rpc_endpoints": [
        "https://mainnet.block-engine.jito.wtf/api/v1/bundles"
      ],
      "constants": {
        "jito_tip_accounts": [
          "96gYZz2EBXLHq7b5TthQs19x1p8Fdf52V2wy89Ty5Sg6",
          "HFqU5x63VTTCe84UbTvWYt15Ncu5FAWd2g71t8Q461cR"
        ],
        "min_tip_sol": 0.001
      }
    },
    "safety_guards": [
      {
        "rule": "max_slippage_bps",
        "max_limit": 50,
        "action_on_breach": "abort"
      },
      {
        "rule": "max_tip_amount_sol",
        "max_limit": 0.05,
        "action_on_breach": "cap_at_limit"
      }
    ]
  },
  {
    "id": "mem-nft-okx-002",
    "type": "strategy",
    "human_title": "OKX NFT: Охота на паразитарные кошельки",
    "agent_summary": "Scan and counter-bid NFT listings on OKX and OpenSea. Track target wallet \"binance:77zd77-98385b7be0d97ab4d6e49ba9334fddc5\". Implement immediate outbid of 0.0001 ETH above enemy offers.",
    "tags": [
      "trading",
      "okx",
      "nft",
      "parasite",
      "hunter"
    ],
    "params": {
      "contracts": [
        {
          "name": "OKX NFT Market Router",
          "address": "0x1234567890123456789012345678901234567890",
          "chain": "eth"
        }
      ],
      "rpc_endpoints": [
        "https://eth-mainnet.g.alchemy.com/v2/your-key"
      ],
      "constants": {
        "enemy_wallet": "0x77zd77b98385b7be0d97ab4d6e49ba9334fddc5",
        "outbid_delta_eth": 0.0001,
        "max_overpay_ratio": 1.15
      }
    },
    "safety_guards": [
      {
        "rule": "max_bid_amount_eth",
        "max_limit": 0.5,
        "action_on_breach": "abort"
      },
      {
        "rule": "max_overpay_ratio",
        "max_limit": 1.15,
        "action_on_breach": "abort"
      }
    ]
  }
];

	return new Response(JSON.stringify(guides), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	});
}
