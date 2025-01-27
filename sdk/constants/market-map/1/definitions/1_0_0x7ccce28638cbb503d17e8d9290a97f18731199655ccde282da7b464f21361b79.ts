import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x7ccce28638cbb503d17e8d9290a97f18731199655ccde282da7b464f21361b79`,
  name: `Restake SBTC on SatLayer`,
  description: `Deposit SBTC into SatLayer, which is restaked to bring Bitcoin shared security to applications and infrastructure on Berachain and leading ecosystems.`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["11155111-0x6a7fde508d41e65f768665fc18b9ce554dc50507"],
  external_incentives: [
    {
      token_id: "1-0x7122985656e38bdc0302db86685bb972b145bd3c",
      label: "StakeStone",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1x Boost on Boyco Supply (0.45%)";
        return value;
      },
    },
  ],
});
