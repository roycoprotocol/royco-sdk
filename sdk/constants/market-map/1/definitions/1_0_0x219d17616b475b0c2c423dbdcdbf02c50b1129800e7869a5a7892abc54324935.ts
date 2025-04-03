import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x219d17616b475b0c2c423dbdcdbf02c50b1129800e7869a5a7892abc54324935`,
  name: `Stake weETH into weETH Vault`,
  description: `Stake weETH and hold it approximately until 10 July 2025 (~98 days) to be eligible for staking rewards`,
  is_verified: false,

  native_yield: [
    {
      token_id: "1-0xcd5fe23c85820f7b72d0926fc9b05b43e359b7ee",

      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        let annual_change_ratio = 0;

        try {
          const resp = await fetch(
            "https://levva.fi/api/v1/vaults/1/0x60837bCAf0d157EdE629AC4b5f6639F45Db0aa2e",
          );

          const data = await resp.json();
          annual_change_ratio = data.currentApy;
        } catch (err) {}

        return annual_change_ratio;
      },
    },
  ],
});
