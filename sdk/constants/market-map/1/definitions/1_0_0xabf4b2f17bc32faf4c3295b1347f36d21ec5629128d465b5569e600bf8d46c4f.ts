import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xabf4b2f17bc32faf4c3295b1347f36d21ec5629128d465b5569e600bf8d46c4f`,
  name: `Veda x Ether.fi eBTC Vault - LBTC Supply`,
  description: `After mainnet, vaults will run DeFi strategies on Berachain protocols participating in Boyco. Examples of applications include: Kodiak, Infrared, and Dolomite. eBTC supplied will be converted to eBTC on mainnet for DeFi usage.`,
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
      token_id: "1-0xb000000000000000000000000000000000000bbb",
      label: "Babylon Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1x";
        return value;
      },
    },
    {
      token_id: "1-0x8236a87084f8b84306f72007f36f2618a5634494",
      label: "Lombard Lux",

      value: async ({ roycoClient, chainClient }) => {
        const value = "2x";
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
      token_id: "1-0xb000000000000000000000000000000000000555",
      label: "Symbiotic Rewards",

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
      token_id: "1-0xb000000000000000000000000000000000000112",
      label: "Karak Rewards",

      value: async ({ roycoClient, chainClient }) => {
        const value = "2x";
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
