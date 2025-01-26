import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xfa4917a871f9cf06d3d00be6678993888b3aac41c3da21edf32c3c9cf3978d70`,
  name: `Provide USDa-HONEY Liquidity on Kodiak`,
  description: `Deposit USDa-USDC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge the assets to Berachain. On Berachain, mint HONEY with all of the USDC, then provide liquidity in the USDa-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
