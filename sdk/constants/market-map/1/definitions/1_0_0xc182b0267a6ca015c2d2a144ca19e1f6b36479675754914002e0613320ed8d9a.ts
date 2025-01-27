import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xc182b0267a6ca015c2d2a144ca19e1f6b36479675754914002e0613320ed8d9a`,
  name: `Beraborrow ylstETH Boyco`,
  description: `Single sided Liquid Stability Pool: 
Deposit ylstETH into Boyco. ylstETH is bridged &amp; deposited into Beraborrow. ylstETH is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
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
        const value = "Variable Rate";
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
      token_id: "1-0xB000000000000000000000000000000000000555",
      label: "Symbiotic Rewards",

      value: async ({ roycoClient, chainClient }) => {
        const value = "0.002x, 0.22% points";
        return value;
      },
    },
    {
      token_id: "1-0xb000000000000000000000000000000000000112",
      label: "Mellow Rewards",

      value: async ({ roycoClient, chainClient }) => {
        const value = "0.002x, 0.22% points";
        return value;
      },
    },
    {
      token_id: "1-0xf6718b2701d4a6498ef77d7c152b2137ab28b8a3",
      label: "Renzo Rewards",

      value: async ({ roycoClient, chainClient }) => {
        const value = "REZ Emissions";
        return value;
      },
    },
  ],
});
