import { defineMarket } from "@/sdk/constants";
import { extractTokenQuote } from "@/sdk/hooks";
import { getTokenQuotesQueryFunction } from "@/sdk/queries";

export default defineMarket({
  id: `1_0_0x72bec627884d7bdf538f174bedd551e9eccf3995adc880f40972e2bab87df3b9`,
  name: `Infrared x Kodiak USDC-HONEY LP`,
  description: `Deposit USDC on Ethereum Mainnet and bridge USDC to Berachain. On Berachain, mint HONEY with ~50% of the USDC, then provide liquidity in the USDC-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared iBGT-compatible Vault. 

Earn DEX LP fees, as well as rewards from Berachain, Infrared and Kodiak. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.  

3% of the Kodiak token supply is allocated to Boyco, proportional to TVL * multiplier.  This specific market has a ~3.5x multiplier for Bodiak points. More info on Kodiak's Boyco rewards: https://docs.kodiak.finance/kodiak-boyco`,
  is_verified: true,
  category: `boyco`,

  incentive_ids: ["1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8"],

  external_incentives: [
    {
      token_id: "1-0x77d17183055303a15208c809b716dc02261129b7",
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

  native_yield: [
    {
      token_id: "1-0xaf5191b0de278c7286d6c7cc6ab6bb8a73ba2cd6",
      label: "Stargate Incentives",
      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        const STG_REWARD_AMOUNT = 1999000;
        const LOCK_PERIOD_DAYS = 90;
        let annual_change_ratio = 0;

        try {
          const market_req = await roycoClient.rpc("get_enriched_markets", {
            chain_id: 1,
            market_type: 0,
            market_id:
              "0x72bec627884d7bdf538f174bedd551e9eccf3995adc880f40972e2bab87df3b9",
            page_index: 0,
            page_size: 1,
          });

          const market = market_req.data?.data?.[0];

          const tokenQuotes = await getTokenQuotesQueryFunction({
            client: roycoClient,
            token_ids: ["1-0xaf5191b0de278c7286d6c7cc6ab6bb8a73ba2cd6"],
          });

          const tokenQuote = extractTokenQuote({
            token_id: "1-0xaf5191b0de278c7286d6c7cc6ab6bb8a73ba2cd6",
            token_quotes: tokenQuotes,
          });

          const stgPrice = tokenQuote.price;

          // Calculate annual STG rewards value
          const annualRewardValueUSD =
            STG_REWARD_AMOUNT * stgPrice * (365 / LOCK_PERIOD_DAYS);

          // Calculate APY based on TVL
          if (market?.total_value_locked && market.total_value_locked > 0) {
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
