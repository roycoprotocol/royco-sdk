import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x5bac1cacdd36b3d95a7f9880a264f8481ab56d3d1a53993de084c6fa5febcc15`,
  name: `Supply ylstETH on Dolomite`,
  description: `Supply ylstETH into the Dolomite money market on Berachain. This asset will be collateral only.`,
  is_verified: false,
  category: `boyco`,

  external_incentives: [
    {
      token_id: "1-0xb000000000000000000000000000000000000ccc",
      label: "Cian points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1x";
        return value;
      },
    },
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
