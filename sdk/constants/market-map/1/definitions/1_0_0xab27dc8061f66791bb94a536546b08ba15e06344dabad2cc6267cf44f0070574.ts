import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xab27dc8061f66791bb94a536546b08ba15e06344dabad2cc6267cf44f0070574`,
  name: `Provide pumpBTC.bera-FBTC Liquidity on Kodiak`,
  description: `Deposit pumpBTC.bera-FBTC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, provide liquidity in the pumpBTC.bera-FBTC Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
