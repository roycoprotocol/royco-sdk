import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x1997c604de34a71974228bca4a66f601427c48960b6e59ff7ebc8e34f43f3ecf`,
  name: `Provide beraETH-STONE Liquidity on Kodiak, Stake LP with Infrared`,
  description: `Deposit WETH-STONE Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, mint beraETH with all of the WETH, then provide liquidity in the beraETH-STONE Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared iBGT-compatible Vault. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
