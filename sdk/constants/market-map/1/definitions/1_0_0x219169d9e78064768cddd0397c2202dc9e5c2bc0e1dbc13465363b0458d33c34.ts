import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x219169d9e78064768cddd0397c2202dc9e5c2bc0e1dbc13465363b0458d33c34`,
  name: `Provide beraETH-ylstETH Liquidity on Kodiak`,
  description: `Deposit WETH-ylstETH Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, mint beraETH with all of the WETH, then provide liquidity in the beraETH-ylstETH Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
