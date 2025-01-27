import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xd10bdc88272e0958baa62a4ae2bfce1d8feed639a93e03c0aa5cec7adfbdf2c3`,
  name: `Suppy uniBTC on Dolomite`,
  description: `Supply uniBTC into the Dolomite money market on Berachain. This asset is collateral only.`,
  is_verified: false,
  category: `boyco`,

  external_incentives: [
    {
      token_id: "1-0xcde5d40f312b9bcf704babcdb6713d2547a277c4",
      label: "Bedrock diamonds",

      value: async ({ roycoClient, chainClient }) => {
        const value = "3x";
        return value;
      },
    },
  ],
});
