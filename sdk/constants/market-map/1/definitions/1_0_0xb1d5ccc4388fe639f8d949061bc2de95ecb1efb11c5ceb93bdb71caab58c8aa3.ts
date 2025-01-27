import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xb1d5ccc4388fe639f8d949061bc2de95ecb1efb11c5ceb93bdb71caab58c8aa3`,
  name: `Supply solvBTC on Dolomite`,
  description: `Supply solvBTC into the Dolomite money market on Berachain. This asset will earn lending yield.`,
  is_verified: true,
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
    {
      token_id: "1-0xd9d920aa40f578ab794426f5c90f6c731d159def",
      label: "Solv season 2",

      value: async ({ roycoClient, chainClient }) => {
        const value = "4x";
        return value;
      },
    },
  ],
});
