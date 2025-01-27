import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x7dadff589e53d9813969d0be6de99c033d140ec1d304e57a754797736656dcd5`,
  name: `Restake solvBTC.bbn on SatLayer`,
  description: `Deposit solvBTC.bbn into SatLayer, which is restaked to bring Bitcoin shared security to applications and infrastructure on Berachain and leading ecosystems.`,
  is_verified: false,
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
      token_id: "1-0xd9d920aa40f578ab794426f5c90f6c731d159def",
      label: "Solv S2 Points (Boosted)",

      value: async ({ roycoClient, chainClient }) => {
        const value = "4x";
        return value;
      },
    },
  ],
});
