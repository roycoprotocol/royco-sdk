import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xad9ee12ea8b3dccf85934c2918bd4ad38ccf7bc8b43d5fcb6f298858aa4c9ca4`,
  name: `Infrared x Kodiak sUSDe-HONEY LP, Boyco`,
  description: `Deposit sUSDe-USDC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge the assets to Berachain. On Berachain, mint HONEY with all of the USDC, then provide liquidity in the sUSDe-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared iBGT-compatible Vault. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});