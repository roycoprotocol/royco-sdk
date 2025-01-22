import { defineMarket, getSupportedToken } from "@/sdk/constants";

export default defineMarket({
  id: "1_0_0xf98c40038e95042341a5e0f0d9fa4cc7a32a839f8645ebb91dd770f8578e2280",
  name: "Deposit USDC into SuperUSDC for 3 months",
  description: `Deposit USDC into Superform SuperUSDC on Ethereum for 3 months. SuperUSDC optimizes across blue-chip lending yield on Ethereum to earn the best returns.
    `,
  is_verified: true,
  native_yield: [
    {
      token_id: "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      label: "Base APY",
      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        let annual_change_ratio = 0;

        try {
          const response = await fetch(
            "https://www.superform.xyz/api/proxy/stats/vault/supervault/vL7k-5ZgYCoFgi6kz2jIJ/",
          );

          const data = await response.json();
          const totalApy = Number(data.apy) / 100;
          const reward = Number(data.rewards[0].reward_rate) / 100;
          annual_change_ratio = totalApy - reward;
        } catch (error) {
          console.error(error);
        }

        return annual_change_ratio;
      },
    },
    {
      token_id: "1-0xf7de3c70f2db39a188a81052d2f3c8e3e217822a",
      label: "Reward APY",
      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        let annual_change_ratio = 0;

        try {
          const response = await fetch(
            "https://www.superform.xyz/api/proxy/stats/vault/supervault/vL7k-5ZgYCoFgi6kz2jIJ/",
          );

          const data = await response.json();
          const totalApy = Number(data.apy) / 100;
          annual_change_ratio = Number(data.rewards[0].reward_rate) / 100;
        } catch (error) {
          console.error(error);
        }

        return annual_change_ratio;
      },
    },
  ],
});
