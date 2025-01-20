import { defineMarket, getSupportedToken } from "@/sdk/constants";

export default defineMarket({
  id: `8453_0_0x18493e771a4fd1cc17f01ec9f12cc3058bd4e30fda4affdd3e2c11ec6a557c8c`,
  name: `Deposit USDC into SuperUSDC for 10 weeks`,
  description: `Deposit USDC into Superform's SuperUSDC on Base for 3 months. SuperUSDC optimizes across blue-chip lending yield on Base to earn the best returns.`,
  is_verified: true,
  native_yield: async () => {
    let USDC = {
      ...getSupportedToken("8453-0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"),
      label: "Base APY",
      annual_change_ratio: 0,
    };

    let rewardToken = {
      ...getSupportedToken("8453-0xe9F2a5F9f3c846f29066d7fB3564F8E6B6b2D65b"),
      label: "Reward APY",
      annual_change_ratio: 0,
    };

    let totalApy = 0;

    try {
      const response = await fetch(
        "https://www.superform.xyz/api/proxy/stats/vault/supervault/zLVQbgScIbXJuSz-NNsK-/",
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
