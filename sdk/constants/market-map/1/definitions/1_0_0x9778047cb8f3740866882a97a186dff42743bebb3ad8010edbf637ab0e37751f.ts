import { defineMarket } from "@/sdk/constants";

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
