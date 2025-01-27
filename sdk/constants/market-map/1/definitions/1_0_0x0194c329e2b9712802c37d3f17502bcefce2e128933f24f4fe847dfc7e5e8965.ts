import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x0194c329e2b9712802c37d3f17502bcefce2e128933f24f4fe847dfc7e5e8965`,
  name: `Supply ylBTCLST on Dolomite`,
  description: `Supply ylBTCLST into the Dolomite money market on Berachain. This asset will be collateral only.`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0x460f8d9c78b1bde7da137ce75315bd15d34a369b"],
  external_incentives: [
    {
      token_id: "1-0xb000000000000000000000000000000000000ccc",
      label: "Cian points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1x";
        return value;
      },
    },
    {
      token_id: "1-0xcde5d40f312b9bcf704babcdb6713d2547a277c4",
      label: "Bedrock Diamonds",

      value: async ({ roycoClient, chainClient }) => {
        const value = "2.5x";
        return value;
      },
    },
    {
      token_id: "1-0xadc9c900b05f39f48bb6f402a1bae60929f4f9a8",
      label: "pumpBTC points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "2x";
        return value;
      },
    },
    {
      token_id: "1-0xb000000000000000000000000000000000000bbb",
      label: "Babylon points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1x";
        return value;
      },
    },
  ],
});
