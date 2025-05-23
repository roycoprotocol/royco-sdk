import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x258ac521d801d5112a484ad1b82e6fd2efc24aba29e5cd3d56db83f4a173dc90`,
  name: `Supply beraETH on Dolomite`,
  description: `Supply beraETH into the Dolomite money market on Berachain. ETH supplied on Mainnet will be bridged to Berachain, then minted into beraETH. This asset will earn lending yield.`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0x460f8d9c78b1bde7da137ce75315bd15d34a369b"],
  external_incentives: [
    {
      token_id: "1-0x09d9420332bff75522a45fcff4855f82a0a3ff50",
      label: "Dinero",

      value: async ({ roycoClient, chainClient }) => {
        const value = "10K points per week, pro-rata";
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
