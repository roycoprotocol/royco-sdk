import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `8453_1_0x38b2abdfb2fe79ad5e240fbd934a87b63038df5b`,
  name: `Lend USDC on Based Morpho (Seamless USDC Vault)`,
  description: `When USDC is supplied to the market, it is deposited into the Seamless USDC Vault on Based Morpho. Users can withdraw at any time.`,
  is_verified: false,
});
