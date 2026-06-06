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
		}
	];

	return new Response(JSON.stringify(guides), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	});
}
