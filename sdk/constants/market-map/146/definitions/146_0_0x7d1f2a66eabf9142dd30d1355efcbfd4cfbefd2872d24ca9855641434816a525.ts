import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0x7d1f2a66eabf9142dd30d1355efcbfd4cfbefd2872d24ca9855641434816a525`,
  name: `Deposit USDC into Rings to Mint and Stake scUSD`,
  description: `When USDC is deposited in the market it is used to mint scUSD, staked and auto-compounds while collecting points. There is a 5-day redemption period for withdrawals, and the user will receive wstkscusd.`,
  is_verified: true,
  external_incentives: [
    {
      token_id: "146-0xaa21e59bf97313b3b3850e9f878ffffc733a946a",
      label: "Sonic Points",
      value: async ({ roycoClient, chainClient }) => {
        let value = "Sonic Points Multiplier";
        const treasury = "0xe445AcA5617aFe568768fa4a4b32FAeFFeCCd1f9";
        const pt_address = "0x11d686EF994648Ead6180c722F122169058389ee";
        const groupId =
          "0x420cc9bba4d8272827369197f793a73261d17e108aeeb3f14541bb3d44d0c3f1";

        try {
          const tvl_supply = await chainClient.readContract({
            address: treasury,
            abi: [
              {
                type: "function",
                name: "totalBaseToken",
                inputs: [{ name: "groupId", type: "bytes32" }],
                outputs: [{ name: "", type: "uint256" }],
                stateMutability: "view",
              },
            ],
            functionName: "totalBaseToken",
            args: [groupId],
          });

          const tvl_price = await chainClient.readContract({
            address: treasury,
            abi: [
              {
                type: "function",
                name: "currentBaseTokenPrice",
                inputs: [{ name: "groupId", type: "bytes32" }],
                outputs: [{ name: "", type: "uint256" }],
                stateMutability: "view",
              },
            ],
            functionName: "currentBaseTokenPrice",
            args: [groupId],
          });

          const tvl =
            (Number(tvl_supply ?? 0) * Number(tvl_price ?? 0)) / 10 ** 36;

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
          const result = 12 * (tvl / pt_market_cap);
          value = result.toFixed() + "x Sonic Points";
        } catch (error) {}
        return value;
      },
    },
  ],
});
