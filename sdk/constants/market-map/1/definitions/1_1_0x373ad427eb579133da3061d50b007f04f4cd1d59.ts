import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_1_0x373ad427eb579133da3061d50b007f04f4cd1d59`,
  name: `Deploy stablecoin into OUSD`,
  description: `Deploys USDC, USDT, and DAI into OUSD to earn passive yield. Learn more at https:&#x2F;&#x2F;ousd.com&#x2F;`,
  is_verified: false,
  underlying_yield: async () => {
    let annual_change_ratio = 0;

    try {
      const req = await fetch(
        "https://api.originprotocol.com/api/v2/ousd/apr/trailing",
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
