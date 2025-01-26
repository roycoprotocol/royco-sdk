import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x49104b3cadbb31470e5b949c6892a33954ee9ce35041df4a04a88eb694b645c0`,
  name: `Provide WBTC-waBTC Liquidity on Kodiak`,
  description: `Deposit WBTC-waBTC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, provide liquidity in the WBTC-waBTC Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
