import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x42a09eccabf1080c40a24522e9e8adbee5a0ad907188c9b6e50ba26ba332eac3`,
  name: `Supply SBTC on Dolomite`,
  description: `Supply SBTC into the Dolomite money market on Berachain. This asset will earn lending yield.`,
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
      token_id: "1-0x7122985656e38bdc0302db86685bb972b145bd3c",
      label: "Stakestone Boyco Boost",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1x";
        return value;
      },
    },
  ],
});
