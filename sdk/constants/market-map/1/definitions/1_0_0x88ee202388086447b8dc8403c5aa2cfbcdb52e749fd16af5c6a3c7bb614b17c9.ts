import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x88ee202388086447b8dc8403c5aa2cfbcdb52e749fd16af5c6a3c7bb614b17c9`,
  name: `Beraborrow STONE Boyco`,
  description: `Single sided Liquid Stability Pool:
Deposit STONE into Boyco. STONE is bridged &amp; deposited into Beraborrow. STONE is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: true,
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
