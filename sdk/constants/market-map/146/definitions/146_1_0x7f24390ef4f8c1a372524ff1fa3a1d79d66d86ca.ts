import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_1_0x7f24390ef4f8c1a372524ff1fa3a1d79d66d86ca`,
  name: `Deposit S to OS`,
  description: `Deposits S to Origin Sonic (OS) to earn passive yield. Learn more at https:&#x2F;&#x2F;www.originprotocol.com&#x2F;os`,
  is_verified: false,
  // category: "???",
  // incentive_ids: [],
  // external_incentives: [],
  underlying_yield: async () => {
    let annual_change_ratio = 0;

    try {
      const req = await fetch(
        "https://api.originprotocol.com/api/v2/os/apr/trailing",
      );

      const data = (await req.json()) as {
        apr: number; // 1 = 1%
        apy: number; // 1 = 1%
      };

      annual_change_ratio = data.apr / 100; // Fix so .01 = 1%
    } catch (err) {
      // Omit error for clean server logs
    }

    return annual_change_ratio;
  },
});
