import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x25f7a422282a1f26d9d96b5d1c43fa5c6f8c355b0ed7a4755ac8d04a504817f5`,
  name: `Provide rsETH-beraETH Liquidity on Kodiak`,
  description: `Deposit rsETH-WETH Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, mint beraETH with all of the WETH, then provide liquidity in the rsETH-beraETH Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});