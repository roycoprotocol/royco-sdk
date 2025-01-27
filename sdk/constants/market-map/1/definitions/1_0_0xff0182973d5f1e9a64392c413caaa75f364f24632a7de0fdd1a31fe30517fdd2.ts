import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xff0182973d5f1e9a64392c413caaa75f364f24632a7de0fdd1a31fe30517fdd2`,
  name: `Veda x Ether.fi weETH Vault`,
  description: `After mainnet, vaults will run DeFi strategies on Berachain protocols participating in Boyco. Examples of applications include: Kodiak, Infrared, and Dolomite. weETH supplied will be used for DeFi activity on Berachain Mainnet.`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0x3badc21d6bff9248ae4c3923093e04d505a52fef"],
  external_incentives: [
    {
      token_id: "1-0xfe0c30065b384f05761f15d0cc899d4f9f9cc0eb",
      label: "Ether.fi Rewards",

      value: async ({ roycoClient, chainClient }) => {
        const value = "4x";
        return value;
      },
    },
    {
      token_id: "1-0xb000000000000000000000000000000000000112",
      label: "LRT^2 Rewards",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1x";
        return value;
      },
    },
    {
      token_id: "1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8",
      label: "Bodiak Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "3x";
        return value;
      },
    },
    {
      token_id: "1-0x77d17183055303a15208c809b716dc02261129b7",
      label: "Infrared Points (for eligible assets)",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1.25x";
        return value;
      },
    },
    {
      token_id: "1-0x460f8d9c78b1bde7da137ce75315bd15d34a369b",
      label: "Dolomite: veDOLO Rewards",

      value: async ({ roycoClient, chainClient }) => {
        const value = "";
        return value;
      },
    },
    {
      token_id: "1-0x3b7795688ea8c095600bae9d6d866d04c230ba16",
      label: "Goldilocks Rewards",

      value: async ({ roycoClient, chainClient }) => {
        const value = "";
        return value;
      },
    },
  ],
});
