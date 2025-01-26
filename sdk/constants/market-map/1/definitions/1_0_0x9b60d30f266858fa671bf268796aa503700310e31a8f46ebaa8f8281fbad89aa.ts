import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x9b60d30f266858fa671bf268796aa503700310e31a8f46ebaa8f8281fbad89aa`,
  name: `Provide WBTC-stBTC Liquidity on Kodiak`,
  description: `Deposit WBTC-stBTC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, provide liquidity in the WBTC-stBTC Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});