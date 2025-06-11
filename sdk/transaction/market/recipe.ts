import { AddressMap, AbiMap } from "@/sdk/constants";
import { type Address, type Abi } from "viem";
import { type EnrichedTxOption } from "@/sdk/transaction/types";

export const manualExecuteWeirollTxOptions = ({
  rawMarketRefId,
  chainId,
  weirollWallet,
}: {
  rawMarketRefId?: string;
  chainId: number;
  weirollWallet: string;
}): EnrichedTxOption[] => {
  if (
    rawMarketRefId ===
    "98866_0_0xa1d68accf80e16047bf8c609e9da79a7ad75576d7fec71f490d73ff1f7d1eee7"
  ) {
    const weirollWalletAbi = AbiMap.get("WeirollWallet");

    return [
      {
        id: `${chainId}_${weirollWallet}_input_token_complete`,
        chainId,
        contractId: "WeirollWallet",
        label: "Recover Funds",
        category: "withdraw",
        address: weirollWallet as Address,
        abi: weirollWalletAbi as Abi,
        functionName: "manualExecuteWeiroll",
        args: [
          [
            "0x8da5cb5b02ffffffffffff0007899ac8be7462151d6515fcd4773dd9267c9911",
            "0xb65d95ec02ffffffffffff0107899ac8be7462151d6515fcd4773dd9267c9911",
            "0x70a082310201ffffffffff01fc3bd0e01b4e755aedd2a4087ccdb90c4d28f038",
            "0xa9059cbb010001fffffffffffc3bd0e01b4e755aedd2a4087ccdb90c4d28f038",
          ],
          ["0x", "0x"],
        ],
        txStatus: "idle",
      },
    ];
  }

  return [];
};

export const withdrawRecipeInputTokenTxOptions = ({
  rawMarketRefId,
  chainId,
  weirollWallet,
}: {
  rawMarketRefId?: string;
  chainId: number;
  weirollWallet: string;
}): EnrichedTxOption[] => {
  const address = AddressMap.get(`${chainId}_RecipeMarketHub`);
  const abi = AbiMap.get("RecipeMarketHub");

  let recoverFundsTxOptions: EnrichedTxOption[] = [];

  if (rawMarketRefId) {
    recoverFundsTxOptions = manualExecuteWeirollTxOptions({
      rawMarketRefId,
      chainId,
      weirollWallet,
    });
  }

  return [
    {
      id: `${chainId}_${weirollWallet}_input_token`,
      chainId,
      contractId: "RecipeMarketHub",
      label: "Withdraw Deposit",
      category: "withdraw",
      address: address as Address,
      abi: abi as Abi,
      functionName: "executeWithdrawalScript",
      args: [weirollWallet],
      txStatus: "idle",
    },
    ...recoverFundsTxOptions,
  ];
};

export const claimRecipeIncentiveTokenTxOptions = ({
  chainId,
  tokenAddress,
  weirollWallet,
  accountAddress,
}: {
  chainId: number;
  tokenAddress: string;
  weirollWallet: string;
  accountAddress: string;
}): EnrichedTxOption[] => {
  const address = AddressMap.get(`${chainId}_RecipeMarketHub`);
  const abi = AbiMap.get("RecipeMarketHub");

  return [
    {
      id: `${chainId}_${weirollWallet}_${tokenAddress}_incentive_token`,
      chainId,
      contractId: "RecipeMarketHub",
      label: "Claim Incentive",
      category: "claim",
      address: address as Address,
      abi: abi as Abi,
      functionName: "claim",
      args: [weirollWallet, tokenAddress, accountAddress],
      txStatus: "idle",
    },
  ];
};

export const forfeitRecipePositionTxOptions = ({
  rawMarketRefId,
  chainId,
  weirollWallet,
}: {
  rawMarketRefId?: string;
  chainId: number;
  weirollWallet: string;
}): EnrichedTxOption[] => {
  const address = AddressMap.get(`${chainId}_RecipeMarketHub`);
  const abi = AbiMap.get("RecipeMarketHub");

  let recoverFundsTxOptions: EnrichedTxOption[] = [];

  if (rawMarketRefId) {
    recoverFundsTxOptions = manualExecuteWeirollTxOptions({
      rawMarketRefId,
      chainId,
      weirollWallet,
    });
  }

  return [
    {
      id: `${chainId}_${weirollWallet}_forfeit`,
      chainId,
      contractId: "RecipeMarketHub",
      label: "Forfeit Position",
      category: "forfeit",
      address: address as Address,
      abi: abi as Abi,
      functionName: "forfeit",
      args: [weirollWallet, true],
      txStatus: "idle",
    },
    ...recoverFundsTxOptions,
  ];
};

export const withdrawBoycoReceiptTokenTxOptions = ({
  weirollWallet,
  merkleDepositNonce,
  amountDeposited,
  merkleProof,
}: {
  weirollWallet: string;
  merkleDepositNonce: string;
  amountDeposited: string;
  merkleProof: string[];
}): EnrichedTxOption[] => {
  const chainId = 80094;

  const address = AddressMap.get(`${chainId}_DepositExecutor`);
  const abi = AbiMap.get("DepositExecutor");

  return [
    {
      id: `${chainId}_${weirollWallet}_withdraw_receipt_token`,
      chainId,
      contractId: "DepositExecutor",
      label: "Withdraw Receipt Tokens",
      category: "withdraw",
      address: address as Address,
      abi: abi as Abi,
      functionName: "withdrawMerkleDeposit",
      args: [weirollWallet, merkleDepositNonce, amountDeposited, merkleProof],
      txStatus: "idle",
    },
  ];
};
