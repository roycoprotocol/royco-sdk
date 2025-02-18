import { ethers } from "ethers";

export const computeDepositLeaf = ({
  merkleDepositNonce,
  depositor,
  amountDeposited,
}: {
  merkleDepositNonce: number;
  depositor: string;
  amountDeposited: string;
}) => {
  return ethers.solidityPackedKeccak256(
    ["uint256", "address", "uint256"],
    [merkleDepositNonce, depositor, amountDeposited],
  );
};
