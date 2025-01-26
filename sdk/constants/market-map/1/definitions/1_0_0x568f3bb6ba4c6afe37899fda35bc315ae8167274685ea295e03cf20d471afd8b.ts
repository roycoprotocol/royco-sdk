import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x568f3bb6ba4c6afe37899fda35bc315ae8167274685ea295e03cf20d471afd8b`,
  name: `Provide WBTC-uniBTC Liquidity on Kodiak`,
  description: `Deposit WBTC-uniBTC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, provide liquidity in the WBTC-uniBTC Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
