import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x25f7a422282a1f26d9d96b5d1c43fa5c6f8c355b0ed7a4755ac8d04a504817f5`,
  name: `Provide rsETH-beraETH Liquidity on Kodiak`,
  description: `Deposit rsETH-WETH Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, mint beraETH with all of the WETH, then provide liquidity in the rsETH-beraETH Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. 

Earn DEX LP fees, as well as rewards from Berachain, Kelp, Dinero, and Kodiak. This is part of the Berachain'&#x27;'s Boyco pre-deposit campaign.    

3% of the Kodiak token supply is allocated to Boyco, proportional to TVL * multiplier. This specific market has a ~1x multiplier for Bodiak points. More info on Kodiak's Boyco rewards: https://docs.kodiak.finance/kodiak-boyco`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8"],
  external_incentives: [
    {
      token_id: "1-0xa1290d69c65a6fe4df752f95823fae25cb99e5a7",
      label: "Kelp Miles",

      value: async ({ roycoClient, chainClient }) => {
        const value = "2x";
        return value;
      },
    },
    {
      token_id: "98865-0x09d9420332bff75522a45fcff4855f82a0a3ff50",
      label: "Dinero Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "50K points per week, pro-rata";
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
