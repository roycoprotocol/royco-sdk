import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x051d7d77b432ddce4e30bf12450132b44850ccbbc930b5b03c32579c6ab7dc3e`,
  name: `Lend GHO on Gearbox`,
  description: `Swap USDC for GHO on Balancer V2, receiving a minimum of .999 GHO per USDC, then deposit GHO into Gearbox Earn and lock for 1 month. \nCommunity Note: Assets withdrawn are GHO and GEAR.\n\n Users who lock GHO for 30 days shall receive additional GHO rewards from Royco. You can withdraw any time before the 30 days, forfeiting your Royco rewards and only receiving the native yield and GEAR rewards from Gearbox Protocol.`,
  is_verified: true,
});
