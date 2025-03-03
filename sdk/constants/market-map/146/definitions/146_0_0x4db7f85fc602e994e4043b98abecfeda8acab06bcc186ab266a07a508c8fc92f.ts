import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0x4db7f85fc602e994e4043b98abecfeda8acab06bcc186ab266a07a508c8fc92f`,
  name: `Deposit USDC.e to buy YT-scUSD`,
  description: `YT-scUSD enables investors to farm leveraged scUSD yield.

In exchange, YT-scUSD holders forgo their points exposure.`,
  is_verified: true,
  native_yield: [
    {
      token_id: "146-0xd2901d474b351bc6ee7b119f9c920863b0f781b2",
      label: "YT-scUSD",
      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        let annual_change_ratio = 0;

        const yt_address = "0xd2901D474b351bC6eE7b119f9c920863B0F781b2";
        const pt_address = "0x11d686EF994648Ead6180c722F122169058389ee";

        try {
          const yt_supply = await chainClient.readContract({
            address: yt_address,
            abi: [
              {
                inputs: [],
                name: "totalSupply",
                outputs: [
                  { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
              },
            ],
            functionName: "totalSupply",
            args: [],
          });

          const yt_price = await chainClient.readContract({
            address: yt_address,
            abi: [
              {
                inputs: [],
                name: "getNavPerShare",
                outputs: [
                  { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
              },
            ],
            functionName: "getNavPerShare",
            args: [],
          });

          const yt_market_cap =
            (Number(yt_supply ?? 0) * Number(yt_price ?? 0)) / 10 ** 36;

          const pt_supply = await chainClient.readContract({
            address: pt_address,
            abi: [
              {
                inputs: [],
                name: "totalSupply",
                outputs: [
                  { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
              },
            ],
            functionName: "totalSupply",
            args: [],
          });

          const pt_price = await chainClient.readContract({
            address: pt_address,
            abi: [
              {
                inputs: [],
                name: "nav",
                outputs: [
                  { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
              },
            ],
            functionName: "nav",
            args: [],
          });

          const pt_market_cap =
            (Number(pt_supply ?? 0) * Number(pt_price ?? 0)) / 10 ** 36;

          const vt_funding_fee = (30 * pt_market_cap) / yt_market_cap;

          annual_change_ratio = vt_funding_fee;
          annual_change_ratio /= 100;
        } catch (err) {}

        return annual_change_ratio;
      },
    },
  ],
});
