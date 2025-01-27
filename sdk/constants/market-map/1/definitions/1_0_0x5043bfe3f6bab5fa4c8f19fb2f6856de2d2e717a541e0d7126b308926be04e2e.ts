import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x5043bfe3f6bab5fa4c8f19fb2f6856de2d2e717a541e0d7126b308926be04e2e`,
  name: `Supply USDe to Concrete x Ethena Vault`,
  description: `When USDe is supplied to this market, it is allocated across leading Berachain DEXs and lending applications such as Kodiak, Dolomite, and Beraborrow. The vault will also allocate to yield opportunities from leading protocols expanding to Berachain. This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
  external_incentives: [
    {
      token_id: "1-0x5f979f9f7024b41c325a7a39c89cd65e5f6a5f6d",
      label: "Concrete Bags",

      value: async ({ roycoClient, chainClient }) => {
        const value = "4x";
        return value;
      },
    },
    {
      token_id: "1-0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
      label: "Ethena Sats",

      value: async ({ roycoClient, chainClient }) => {
        const value = "30x";
        return value;
      },
    },
    {
      token_id: "1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8",
      label: "Bodiak Points (for eligible assets)",

      value: async ({ roycoClient, chainClient }) => {
        const value = "3x";
        return value;
      },
    },
    {
      token_id: "1-0x460f8d9c78b1bde7da137ce75315bd15d34a369b",
      label: "DOLOMITE: veDOLO Rewards",

      value: async ({ roycoClient, chainClient }) => {
        const value = "";
        return value;
      },
    },
    {
      token_id: "1-0xfbca1de031ac44e83850634c098f22137e4647e5",
      label: "Beraborrow Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1x";
        return value;
      },
    },
  ],
});
