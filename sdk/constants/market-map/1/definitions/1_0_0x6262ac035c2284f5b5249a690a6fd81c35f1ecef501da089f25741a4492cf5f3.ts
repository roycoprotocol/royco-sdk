import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x6262ac035c2284f5b5249a690a6fd81c35f1ecef501da089f25741a4492cf5f3`,
  name: `Infrared x Kodiak WBTC-HONEY LP, Boyco`,
  description: `Deposit WBTC-USDC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge the assets to Berachain. On Berachain, mint HONEY with all of the USDC, then provide liquidity in the WBTC-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;wide&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared iBGT-compatible Vault.

Earn DEX LP fees, as well as rewards from Berachain, Infrared and Kodiak. This market qualifies for the HIGHEST multiplier rewards from Berachain.

This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});