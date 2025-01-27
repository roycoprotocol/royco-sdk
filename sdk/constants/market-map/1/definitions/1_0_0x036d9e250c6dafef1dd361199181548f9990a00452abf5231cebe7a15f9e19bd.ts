import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x036d9e250c6dafef1dd361199181548f9990a00452abf5231cebe7a15f9e19bd`,
  name: `Restake pumpBTC on Satlayer`,
  description: `Deposit pumpBTC into SatLayer, which is restaked to bring Bitcoin shared security to applications and infrastructure on Berachain and leading ecosystems.`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0x9c80538ffcbaee0db71caabe87ee99785ffc4f55"],
  external_incentives: [
    {
      token_id: "1-0xb000000000000000000000000000000000000bbb",
      label: "Babylon Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1x";
        return value;
      },
    },
    {
      token_id: "1-0xadc9c900b05f39f48bb6f402a1bae60929f4f9a8",
      label: "PumpBTC Rewards",

      value: async ({ roycoClient, chainClient }) => {
        const value = "4x";
        return value;
      },
    },
  ],
});
