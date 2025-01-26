import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x55241e7b57b44ee68d875a1f0618c31f9ab82c46e6eaf2d5acb7605e23cd866b`,
  name: `TEST MARKET: Provide beraETH-STONE Liquidity on Kodiak, Stake LP with Infrared`,
  description: `Deposit WETH-STONE Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, mint beraETH with all of the WETH, then provide liquidity in the beraETH-STONE Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared iBGT-compatible Vault. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
