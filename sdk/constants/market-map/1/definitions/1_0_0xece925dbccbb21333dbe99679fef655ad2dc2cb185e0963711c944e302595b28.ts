import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xece925dbccbb21333dbe99679fef655ad2dc2cb185e0963711c944e302595b28`,
  name: `Supply WBTC to Concrete x Lombard Vault`,
  description: `When WBTC is supplied to this market, it is allocated across leading Berachain DEXs and lending applications such as Kodiak and Dolomite. The vault will also allocate to yield opportunities from leading protocols expanding to Berachain. This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0x5f979f9f7024b41c325a7a39c89cd65e5f6a5f6d"],
  external_incentives: [
    {
      token_id: "1-0x8236a87084f8b84306f72007f36f2618a5634494",
      label: "Lombard Lux",

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
  ],
});
