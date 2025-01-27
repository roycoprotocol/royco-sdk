import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x6306bfce6bff30ec4efcea193253c43e057f1474007d0d2a5a0c2938bd6a9b81`,
  name: `Supply ylpumpBTC on Dolomite`,
  description: `Supply ylpumpBTC into the Dolomite money market on Berachain. This asset will be collateral only.`,
  is_verified: false,
  category: `boyco`,

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
      token_id: "1-0xadc9c900b05f39f48bb6f402a1bae60929f4f9a8",
      label: "pumpBTC points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1x";
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
