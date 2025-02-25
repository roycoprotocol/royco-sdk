import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0x74634bc836c8c44e39b87ae656db006d36a6d4e3d618eabb2fabf668960168cf`,
  name: `Deposit wS to buy PT-wOS`,
  description: `PT-wOS enables investors to farm Sonic points, Gems, and Stable Jack Discount Tickets with leverage while maintaining long wOS exposure. In exchange, PT-wOS holders pay a certain fee to YT-wOS holders.`,
  is_verified: true,

  // @dev: Not sure what to add as token_id since discount tickets are not tokens, they are points
  // @note: You need to create a fake token with a random address and PR that into the SDK
  // because even though it's a point, it's need to be represented somehow in the UI
  // so that the UI can display it -- see this below for example of "Gems Boost"
  external_incentives: [
    {
      token_id: "146-0x3d10814c737b98de96f5010063ad4eb13d9c188e",
      label: "Gems Boost",
      value: async ({ roycoClient, chainClient }) => {
        return "420";
      },
    },
    {
      token_id: "not_sure_what_to_add_here",
      label: "Discount Tickets",
      value: async ({ roycoClient, chainClient }) => {
        let value = "DT Multiplier";
        const treasury = "0x56B9681B78Cc43E564E14Ba215AA62F9370d3A59";
        const pt_address = "0xbe1B1dd422d94f9c1784FB9356ef83A29E1A8cFa";
        const groupId =
          "0x61a61dfb0b4db8aac20724c4a07f5b0324dfcad0544a9bff19dc5ae50ae83b6b";

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
      token_id: "not_sure_what_to_add_here",
      label: "Sonic Points",
      value: async ({ roycoClient, chainClient }) => {
        let value = "Sonic Points Multiplier";
        const treasury = "0x56B9681B78Cc43E564E14Ba215AA62F9370d3A59";
        const pt_address = "0xbe1B1dd422d94f9c1784FB9356ef83A29E1A8cFa";
        const groupId =
          "0x61a61dfb0b4db8aac20724c4a07f5b0324dfcad0544a9bff19dc5ae50ae83b6b";

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
          const result = 8 * (tvl / pt_market_cap);
          value = result.toFixed() + "x Sonic Points";
        } catch (error) {}
        return value;
      },
    },
  ],
});
