import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x036d9e250c6dafef1dd361199181548f9990a00452abf5231cebe7a15f9e19bd`,
  name: `Restake pumpBTC on Satlayer`,
  description: `Deposit pumpBTC into SatLayer, which is restaked to bring Bitcoin shared security to applications and infrastructure on Berachain and leading ecosystems.`,
  is_verified: false,
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
