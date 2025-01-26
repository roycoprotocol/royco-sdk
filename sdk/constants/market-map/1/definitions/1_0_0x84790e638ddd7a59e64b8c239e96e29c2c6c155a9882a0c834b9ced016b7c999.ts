import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x84790e638ddd7a59e64b8c239e96e29c2c6c155a9882a0c834b9ced016b7c999`,
  name: `Beraborrow stBTC Boyco`,
  description: `Single sided Liquid Stability Pool: 
Deposit stBTC into Boyco. stBTC is bridged &amp; deposited into Beraborrow. stBTC is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
