import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `11155111_0_0x7980d728b4646c36dcf6a89af683bc46adb21b0cfdce180d7513c14e6a6d832a`,
  name: `beraETH-WETH`,
  description: `Deposit WETH on Ethereum Mainnet and bridge WETH to Berachain via Stargate Hydra. On Berachain, mint beraETH with ~50% of the WETH via Dinero, then pair the WETH and beraETH in the appropriate ratio at the current price to provide liquidity in the WETH-beraETH Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position, with the price and range optimized and determined by the asset issuer. Finally, stake the Island receipt token in the respective Infrared Vault.`,
  is_verified: false,
});
