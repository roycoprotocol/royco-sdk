import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `8453_0_0x14cdd4227f33dec590776bf7097c78a683d4c95e965bc6b7b78e610c4da9fb15`,
  name: `Deposit ezETH to Plaza Finance`,
  description: `Earn Plaza Points for depositing ezETH to Plaza. After the deposit period, your ezETH is converted to 70% of the value in bondETH, and 30% of the value in levETH. You may withdraw at any time but will forfeit the incentives if you withdraw before the end of the deposit period.`,
  is_verified: false,
});
