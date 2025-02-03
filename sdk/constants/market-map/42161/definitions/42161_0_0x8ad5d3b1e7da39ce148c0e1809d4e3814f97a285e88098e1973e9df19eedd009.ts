import { roycoClient } from "@/sdk/client";
import { defineMarket } from "@/sdk/constants";

const apy = async () => {
  let annual_change_ratio = 0;

  try {
    const res = await fetch("https://ctrl.yield.fi/t/apy");
    const apy_data = await res.json();
    annual_change_ratio = (Number(apy_data["apy"]) ?? 0) / 100;
  } catch (error) {
    console.error(error);
  }

  return annual_change_ratio;
};

export default defineMarket({
  id: `42161_0_0x8ad5d3b1e7da39ce148c0e1809d4e3814f97a285e88098e1973e9df19eedd009`,
  name: `Swap USDC for yUSD for 3 mo`,
  description: `Earn 15% - 25% APY + rewards on stable coins. 

More details at (https:&#x2F;&#x2F;yield.fi)`,
  is_verified: true,
  incentive_ids: ["42161-0x895e15020c3f52ddd4d8e9514eb83c39f53b1579"],
  native_yield: [
    {
      token_id: "42161-0x895e15020c3f52ddd4d8e9514eb83c39f53b1579",
      label: "yUSD",
      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        return await apy();
      },
    },
  ],

  underlying_yield: async ({ roycoClient, chainClient }) => {
    return await apy();
  },
});
