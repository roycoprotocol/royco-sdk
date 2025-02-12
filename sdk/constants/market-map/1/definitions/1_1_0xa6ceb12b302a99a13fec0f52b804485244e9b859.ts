import { defineMarket } from "@/sdk/constants";

type TokenData = {
  token: string;
  blockchains: {
    chainId: number;
    apr: {
      apr7d: number;
      restaking7dApr: number;
    };
  }[];
};

type GraphQLResponse = {
  data: {
    getLRTsData: {
      tokens: TokenData[];
    };
  };
};

export default defineMarket({
  id: `1_1_0xa6ceb12b302a99a13fec0f52b804485244e9b859`,
  name: `ETH MAX Vault - YieldNest`,
  description: `This vault will give you MAX ETH rewards by merging DeFi&#x27;s best strategies into a single, unified, high-powered asset ynETHx with L1 settlement assurances. Start receiving continuous &amp; compounding yield with ease.`,
  is_verified: true,
  native_yield: [
    {
      token_id: "1-0x4c3b39edc50d58c1c59a389a77aef1e767f6bc3f",
      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        let annual_change_ratio = 0;

        try {
          const response = await fetch(
            "https://gateway.yieldnest.finance/api/v1/graphql",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: `
                query GetTokenMetrics {
                  getLRTsData(networkType: mainnet) {
                    tokens {
                      token
                      blockchains {
                        chainId
                        apr {
                          apr7d
                          restaking7dApr
                        }
                      }
                    }
                  }
                }
              `,
              }),
            },
          );

          const data: GraphQLResponse = await response.json();
          const ynETHxData = data.data.getLRTsData.tokens.find(
            (token: TokenData) => token.token === "ynETHx",
          );

          if (ynETHxData) {
            const blockchainData = ynETHxData.blockchains.find(
              (blockchain: { chainId: number }) => blockchain.chainId === 1,
            );

            if (blockchainData) {
              annual_change_ratio =
                blockchainData.apr.apr7d + blockchainData.apr.restaking7dApr;
            }
          }
        } catch (err) {
          // Don't log the error when you make PR,
          // because it will be called server side and
          // we don't want to fill server side logs with failed API calls
        }

        return annual_change_ratio / 100;
      },
    },
  ],
});
