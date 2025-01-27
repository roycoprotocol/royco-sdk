import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x2a3a73ba927ec6bbf0e2e12e21a32e274a295389ce9d6ae2b32435d12c597c2c`,
  name: `Supply solvBTC.bbn on Dolomite`,
  description: `Supply solvBTC.bbn into the Dolomite money market on Berachain. This asset will be collateral only.`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0x460f8d9c78b1bde7da137ce75315bd15d34a369b"],
  external_incentives: [
    {
      token_id: "1-0xd9d920aa40f578ab794426f5c90f6c731d159def",
      label: "Solv season 2",

      value: async ({ roycoClient, chainClient }) => {
        const value = "4x";
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
