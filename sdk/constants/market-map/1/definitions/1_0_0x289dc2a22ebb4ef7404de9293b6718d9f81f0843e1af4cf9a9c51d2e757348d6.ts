import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x289dc2a22ebb4ef7404de9293b6718d9f81f0843e1af4cf9a9c51d2e757348d6`,
  name: `Provide WBTC-SBTC Liquidity on Kodiak`,
  description: `Deposit WBTC-SBTC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, provide liquidity in the WBTC-SBTC Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});