import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xc5165360e2e8b195cb55e21cf259ce6a5ee996b055057d8705851d9b01fc8620`,
  name: `Provide FBTC-SolvBTC Liquidity on Kodiak`,
  description: `Deposit FBTC-SolvBTC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, provide liquidity in the FBTC-SolvBTC Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});