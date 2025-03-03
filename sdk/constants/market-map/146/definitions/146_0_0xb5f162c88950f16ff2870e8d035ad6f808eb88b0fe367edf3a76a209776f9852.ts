import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0xb5f162c88950f16ff2870e8d035ad6f808eb88b0fe367edf3a76a209776f9852`,
  name: `Deposit USDC.e to buy PT-scUSD`,
  description: `PT-scUSD enables investors to farm Sonic points, Gems, Rings Points, Veda Points, and Stable Jack Discount Tickets with leverage while maintaining scUSD exposure.

In exchange, PT-scUSD holders pay a certain fee to YT-scUSD holders.`,
  is_verified: true,
  external_incentives: [
    {
      token_id: "146-0x3d10814c737b98de96f5010063ad4eb13d9c188e",
      label: "Gems Boost",
      value: async ({ roycoClient, chainClient }) => {
        return "420";
      },
    },
    {
      token_id: "146-0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db",
      label: "Discount Tickets",
      value: async ({ roycoClient, chainClient }) => {
        let value = "DT Multiplier";
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
          const result = 80 * (tvl / pt_market_cap);
          value = result.toFixed() + "x Discount Tickets";
        } catch (error) {}
        return value;
      },
    },
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
    {
      token_id: "146-0xbb9beb82ebf43d02d3a3f4fd431906d1e39a117d",
      label: "Rings Points",
      value: async ({ roycoClient, chainClient }) => {
        let value = "Rings Points Multiplier";
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
          const result = 48 * (tvl / pt_market_cap);
          value = result.toFixed() + "x Rings Points";
        } catch (error) {}
        return value;
      },
    },
    {
      token_id: "146-0xab8898b840b681cd406aa53ad5d1c167178441c7",
      label: "Veda Points",
      value: async ({ roycoClient, chainClient }) => {
        let value = "Veda Points Multiplier";
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
          const result = tvl / pt_market_cap;
          value = result.toFixed() + "x Veda Points";
        } catch (error) {}
        return value;
      },
    },
  ],
});
