import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x9778047cb8f3740866882a97a186dff42743bebb3ad8010edbf637ab0e37751f`,
  name: `Supply HONEY on Dolomite x Infrared`,
  description: `Supply HONEY into the Dolomite money market on Berachain. This asset will earn lending yield and be eligible for potential Infrared incentives.`,
  is_verified: false,
  category: `boyco`,
  external_incentives: [
    {
      token_id: "1-0x3b2635c5d5cc5cee62b9084636f808c67da9988f",
      label: "Infrared Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1.5x";
        return value;
      },
    },
    {
      token_id: "1-0xd1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1",
      label: "Dolomite Lending Yield",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Variable Rate";
        return value;
      },
    },
  ],
});
