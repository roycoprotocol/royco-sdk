import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x1e0a98a276ba873cfa427e247c7d0e438f604a54fcb36481063e1220af021faf`,
  name: `Supply USDC on Dolomite`,
  description: `Supply USDC into the Dolomite money market on Berachain. This asset will earn lending yield.`,
  is_verified: false,
  category: `boyco`,

  external_incentives: [
    {
      token_id: "1-0x460f8d9c78b1bde7da137ce75315bd15d34a369b",
      label: "Dolomite Lending Yield",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Variable Rate";
        return value;
      },
    },
  ],
});
