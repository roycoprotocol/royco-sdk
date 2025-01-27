import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x568d2509ec17c27426a9d55e58673160c937aeaedc0a3fcc7c63c5b7df495ec7`,
  name: `Kodiak x Beraborrow WBTC-WETH to mint NECT, Boyco`,
  description: `Deposit WBTC-WETH Uniswap V2 LP token(s) on Ethereum Mainnet and bridge the assets to Berachain. On Berachain, provide liquidity in the
WBTC-WETH Kodiak Island, an automated liquidity management vault that tokenizes a &quot;wide&quot; range Uniswap V3 style liquidity position.
The Island receipt token is deposited into Beraborrow, and used to mint NECT at 300% collateral ratio. NECT is then supplied into the Liquid Stability Pool.
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
      token_id: "1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8",
      label: "Kodiak DEX Fees",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Estimated 15-30% APY";
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
      token_id: "1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8",
      label: "Bodiak Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "5x";
        return value;
      },
    },
  ],
});
