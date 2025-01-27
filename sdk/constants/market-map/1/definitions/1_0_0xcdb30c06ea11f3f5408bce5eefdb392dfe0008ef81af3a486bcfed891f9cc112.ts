import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xcdb30c06ea11f3f5408bce5eefdb392dfe0008ef81af3a486bcfed891f9cc112`,
  name: `Provide rUSD-HONEY Liquidity on Kodiak`,
  description: `Deposit rUSD-USDC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, mint HONEY with all of the USDC, then provide liquidity in the rUSD-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. 

Earn DEX LP fees, as well as rewards from Berachain, Reservoir, and Kodiak. This is part of the Berachain'&#x27;'s Boyco pre-deposit campaign.    

3% of the Kodiak token supply is allocated to Boyco, proportional to TVL * multiplier. This specific market has a ~2x multiplier for Bodiak points. More info on Kodiak's Boyco rewards: https://docs.kodiak.finance/kodiak-boyco`,
  is_verified: false,
  category: `boyco`,

  external_incentives: [
    {
      token_id: "1-0x09d4214c03d01f49544c0448dbe3a27f768f2b34",
      label: "Reservoir Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "3 Points per Day per $1 TVL";
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
