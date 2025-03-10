import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0xd355d633abacb9617e31c71fd21c68b224357850522defab3dfb8d6932d5cc11`,
  name: `Stake S for stS on Beets`,
  description: `When wS is supplied to the market, it is staked for stS on Beets. Users receive stS when they exit the market. `,
  is_verified: true,

  underlying_yield: async ({ roycoClient, chainClient }) => {
    // Add a fallback value just in case the API call fails
    let annual_change_ratio = 0.045;

    try {
      const query = `{
          stsGetGqlStakedSonicData {
            stakingApr
          }
        }`;
      const backendResponse = await fetch(
        "https://backend-v3.beets-ftm-node.com/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        },
      );

      const data = (await backendResponse.json()) as {
        stsGetGqlStakedSonicData: { stakingApr: string };
      };

      annual_change_ratio = parseFloat(
        data.stsGetGqlStakedSonicData.stakingApr,
      );
    } catch (err) {}

    return annual_change_ratio;
  },
});
