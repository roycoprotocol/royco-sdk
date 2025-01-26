import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x897eec875e51d6c8b5339d6a9984a00acb0aa86f9d4ab4eddbb4a791bb0a88e9`,
  name: `Beraborrow ylpumpBTC Boyco`,
  description: `Single sided Liquid Stability Pool:
Deposit ylpumpBTC into Boyco. ylpumpBTC is bridged &amp; deposited into Beraborrow. ylpumpBTC is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});