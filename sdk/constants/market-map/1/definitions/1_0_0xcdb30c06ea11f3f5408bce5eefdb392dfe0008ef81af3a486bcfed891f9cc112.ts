import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xcdb30c06ea11f3f5408bce5eefdb392dfe0008ef81af3a486bcfed891f9cc112`,
  name: `Provide rUSD-HONEY Liquidity on Kodiak`,
  description: `Deposit rUSD-USDC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, mint HONEY with all of the USDC, then provide liquidity in the rUSD-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});