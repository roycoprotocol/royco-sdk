import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xd6e9ff1fa0c9c6bb25cafcb76c61c0d398a479ba073509e10209271f40a01712`,
  name: `Provide WBTC-FBTC Liquidity on Kodiak`,
  description: `Deposit WBTC-FBTC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, provide liquidity in the WBTC-FBTC Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. 

Earn DEX LP fees, as well as rewards from Berachain, Ignition, and Kodiak. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.    

3% of the Kodiak token supply is allocated to Boyco, proportional to TVL * multiplier.  This specific market has a ~2x multiplier for Bodiak points. More info on Kodiak's Boyco rewards: https://docs.kodiak.finance/kodiak-boyco`,
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
      token_id: "1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8",
      label: "DEX Fees",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Variable Rate";
        return value;
      },
    },
  ],
});
