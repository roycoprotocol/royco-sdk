import { defineMarket } from "@/sdk/constants";
import { extractTokenQuote } from "@/sdk/hooks";
import { getTokenQuotesQueryFunction } from "@/sdk/queries";

export default defineMarket({
  id: `1_0_0x9778047cb8f3740866882a97a186dff42743bebb3ad8010edbf637ab0e37751f`,
  name: `Supply HONEY on Dolomite x Infrared`,
  description: `Supply HONEY into the Dolomite money market on Berachain. This asset will earn lending yield and be eligible for potential Infrared incentives.`,
  is_verified: true,
  category: `boyco`,

  incentive_ids: ["1-0x460f8d9c78b1bde7da137ce75315bd15d34a369b"],

  external_incentives: [
    {
      token_id: "1-0x77d17183055303a15208c809b716dc02261129b7",
      label: "Infrared Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1.5x";
        return value;
      },
    },
    {
      token_id: "1-0x460f8d9c78b1bde7da137ce75315bd15d34a369b",
      label: "Dolomite Lending Yield",

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
        const STG_REWARD_AMOUNT = 1249375;
        const LOCK_PERIOD_DAYS = 90;
        let annual_change_ratio = 0;

        try {
          const market_req = await roycoClient.rpc("get_enriched_markets", {
            chain_id: 1,
            market_type: 0,
            market_id:
              "0x9778047cb8f3740866882a97a186dff42743bebb3ad8010edbf637ab0e37751f",
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
