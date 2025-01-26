import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xa295c9d622bf2e562bcae859c46a9e95343982c3eab087b9ab098c256c1a32be`,
  name: `Provide rsETH-beraETH Liquidity on Kodiak`,
  description: `Deposit rsETH-WETH Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, mint beraETH with all of the WETH, then provide liquidity in the rsETH-beraETH Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});