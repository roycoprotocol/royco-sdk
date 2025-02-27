import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x051d7d77b432ddce4e30bf12450132b44850ccbbc930b5b03c32579c6ab7dc3e`,
  name: `Lend GHO on Gearbox`,
  description: `Swap USDC for GHO on Balancer V2, receiving a minimum of .999 GHO per USDC, then deposit GHO into Gearbox Earn and lock for 1 month. \nCommunity Note: Assets withdrawn are GHO and GEAR.\n\n Users who lock GHO for 30 days shall receive additional GHO rewards from Royco. You can withdraw any time before the 30 days, forfeiting your Royco rewards and only receiving the native yield and GEAR rewards from Gearbox Protocol.`,
  is_verified: true,
  native_yield: [
    {
      token_id: "1-0x4d56c9cba373ad39df69eb18f076b7348000ae09",
      label: "dGHO native yield",
      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        let annual_change_ratio = 0;
        try {
          const req = await fetch(
            "https://charts-server.fly.dev/api/spot/pools/0x4d56c9cBa373AD39dF69Eb18F076b7348000AE09",
          );
          const data = await req.json();
          annual_change_ratio = data.data.depositAPY_RAY / 1e27;
        } catch (err) {}
        return annual_change_ratio;
      },
    },
    {
      token_id: "1-0xba3335588d9403515223f109edc4eb7269a9ab5d",
      label: "GEAR incentive yield",
      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        let annual_change_ratio = 0;
        try {
          const req = await fetch(
            "https://charts-server.fly.dev/api/spot/pools/0x4d56c9cBa373AD39dF69Eb18F076b7348000AE09",
          );
          const data = await req.json();
          annual_change_ratio = data.data.lmAPY / 10000;
        } catch (err) {}
        return annual_change_ratio;
      },
    },
  ],
});
