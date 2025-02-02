import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x17ffd16948c053cc184c005477548e559566879a0e2847e87ebd1111c602535c`,
  name: `Infrared x Kodiak WETH-HONEY LP`,
  description: `Deposit WETH-USDC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge the assets to Berachain. On Berachain, mint HONEY with all of the USDC, then provide liquidity in the WETH-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;wide&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared iBGT-compatible Vault.

Earn DEX LP fees, as well as rewards from Berachain, Infrared and Kodiak. This is part of the Berachain&#x27;s Boyco pre-deposit campaign. This market qualifies for the HIGHEST multiplier rewards from Berachain. 

3% of the Kodiak token supply is allocated to Boyco, proportional to TVL * multiplier. This specific market has a ~12x multiplier for Bodiak points. More info on Kodiak's Boyco rewards: https://docs.kodiak.finance/kodiak-boyco`,
  is_verified: true,
  category: `boyco`,

  incentive_ids: ["1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8"],

  external_incentives: [
    {
      token_id: "1-0x77d17183055303a15208c809b716dc02261129b7",
      label: "Infrared Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "6x";
        return value;
      },
    },
    {
      token_id: "1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8",
      label: "DEX Fees",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Estimated 15-30% APY";
        return value;
      },
    },
  ],

  native_yield: [
    {
      token_id: "1-0xaf5191b0de278c7286d6c7cc6ab6bb8a73ba2cd6",
      label: "Stargate Incentives",
      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        const STG_REWARD_AMOUNT = 1999000;
        const LOCK_PERIOD_DAYS = 90;
        let annual_change_ratio = 0;

        try {
          const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=stargate-finance&vs_currencies=usd",
          );
          const priceData = await response.json();
          const stgPrice = priceData["stargate-finance"].usd;

          // Calculate annual STG rewards value
          const annualRewardValueUSD =
            STG_REWARD_AMOUNT * stgPrice * (365 / LOCK_PERIOD_DAYS);

          // Calculate APY based on TVL
          if (market.total_value_locked && market.total_value_locked > 0) {
            annual_change_ratio =
              annualRewardValueUSD / market.total_value_locked;
          }
        } catch (error) {
          console.error("Error fetching STG price:", error);
        }

        return annual_change_ratio;
      },
    },
  ],
});
