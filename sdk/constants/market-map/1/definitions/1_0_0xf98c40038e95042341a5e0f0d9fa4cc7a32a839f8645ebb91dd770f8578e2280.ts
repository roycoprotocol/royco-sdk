import { defineMarket, getSupportedToken } from "@/sdk/constants";

export default defineMarket({
  id: "1_0_0xf98c40038e95042341a5e0f0d9fa4cc7a32a839f8645ebb91dd770f8578e2280",
  name: "Deposit USDC into SuperUSDC for 3 months",
  description: `Deposit USDC into Superform SuperUSDC on Ethereum for 3 months. SuperUSDC optimizes across blue-chip lending yield on Ethereum to earn the best returns.
    `,
  is_verified: true,
  native_yield: async () => {
    let superUSDC = {
      ...getSupportedToken("1-0xF7DE3c70F2db39a188A81052d2f3C8e3e217822a"),
      label: "Total APY",
      annual_change_ratio: 0,
    };

    try {
      const response = await fetch(
        "https://www.superform.xyz/api/proxy/stats/vault/supervault/vL7k-5ZgYCoFgi6kz2jIJ/"
      );
      const data = await response.json();
      superUSDC.annual_change_ratio = Number(data.apy) / 100;
    } catch (error) {
      console.error(error);
    }

    return {
      native_annual_change_ratio: superUSDC.annual_change_ratio,
      native_annual_change_ratios: [superUSDC],
    };
  },
});
