import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0xc2b6fade2c202f102b59c4f2a1dabcf414deec4bd0b868757e218ed19f3c8ca6`,
  name: `Supply stS to Stability x Silo Leverage Vault`,
  description: `stS is supplied and wS is borrowed with x17.4 leverage. DISCLAIMER: APR of the vault depends on Silo rates, Please DYOR beforing depositing into this high risk vault. High borrowing costs can lead to negative returns in volatile markets. `,
  is_verified: false,
  underlying_yield: async ({ roycoClient, chainClient }) => {
    let annual_change_ratio = 0;

    const vaultID = "0x709833e5b4b98aab812d175510f94bc91cfabd89";

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
});
