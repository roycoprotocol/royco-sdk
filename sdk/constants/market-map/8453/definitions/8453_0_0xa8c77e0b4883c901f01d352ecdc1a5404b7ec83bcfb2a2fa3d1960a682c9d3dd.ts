import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `8453_0_0xa8c77e0b4883c901f01d352ecdc1a5404b7ec83bcfb2a2fa3d1960a682c9d3dd`,
  name: `Deposit weETH to Plaza Finance`,
  description: `Earn Plaza Points for depositing weETH to Plaza. After the deposit period, your weETH is converted to 70% of the value in bondETH, and 30% of the value in levETH. You may withdraw at any time but will forfeit the incentives if you withdraw before the end of the deposit period.`,
  is_verified: false,
});