import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x2dcd8ec59fe12b4cb802f5a26445f9684635c52139560f169a7c4d67da186c18`,
  name: `Restake waBTC on SatLayer`,
  description: `Deposit waBTC into SatLayer, which is restaked to bring Bitcoin shared security to applications and infrastructure on Berachain and leading ecosystems.`,
  is_verified: true,
  incentive_ids: ["1-0x9c80538ffcbaee0db71caabe87ee99785ffc4f55"],
  category: `boyco`,
  external_incentives: [
    {
      token_id: "1-0xb000000000000000000000000000000000000bbb",
      label: "Babylon Points",
      value: async ({ roycoClient, chainClient }) => {
        const value = "1x";
        return value;
      },
    },
  ],
});
