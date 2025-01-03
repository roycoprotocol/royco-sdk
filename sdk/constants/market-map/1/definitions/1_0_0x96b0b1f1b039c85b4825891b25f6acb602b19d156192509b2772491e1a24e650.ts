import { defineMarket, getSupportedToken } from "@/sdk/constants";

export default defineMarket({
  id: "1_0_0x96b0b1f1b039c85b4825891b25f6acb602b19d156192509b2772491e1a24e650",
  name: "Buy yUSD on YieldFi",
  description:
    "yUSD is YieldFi's yield bearing stablecoin, earning 15% - 25% APY in real yield + incentives",
  is_verified: false,
  native_yield: async ({ roycoClient, chainClient }) => {
    const yUSDContract = "0x1ce7d9942ff78c328a4181b9f3826fee6d845a97";

    let yUSD = {
      ...getSupportedToken(`1-${yUSDContract}`),
      label: "Native Vault Incentives",
      annual_change_ratio: 0,
    };

    try {
      const res = await fetch("https://ctrl.yield.fi/t/apy");

      const apy_data = await res.json();

      yUSD.annual_change_ratio = (Number(apy_data["apy"]) ?? 0) / 100;
    } catch (error) {
      console.error(error);
    }

    return {
      native_annual_change_ratio: yUSD.annual_change_ratio,
      native_annual_change_ratios: [yUSD],
    };
  },
});
