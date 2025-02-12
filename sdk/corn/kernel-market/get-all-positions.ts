import { BigNumber, ethers } from "ethers";
import { RawPositionVault } from "./types";
import { ROYCO_SUBGRAPH_URL } from "./constants";
import { request, gql } from "graphql-request";
import { Abi, Address, createPublicClient, http } from "viem";
import { corn } from "viem/chains";
import { mainnet } from "viem/chains";
import { ContractMap } from "@/sdk/contracts";
import { writeFile } from "fs/promises";

import dotenv from "dotenv";

dotenv.config();

interface QueryResponse {
  rawPositionVaults: RawPositionVault[];
}

const rawPositionVaultsQuery = gql`
  query GetRawPositionVaults($rawMarketRefId: String!) {
    rawPositionVaults(first: 1000, where: { rawMarketRefId: $rawMarketRefId }) {
      id
      chainId
      accountAddress
      marketId
      shares
      token0Id
      token0Amount
      token1Ids
      token1Amounts
      rawMarketRefId {
        id
      }
    }
  }
`;

async function createJsonFile(data: any, filePath: string) {
  try {
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`\nSuccessfully wrote data to ${filePath}`);
  } catch (error) {
    console.error(`\nError writing to ${filePath}:`, error);
    throw error;
  }
}

export const KERNEL_INCENTIVE_TOKEN_ID = `21000000-0x606cf606076d1a74cbea93940742b6a2cf901139`;

export async function getUnclaimedCurrentUserRewards({
  rawPositionVaults,
}: {
  rawPositionVaults: RawPositionVault[];
}) {
  const RPC_URL = process.env.RPC_URL_21000000;

  const client = createPublicClient({
    chain: corn,
    transport: http(RPC_URL),
  });

  try {
    const results = await client.multicall({
      contracts: rawPositionVaults.map((rawPositionVault) => {
        return {
          address: rawPositionVault.marketId as Address,
          abi: ContractMap[21000000].WrappedVault.abi as Abi,
          functionName: "currentUserRewards",
          args: [
            KERNEL_INCENTIVE_TOKEN_ID.split("-")[1] as Address, // incentive token address
            rawPositionVault.accountAddress as Address, // user address
          ],
        };
      }),
    });

    const updatedRawPositionVaults = results.map((result, index) => {
      const token1IdIndex =
        rawPositionVaults[index]?.token1Ids?.indexOf(
          KERNEL_INCENTIVE_TOKEN_ID,
        ) ?? -1;

      let newToken1Ids = rawPositionVaults[index]?.token1Ids ?? [];
      let newToken1Amounts = rawPositionVaults[index]?.token1Amounts ?? [];

      if (token1IdIndex === -1) {
        newToken1Ids.push(KERNEL_INCENTIVE_TOKEN_ID);
        newToken1Amounts.push(BigNumber.from(result.result).toString());
      } else {
        newToken1Amounts[token1IdIndex] = BigNumber.from(
          newToken1Amounts[token1IdIndex],
        )
          .add(BigNumber.from(result.result))
          .toString();
      }

      let newToken1Index = newToken1Ids.indexOf(KERNEL_INCENTIVE_TOKEN_ID);

      let token1Id = newToken1Ids[newToken1Index] ?? "";
      let token1Amount = newToken1Amounts[newToken1Index] ?? "0";

      return {
        ...rawPositionVaults[index],
        token1Ids: [token1Id],
        token1Amounts: [token1Amount],
      };
    });

    return updatedRawPositionVaults;
  } catch (error) {
    console.error("Error fetching unclaimed current user rewards:", error);
    throw error;
  }
}

export async function getAllRawPositionVaults({ id }: { id: string }) {
  const pageSize = 1000;
  let allRawPositionVaults: RawPositionVault[] = [];
  let hasMore = true;
  let skip = 0;

  try {
    while (hasMore) {
      console.log(`Current page being fetched: ${skip / pageSize + 1}`);

      const response = await request<QueryResponse>(
        ROYCO_SUBGRAPH_URL,
        rawPositionVaultsQuery,
        {
          first: pageSize,
          skip,
          rawMarketRefId:
            "21000000_1_0x91e59126365118a2bfe13560a3a575c6d42bf59f",
        },
      );

      const rawPositionVaults = response.rawPositionVaults;
      allRawPositionVaults = [...allRawPositionVaults, ...rawPositionVaults];

      if (rawPositionVaults.length < pageSize) {
        hasMore = false;
      } else {
        skip += pageSize;
      }

      console.log(
        `Fetched ${rawPositionVaults.length} positions. Total so far: ${allRawPositionVaults.length} positions.`,
      );
    }

    return allRawPositionVaults;
  } catch (error) {
    console.error("Error fetching positions:", error);
    throw error;
  }
}

async function main() {
  try {
    const rawPositionVaults = await getAllRawPositionVaults({
      id: "21000000_1_0x91e59126365118a2bfe13560a3a575c6d42bf59f",
    });

    const updatedRawPositionVaults = await getUnclaimedCurrentUserRewards({
      rawPositionVaults,
    });

    const nonZeroPositionVaults = updatedRawPositionVaults.filter(
      (positionVault) => {
        return positionVault.token1Amounts[0] !== "0";
      },
    );

    const refinedPositionVaults = nonZeroPositionVaults.map((positionVault) => {
      return {
        id: positionVault.id,
        rawMarketRefId: positionVault.rawMarketRefId?.id ?? "",
        chainId: positionVault.chainId,
        accountAddress: positionVault.accountAddress,
        marketId: positionVault.marketId,
        incentiveTokenId: positionVault.token1Ids[0],
        incentiveTokenRawAmount: positionVault.token1Amounts[0],
        incentiveTokenDecimalAmount: ethers.utils.formatUnits(
          positionVault.token1Amounts[0],
          18,
        ),
      };
    });

    // Write JSON
    await createJsonFile(
      refinedPositionVaults,
      "./sdk/corn/kernel-market/data/kernel-market-positions.json",
    );
  } catch (error) {
    console.error("Error fetching raw position vaults:", error);
    throw error;
  }
}

main();
