import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0x1909c54081dda4ba39d7c18f53f1cdb34cb4f436557a5e82cb057d1355a0cd86`,
  name: `Supply wOS to Stability x Silo Leverage Vault`,
  description: `wOS is supplied and wS is borrowed with x9.5 leverage. DISCLAIMER: APR of the vault depends on Silo rates, Please DYOR before depositing into this high risk vault. High borrowing costs can lead to negative returns in volatile markets.`,
  is_verified: true,
  underlying_yield: async ({ roycoClient, chainClient }) => {
    let annual_change_ratio = 0;

    const vaultID = "0xd13369f16e11ae3881f22c1dd37957c241bd0662";

    try {
      const req = await fetch("https://api.stability.farm");

      const response = await req.json();

      const data = response.vaults[146];

      const siloAPR = Number(data[vaultID].income.aprLatest);

      if (siloAPR > 0) {
        annual_change_ratio = siloAPR / 100;
      }
    } catch (err) {}

    return annual_change_ratio;
  },
  external_incentives: [
    {
      token_id: "146-0xaa21e59bf97313b3b3850e9f878ffffc733a946a",
      label: "Sonic Points",
      value: async ({ roycoClient, chainClient }) => {
        return "76x Sonic Points";
      },
    },
  ],
});