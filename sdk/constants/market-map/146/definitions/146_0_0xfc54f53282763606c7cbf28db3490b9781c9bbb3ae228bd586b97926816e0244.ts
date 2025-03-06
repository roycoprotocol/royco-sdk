import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0xfc54f53282763606c7cbf28db3490b9781c9bbb3ae228bd586b97926816e0244`,
  name: `Provide liquidity to the wstkscETH pool on Pendle`,
  description: `The Pendle wstkscETH LP token is supplied to the market as proof that you&#x27;ve provided liquidity to the Pendle wstkscETH pool. Depositors may exit at anytime, however withdrawing before the end of the 30-day period will forfeit all incentives earned to date.`,
  is_verified: false,

  native_yield: [
    {
      /**
       * @note Make sure the below token_id is in "LOWERCASE", i repeat: it must be in "LOWERCASE"
       * If you ensure that it is in "LOWERCASE", i will not look for you, i will not pursue you
       * But if i find that it is not in "LOWERCASE" in PR, i will look for you, i will find you
       * and "I WILL KILL YOU" !!!
       *
       * @note Also make sure that this token is PR'ed into the SDK inside token-map
       */
      token_id: "146-0xd14117baf6ec5d12be68cd06e763a4b82c9b6d1d",

      label: "Pendle LP Yield",

      /**
       * @note This is the annual change ratio for the native yield
       * This must return a "NUMBER"
       */
      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        // Add a fallback value just in case the API call fails
        let annual_change_ratio = 0;

        try {
          const req = await fetch(
            "https://api-v2.pendle.finance/core/v2/146/markets/0xd14117baf6ec5d12be68cd06e763a4b82c9b6d1d/data",
          );

          // Add your own data parsing logic here
          const data = await req.json();

          annual_change_ratio = data.aggregatedApy;
        } catch (err) {
          // Don't log the error when you make PR,
          // because it will be called server side and
          // we don't want to fill server side logs with failed API calls
        }

        // Don't forget to return the value, because why not?
        return annual_change_ratio;
      },
    },
  ],
});
