import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `98865_1_0xe86a17a5e498161b19f9aaa374240473b8e2e5e9`,
  name: `Supply pUSD into Nest RWA Vault`,
  description: `When pUSD is supplied to the market, it is deposited into the Nest RWA Vault to receive nRWA tokens. Users may withdraw at any time.`,
  is_verified: false,
  underlying_vault_yield: async ({ roycoClient, chainClient }) => {
    // Variable to store the underlying yield (we refer it as annual_change_ratio)
    let underlying_annual_change_ratio = 0;

    try {
      // Fetch the custom APY from your API
      const custom_apy_res = await fetch(
        "https://app.nest.credit/api/nest-rwa-vault",
      );

      // Parse the response as JSON
      const custom_apy_data = await custom_apy_res.json();

      // Extract the underlying yield from the custom APY data & perform calculations, if needed and then update the underlying_annual_change_ratio
      underlying_annual_change_ratio =
        Number(custom_apy_data.estimatedApy) ?? 0;
    } catch (error) {
      console.error(error);
    }

    // Finally, return the underlying yield
    return {
      underlying_annual_change_ratio,
    };
  },
});
