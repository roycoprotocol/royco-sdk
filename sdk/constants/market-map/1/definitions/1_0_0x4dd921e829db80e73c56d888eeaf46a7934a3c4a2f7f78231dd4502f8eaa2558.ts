import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x4dd921e829db80e73c56d888eeaf46a7934a3c4a2f7f78231dd4502f8eaa2558`,
  name: `Lend wETH on Dahlia (STONE&#x2F;wETH)`,
  description: `Earn PETALS (Dahlia Points) and BERA incentives for lending WETH on Dahlia STONE&#x2F;WETH (91% LLTV) lending market on Berachain.`,
  is_verified: true,
  category: `boyco`,

  incentive_ids: ["1-0xbd1e5b7fa18f2679070c8ba9ab6415ef786720cc"],

  external_incentives: [
    {
      token_id: "1-0xb000000000000000000000000000000000000112",
      label: "ETH",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Staking Yield";
        return value;
      },
    },
    {
      token_id: "1-0x7122985656e38bdc0302db86685bb972b145bd3c",
      label: "StakeStone",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1x Boyco Boost";
        return value;
      },
    },
  ],
});
