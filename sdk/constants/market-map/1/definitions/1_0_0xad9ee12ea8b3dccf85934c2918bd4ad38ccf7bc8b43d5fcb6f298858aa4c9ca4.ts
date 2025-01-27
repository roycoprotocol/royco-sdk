import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xad9ee12ea8b3dccf85934c2918bd4ad38ccf7bc8b43d5fcb6f298858aa4c9ca4`,
  name: `Infrared x Kodiak sUSDe-HONEY LP, Boyco`,
  description: `Deposit sUSDe-USDC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge the assets to Berachain. On Berachain, mint HONEY with all of the USDC, then provide liquidity in the sUSDe-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared iBGT-compatible Vault. 
  
Earn DEX LP fees, sUSDe staking yield, as well as rewards from Berachain, Ethena, Infrared and Kodiak. This is part of the Berachain&#x27;s Boyco pre-deposit campaign. 

3% of the Kodiak token supply is allocated to Boyco, proportional to TVL * multiplier.  This specific market has a ~3x multiplier for Bodiak points. More info on Kodiak's Boyco rewards: https://docs.kodiak.finance/kodiak-boyco`,
  is_verified: false,
  category: `boyco`,

  external_incentives: [
    {
      token_id: "1-0x3b2635c5d5cc5cee62b9084636f808c67da9988f",
      label: "Infrared Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1x";
        return value;
      },
    },
    {
      token_id: "1-0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
      label: "Ethena Sats",

      value: async ({ roycoClient, chainClient }) => {
        const value = "5x";
        return value;
      },
    },
    {
      token_id: "1-0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
      label: "Ethena sUSDe Yield",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Variable Rate (on sUSDe portion)";
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
