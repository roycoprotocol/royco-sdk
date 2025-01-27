import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x4fa4a76aa8b93ccdddba0c20c336056803b7410fb375c9c9541e9c54fbfb2f9a`,
  name: `Beraborrow ylBTCLST Boyco`,
  description: `Single sided Liquid Stability Pool: 
Deposit ylBTCLST into Boyco. ylBTCLST is bridged &amp; deposited into Beraborrow. ylBTCLST is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
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
        const value = "1x";
        return value;
      },
    },
    {
      token_id: "1-0xcde5d40f312b9bcf704babcdb6713d2547a277c4",
      label: "Bedrock Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "3.35x";
        return value;
      },
    },
    {
      token_id: "1-0xcde5d40f312b9bcf704babcdb6713d2547a277c4",
      label: "Corn Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "2x";
        return value;
      },
    },
  ],
});
