import { defineMarket, getSupportedToken } from "@/sdk/constants";

export default defineMarket({
  id: "1_0_0xf98c40038e95042341a5e0f0d9fa4cc7a32a839f8645ebb91dd770f8578e2280",
  name: "Deposit USDC into SuperUSDC for 3 months",
  description: `Deposit USDC into Superform SuperUSDC on Ethereum for 3 months. SuperUSDC optimizes across blue-chip lending yield on Ethereum to earn the best returns.
    `,
  is_verified: true,
  native_yield: async () => {
    let USDC = {
      ...getSupportedToken("1-0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"),
      label: "Base APY",
      annual_change_ratio: 0,
    };

    let rewardToken = {
      ...getSupportedToken("1-0xF7DE3c70F2db39a188A81052d2f3C8e3e217822a"),
      label: "Reward APY",
      annual_change_ratio: 0,
    };

    let totalApy = 0;

    try {
      const response = await fetch(
        "https://www.superform.xyz/api/proxy/stats/vault/supervault/vL7k-5ZgYCoFgi6kz2jIJ/"
      );
      const data = await response.json();
      totalApy = Number(data.apy) / 100;
      const reward = Number(data.rewards[0].reward_rate) / 100;
      const base = totalApy - reward;

      USDC.annual_change_ratio = base;
      rewardToken = {
        ...getSupportedToken(`1-${data.rewards[0].token}`),
        label: "Reward APY",
        annual_change_ratio: reward,
      };
    } catch (error) {
      console.error(error);
    }

    return {
      native_annual_change_ratio: totalApy,
      native_annual_change_ratios: [USDC, rewardToken],
    };
  },
});
