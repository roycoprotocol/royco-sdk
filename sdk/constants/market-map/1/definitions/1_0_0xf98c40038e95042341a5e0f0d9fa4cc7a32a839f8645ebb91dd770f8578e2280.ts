import { defineMarket, getSupportedToken } from "@/sdk/constants";

export default defineMarket({
  id: "1_0_0xf98c40038e95042341a5e0f0d9fa4cc7a32a839f8645ebb91dd770f8578e2280",
  name: "Deposit USDC into SuperUSDC for 3 months",
  description: `Deposit USDC into Superform SuperUSDC on Ethereum for 3 months. SuperUSDC optimizes across blue-chip lending yield on Ethereum to earn the best returns.
    `,
  is_verified: true,
  native_yield: [
    {
      token_id: "1-0xf7de3c70f2db39a188a81052d2f3c8e3e217822a",
      label: "Total APY",
      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        let annual_change_ratio = 0;

        try {
          const response = await fetch(
            "https://www.superform.xyz/api/proxy/stats/vault/supervault/vL7k-5ZgYCoFgi6kz2jIJ/",
          );
          const data = await response.json();
          annual_change_ratio = Number(data.apy) / 100;
        } catch (error) {
          console.error(error);
        }

        return annual_change_ratio;
      },
    },
  ],
});
