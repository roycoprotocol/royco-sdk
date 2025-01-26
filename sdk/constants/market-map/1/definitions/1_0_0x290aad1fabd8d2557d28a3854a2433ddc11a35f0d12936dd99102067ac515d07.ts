import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x290aad1fabd8d2557d28a3854a2433ddc11a35f0d12936dd99102067ac515d07`,
  name: `Provide WBTC-SolvBTC Liquidity on Kodiak`,
  description: `Deposit WBTC-SolvBTC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, provide liquidity in the WBTC-SolvBTC Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});