import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xa588ad19850cf2a111c3c727033da8e557abc94de70fce2d2b2f2f78140f15e5`,
  name: `Supply USDe on Dolomite`,
  description: `Supply USDe into the Dolomite money market on Berachain. This asset will earn lending yield.`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0x460f8d9c78b1bde7da137ce75315bd15d34a369b"],
  external_incentives: [
    {
      token_id: "1-0x460f8d9c78b1bde7da137ce75315bd15d34a369b",
      label: "Dolomite Lending Yield",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Variable Rate";
        return value;
      },
    },
    {
      token_id: "1-0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
      label: "Ethena sats",

      value: async ({ roycoClient, chainClient }) => {
        const value = "30x";
        return value;
      },
    },
  ],
});
