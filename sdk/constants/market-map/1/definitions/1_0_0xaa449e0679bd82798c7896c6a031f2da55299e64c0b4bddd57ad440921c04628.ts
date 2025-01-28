import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xaa449e0679bd82798c7896c6a031f2da55299e64c0b4bddd57ad440921c04628`,
  name: `THJ&#x2F;Set and Forgetti - USDC Vault, Henlo Boyco`,
  description: `When USDC is supplied to the market, it is bridged to a vault on Berachain mainnet. It is supplied to the USDC-HONEY liquidity pool on Beraswap and deposited into the Set &amp; Forgetti Stable Farm to earn Proof of Liquidity rewards, which are autoharvested and compounded into HENLO. At expiry, users can withdraw their stable deposit plus the accrued HENLO tokens. A Honey Jar joint.`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0x325e05f22af5a3f7e2cb9b112e8f4d9b6c14b8b4"],
  external_incentives: [
    {
      token_id: "1-0xb000000000000000000000000000000000000112",
      label: "DEX Fees",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Variable Rate";
        return value;
      },
    },
  ],
});
