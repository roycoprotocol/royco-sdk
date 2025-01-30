import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x1997c604de34a71974228bca4a66f601427c48960b6e59ff7ebc8e34f43f3ecf`,
  name: `Infrared x Kodiak beraETH-STONE LP`,
  description: `Deposit WETH-STONE Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, mint beraETH with all of the WETH, then provide liquidity in the beraETH-STONE Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared iBGT-compatible Vault. This is part of the Berachain&#x27;s Boyco pre-deposit campaign. 

Earn DEX LP fees, as well as rewards from Berachain, Dinero, Stakestone, Infrared and Kodiak. This is part of the Berachain&#x27;s Boyco pre-deposit campaign. 

3% of the Kodiak token supply is allocated to Boyco, proportional to TVL * multiplier.  This specific market has a ~2x multiplier for Bodiak points. More info on Kodiak's Boyco rewards: https://docs.kodiak.finance/kodiak-boyco`,
  is_verified: true,
  category: `boyco`,

  incentive_ids: ["1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8"],

  external_incentives: [
    {
      token_id: "1-0x77d17183055303a15208c809b716dc02261129b7",
      label: "Infrared Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "2x";
        return value;
      },
    },
    {
      token_id: "98865-0x09d9420332bff75522a45fcff4855f82a0a3ff50",
      label: "Dinero Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "150k points per week, pro-rata";
        return value;
      },
    },
    {
      token_id: "1-0x7122985656e38bdc0302db86685bb972b145bd3c",
      label: "StakeStone",

      value: async ({ roycoClient, chainClient }) => {
        const value = "6x Boost (0.45%)";
        return value;
      },
    },
    {
      token_id: "1-0xb000000000000000000000000000000000000112",
      label: "ETH (Re)Staking Rewards",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Variable Rate (for eligible assets)";
        return value;
      },
    },
    {
      token_id: "1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8",
      label: "DEX Fees",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Variable Rate";
        return value;
      },
    },
  ],
});
