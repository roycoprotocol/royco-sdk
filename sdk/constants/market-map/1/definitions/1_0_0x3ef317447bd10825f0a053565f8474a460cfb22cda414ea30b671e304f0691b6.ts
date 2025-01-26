import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x3ef317447bd10825f0a053565f8474a460cfb22cda414ea30b671e304f0691b6`,
  name: `Provide beraETH-RSWETH Liquidity on Kodiak`,
  description: `Deposit WETH-RSWETH Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, mint beraETH with all of the WETH, then provide liquidity in the beraETH-RSWETH Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
