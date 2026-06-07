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
		`- Safety limit: max_log_size_bytes = 10MB`
	].join('\n');

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
}
