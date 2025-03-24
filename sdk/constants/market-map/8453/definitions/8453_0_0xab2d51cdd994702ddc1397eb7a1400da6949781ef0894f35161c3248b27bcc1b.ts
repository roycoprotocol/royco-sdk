import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `8453_0_0xab2d51cdd994702ddc1397eb7a1400da6949781ef0894f35161c3248b27bcc1b`,
  name: `Deposit wrsETH to Plaza Finance`,
  description: `Earn Plaza Points for depositing wrsETH to Plaza. After the deposit period, your wrsETH is converted to 70% of the value in bondETH, and 30% of the value in levETH. You may withdraw at any time but will forfeit the incentives if you withdraw before the end of the deposit period.`,
  is_verified: false,
});