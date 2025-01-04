import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `98865_1_0xebedd3ec4b38c0488ccda9bd825ac174546f99a2`,
  name: `Deposit pUSD into Nest RWA Vault`,
  description: `When pUSD is supplied to the market, it is deposited into the Nest RWA Vault to receive nRWA tokens. Users may withdraw at any time.`,
  is_verified: false,
});