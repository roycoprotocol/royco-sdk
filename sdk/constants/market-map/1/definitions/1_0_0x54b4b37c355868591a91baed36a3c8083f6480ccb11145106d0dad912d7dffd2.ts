import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x54b4b37c355868591a91baed36a3c8083f6480ccb11145106d0dad912d7dffd2`,
  name: `Beraborrow SolvBTC.BBN Boyco`,
  description: `Single sided Liquid Stability Pool: Deposit SolvBTC.BBN into Boyco. SolvBTC.BBN is bridged &amp; deposited into Beraborrow. SolvBTC.BBN is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool. This is part of Berachains Boyco pre-deposit campaign.`,
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
      token_id: "1-0x3b2635c5d5cc5cee62b9084636f808c67da9988f",
      label: "Infrared Yield",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Retrodrop";
        return value;
      },
    },
    {
      token_id: "1-0xd9d920aa40f578ab794426f5c90f6c731d159def",
      label: "Solv S2 Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "4x";
        return value;
      },
    },
  ],
});
