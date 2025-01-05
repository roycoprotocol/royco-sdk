import { Abi, Address, createPublicClient, http } from "viem";
import { ContractMap } from "../contracts";
import { RoycoMarketRewardStyle, TypedRoycoMarketRewardStyle } from "../market";
import { NULL_ADDRESS } from "../constants";
import { TypedRpcApiKeys } from "../client";
import { getSupportedChain } from "../utils";
import { BigNumber } from "ethers";

export type BaseMarketDataType = {
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
  lockup_time: string;
  reward_style: TypedRoycoMarketRewardStyle;
};

export type GetBaseMarketQueryParams = {
  chain_id: number;
  market_type: number;
  market_id: string;
};

export type GetBaseMarketQueryOptionsParams = GetBaseMarketQueryParams & {
  RPC_API_KEYS?: TypedRpcApiKeys;
};

export const getBaseMarketQueryFunction = async ({
  chain_id,
  market_type,
  market_id,
  RPC_API_KEYS,
}: GetBaseMarketQueryOptionsParams) => {
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
    market_type === 0
      ? recipeContracts
      : market_type === 1
        ? vaultContracts
        : [];

  let data: BaseMarketDataType = {
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
    reward_style: RoycoMarketRewardStyle.upfront.id,
  };

  const chainClient = createPublicClient({
    batch: {
      multicall: true,
    },
    chain: getSupportedChain(chain_id),
    transport: http(RPC_API_KEYS?.[chain_id]),
  });

  const contractData = await chainClient.multicall({
    // @ts-ignore
    contracts: contractsToRead,
  });

  if (market_type === 0) {
    const [
      marketID,
      inputToken,
      lockupTime,
      frontendFee,
      enterMarket,
      exitMarket,
      rewardStyle,
    ] = contractData[0]?.result as [
      BigNumber,
      string,
      BigNumber,
      BigNumber,
      object,
      object,
      number,
    ];

    // @ts-ignore
    const protocolFee = contractData[1].result as BigNumber;

    // @ts-ignore
    const protocolFeeRecipient = contractData[2].result as Address;

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
  } else if (market_type === 1) {
    // @ts-ignore
    const frontendFee = contractData[0].result as BigNumber;
    // @ts-ignore
    const protocolFee = contractData[1].result as BigNumber;
    // @ts-ignore
    const protocolFeeRecipient = contractData[2].result as Address;

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
      reward_style: RoycoMarketRewardStyle.upfront.id,
    };
  }

  return data;
};
