import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xc5165360e2e8b195cb55e21cf259ce6a5ee996b055057d8705851d9b01fc8620`,
  name: `Provide FBTC-SolvBTC Liquidity on Kodiak`,
  description: `Deposit FBTC-SolvBTC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, provide liquidity in the FBTC-SolvBTC Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. 

Earn DEX LP fees, as well as rewards from Berachain, Ignition, Solv, and Kodiak. This is part of the Berachain'&#x27;'s Boyco pre-deposit campaign. 

3% of the Kodiak token supply is allocated to Boyco, proportional to TVL * multiplier. This specific market has a ~1x multiplier for Bodiak points. More info on Kodiak's Boyco rewards: https://docs.kodiak.finance/kodiak-boyco`,
  is_verified: true,
  category: `boyco`,

  external_incentives: [
    {
      token_id: "1-0xb000000000000000000000000000000000000112",
      label: "Ignition Sparks",

      value: async ({ roycoClient, chainClient }) => {
        const value = "2x";
        return value;
      },
    },
    {
      token_id: "1-0xd9d920aa40f578ab794426f5c90f6c731d159def",
      label: "Solv Season 2 Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "4x";
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
