import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `8453_0_0x950acfbc9e53c7e0d1d1300577fe45b2b9a76d157921808a1cd4520e1e6dea72`,
  name: `Deposit wstETH to Plaza Finance`,
  description: `Earn Plaza Points for depositing wstETH to Plaza. After the deposit period, your wstETH is converted to 70% of the value in bondETH, and 30% of the value in levETH. You may withdraw at any time but will forfeit the incentives if you withdraw before the end of the deposit period.`,
  is_verified: false,
});