import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x2dd74f8f8a8d7f27b2a82a6edce57b201f9b4a3c4780934caf99363115e48be6`,
  name: `Supply sUSDa on Dolomite`,
  description: `Supply sUSDa into the Dolomite money market on Berachain. This asset will be collateral only.`,
  is_verified: false,
  category: `boyco`,

  external_incentives: [
    {
      token_id: "1-0x8a60e489004ca22d775c5f2c657598278d17d9c2",
      label: "Avalon",

      value: async ({ roycoClient, chainClient }) => {
        const value = "AVL Rewards";
        return value;
      },
    },
    {
      token_id: "1-0x8a60e489004ca22d775c5f2c657598278d17d9c2",
      label: "Avalon",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Staking yield";
        return value;
      },
    },
  ]
});
