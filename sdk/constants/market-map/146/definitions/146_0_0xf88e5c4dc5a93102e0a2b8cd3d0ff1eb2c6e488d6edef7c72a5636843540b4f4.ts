import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0xf88e5c4dc5a93102e0a2b8cd3d0ff1eb2c6e488d6edef7c72a5636843540b4f4`,
  name: `Supply wOS to Stability x Silo Leverage Vault`,
  description: `wOS is supplied and wS is borrowed with x9.5 leverage. DISCLAIMER: APR of the vault depends on Silo rates, DISCLAIMER: APR of the vault depends on Silo rates, Please DYOR beforing depositing into this high risk vault. High borrowing costs can lead to negative returns in volatile markets. `,
  is_verified: false,
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
});
