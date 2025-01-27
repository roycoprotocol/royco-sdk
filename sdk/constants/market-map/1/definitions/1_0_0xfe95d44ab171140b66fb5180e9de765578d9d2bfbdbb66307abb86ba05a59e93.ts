import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xfe95d44ab171140b66fb5180e9de765578d9d2bfbdbb66307abb86ba05a59e93`,
  name: `Beraborrow pumpBTC Boyco`,
  description: `Single sided Liquid Stability Pool:
Deposit pumpBTC into Boyco. pumpBTC is bridged &amp; deposited into Beraborrow. pumpBTC is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
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
      token_id: "1-0xadc9c900b05f39f48bb6f402a1bae60929f4f9a8",
      label: "PumpBTC Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "2x";
        return value;
      },
    },
  ],
});
