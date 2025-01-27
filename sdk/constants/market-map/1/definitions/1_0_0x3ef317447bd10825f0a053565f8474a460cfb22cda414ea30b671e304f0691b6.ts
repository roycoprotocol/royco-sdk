import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x3ef317447bd10825f0a053565f8474a460cfb22cda414ea30b671e304f0691b6`,
  name: `Provide beraETH-RSWETH Liquidity on Kodiak`,
  description: `Deposit WETH-RSWETH Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, mint beraETH with all of the WETH, then provide liquidity in the beraETH-RSWETH Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. 

Earn DEX LP fees, as well as rewards from Berachain, Dinero, Swell, and Kodiak. This is part of the Berachain'&#x27;'s Boyco pre-deposit campaign.    

3% of the Kodiak token supply is allocated to Boyco, proportional to TVL * multiplier. This specific market has a ~1x multiplier for Bodiak points. More info on Kodiak's Boyco rewards: https://docs.kodiak.finance/kodiak-boyco`,
  is_verified: true,
  category: `boyco`,

  external_incentives: [
    {
      token_id: "1-0xfae103dc9cf190ed75350761e95403b7b8afa6c0",
      label: "SWELL Tokens",

      value: async ({ roycoClient, chainClient }) => {
        const value = "10M total SWELL tokens, pro-rata";
        return value;
      },
    },
    {
      token_id: "98865-0x09d9420332bff75522a45fcff4855f82a0a3ff50",
      label: "Dinero Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "20K points per week, pro-rata";
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
