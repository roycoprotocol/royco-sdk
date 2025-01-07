import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `98865_1_0xe86a17a5e498161b19f9aaa374240473b8e2e5e9`,
  name: `Supply pUSD into Nest RWA Vault`,
  description: `When pUSD is supplied to the market, it is deposited into the Nest RWA Vault to receive nRWA tokens. Users may withdraw at any time.`,
  is_verified: false,
});
