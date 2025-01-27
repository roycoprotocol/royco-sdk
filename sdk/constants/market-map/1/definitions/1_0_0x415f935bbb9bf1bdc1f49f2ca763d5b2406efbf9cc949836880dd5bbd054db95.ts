import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x415f935bbb9bf1bdc1f49f2ca763d5b2406efbf9cc949836880dd5bbd054db95`,
  name: `Supply rsETH on Dolomite`,
  description: `Supply rsETH into the Dolomite money market on Berachain. This asset will be collateral only.`,
  is_verified: true,
  category: `boyco`,

  external_incentives: [
    {
      token_id: "1-0xa1290d69c65a6fe4df752f95823fae25cb99e5a7",
      label: "Kelp Miles",

      value: async ({ roycoClient, chainClient }) => {
        const value = "2x";
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
