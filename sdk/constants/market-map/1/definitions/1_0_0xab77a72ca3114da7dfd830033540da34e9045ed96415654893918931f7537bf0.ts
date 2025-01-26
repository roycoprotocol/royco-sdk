import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xab77a72ca3114da7dfd830033540da34e9045ed96415654893918931f7537bf0`,
  name: `Provide WETH-STONE Liquidity on Kodiak`,
  description: `Deposit WETH-STONE Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, provide liquidity in the WETH-STONE Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared iBGT-compatible Vault. This is part of Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});