import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `11155111_0_0x0f4e051a617200f3fb5643ed22dd107213c4816a149e8094b5bc4768db3188d2`,
  name: `Deposit into Boring Vault`,
  description: `When users deposit USDC it is bridged to berachain, and deposited into a boring vault.`,
  is_verified: false,
});