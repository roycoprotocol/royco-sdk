import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xcdd60ed30d20f9edc3fac624bb623db32103658b6da678949ef53df16139b488`,
  name: `Kodiak x Beraborrow WBTC-HONEY to mint NECT, Boyco`,
  description: `Deposit WBTC-USDC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge the assets to Berachain. On Berachain, mint HONEY with all of the USDC, then provide liquidity in the WBTC-USDC Kodiak Island, an automated liquidity management vault that tokenizes a &quot;wide&quot; range Uniswap V3 style liquidity position.
The Island receipt token is deposited into Beraborrow, and used to mint NECT at 300% collateral ratio. NECT is then supplied into the Liquid Stability Pool.
This is part of the Berachain Boyco pre-deposit campaign`,
  is_verified: false,
  category: `boyco`,
});