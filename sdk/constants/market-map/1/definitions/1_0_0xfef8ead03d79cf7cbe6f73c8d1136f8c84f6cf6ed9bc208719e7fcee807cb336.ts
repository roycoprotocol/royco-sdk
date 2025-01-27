import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xfef8ead03d79cf7cbe6f73c8d1136f8c84f6cf6ed9bc208719e7fcee807cb336`,
  name: `Beraborrow RSETH Boyco`,
  description: `Single sided Liquid Stability Pool: 
Deposit RSETH into Boyco. RSETH is bridged &amp; deposited into Beraborrow. RSETH is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
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
      token_id: "1-0xa1290d69c65a6fe4df752f95823fae25cb99e5a7",
      label: "Kelp Miles",

      value: async ({ roycoClient, chainClient }) => {
        const value = "2x";
        return value;
      },
    },
  ],
});
