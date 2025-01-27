import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xc6887dddd833a3d585c7941cd31b0f8ff3ec5903d49cd5e7ac450b46532d3e79`,
  name: `Supply stBTC on Dolomite`,
  description: `Supply stBTC into the Dolomite money market on Berachain. This asset will be collateral only.`,
  is_verified: true,
  category: `boyco`,

  external_incentives: [
    {
      token_id: "1-0xf6718b2701d4a6498ef77d7c152b2137ab28b8a3",
      label: "Lorenzo points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1.5x";
        return value;
      },
    },
  ],
});
