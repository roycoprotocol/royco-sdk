import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x870b2827e7965bce20f621888fb882f1d7e8803b45f556c41330c93612042582`,
  name: `Provide WETH-beraETH Liquidity on Kodiak`,
  description: `Deposit WETH on Ethereum Mainnet and bridge WETH to Berachain. On Berachain, mint beraETH with ~50% of the WETH, then provide liquidity in the WETH-beraETH Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared iBGT-compatible Vault. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
