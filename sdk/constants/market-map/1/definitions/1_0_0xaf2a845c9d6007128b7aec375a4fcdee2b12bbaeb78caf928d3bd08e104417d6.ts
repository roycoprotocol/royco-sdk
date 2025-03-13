import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xaf2a845c9d6007128b7aec375a4fcdee2b12bbaeb78caf928d3bd08e104417d6`,
  name: `Infrared x Kodiak WETH-beraETH LP`,
  description: `Deposit WETH on Ethereum Mainnet and bridge WETH to Berachain. On Berachain, mint beraETH with ~50% of the WETH, then provide liquidity in the WETH-beraETH Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared iBGT-compatible Vault. 

Earn DEX LP fees, as well as rewards from Berachain, Dinero, Infrared and Kodiak. This is part of the Berachain&#x27;s Boyco pre-deposit campaign. 

3% of the Kodiak token supply is allocated to Boyco, proportional to TVL * multiplier.  This specific market has a ~3x multiplier for Bodiak points. More info on Kodiak's Boyco rewards: https://docs.kodiak.finance/kodiak-boyco`,
  is_verified: true,
  category: `boyco`,

  incentive_ids: ["1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8"],

  external_incentives: [
    {
      token_id: "1-0x77d17183055303a15208c809b716dc02261129b7",
      label: "Infrared Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "2.5x";
        return value;
      },
    },
    {
      token_id: "98865-0x09d9420332bff75522a45fcff4855f82a0a3ff50",
      label: "Dinero Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "520k points per week, pro-rata";
        return value;
      },
    },
    {
      token_id: "1-0xb000000000000000000000000000000000000112",
      label: "ETH (Re)Staking Rewards",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Variable Rate (for eligible assets)";
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
        const STG_REWARD_AMOUNT = 1499250;
        const LOCK_PERIOD_DAYS = 90;
        let annual_change_ratio = 0;

        try {
          const market_req = await roycoClient.rpc("get_enriched_markets", {
            chain_id: 1,
            market_type: 0,
            market_id:
              "0xaf2a845c9d6007128b7aec375a4fcdee2b12bbaeb78caf928d3bd08e104417d6",
            page_index: 0,
            page_size: 1,
          });

          const market = market_req.data?.data?.[0];

          const tokenQuotes = await roycoClient.rpc("get_token_quotes", {
            token_ids: ["1-0xaf5191b0de278c7286d6c7cc6ab6bb8a73ba2cd6"],
          });

          const stgPrice = tokenQuotes.data?.[0]?.price ?? 0;

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
