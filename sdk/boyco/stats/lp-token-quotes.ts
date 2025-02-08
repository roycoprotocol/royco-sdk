import { mainnet } from "viem/chains";
import { createPublicClient, http, Address } from "viem";
import LpTokens from "./lp-tokens.json";
import BaseTokenQuotes from "./data/base-token-quotes.json";
import { writeFile } from "fs/promises";
import { createObjectCsvWriter } from "csv-writer";

import dotenv from "dotenv";
import { BigNumber, ethers } from "ethers";

dotenv.config();

const lpTokenAbi = [
  {
    inputs: [],
    name: "getReserves",
    outputs: [
      { name: "_reserve0", type: "uint112" },
      { name: "_reserve1", type: "uint112" },
      { name: "_blockTimestampLast", type: "uint32" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token0",
    outputs: [{ type: "address", name: "" }],
    stateMutability: "view",

    type: "function",
  },
  {
    inputs: [],
    name: "token1",
    outputs: [{ type: "address", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ type: "uint8", name: "" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

async function createJsonFile(data: any, filePath: string) {
  try {
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`\nSuccessfully wrote data to ${filePath}`);
  } catch (error) {
    console.error(`\nError writing to ${filePath}:`, error);
    throw error;
  }
}

async function getLpTokenData() {
  const RPC_URL = process.env.ETH_MAINNET_RPC_URL;

  const LP_ADDRESSES = LpTokens.map((token) => token.token_id.split("-")[1]);
  const BLOCK_NUMBER = 21762264n;

  const client = createPublicClient({
    chain: mainnet,
    transport: http(RPC_URL),
  });

  try {
    const results = await client.multicall({
      contracts: LP_ADDRESSES.flatMap((address) => [
        {
          address: address as Address,
          abi: lpTokenAbi,
          functionName: "getReserves",
        },
        {
          address: address as Address,
          abi: lpTokenAbi,
          functionName: "totalSupply",
        },
        {
          address: address as Address,
          abi: lpTokenAbi,
          functionName: "decimals",
        },
        {
          address: address as Address,
          abi: lpTokenAbi,
          functionName: "token0",
        },
        {
          address: address as Address,
          abi: lpTokenAbi,
          functionName: "token1",
        },
      ]),
      blockNumber: BLOCK_NUMBER,
    });

    // Raw LP Token Data
    const lpRawData = LP_ADDRESSES.map((address, index) => {
      const reserves = results[index * 5]?.result;
      const totalSupply = results[index * 5 + 1]?.result;
      const decimals = results[index * 5 + 2]?.result;
      const token0 = results[index * 5 + 3]?.result;
      const token1 = results[index * 5 + 4]?.result;

      return {
        token_id: `1-${address}`,
        address,
        blockNumber: BLOCK_NUMBER.toString(),
        reserve0: reserves
          ? // @ts-ignore
            reserves[0].toString()
          : null,
        reserve1: reserves
          ? // @ts-ignore
            reserves[1].toString()
          : null,
        timestamp: reserves
          ? // @ts-ignore
            reserves[2].toString()
          : null,
        totalSupply: totalSupply ? totalSupply.toString() : null,
        decimals: decimals ? decimals.toString() : null,
        token0: token0 ? token0.toString().toLowerCase() : null,
        token1: token1 ? token1.toString().toLowerCase() : null,
      };
    });

    await createJsonFile(
      lpRawData,
      "./sdk/boyco/stats/data/raw-lp-tokens-data.json",
    );

    // LP Token Quotes
    const lpQuotesData = lpRawData.map((lpToken) => {
      const token0Id = `1-${lpToken.token0}`;
      const token1Id = `1-${lpToken.token1}`;

      const token0Quote = BaseTokenQuotes.find(
        (quote) => quote.token_id === token0Id,
      );
      const token1Quote = BaseTokenQuotes.find(
        (quote) => quote.token_id === token1Id,
      );

      const token0Price = parseFloat(token0Quote?.price ?? "0");
      const token1Price = parseFloat(token1Quote?.price ?? "0");

      const token0Decimals = token0Quote?.decimals ?? 18;
      const token1Decimals = token1Quote?.decimals ?? 18;

      // Convert prices to strings with fixed decimal places to avoid precision issues
      const token0PriceFixed = token0Price.toFixed(token0Decimals);
      const token1PriceFixed = token1Price.toFixed(token1Decimals);

      try {
        const token0Balance = BigNumber.from(lpToken.reserve0);
        const token1Balance = BigNumber.from(lpToken.reserve1);

        // Scale prices to 18 decimal places to avoid precision issues
        const token0PriceScaled = ethers.utils.parseUnits(token0PriceFixed, 18);

        // Scale token1 price to 18 decimal places
        const token1PriceScaled = ethers.utils.parseUnits(token1PriceFixed, 18);

        const token0Value = token0Balance
          .mul(token0PriceScaled)
          .div(BigNumber.from(10).pow(token0Decimals));
        const token1Value = token1Balance
          .mul(token1PriceScaled)
          .div(BigNumber.from(10).pow(token1Decimals));

        const totalValueUSDScaled = token0Value.add(token1Value);

        // Scale down from 18 decimal places to the LP token's decimal places
        const totalValueUSD = parseFloat(
          ethers.utils.formatUnits(totalValueUSDScaled, 18),
        );

        const totalSupply = BigNumber.from(lpToken.totalSupply);

        const pricePerToken = totalSupply.isZero()
          ? 0
          : totalValueUSD /
            parseFloat(ethers.utils.formatUnits(totalSupply, lpToken.decimals));

        return {
          token_id: lpToken.token_id,
          decimals: parseInt(lpToken.decimals ?? "18"),
          source: "lp",
          search_id: lpToken.token_id,
          price: pricePerToken.toString(),
        };
      } catch (error) {
        console.error(`Error processing LP token ${lpToken.token_id}:`, error);
        return {
          token_id: lpToken.token_id,
          decimals: parseInt(lpToken.decimals ?? "18"),
          source: "lp",
          search_id: lpToken.token_id,
          price: "0",
        };
      }
    });

    await createJsonFile(
      lpQuotesData,
      "./sdk/boyco/stats/data/lp-token-quotes.json",
    );

    console.log("Data has been written to lp-tokens-data.json");
  } catch (error) {
    console.error("Error fetching LP data:", error);
  }
}

getLpTokenData();
