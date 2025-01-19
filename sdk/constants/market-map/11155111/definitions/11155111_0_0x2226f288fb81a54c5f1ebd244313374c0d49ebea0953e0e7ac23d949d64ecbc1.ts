import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `11155111_0_0x2226f288fb81a54c5f1ebd244313374c0d49ebea0953e0e7ac23d949d64ecbc1`,
  name: `WETH-HONEY`,
  description: `Deposit WETH-USDC Uniswap V2 LP token(s) on Ethereum Mainnet, unwrap them to retrieve the underlying assets (WETH and USDC), and bridge these assets to Berachain via Stargate Hydra. On Berachain, mint HONEY with all of the USDC via Honey Swap, then pair the WETH and HONEY in the appropriate ratio at the current price to provide liquidity in the WETH-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;wide&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared Vault.`,
  is_verified: false,
});
