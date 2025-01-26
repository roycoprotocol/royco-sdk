import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x60b1db95ec90325949de6ca83ed584a00e17f3967c66ee975ac53c5e45969485`,
  name: `Infrared x Kodiak WBTC-HONEY LP, Boyco`,
  description: `Deposit WBTC-USDC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge the assets to Berachain. On Berachain, mint HONEY with all of the USDC, then provide liquidity in the WBTC-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;wide&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared iBGT-compatible Vault.

Earn DEX LP fees, as well as rewards from Berachain, Infrared and Kodiak. This market qualifies for the HIGHEST multiplier rewards from Berachain.

This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
