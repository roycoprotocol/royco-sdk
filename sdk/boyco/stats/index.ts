import { request, gql } from "graphql-request";
import Markets from "./markets.json";
import { RawPositionTokenBalanceRecipe } from "./types";
import { ROYCO_SUBGRAPH_URL } from "./constants";
import {
  getPositionsByAccount,
  getPositionsByMarket,
  getPositionsByMarketByAccount,
} from "./transformers";
import { writeFile } from "fs/promises";
import { createObjectCsvWriter } from "csv-writer";

interface QueryResponse {
  rawPositionTokenBalanceRecipes: RawPositionTokenBalanceRecipe[];
}

// GraphQL query
const positionTokenBalancesByMarketQuery = gql`
  query GetPositionTokenBalancesByMarket(
    $first: Int!
    $skip: Int!
    $marketIds: [String!]
  ) {
    rawPositionTokenBalanceRecipes(
      first: $first
      skip: $skip
      where: { rawMarketRefId_: { id_in: $marketIds } }
      orderBy: id
      orderDirection: desc
    ) {
      id
      weirollWallet
      accountAddress
      tokenClass
      tokenId
      tokenAmount
      rawMarketRefId {
        id
      }
    }
  }
`;

export async function getAllPositionTokenBalances(): Promise<
  RawPositionTokenBalanceRecipe[]
> {
  const pageSize = 1000;
  let allPositionTokenBalances: RawPositionTokenBalanceRecipe[] = [];
  let hasMore = true;
  let skip = 0;

  // Load market IDs
  const marketIds = Markets.map((market: { id: string }) => market.id);

  try {
    while (hasMore) {
      console.log(`Current page being fetched: ${skip / pageSize + 1}`);

      const response = await request<QueryResponse>(
        ROYCO_SUBGRAPH_URL,
        positionTokenBalancesByMarketQuery,
        { first: pageSize, skip, marketIds },
      );

      const positionTokenBalances = response.rawPositionTokenBalanceRecipes;
      allPositionTokenBalances = [
        ...allPositionTokenBalances,
        ...positionTokenBalances,
      ];

      // If we got fewer results than pageSize, we've reached the end
      if (positionTokenBalances.length < pageSize) {
        hasMore = false;
      } else {
        skip += pageSize;
      }

      console.log(
        `Fetched ${positionTokenBalances.length} positions. Total so far: ${allPositionTokenBalances.length} positions.`,
      );
    }

    return allPositionTokenBalances;
  } catch (error) {
    console.error("Error fetching position token balances:", error);
    throw error;
  }
}

async function createJsonFile(data: any, filePath: string) {
  try {
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`\nSuccessfully wrote data to ${filePath}`);
  } catch (error) {
    console.error(`\nError writing to ${filePath}:`, error);
    throw error;
  }
}

async function createCsvFile(data: any[], filePath: string, headers: any[]) {
  try {
    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: headers,
    });

    await csvWriter.writeRecords(data);
    console.log(`\nSuccessfully wrote data to ${filePath}`);
  } catch (error) {
    console.error(`\nError writing to ${filePath}:`, error);
    throw error;
  }
}

async function main() {
  try {
    const positionTokenBalances = await getAllPositionTokenBalances();
    console.log(`\nTotal boyco positions: ${positionTokenBalances.length}`);
    console.log("\nSample of raw position data:", positionTokenBalances[0]);

    // Write JSON
    await createJsonFile(
      positionTokenBalances,
      "./sdk/boyco/stats/data/raw-positions.json",
    );

    // Write CSV
    await createCsvFile(
      positionTokenBalances.map((position) => ({
        id: position.id,
        weirollWallet: position.weirollWallet,
        marketId: position.rawMarketRefId.id,
        accountAddress: position.accountAddress,
        tokenClass: position.tokenClass,
        tokenId: position.tokenId,
        tokenAmount: position.tokenAmount,
      })),
      "./sdk/boyco/stats/data/raw-positions.csv",
      [
        {
          id: "id",

          title: "Position ID",
        },
        { id: "weirollWallet", title: "Weiroll Wallet Address" },
        { id: "marketId", title: "Market ID" },
        { id: "accountAddress", title: "Account Address" },
        {
          id: "tokenClass",
          title: "Token Class (0: Input Token, 1: Incentive Token)",
        },
        {
          id: "tokenId",
          title: "Token ID (<CHAIN_ID>_<TOKEN_ADDRESS>)",
        },
        { id: "tokenAmount", title: "Token Amount (in Wei)" },
      ],
    );

    const positionsByMarket = await getPositionsByMarket({
      markets: Markets,
      positionTokenBalances,
    });

    // Write JSON
    await createJsonFile(
      positionsByMarket,
      "./sdk/boyco/stats/data/positions-by-market.json",
    );

    // Write CSV
    await createCsvFile(
      Object.values(positionsByMarket),
      "./sdk/boyco/stats/data/positions-by-market.csv",
      [
        { id: "marketId", title: "Market ID" },

        { id: "name", title: "Market Name" },
        { id: "description", title: "Market Description" },
        { id: "lockup_time", title: "Lockup Time (in seconds)" },
        { id: "inputTokenId", title: "Input Token ID" },
        { id: "inputTokenName", title: "Input Token Name" },
        { id: "inputTokenSymbol", title: "Input Token Symbol" },
        { id: "inputTokenDecimals", title: "Input Token Decimals" },
        { id: "inputRawAmount", title: "Input Raw Amount (in Wei)" },
        { id: "inputTokenAmount", title: "Input Token Amount (in decimals)" },
        { id: "inputTokenAmountUSD", title: "Input Token Amount (in USD)" },
        { id: "incentiveId", title: "Incentive Token ID" },
        { id: "incentiveTokenName", title: "Incentive Token Name" },
        { id: "incentiveTokenSymbol", title: "Incentive Token Symbol" },

        { id: "incentiveTokenDecimals", title: "Incentive Token Decimals" },
        { id: "incentiveRawAmount", title: "Incentive Raw Amount (in Wei)" },
        {
          id: "incentiveTokenAmount",
          title: "Incentive Token Amount (in decimals)",
        },
      ],
    );

    const positionsByAccount = await getPositionsByAccount({
      markets: Markets,
      positionTokenBalances,
    });

    // Write JSON
    await createJsonFile(
      positionsByAccount,
      "./sdk/boyco/stats/data/positions-by-account.json",
    );

    // Write CSV
    await createCsvFile(
      Object.values(positionsByAccount),
      "./sdk/boyco/stats/data/positions-by-account.csv",
      [
        { id: "accountAddress", title: "Account Address" },

        { id: "inputTokenId", title: "Input Token ID" },
        { id: "inputTokenName", title: "Input Token Name" },
        { id: "inputTokenSymbol", title: "Input Token Symbol" },
        { id: "inputTokenDecimals", title: "Input Token Decimals" },
        { id: "inputRawAmount", title: "Input Raw Amount (in Wei)" },
        { id: "inputTokenAmount", title: "Input Token Amount (in decimals)" },
        { id: "inputTokenAmountUSD", title: "Input Token Amount (in USD)" },
        { id: "incentiveId", title: "Incentive Token ID" },
        { id: "incentiveTokenName", title: "Incentive Token Name" },

        { id: "incentiveTokenSymbol", title: "Incentive Token Symbol" },
        { id: "incentiveTokenDecimals", title: "Incentive Token Decimals" },
        { id: "incentiveRawAmount", title: "Incentive Raw Amount (in Wei)" },
        {
          id: "incentiveTokenAmount",
          title: "Incentive Token Amount (in decimals)",
        },
      ],
    );

    const positionsByMarketByAccount = await getPositionsByMarketByAccount({
      markets: Markets,
      positionTokenBalances,
    });

    // Write JSON
    await createJsonFile(
      positionsByMarketByAccount,
      "./sdk/boyco/stats/data/positions-by-market-by-account.json",
    );

    // Write CSV
    await createCsvFile(
      Object.values(positionsByMarketByAccount),
      "./sdk/boyco/stats/data/positions-by-market-by-account.csv",
      [
        { id: "id", title: "ID" },

        { id: "marketId", title: "Market ID" },
        { id: "name", title: "Market Name" },
        { id: "description", title: "Market Description" },
        { id: "lockup_time", title: "Lockup Time (in seconds)" },
        { id: "accountAddress", title: "Account Address" },
        { id: "inputTokenId", title: "Input Token ID" },
        { id: "inputTokenName", title: "Input Token Name" },
        { id: "inputTokenSymbol", title: "Input Token Symbol" },
        { id: "inputTokenDecimals", title: "Input Token Decimals" },
        { id: "inputRawAmount", title: "Input Raw Amount (in Wei)" },
        { id: "inputTokenAmount", title: "Input Token Amount (in decimals)" },
        { id: "inputTokenAmountUSD", title: "Input Token Amount (in USD)" },
        { id: "incentiveId", title: "Incentive Token ID" },
        { id: "incentiveTokenName", title: "Incentive Token Name" },
        { id: "incentiveTokenSymbol", title: "Incentive Token Symbol" },

        { id: "incentiveTokenDecimals", title: "Incentive Token Decimals" },
        { id: "incentiveRawAmount", title: "Incentive Raw Amount (in Wei)" },
        {
          id: "incentiveTokenAmount",
          title: "Incentive Token Amount (in decimals)",
        },
      ],
    );
  } catch (error) {
    console.error("Failed to fetch position token balances:", error);
  }
}

// Uncomment to run the example
main();
