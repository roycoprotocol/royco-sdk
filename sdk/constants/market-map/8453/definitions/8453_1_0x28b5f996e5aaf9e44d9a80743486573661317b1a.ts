import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `8453_1_0x28b5f996e5aaf9e44d9a80743486573661317b1a`,
  name: `Deploy ETH into superOETH`,
  description: `Deploys ETH into superOETHb to earn passive yield. Learn more at https:&#x2F;&#x2F;www.originprotocol.com&#x2F;super-oeth`,
  is_verified: true,
  underlying_yield: async () => {
    let annual_change_ratio = 0;

    try {
      const req = await fetch(
        "https://api.originprotocol.com/api/v2/superoethb/apr/trailing",
      );

      const data = (await req.json()) as {
        apr: number; // 1 = 1%
        apy: number; // 1 = 1%
      };

      annual_change_ratio = data.apy / 100; // Fix so .01 = 1%
    } catch (err) {
      // Omit error for clean server logs
    }

    return annual_change_ratio;
  },
});
