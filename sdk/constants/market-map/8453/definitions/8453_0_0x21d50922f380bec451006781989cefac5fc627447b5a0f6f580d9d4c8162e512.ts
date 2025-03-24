import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `8453_0_0x21d50922f380bec451006781989cefac5fc627447b5a0f6f580d9d4c8162e512`,
  name: `Deposit WETH to Plaza Finance`,
  description: `Earn Plaza Points for depositing WETH to Plaza. After the deposit period, your WETH is converted to 70% of the value in bondETH, and 30% of the value in levETH. You may withdraw at any time but will forfeit the incentives if you withdraw before the end of the deposit period.`,
  is_verified: false,
});
