import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `8453_0_0x94582ea5b2fa66674772f5f1b60ed990926dcc0b14d21e6d0931080833026884`,
  name: `Deposit rETH to Plaza Finance`,
  description: `Earn Plaza Points for depositing rETH to Plaza. After the deposit period, your rETH is converted to 70% of the value in bondETH, and 30% of the value in levETH. You may withdraw at any time but will forfeit the incentives if you withdraw before the end of the deposit period.`,
  is_verified: false,
});