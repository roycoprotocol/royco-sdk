import { BerachainTestnet, BerachainMainnet } from "@/sdk/constants";
import { ContractAbisBoyco } from "../abis";
import { ContractAddressesBoyco } from "../contract-addresses";

export const ContractMapBoyco = {
  [BerachainTestnet.id]: {
    DepositExecutor: {
      address: ContractAddressesBoyco[BerachainTestnet.id]!.DepositExecutor,
      abi: ContractAbisBoyco.DepositExecutor,
    },
  },
  [BerachainMainnet.id]: {
    DepositExecutor: {
      address: ContractAddressesBoyco[BerachainMainnet.id]!.DepositExecutor,
      abi: ContractAbisBoyco.DepositExecutor,
    },
  },
};
