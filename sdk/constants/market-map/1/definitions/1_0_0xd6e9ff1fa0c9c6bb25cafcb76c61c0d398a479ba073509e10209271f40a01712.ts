import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xd6e9ff1fa0c9c6bb25cafcb76c61c0d398a479ba073509e10209271f40a01712`,
  name: `Provide WBTC-FBTC Liquidity on Kodiak`,
  description: `Deposit WBTC-FBTC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, provide liquidity in the WBTC-FBTC Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});