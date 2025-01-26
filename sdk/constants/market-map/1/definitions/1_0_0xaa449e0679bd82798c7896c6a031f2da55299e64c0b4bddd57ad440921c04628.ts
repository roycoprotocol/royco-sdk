import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xaa449e0679bd82798c7896c6a031f2da55299e64c0b4bddd57ad440921c04628`,
  name: `THJ&#x2F;Set and Forgetti - USDC Vault, Henlo Boyco`,
  description: `When USDC is supplied to the market, it is bridged to a vault on Berachain mainnet. It is supplied to the USDC-HONEY liquidity pool on Beraswap and deposited into the Set &amp; Forgetti Stable Farm to earn Proof of Liquidity rewards, which are autoharvested and compounded into HENLO. At expiry, users can withdraw their stable deposit plus the accrued HENLO tokens. A Honey Jar joint.`,
  is_verified: false,
  category: `boyco`,
});
