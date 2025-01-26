import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x460ec133419318efe4e05b4c3b6db421503fd6fcefbb20a43f50e3fc50f2ee39`,
  name: `Provide rsETH-ylrsETH Liquidity on Kodiak`,
  description: `Deposit rsETH-ylrsETH Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, provide liquidity in the rsETH-ylrsETH Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});