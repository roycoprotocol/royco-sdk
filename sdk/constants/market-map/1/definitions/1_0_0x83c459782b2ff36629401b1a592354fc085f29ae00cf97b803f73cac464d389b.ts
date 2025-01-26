import { defineMarket, getSupportedToken } from "@/sdk/constants";

export default defineMarket({
  id: "1_0_0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b",
  name: "Swap USDC to stkGHO for 1 mo",
  description: `Swap USDC for GHO on Balancer V2, receiving a minimum of .999 GHO per USDC, then stake the GHO for stkGHO and lock for 1 month. \n\nCommunity Note: Assets withdrawn are stkGHO and GHO and AAVE. Withdrawn assets have a cooldown period of 20 days, and may be unstaked at: (https://app.aave.com/staking/).`,
  is_verified: true,
  native_yield: [
    {
      token_id: "1-0x1a88df1cfe15af22b3c4c783d4e6f7f9e0c1885d",
      label: "Native Vault Incentives",
      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        let annual_change_ratio = 0;

        try {
          const stkgho_res = await fetch(
            "https://apps.aavechan.com/api/merit/aprs",
          );

          const stkgho_data = await stkgho_res.json();

          annual_change_ratio =
            (Number(stkgho_data.currentAPR.actionsAPR["ethereum-stkgho"]) ??
              0) / 100;
        } catch (error) {
          console.error(error);
        }

        return annual_change_ratio;
      },
    },
    {
      token_id: "1-0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
      label: "Aave Merit Rewards Incentives",
      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        let annual_change_ratio = 0;

        try {
          const aaveGhoContract = "0xb12e82DF057BF16ecFa89D7D089dc7E5C1Dc057B";
          const aaveGhoStakedAsset =
            "0x1a88Df1cFe15Af22B3c4c783D4e6F7F9e0C1885d";
          const aaveGhoOracle = "0x3f12643d3f6f874d39c2a4c9f2cd6f2dbac877fc";

          const aave_data = await chainClient.readContract({
            address: aaveGhoContract,
            abi: [
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "stakedAsset",
                    type: "address",
                  },
                  { internalType: "address", name: "oracle", type: "address" },
                ],
                name: "getStakedAssetData",
                outputs: [
                  {
                    components: [
                      {
                        internalType: "uint256",
                        name: "stakedTokenTotalSupply",
                        type: "uint256",
                      },
                      {
                        internalType: "uint256",
                        name: "stakedTokenTotalRedeemableAmount",
                        type: "uint256",
                      },
                      {
                        internalType: "uint256",
                        name: "stakeCooldownSeconds",
                        type: "uint256",
                      },
                      {
                        internalType: "uint256",
                        name: "stakeUnstakeWindow",
                        type: "uint256",
                      },
                      {
                        internalType: "uint256",
                        name: "stakedTokenPriceUsd",
                        type: "uint256",
                      },
                      {
                        internalType: "uint256",
                        name: "rewardTokenPriceUsd",
                        type: "uint256",
                      },
                      {
                        internalType: "uint256",
                        name: "stakeApy",
                        type: "uint256",
                      },
                      {
                        internalType: "uint128",
                        name: "distributionPerSecond",
                        type: "uint128",
                      },
                      {
                        internalType: "bool",
                        name: "inPostSlashingPeriod",
                        type: "bool",
                      },
                      {
                        internalType: "uint256",
                        name: "distributionEnd",
                        type: "uint256",
                      },
                      {
                        internalType: "uint256",
                        name: "maxSlashablePercentage",
                        type: "uint256",
                      },
                    ],
                    internalType:
                      "struct IStakedTokenDataProvider.StakedTokenData",
                    name: "",
                    type: "tuple",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
            ],
            functionName: "getStakedAssetData",
            args: [aaveGhoStakedAsset, aaveGhoOracle],
          });

          annual_change_ratio = Number(aave_data.stakeApy ?? 0) / (100 * 100);
        } catch (error) {
          console.error(error);
        }

        return annual_change_ratio;
      },
    },
  ],
});
