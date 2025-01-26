import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xc182b0267a6ca015c2d2a144ca19e1f6b36479675754914002e0613320ed8d9a`,
  name: `Beraborrow ylstETH Boyco`,
  description: `Single sided Liquid Stability Pool: 
Deposit ylstETH into Boyco. ylstETH is bridged &amp; deposited into Beraborrow. ylstETH is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});