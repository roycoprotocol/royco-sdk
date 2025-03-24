import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `8453_0_0xe4f4bdbc4a5b04cffc4cfd2a37063fc73dbc25932fe6f8b3bd3820d8092e9bf5`,
  name: `Deposit cbETH to Plaza Finance`,
  description: `Earn Plaza Points for depositing cbETH to Plaza. After the deposit period, your cbETH is converted to 70% of the value in bondETH, and 30% of the value in levETH. You may withdraw at any time but will forfeit the incentives if you withdraw before the end of the deposit period.`,
  is_verified: false,
});
