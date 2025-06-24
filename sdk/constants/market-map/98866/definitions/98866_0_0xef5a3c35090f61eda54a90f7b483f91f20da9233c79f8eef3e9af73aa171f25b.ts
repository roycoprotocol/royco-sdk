import { defineMarket } from "@/sdk/constants";

const apy = async () => {
  let annual_change_ratio = 0;

  try {
    const res = await fetch("https://ctrl.yield.fi/t/yusd/apy");
    const apy_data = await res.json();
    annual_change_ratio = Number(apy_data["apy"])
  } catch (error) {
    console.error(error);
  }

  return annual_change_ratio;
};

export default defineMarket({
  id: `98866_0_0xef5a3c35090f61eda54a90f7b483f91f20da9233c79f8eef3e9af73aa171f25b`,
  name: `Supply pUSD into YieldFi for 90 days`,
  description: `Earn 11% - 15% intrinsic APY + rewards on stable coins. 

More details at (https:&#x2F;&#x2F;yield.fi)`,
  is_verified: false,
  incentive_ids: ["98866-0xe7c46fe8c3c829582e41bbff5ddc421166e19124"],
  native_yield: [
    {
      token_id: "98866-0x4772d2e014f9fc3a820c444e3313968e9a5c8121",
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
