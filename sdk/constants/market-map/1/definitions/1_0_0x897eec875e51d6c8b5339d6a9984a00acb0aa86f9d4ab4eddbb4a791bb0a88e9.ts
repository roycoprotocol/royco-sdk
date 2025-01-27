import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x897eec875e51d6c8b5339d6a9984a00acb0aa86f9d4ab4eddbb4a791bb0a88e9`,
  name: `Beraborrow ylpumpBTC Boyco`,
  description: `Single sided Liquid Stability Pool:
Deposit ylpumpBTC into Boyco. ylpumpBTC is bridged &amp; deposited into Beraborrow. ylpumpBTC is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0xfbca1de031ac44e83850634c098f22137e4647e5"],
  external_incentives: [
    {
      token_id: "1-0xfbca1de031ac44e83850634c098f22137e4647e5",
      label: "LSP Yield",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Variable Rate";
        return value;
      },
    },
    {
      token_id: "1-0x77d17183055303a15208c809b716dc02261129b7",
      label: "Infrared Yield",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Retrodrop";
        return value;
      },
    },
    {
      token_id: "1-0xb000000000000000000000000000000000000ccc",
      label: "Cian Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "2x";
        return value;
      },
    },
    {
      token_id: "1-0xadc9c900b05f39f48bb6f402a1bae60929f4f9a8",
      label: "PumpBTC Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "10x";
        return value;
      },
    },
  ],
});
