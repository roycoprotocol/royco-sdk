import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x79e0436d7a8563f4beeb66ac9cfd3c40e43ed3b1fa07c57ac91e301da0469c4c`,
  name: `Provide beraETH-STONE Liquidity on Kodiak`,
  description: `Deposit WETH-STONE Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, mint beraETH with all of the WETH, then provide liquidity in the beraETH-STONE Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared iBGT-compatible Vault. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
