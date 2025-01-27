import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xfa4917a871f9cf06d3d00be6678993888b3aac41c3da21edf32c3c9cf3978d70`,
  name: `Provide USDa-HONEY Liquidity on Kodiak`,
  description: `Deposit USDa-USDC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge the assets to Berachain. On Berachain, mint HONEY with all of the USDC, then provide liquidity in the USDa-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. 

Earn DEX LP fees, as well as rewards from Berachain, Avalon, and Kodiak. This is part of the Berachain'&#x27;'s Boyco pre-deposit campaign.  

3% of the Kodiak token supply is allocated to Boyco, proportional to TVL * multiplier. This specific market has a ~2x multiplier for Bodiak points. More info on Kodiak's Boyco rewards: https://docs.kodiak.finance/kodiak-boyco`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8"],
  external_incentives: [
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
