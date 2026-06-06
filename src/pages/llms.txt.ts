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
		`- Safety limit: max_overpay_ratio = 1.15x`
	].join('\n');

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
}
