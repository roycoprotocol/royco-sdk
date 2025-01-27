import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xb9f307d83c78d09a134aac7713821aab8e1da2404b895db66f0975135dd5006e`,
  name: `Beraborrow WETH Boyco`,
  description: `Single sided Liquid Stability Pool:
Deposit WETH into Boyco. WETH is bridged &amp; deposited into Beraborrow. WETH is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
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
  ],
});
