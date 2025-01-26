import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x378d4d32d89450978d01cfdf1ff1907d4419aa186c48abb94e612b76d75f3fae`,
  name: `Provide SolvBTC-SolvBTC.BBN Liquidity on Kodiak`,
  description: `Deposit SolvBTC-SolvBTC.BBN Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, provide liquidity in the SolvBTC-SolvBTC.BBN Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
