import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0x2e8fb605f1e044b8a6bc9f0db673b92b6815b5333508e62b85de7e2ff44199a8`,
  name: `Deposit wS to buy YT-stS`,
  description: `YT-stS enables investors to farm leveraged stS yield while maintaining long $stS exposure. 

In exchange, YT-stS holders forgo their points exposure.`,
  is_verified: false,

  // Basically, YT is a yield bearing token, it is ERC4626, so ig it is a native yield?
  // @dev: We are depositing aTokens to YT-stS and this way the price is increasing
  // @dev: These aTokens are just for internal accounting, so displaying them here might not make sense
  // @dev: Hence, using YT as the native yield directly
  native_yield: [
    {
      token_id: "146-0x0fa31f0d5a574f083e0be272a6cf807270352b3f",
      label: "YT-stS",
      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        let annual_change_ratio = 0;

        const treasury = "0x56B9681B78Cc43E564E14Ba215AA62F9370d3A59";
        const yt_address = "0x0fa31f0d5a574F083E0be272a6CF807270352b3f";
        const pt_address = "0xFCA91fEEe65DB34448A83a74f4f8970b5dddfa7c";
        const groupId =
          "0x331e33bebec5fe0378b995e9ef7355a166e1dbd4902181d4e149dec9671a68ee";
        let uApy = 4.9;

        const url = "https://backend-v3.beets-ftm-node.com/graphql";

        const query = {
          query: `{
            stsGetGqlStakedSonicData {
              stakingApr
            }
          }`,
        };

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(query),
          });

          const data = await response.json();

          uApy = data?.data?.stsGetGqlStakedSonicData?.stakingApr * 100;

          // tvl * underlying APY / YT Market Cap * 0.8 + vt funding fee
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

          const vt_funding_fee = (10 * pt_market_cap) / yt_market_cap;

          const basic_yield = ((uApy * tvl) / yt_market_cap) * 0.8;

          annual_change_ratio = basic_yield + vt_funding_fee;
          annual_change_ratio /= 100;
        } catch (err) {}

        return annual_change_ratio;
      },
    },
  ],
});
