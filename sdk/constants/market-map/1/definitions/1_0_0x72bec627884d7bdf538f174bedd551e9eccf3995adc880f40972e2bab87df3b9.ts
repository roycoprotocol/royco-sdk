import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x72bec627884d7bdf538f174bedd551e9eccf3995adc880f40972e2bab87df3b9`,
  name: `Infrared x Kodiak USDC-HONEY LP, Boyco`,
  description: `Deposit USDC on Ethereum Mainnet and bridge USDC to Berachain. On Berachain, mint HONEY with ~50% of the USDC, then provide liquidity in the USDC-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared iBGT-compatible Vault.`,
  is_verified: false,
  category: `boyco`,
});
