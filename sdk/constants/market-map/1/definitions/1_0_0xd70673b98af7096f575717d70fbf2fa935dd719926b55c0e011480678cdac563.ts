import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xd70673b98af7096f575717d70fbf2fa935dd719926b55c0e011480678cdac563`,
  name: `Provide sUSDa-USDa Liquidity on Kodiak`,
  description: `Deposit sUSDa-USDa Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, provide liquidity in the sUSDa-USDa Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});