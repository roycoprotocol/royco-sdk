import { createPublicClient, http, erc20Abi } from "viem";
import { ContractMap } from "../contracts";
import { BigNumber } from "ethers";
import { NULL_ADDRESS } from "../constants";
import {
  RoycoMarketRewardStyle,
  RoycoMarketType,
  type TypedRoycoMarketType,
} from "@/sdk/market";
import { type Abi, type Address } from "abitype";
import { getChain } from "../utils";
import { useRpcApiKeys } from "../client";
import { useQuery } from "@tanstack/react-query";

export type ReadMarketDataType = {
  protocol_fee: string;
  frontend_fee: string;
  protocol_fee_recipient: string;
  enter_market_script?: {
    commands: string[];
    state: string[];
  };
  exit_market_script?: {
    commands: string[];
    state: string[];
  };
};

export const useReadMarket = ({
  chain_id,
  market_type,
  market_id,
  enabled = true,
}: {
  chain_id: number;
  market_type: TypedRoycoMarketType;
  market_id: string;
  enabled?: boolean;
}) => {
  const RPC_API_KEYS = useRpcApiKeys();

  const recipeContracts = [
    {
      chainId: chain_id,
      address: ContractMap[chain_id as keyof typeof ContractMap][
        "RecipeMarketHub"
      ].address as Address,
      abi: ContractMap[chain_id as keyof typeof ContractMap]["RecipeMarketHub"]
        .abi as Abi,
      functionName: "marketHashToWeirollMarket",
      args: [market_id],
    },
    {
      chainId: chain_id,
      address: ContractMap[chain_id as keyof typeof ContractMap][
        "RecipeMarketHub"
      ].address as Address,
      abi: ContractMap[chain_id as keyof typeof ContractMap]["RecipeMarketHub"]
        .abi as Abi,
      functionName: "protocolFee",
    },
    {
      chainId: chain_id,
      address: ContractMap[chain_id as keyof typeof ContractMap][
        "RecipeMarketHub"
      ].address as Address,
      abi: ContractMap[chain_id as keyof typeof ContractMap]["RecipeMarketHub"]
        .abi as Abi,
      functionName: "protocolFeeClaimant",
    },
  ];

  const vaultContracts = [
    {
      chainId: chain_id,
      address: market_id as Address,
      abi: ContractMap[chain_id as keyof typeof ContractMap]["WrappedVault"]
        .abi as Abi,
      functionName: "frontendFee",
    },
    {
      chainId: chain_id,
      address:
        ContractMap[chain_id as keyof typeof ContractMap]["WrappedVaultFactory"]
          .address,
      abi: ContractMap[chain_id as keyof typeof ContractMap][
        "WrappedVaultFactory"
      ].abi,
      functionName: "protocolFee",
    },
    {
      chainId: chain_id,
      address:
        ContractMap[chain_id as keyof typeof ContractMap]["WrappedVaultFactory"]
          .address,
      abi: ContractMap[chain_id as keyof typeof ContractMap][
        "WrappedVaultFactory"
      ].abi,
      functionName: "protocolFeeRecipient",
    },
  ];

  const contractsToRead =
    market_type === RoycoMarketType.recipe.id
      ? recipeContracts
      : market_type === RoycoMarketType.vault.id
        ? vaultContracts
        : [];

  let data = {
    protocol_fee: "0",
    frontend_fee: "0",
    protocol_fee_recipient: NULL_ADDRESS,
    enter_market_script: {
      commands: [],
      state: [],
    },
    exit_market_script: {
      commands: [],
      state: [],
    },
    lockup_time: "0",
  };

  const publicClient = createPublicClient({
    batch: {
      multicall: true,
    },
    chain: getChain(chain_id),
    transport: http(RPC_API_KEYS?.[chain_id]),
  });

  const propsReadContracts = useQuery({
    queryKey: ["read-market", chain_id, market_id, market_type],
    queryFn: () =>
      publicClient.multicall({
        // @ts-ignore
        contracts: contractsToRead,
      }),
  });

  // const propsReadContracts = useReadContracts({
  //   // @ts-ignore
  //   contracts: enabled ? contractsToRead : [],
  //   enabled,
  // });

  if (
    enabled &&
    !propsReadContracts.isLoading &&
    !propsReadContracts.isError &&
    !!propsReadContracts.data &&
    Array.isArray(propsReadContracts.data[0]?.result)
  ) {
    try {
      if (market_type === RoycoMarketType.recipe.id) {
        // Read Recipe Market
        const marketData = propsReadContracts.data[0]?.result;

        const [
          marketID,
          inputToken,
          lockupTime,
          frontendFee,
          enterMarket,
          exitMarket,
          rewardStyle,
        ] = marketData as [
          BigNumber,
          string,
          BigNumber,
          BigNumber,
          object,
          object,
          number,
        ];

        // @ts-ignore
        const protocolFee = propsReadContracts.data[1].result as BigNumber;

        // @ts-ignore
        const protocolFeeRecipient = propsReadContracts.data[2]
          .result as Address;

        data = {
          protocol_fee: BigNumber.from(protocolFee).toString(),
          frontend_fee: BigNumber.from(frontendFee).toString(),
          protocol_fee_recipient: protocolFeeRecipient,
          // @ts-ignore
          enter_market_script:
            enterMarket !== null
              ? {
                  // @ts-ignore
                  commands: enterMarket.weirollCommands as string[],
                  // @ts-ignore
                  state: enterMarket.weirollState as string[],
                }
              : {
                  commands: [],
                  state: [],
                },
          // @ts-ignore
          exit_market_script:
            exitMarket !== null
              ? {
                  // @ts-ignore
                  commands: exitMarket.weirollCommands as string[],
                  // @ts-ignore
                  state: exitMarket.weirollState as string[],
                }
              : {
                  commands: [],
                  state: [],
                },
          reward_style:
            rewardStyle === 0
              ? RoycoMarketRewardStyle.upfront.id
              : rewardStyle === 1
                ? RoycoMarketRewardStyle.arrear.id
                : RoycoMarketRewardStyle.forfeitable.id,
          lockup_time: BigNumber.from(lockupTime).toString(),
        };
      } else if (market_type === RoycoMarketType.vault.id) {
        // Read Vault Market

        // @ts-ignore
        const frontendFee = propsReadContracts.data[0].result as BigNumber;
        // @ts-ignore
        const protocolFee = propsReadContracts.data[1].result as BigNumber;
        // @ts-ignore
        const protocolFeeRecipient = propsReadContracts.data[2]
          .result as Address;

        data = {
          protocol_fee: BigNumber.from(protocolFee).toString(),
          frontend_fee: BigNumber.from(frontendFee).toString(),
          protocol_fee_recipient: protocolFeeRecipient,
          enter_market_script: {
            commands: [],
            state: [],
          },
          exit_market_script: {
            commands: [],
            state: [],
          },
          lockup_time: BigNumber.from(0).toString(),
        };
      }
    } catch (error) {
      console.error("useReadMarket error:", error);
      // Return default data on error
      return {
        ...propsReadContracts,
        data,
        error,
      };
    }
  }

  return {
    ...propsReadContracts,
    data,
  };
};
