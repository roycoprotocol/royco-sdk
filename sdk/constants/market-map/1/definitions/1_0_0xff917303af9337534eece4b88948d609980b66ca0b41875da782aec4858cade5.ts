import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xff917303af9337534eece4b88948d609980b66ca0b41875da782aec4858cade5`,
  name: `Supply pumpBTC on Dolomite`,
  description: `Supply pumpBTC into the Dolomite money market on Berachain. This asset will be collateral only.`,
  is_verified: false,
  category: `boyco`,

  external_incentives: [
    {
      token_id: "1-0xadc9c900b05f39f48bb6f402a1bae60929f4f9a8",
      label: "pumpBTC points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "2x";
        return value;
      },
    },
    {
      token_id: "1-0xb000000000000000000000000000000000000ccc",
      label: "Cian points",

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
