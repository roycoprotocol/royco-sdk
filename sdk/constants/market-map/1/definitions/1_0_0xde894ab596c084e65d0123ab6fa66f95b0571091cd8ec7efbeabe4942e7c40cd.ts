import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xde894ab596c084e65d0123ab6fa66f95b0571091cd8ec7efbeabe4942e7c40cd`,
  name: `Restake LBTC on SatLayer`,
  description: `Deposit LBTC into SatLayer, which is restaked to bring Bitcoin shared security to applications and infrastructure on Berachain and leading ecosystems.`,
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
