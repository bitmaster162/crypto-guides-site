export async function GET() {
	const guides = [
		{
			id: "mem-sol-mev-001",
			type: "strategy",
			human_title: "Solana MEV: Защита от сэндвич-атак",
			agent_summary: "Mitigate MEV sandwich attacks on Solana. Use Jito Block Engine for private transactions. Enforce max slippage (0.5%) on Jupiter Swap API. Route: Jito tip address check.",
			tags: ["solana", "mev", "jito", "jupiter", "defi"],
			params: {
				contracts: [
					{ name: "Jupiter V6 swap program", address: "JUP6L81NS1289FQSSUXCVBNMASDFGHJKLMOPQ123", chain: "solana" }
				],
				rpc_endpoints: [
					"https://mainnet.block-engine.jito.wtf/api/v1/bundles"
				],
				constants: {
					jito_tip_accounts: [
						"96gYZz2EBXLHq7b5TthQs19x1p8Fdf52V2wy89Ty5Sg6",
						"HFqU5x63VTTCe84UbTvWYt15Ncu5FAWd2g71t8Q461cR"
					],
					min_tip_sol: 0.001
				}
			},
			safety_guards: [
				{ rule: "max_slippage_bps", max_limit: 50, action_on_breach: "abort" },
				{ rule: "max_tip_amount_sol", max_limit: 0.05, action_on_breach: "cap_at_limit" }
			]
		},
		{
			id: "mem-nft-okx-002",
			type: "strategy",
			human_title: "OKX NFT: Охота на паразитарные кошельки",
			agent_summary: "Scan and counter-bid NFT listings on OKX and OpenSea. Track target wallet 'binance:77zd77-98385b7be0d97ab4d6e49ba9334fddc5'. Implement immediate outbid of 0.0001 ETH above enemy offers.",
			tags: ["nft", "okx", "opensea", "arbitrage"],
			params: {
				contracts: [
					{ name: "OKX NFT Market Router", address: "0x1234567890123456789012345678901234567890", chain: "eth" }
				],
				rpc_endpoints: [
					"https://eth-mainnet.g.alchemy.com/v2/your-key"
				],
				constants: {
					enemy_wallet: "0x77zd77b98385b7be0d97ab4d6e49ba9334fddc5",
					outbid_delta_eth: 0.0001,
					max_overpay_ratio: 1.15
				}
			},
			safety_guards: [
				{ rule: "max_bid_amount_eth", max_limit: 0.5, action_on_breach: "abort" },
				{ rule: "max_overpay_ratio", max_limit: 1.15, action_on_breach: "abort" }
			]
		},
		{
			id: "mem-sec-d3-003",
			type: "specification",
			human_title: "D3: Tool-IO Bridge Спецификация и Контракт",
			agent_summary: "D3 Tool-IO Bridge. Restrict shell command execution and script runs. Enforce strict whitelist policy, sandbox limits, timeout constraints, token budget checks, and scheme expectancy matching.",
			tags: ["security", "sandbox", "d3", "bitevo"],
			params: {
				contracts: [
					{ name: "BitEvo Tool-IO Gate", address: "0x3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D", chain: "arbitrum" }
				],
				rpc_endpoints: [
					"http://localhost:8080/console/execute"
				],
				constants: {
					sandbox_enabled: true,
					execution_timeout_seconds: 30,
					max_token_budget_per_call: 2000
				}
			},
			safety_guards: [
				{ rule: "sandbox_on", max_limit: 1, action_on_breach: "abort" },
				{ rule: "call_timeout_seconds", max_limit: 30, action_on_breach: "abort" }
			]
		},
		{
			id: "mem-gov-sap-004",
			type: "specification",
			human_title: "State Authority Plane: Управление привилегиями агентов",
			agent_summary: "State Authority Plane governance. Enforce capability passport validation across Loop A, B, and C. Validate operator authority gates before promoting any state updates.",
			tags: ["governance", "sap", "authority", "continuity"],
			params: {
				contracts: [
					{ name: "BitEvo Capability Passports Registry", address: "0xSAP1111111111111111111111111111111111111", chain: "arbitrum" }
				],
				rpc_endpoints: [
					"http://localhost:8080/continuity/sync"
				],
				constants: {
					min_authority_level_required: "D2",
					operator_id: 932299051
				}
			},
			safety_guards: [
				{ rule: "min_authority_level", max_limit: 2, action_on_breach: "abort" }
			]
		},
		{
			id: "mem-aut-ref-005",
			type: "specification",
			human_title: "Reflex Layer: Автономный OODA-мониторинг",
			agent_summary: "Reflex layer OODA monitoring. Run 60-second heartbeat check on /health. Automatically rotate logs if size exceeds threshold. Handle fail-closed overrides.",
			tags: ["automation", "reflex", "ooda", "monitoring"],
			params: {
				contracts: [
					{ name: "BitEvo Reflex Guardian", address: "0xREFLEXFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", chain: "arbitrum" }
				],
				rpc_endpoints: [
					"http://localhost:8080/health"
				],
				constants: {
					heartbeat_interval_seconds: 60,
					max_log_size_bytes: 10485760
				}
			},
			safety_guards: [
				{ rule: "max_log_size_bytes", max_limit: 10485760, action_on_breach: "rotate" },
				{ rule: "operator_override_allowed", max_limit: 1, action_on_breach: "force_allow" }
			]
		}
	];

	return new Response(JSON.stringify(guides), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	});
}
