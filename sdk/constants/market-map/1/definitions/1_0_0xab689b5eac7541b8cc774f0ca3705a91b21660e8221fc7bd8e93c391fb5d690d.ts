import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xab689b5eac7541b8cc774f0ca3705a91b21660e8221fc7bd8e93c391fb5d690d`,
  name: `Provide USDe-USDa Liquidity on Kodiak`,
  description: `Deposit USDe-USDa Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, provide liquidity in the USDe-USDa Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
