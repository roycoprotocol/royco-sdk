import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_1_0xe951eb523ce216ce777fda067675a9ba7d8ee63c`,
  name: `Lend USDS on Morpho Blue with IMF`,
  description: `When USDS is supplied to the IMF-USDS vault, it is deposited into the Morpho Blue market, and made available to borrowers who supply MOG collateral.`,
  is_verified: false,
});
