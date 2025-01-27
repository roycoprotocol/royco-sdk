import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xb36f14fd392b9a1d6c3fabedb9a62a63d2067ca0ebeb63bbc2c93b11cc8eb3a2`,
  name: `Veda x Ether.fi eBTC Vault - wBTC Supply`,
  description: `After mainnet, vaults will run DeFi strategies on Berachain protocols participating in Boyco. Examples of applications include: Kodiak, Infrared, and Dolomite. wBTC supplied will be paired against eBTC on mainnet for DeFi usage.`,
  is_verified: true,
  category: `boyco`,
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
