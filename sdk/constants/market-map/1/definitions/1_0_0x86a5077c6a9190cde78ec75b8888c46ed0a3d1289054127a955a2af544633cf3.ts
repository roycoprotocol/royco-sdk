import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x86a5077c6a9190cde78ec75b8888c46ed0a3d1289054127a955a2af544633cf3`,
  name: `Supply USDa on Dolomite`,
  description: `Supply USDa into the Dolomite money market on Berachain. This asset will be collateral only.`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0x460f8d9c78b1bde7da137ce75315bd15d34a369b"],
  external_incentives: [
    {
      token_id: "1-0x8a60e489004ca22d775c5f2c657598278d17d9c2",
      label: "Avalon",

      value: async ({ roycoClient, chainClient }) => {
        const value = "AVL Rewards";
        return value;
      },
    },
  ],
});
