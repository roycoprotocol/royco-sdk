import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: "8453_1_0xb98840b22618e77bbd0403c81365eefc7d449559",
  name: "Supply ETH to BakerFi",
  description: `Supply ETH to BakerFi's Recipe "Mille-feuille a la Base", a recursive staking strategy using Lido and Aave as the underlying protocols.`,
  is_verified: false,

  underlying_vault_yield: async ({ roycoClient, chainClient }) => {
    // Variable to store the underlying yield (we refer it as annual_change_ratio)
    let underlying_annual_change_ratio = 0;

    try {
      // Fetch the custom APY from your API
      const custom_apy_res = await fetch(
        "https://api-v1.bakerfi.xyz/api/vaults/8453/mille-feuille/yield",
      );

      // Parse the response as JSON
      const custom_apy_data = await custom_apy_res.json();

      // Extract the underlying yield from the custom APY data & perform calculations, if needed and then update the underlying_annual_change_ratio
      const new_underlying_annual_change_ratio =
        (Number(custom_apy_data["yield"]) ?? 0) / 100;

      // Check if value obtained is valid number or not, and only update if it is valid
      if (!isNaN(new_underlying_annual_change_ratio)) {
        underlying_annual_change_ratio = new_underlying_annual_change_ratio;
      }
    } catch (error) {
      console.error(error);
    }

    // Finally, return the underlying yield
    return {
      underlying_annual_change_ratio,
    };
  },
});
