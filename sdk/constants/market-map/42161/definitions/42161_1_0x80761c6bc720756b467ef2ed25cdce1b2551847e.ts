import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: "42161_1_0x80761c6bc720756b467ef2ed25cdce1b2551847e",
  name: "Deposit USDC in Ostium OLP vault",
  description: "When USDC is supplied to the vault, it is used to settle any imbalances in Open Interest on trader exposure to a basket of Real World Assets (indices, currencies, commodities, blue-chip crypto). Deposits accrue 100% of fees from trading.",
  is_verified: false,
});