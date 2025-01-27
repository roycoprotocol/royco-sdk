import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xe92ebafbee7aa7a636ff62e04aa2ab9353f60ef72dcdcfdfcf48b67a7ad8ffc7`,
  name: `Beraborrow SBTC Boyco`,
  description: `Single sided Liquid Stability Pool:
Deposit SBTC into Boyco. SBTC is bridged &amp; deposited into Beraborrow. SBTC is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
This is part of the Berachain Boyco pre-deposit campaign`,
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
  ],
});
