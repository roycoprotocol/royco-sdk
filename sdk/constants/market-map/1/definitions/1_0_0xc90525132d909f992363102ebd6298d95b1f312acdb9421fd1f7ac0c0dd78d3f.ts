import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xc90525132d909f992363102ebd6298d95b1f312acdb9421fd1f7ac0c0dd78d3f`,
  name: `Supply rswETH on Dolomite`,
  description: `Supply rswETH into the Dolomite money market on Berachain. This asset will be collateral only.`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0x460f8d9c78b1bde7da137ce75315bd15d34a369b"],
  external_incentives: [
    {
      token_id: "1-0xfae103dc9cf190ed75350761e95403b7b8afa6c0",
      label: "Swell",

      value: async ({ roycoClient, chainClient }) => {
        const value = "SWELL Rewards";
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
