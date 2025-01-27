import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x84790e638ddd7a59e64b8c239e96e29c2c6c155a9882a0c834b9ced016b7c999`,
  name: `Beraborrow stBTC Boyco`,
  description: `Single sided Liquid Stability Pool: 
Deposit stBTC into Boyco. stBTC is bridged &amp; deposited into Beraborrow. stBTC is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
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
      token_id: "1-0xf6718b2701d4a6498ef77d7c152b2137ab28b8a3",
      label: "Lorenzo Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1.5x";
        return value;
      },
    },
  ],
});
