import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x7be233caf60ad2ec5ee794aa0f1962c94c32378a597b8739e5c0cb3a4958b79e`,
  name: `Provide MIM-HONEY Liquidity on Kodiak`,
  description: `Deposit MIM-USDC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge the assets to Berachain. On Berachain, mint HONEY with all of the USDC, then provide liquidity in the MIM-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared iBGT-compatible Vault. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
