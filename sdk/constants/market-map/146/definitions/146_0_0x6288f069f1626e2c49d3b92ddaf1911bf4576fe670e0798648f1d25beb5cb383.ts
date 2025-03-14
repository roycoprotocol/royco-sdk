import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0x6288f069f1626e2c49d3b92ddaf1911bf4576fe670e0798648f1d25beb5cb383`,
  name: `LP into the wstkscUSD pool on Pendle`,
  description: `The Pendle wstkscUSD LP token is supplied to the market as proof that you&#x27;ve provided liquidity to the Pendle wstkscUSD pool. Depositors may exit at anytime, however withdrawing before the end of the 30-day period will forfeit all incentives earned to date. The maturity period for this market is May 28, 2025 and this market will stop accepting new deposits 30 days prior to this date.`,
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
      token_id: "146-0x6e4e95fab7db1f0524b4b0a05f0b9c96380b7dfa",

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
            "https://api-v2.pendle.finance/core/v2/146/markets/0x6e4e95fab7db1f0524b4b0a05f0b9c96380b7dfa/data",
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

  external_incentives: [
    {
      token_id: "146-0xaa21e59bf97313b3b3850e9f878ffffc733a946a",
      label: "Sonic Points",
      value: async ({ roycoClient, chainClient }) => {
        return "12x Sonic Points";
      },
    },
    {
      token_id: "146-0x5e75334f4270ffe07a80b28fc831bfab2d83706e",
      label: "Rings Points",
      value: async ({ roycoClient, chainClient }) => {
        return "2x Rings Points";
      },
    },
    {
      token_id: "146-0xab8898b840b681cd406aa53ad5d1c167178441c7",
      label: "Veda Points",
      value: async ({ roycoClient, chainClient }) => {
        return "3x Veda Points";
      },
    },
  ],
});
