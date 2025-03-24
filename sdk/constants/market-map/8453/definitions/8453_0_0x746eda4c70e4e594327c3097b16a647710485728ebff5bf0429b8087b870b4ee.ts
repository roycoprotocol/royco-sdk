import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `8453_0_0x746eda4c70e4e594327c3097b16a647710485728ebff5bf0429b8087b870b4ee`,
  name: `Deposit wstETH to Plaza Finance`,
  description: `Earn Plaza Points for depositing wstETH to Plaza. After the deposit period, your wstETH is converted to 70% of the value in bondETH, and 30% of the value in levETH. You may withdraw at any time but will forfeit the incentives if you withdraw before the end of the deposit period.`,
  is_verified: false,
});
