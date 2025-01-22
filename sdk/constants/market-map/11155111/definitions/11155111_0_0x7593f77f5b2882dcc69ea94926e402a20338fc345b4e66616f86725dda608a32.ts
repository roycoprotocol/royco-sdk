import { defineMarket } from "@/sdk/constants";

/**
 * @note This example illustrates how to add native, underlying and external incentives to a market
 *
 * 1. Native Yield: This is the yield for native incentives that are not on Royco
 * 2. Underlying Yield: This is the yield that underlying ERC4626 vault has
 * 3. External Incentives: This is the yield that external incentives have
 */

/**
 * @optional We are passing 2 params here to all async functions
 * -- roycoClient and chainClient and you can use them to make
 * any kind of API calls that you want
 * -- to retrieve data from royco db or chain RPC respectively
 */

export default defineMarket({
  id: `11155111_0_0x7593f77f5b2882dcc69ea94926e402a20338fc345b4e66616f86725dda608a32`,
  name: `Test Boyco Market`,
  description: `Test Boyco Market`,
  is_verified: false,
  category: "boyco",

  /**
   * @note Here, you can add any kind of yields that you want to show on UI
   *
   * @note This is an array, so you can add multiple native yields
   */
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
      token_id: "11155111-0xb13000ad565242a3ba19a220f573ee39b79a5376",

      /**
       * @note This label is optional -- so if you don't want custom labels,
       * just don't add this field (don't leave it empty string
       * -- i repeat: "DON'T LEAVE IT EMPTY STRING",
       * (just don't add the key itself if you don't want custom labels)
       * -- Search for "HOW NOT TO ADD A LABEL 101" in this file to learn more
       */
      label: "BURR Native Yield",

      /**
       * @note This is the annual change ratio for the native yield
       * This must return a "NUMBER"
       */
      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        let annual_change_ratio = 0;

        try {
          const req = await fetch(
            // This is a fake API call, use your own API URL here
            "https://jsonplaceholder.typicode.com/posts/2",
          );

          // Add your own data parsing logic here
          const data = await req.json();

          /**
           * @note This must be a ratio (not the percentage)
           * For example, if you want to show 10% Yield on UI,
           * you must return "0.1" (which is 10 / 100 = 0.1)
           */
          annual_change_ratio = data.id / 100;
        } catch (err) {
          // Don't log the error when you make PR,
          // because it will be called server side and
          // we don't want to fill server side logs with failed API calls
        }

        // Don't forget to return the value,
        // else there's no point in adding this native yield
        return annual_change_ratio;
      },
    },
  ],

  /**
   * @note This is the yield that underlying ERC4626 vault has
   * -- it's only relevant for Royco Vault Markets,
   * ignore this for Royco Recipe Markets
   *
   * @note This returns a number, not an array
   * -- i repeat, "NOT AN ARRAY", repeating again, "NOT AN ARRAY"
   */
  underlying_yield: async ({ roycoClient, chainClient }) => {
    // Add a fallback value just in case the API call fails
    let annual_change_ratio = 0;

    try {
      const req = await fetch(
        // This is a fake API call, use your own API URL here
        "https://jsonplaceholder.typicode.com/posts/2",
      );

      // Add your own data parsing logic here
      const data = await req.json();

      /**
       * @note This must be a ratio (not the percentage)
       * For example, if you want to show 25% Yield on UI,
       * you must return "0.25" (which is 25 / 100 = 0.25)
       */
      annual_change_ratio = data.id / 100;
    } catch (err) {
      // Don't log the error when you make PR,
      // because it will be called server side and
      // we don't want to fill server side logs with failed API calls
    }

    // Don't forget to return the value, because why not?
    return annual_change_ratio;
  },

  /**
   * @note Use this to add any kind of external incentives
   *  via any random API or any other kind of custom typescipt logic
   * or even better, "HARDCODE IT"
   *
   * @note This is an array, so it allows you to add multiple external incentives
   */

  external_incentives: [
    {
      /**
       * @note Again, make sure that below token_id is in "LOWERCASE"
       * Else i'm warning yaaa -- "Things won't end pretty for YOU..."
       */
      token_id: "11155111-0xb13000ad565242a3ba19a220f573ee39b79a5376",

      /**
       * @note This label is optional -- so if you don't want custom labels,
       * just don't add this field (don't leave it empty string
       * -- i repeat: "DON'T LEAVE IT EMPTY STRING",
       * (just don't add the key itself if you don't want custom labels)
       * -- search for "HOW NOT TO ADD A LABEL 101" in this file to learn more
       */
      label: "BURR Multiplier",

      /**
       * @note Constant Value Example -- this must return a "STRING"
       */
      value: async ({ roycoClient, chainClient }) => {
        // This can be text you want, like "LITERALLY ANYTHING"
        // For example, "12.3%", "5x BERA on Total TVL", "150x BURR", etc.
        const value = "30x per USDC";
        return value;
      },
    },
    {
      /**
       * @note Again, make sure that below token_id is in "LOWERCASE"
       * in the name of holy lord
       */
      token_id: "11155111-0xb13000ad565242a3ba19a220f573ee39b79a5376",

      /**
       * @note HOW NOT TO ADD A LABEL 101 -- yay, you found it :)
       *
       * See here, I have not added any label,
       * because I don't want to show any custom label
       * and I am fine whatever label ROYCO gives me :)
       */

      /**
       * @note API Call Example -- again, this must return a "STRING"
       */
      value: async ({ roycoClient, chainClient }) => {
        // Add a fallback value just in case the API call fails
        let value = "10% per $TVL";

        // Make the API call using try/catch
        try {
          const req = await fetch(
            // This is a fake API call, use your own API URL here
            "https://jsonplaceholder.typicode.com/posts/2",
          );

          // Add your own data parsing logic here
          const data = await req.json();

          value = `${data.id * 10}% per $TVL`;
        } catch (err) {
          // Don't log the error when you make PR,
          // because it will be called server side
          // and we don't want to fill server side logs with failed API calls
        }

        // Don't forget to return the value,
        // else all your hard work will go to vain
        return value;
      },
    },
  ],
});
