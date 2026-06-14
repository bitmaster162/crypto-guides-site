export async function GET() {
	const content = [
		`# Crypto Guides & AI Libraries Index`,
		`This index maps the available crypto guides and execution protocols.`,
		``,
		`## Guides List`,
		``,
		`### 1. Solana MEV: Sandwich Protection`,
		`- Slug: /guides/solana-mev-sandwich-protection`,
		`- Description: Mitigate MEV sandwich attacks on Solana using Jito Block Engine and Jupiter slippage bounds.`,
		`- Program/Contract: JUP6L81NS1289FQSSUXCVBNMASDFGHJKLMOPQ123`,
		`- Safety limit: max_slippage_bps = 50 (0.5%)`,
		``,
		`### 2. OKX NFT: Parasite Hunter`,
		`- Slug: /guides/okx-nft-parasite-hunter`,
		`- Description: Outbid enemy wallet '0x77zd77b98385b7be0d97ab4d6e49ba9334fddc5' on OKX NFT and OpenSea.`,
		`- Router Contract: 0x1234567890123456789012345678901234567890`,
		`- Safety limit: max_overpay_ratio = 1.15x`,
		``,
		`### 3. D3: Tool-IO Bridge Specification and Contract`,
		`- Slug: /guides/d3-tool-io-bridge-contract`,
		`- Description: Restrict shell execution and scripts in safe sandbox with scheme validation and limits.`,
		`- Gate Contract: 0x3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D`,
		`- Safety limit: call_timeout_seconds = 30`,
		``,
		`### 4. State Authority Plane: Agent Privilege Evolution`,
		`- Slug: /guides/state-authority-plane-evolution`,
		`- Description: Evolution of agent privilege governance levels (Loop A -> B -> C) via passports.`,
		`- Registry Contract: 0xSAP1111111111111111111111111111111111111`,
		`- Safety limit: min_authority_level = D2`,
		``,
		`### 5. Reflex Layer: Autonomous OODA Monitoring`,
		`- Slug: /guides/reflex-layer-ooda-monitoring`,
		`- Description: Implementation of OODA monitoring loop for health checks, auto-reboot and logs.`,
		`- Guardian Contract: 0xREFLEXFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF`,
		`- Safety limit: max_log_size_bytes = 10MB`,
		``,
		`### 17. S14: Паттерн «Один говорит, а три молчат» (Фейковая корона)`,
		`- Slug: /guides/sector-divergence-fake-crown`,
		`- Description: Sector divergence filter (fake crown): when 1 asset in a correlated sector (e.g. L2: ARB, OP, MANTA, STRK) pumps but peers are silent (no sector confirmation), reject trading signals on the leader.`,
		`- Safety limit: reject_sector_divergence = 0`,
		``,
		`### 18. S15: Паттерн «Compression / No-Man’s-Land» (Сжатие и Капкан-удушение)`,
		`- Slug: /guides/compression-no-mans-land-trap`,
		`- Description: Volatility compression and mid-range trap (no man's land): when ATR percent is compressed below the floor and price is in the middle of local swing range (30% to 70%), reject entries.`,
		`- Safety limit: reject_mid_range_compression = 0`
	].join('\n');

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
}
