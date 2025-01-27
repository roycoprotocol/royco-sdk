import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xb27f671bc0dd8773a25136253acd72150dd59e50e44dc8439e9dc5c84c2b19f6`,
  name: `Supply STONE on Dolomite`,
  description: `Supply STONE into the Dolomite money market on Berachain. This asset will be collateral only.`,
  is_verified: false,
  category: `boyco`,

  external_incentives: [
    {
      token_id: "1-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      label: "ETH Staking Yield",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Variable Rate";
        return value;
      },
    },
  ],
});
