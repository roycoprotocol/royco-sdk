import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_1_0x470fa30720ab37a46119c81f6e0c3cdf4c476faa`,
  name: `Deploy ETH into OETH`,
  description: `Deploys ETH into OETH to earn passive yield. Learn more at https:&#x2F;&#x2F;www.originprotocol.com&#x2F;oeth`,
  is_verified: true,
  underlying_yield: async () => {
    let annual_change_ratio = 0;

    try {
      const req = await fetch(
        "https://api.originprotocol.com/api/v2/oeth/apr/trailing",
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
