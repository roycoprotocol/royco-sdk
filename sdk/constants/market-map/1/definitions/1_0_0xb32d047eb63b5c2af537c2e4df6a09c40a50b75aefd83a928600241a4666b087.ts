import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xb32d047eb63b5c2af537c2e4df6a09c40a50b75aefd83a928600241a4666b087`,
  name: `Beraborrow uniBTC Boyco`,
  description: `Single sided Liquid Stability Pool: Deposit uniBTC into Boyco. uniBTC is bridged &amp; deposited into Beraborrow. uniBTC is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool. This is part of the Berachain Boyco pre-deposit campaign.`,
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
      token_id: "1-0xcde5d40f312b9bcf704babcdb6713d2547a277c4",
      label: "Bedrock Diamonds",

      value: async ({ roycoClient, chainClient }) => {
        const value = "12.5M";
        return value;
      },
    },
  ],
});
