import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xbe5cd829fcb3cdfe8224ad72fc3379198d38da26131c5b7ab6664c8f56a9730d`,
  name: `Supply NECT on Dolomite`,
  description: `Supply NECT into the Dolomite money market on Berachain. This asset will earn lending yield.`,
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
    {
      token_id: "1-0xfbca1de031ac44e83850634c098f22137e4647e5",
      label: "Beraborrow bPollen",

      value: async ({ roycoClient, chainClient }) => {
        const value = "3x";
        return value;
      },
    },
  ],
});
