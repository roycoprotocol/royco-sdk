import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xf8f745f188ddb10c16724faee95583521191c3c69e15490fa53c1136b73c17d7`,
  name: `Infrared x Kodiak USDT0-HONEY LP, Boyco`,
  description: `Deposit USDT-USDC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge the assets to Berachain. On Berachain, mint HONEY with all of the USDC, then provide liquidity in the USDT0-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared iBGT-compatible Vault. 
  
Earn DEX LP fees, as well as rewards from Berachain, Infrared and Kodiak. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.  

3% of the Kodiak token supply is allocated to Boyco, proportional to TVL * multiplier.  This specific market has a ~4x multiplier for Bodiak points. More info on Kodiak's Boyco rewards: https://docs.kodiak.finance/kodiak-boyco`,
  is_verified: true,
  category: `boyco`,

  incentive_ids: ["1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8"],

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
      token_id: "1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8",
      label: "DEX Fees",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Variable Rate";
        return value;
      },
    },
  ],
});
