import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x5f7935e257b94aee6caf9bbe917d4cfad75e8bc3b231806769ca0935af8371e8`,
  name: `Infrared x Kodiak USDe-HONEY LP, Boyco`,
  description: `Deposit USDe-USDC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge the assets to Berachain. On Berachain, mint HONEY with all of the USDC, then provide liquidity in the USDe-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared iBGT-compatible Vault.`,
  is_verified: false,
  category: `boyco`,
});
