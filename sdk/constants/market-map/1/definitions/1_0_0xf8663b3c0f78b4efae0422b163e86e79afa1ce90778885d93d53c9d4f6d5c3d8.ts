import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xf8663b3c0f78b4efae0422b163e86e79afa1ce90778885d93d53c9d4f6d5c3d8`,
  name: `Kodiak x Beraborrow WETH-HONEY to mint NECT, Boyco`,
  description: `Deposit WETH-USDC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge the assets to Berachain. On Berachain, mint HONEY with all of the USDC, then provide liquidity in the WETH-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;wide&quot; range Uniswap V3 style liquidity position.
The Island receipt token is deposited into Beraborrow, and used to mint NECT at 300% collateral ratio. NECT is then supplied into the Liquid Stability Pool.
This is part of the Berachain Boyco pre-deposit campaign`,
  is_verified: false,
  category: `boyco`,
});