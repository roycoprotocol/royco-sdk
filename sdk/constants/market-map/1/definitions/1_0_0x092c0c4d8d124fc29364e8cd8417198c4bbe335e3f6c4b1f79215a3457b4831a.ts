import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x092c0c4d8d124fc29364e8cd8417198c4bbe335e3f6c4b1f79215a3457b4831a`,
  name: `Supply sUSDe on Dolomite`,
  description: `Supply sUSDe into the Dolomite money market on Berachain. This asset will be collateral only.`,
  is_verified: false,
  category: `boyco`,

  external_incentives: [
    {
      token_id: "1-0x460f8d9c78b1bde7da137ce75315bd15d34a369b",
      label: "Ethena",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Staking yield";
        return value;
      },
    },
    {
      token_id: "1-0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
      label: "Ethena sats",

      value: async ({ roycoClient, chainClient }) => {
        const value = "5x";
        return value;
      },
    },
  ]
});
