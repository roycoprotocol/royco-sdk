import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x62bb6fb784e059f338340a9724b35ef2ef8fde5e65613e9fcaacd097d81dc67e`,
  name: `Provide NECT-HONEY Liquidity on Kodiak`,
  description: `Deposit USDC on Ethereum Mainnet and bridge USDC to Berachain. On Berachain, mint HONEY with ~50% of the USDC and mint NECT with ~50% of the USDC, then provide liquidity in the NECT-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0xfbca1de031ac44e83850634c098f22137e4647e5"],
  external_incentives: [
    {
      token_id: "1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8",
      label: "DEX Fees",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Variable Rate";
        return value;
      },
    },
    {
      token_id: "1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8",
      label: "BODIAK Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "2.5x";
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
              "0x62bb6fb784e059f338340a9724b35ef2ef8fde5e65613e9fcaacd097d81dc67e",
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
