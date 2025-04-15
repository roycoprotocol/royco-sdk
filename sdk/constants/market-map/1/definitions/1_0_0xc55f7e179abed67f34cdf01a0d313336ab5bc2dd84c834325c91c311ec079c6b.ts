import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xc55f7e179abed67f34cdf01a0d313336ab5bc2dd84c834325c91c311ec079c6b`,
  name: `Stake weETH into weETH Vault`,
  description: `Stake weETH and hold it approximately until 10 July 2025 (~80 days) to be eligible for staking rewards`,
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