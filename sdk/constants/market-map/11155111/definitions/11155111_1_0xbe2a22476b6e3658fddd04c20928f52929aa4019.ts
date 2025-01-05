import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: "11155111_1_0xbe2a22476b6e3658fddd04c20928f52929aa4019",
  name: "Sepolia Test Vault USDC Market",
  description: "Sepolia Test Vault USDC Market",
  is_verified: false,
  underlying_vault_yield: async ({ roycoClient, chainClient }) => {
    // Variable to store the underlying yield (we refer it as annual_change_ratio)
    let underlying_annual_change_ratio = 0;

    try {
      // Fetch the custom APY from your API
      const custom_apy_res = await fetch(
        "https://apps.aavechan.com/api/merit/aprs",
      );

      // Parse the response as JSON
      const custom_apy_data = await custom_apy_res.json();

      // Extract the underlying yield from the custom APY data & perform calculations, if needed and then update the underlying_annual_change_ratio
      underlying_annual_change_ratio =
        (Number(custom_apy_data.currentAPR.actionsAPR["ethereum-stkgho"]) ??
          0) / 100;
    } catch (error) {
      console.error(error);
    }

    // Finally, return the underlying yield
    return {
      underlying_annual_change_ratio,
    };
  },
});
