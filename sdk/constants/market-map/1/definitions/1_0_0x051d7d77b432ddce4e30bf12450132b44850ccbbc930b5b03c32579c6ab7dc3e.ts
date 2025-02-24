import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x051d7d77b432ddce4e30bf12450132b44850ccbbc930b5b03c32579c6ab7dc3e`,
  name: `Lend GHO on Gearbox`,
  description: `USDC is swapped to GHO and deposited into the Gearbox Earn. Users who lock GHO for 30 days shall receive GHO rewards from Royco. Users can withdraw at any time, and in doing so receive only the native yield and GEAR rewards from Gearbox Protocol. Community Note: Assets withdrawn are GHO and GEAR. `,
  is_verified: false,
});
