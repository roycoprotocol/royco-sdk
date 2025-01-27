import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xab689b5eac7541b8cc774f0ca3705a91b21660e8221fc7bd8e93c391fb5d690d`,
  name: `Provide USDe-USDa Liquidity on Kodiak`,
  description: `Deposit USDe-USDa Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, provide liquidity in the USDe-USDa Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position.
 
Earn DEX LP fees, as well as rewards from Berachain, Ethena, Avalon, and Kodiak. This is part of the Berachain'&#x27;'s Boyco pre-deposit campaign.   

3% of the Kodiak token supply is allocated to Boyco, proportional to TVL * multiplier. This specific market has a ~1x multiplier for Bodiak points. More info on Kodiak's Boyco rewards: https://docs.kodiak.finance/kodiak-boyco`,
  is_verified: true,
  category: `boyco`,

  external_incentives: [
    {
      token_id: "1-0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
      label: "Ethena Sats",

      value: async ({ roycoClient, chainClient }) => {
        const value = "20x";
        return value;
      },
    },
    {
      token_id: "1-0x8a60e489004ca22d775c5f2c657598278d17d9c2",
      label: "Avalon AVL Rewards",

      value: async ({ roycoClient, chainClient }) => {
        const value = "TBD";
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
