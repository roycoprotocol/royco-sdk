import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x9c7bd5b59ebcb9a9e6787b9b174a98a69e27fa5a4fe98270b461a1b9b1b1aa3e`,
  name: `Supply USDT on Dolomite x Infrared`,
  description: `Supply USDT into the Dolomite money market on Berachain. This asset will earn lending yield and be eligible for potential Infrared incentives.`,
  is_verified: false,
  category: `boyco`,

  external_incentives: [
    {
      token_id: "1-0x3b2635c5d5cc5cee62b9084636f808c67da9988f",
      label: "Infrared points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1.5x";
        return value;
      },
    },
    {
      token_id: "1-0x460f8d9c78b1bde7da137ce75315bd15d34a369b",
      label: "Dolomite Lending Yield",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Variable Rate";
        return value;
      },
    },
  ]
});
