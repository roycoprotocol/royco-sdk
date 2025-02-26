import { type BoycoPosition } from "./utils";
import BoycoPositions from "./boyco_positions.json";
import { getSupportedToken, type SupportedToken } from "@/sdk/constants";
import { Address, createPublicClient, erc20Abi, http } from "viem";
import dotenv from "dotenv";
import { getSupportedChain } from "@/sdk/utils";
import fs from "fs";
import path from "path";

dotenv.config();

const RECEIPT_TOKEN_IMAGE = "https://i.postimg.cc/3wDk3zQf/erc20-logo.png";

const lpTokenAbi = [
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
] as const;

const main = async () => {
  const boycoPositions = BoycoPositions as BoycoPosition[];

  let receiptTokenMap = new Map<string, SupportedToken>();

  // let tokenQuotesFound = 0;

  for (let i = 0; i < boycoPositions.length; i++) {
    // if (i >= 1) break;

    const boycoPosition = boycoPositions[i];

    if (!boycoPosition) continue;

    const inputTokenId = boycoPosition.token_0_id;
    const inputToken = getSupportedToken(inputTokenId);

    if (!inputToken) continue;

    const receipTokenId = boycoPosition.receipt_token_id;

    const receiptToken: SupportedToken = {
      id: receipTokenId,
      chain_id: Number(boycoPosition.destination_chain_id),
      contract_address: boycoPosition.receipt_token_id.split("-")[1] ?? "",
      name: "",
      symbol: "",
      image: RECEIPT_TOKEN_IMAGE,
      decimals: 0,
      source: "enso",
      search_id: receipTokenId,
      type: "token",
    };

    const storedReceiptToken = receiptTokenMap.get(receiptToken.id);

    if (!storedReceiptToken) {
      receiptTokenMap.set(receiptToken.id, receiptToken);
    }

    // if (storedReceiptToken) {
    //   // if (!isEqual(storedReceiptToken, receiptToken)) {
    //   //   console.log(`Found different token data for ${receiptToken.id}:`, {
    //   //     stored: storedReceiptToken,
    //   //     new: receiptToken,
    //   //   });
    //   // }
    // } else {
    //   try {
    //     const receiptTokenQuote = await fetch(
    //       `https://api.enso.finance/api/v1/prices/${receipTokenId.split("-")[0]}/${receipTokenId.split("-")[1]}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${process.env.ENSO_API_KEY}`,
    //         },
    //       },
    //     );

    //     const receiptTokenQuoteData = await receiptTokenQuote.json();

    //     console.log(
    //       `\n\n Token quote found for ${receiptToken.id}:`,
    //       JSON.stringify(receiptTokenQuoteData, null, 2),
    //     );

    //     tokenQuotesFound++;
    //   } catch (err) {
    //     console.log(`\n No token quote found for ${receiptToken.id}`);
    //   }

    //   receiptTokenMap.set(receiptToken.id, receiptToken);
    // }

    // receiptTokenMap.set(receiptToken.id, receiptToken);
  }

  // console.log(`\n\n Token quotes found: ${tokenQuotesFound}`);

  let receiptTokens = Array.from(receiptTokenMap.values());

  const contracts = receiptTokens.flatMap((token) => {
    return [
      {
        address: token.contract_address as Address,
        abi: erc20Abi,
        functionName: "name",
      },
      {
        address: token.contract_address as Address,
        abi: erc20Abi,
        functionName: "symbol",
      },
      {
        address: token.contract_address as Address,
        abi: erc20Abi,
        functionName: "decimals",
      },
      {
        address: token.contract_address as Address,
        abi: lpTokenAbi,
        functionName: "token0",
      },
      {
        address: token.contract_address as Address,
        abi: lpTokenAbi,
        functionName: "token1",
      },
    ];
  });

  const chainClient = createPublicClient({
    chain: getSupportedChain(80094),
    transport: http(process.env.RPC_URL_80094),
    batch: {
      multicall: true,
    },
  });

  const results = await chainClient.multicall({ contracts });

  for (let i = 0; i < results.length; i += 5) {
    const name = results[i]?.result;
    const symbol = results[i + 1]?.result;
    const decimals = results[i + 2]?.result;
    const token0 =
      results[i + 3]?.status === "success" ? results[i + 3]?.result : null;
    const token1 =
      results[i + 4]?.status === "success" ? results[i + 4]?.result : null;

    const receiptTokenIndex = i / 5;

    let receiptToken = receiptTokens[receiptTokenIndex];

    if (!receiptToken) continue;

    // base properties
    receiptToken.name = name as string;
    receiptToken.symbol = symbol as string;
    receiptToken.decimals = Number(decimals);

    // // lp token
    // if (!!token0 && !!token1) {
    //   receiptToken.type = "lp";

    //   receiptToken["token0"] =
    //     `${receiptToken.chain_id}-${token0.toString().toLowerCase()}` as string;
    //   receiptToken["token1"] =
    //     `${receiptToken.chain_id}-${token1.toString().toLowerCase()}` as string;
    // }

    receiptTokens[receiptTokenIndex] = receiptToken;
  }

  console.log("receiptTokens", receiptTokens);

  // const dataDir = "./sdk/boyco/receipt-tokens/data";
  const dataDir = "./sdk/constants/token-map/80094/definitions";

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  receiptTokens.forEach((token) => {
    const fileName = `${token.id}.ts`;
    const filePath = path.join(dataDir, fileName);

    const fileContent = `import { defineToken } from "@/sdk/constants";

export default defineToken({
  id: "${token.id}",
  chain_id: ${token.chain_id},
  contract_address: "${token.contract_address}",
  name: "${token.name}",
  symbol: "${token.symbol}",
  image: "${token.image}",
  decimals: ${token.decimals},
  source: "${token.source}",
  search_id: "${token.search_id}",
  type: "${token.type}",
});
`;

    fs.writeFileSync(filePath, fileContent);
    console.log(`Created file: ${fileName}`);
  });

  console.log(
    `\nCreated ${receiptTokens.length} token definition files in ${dataDir}`,
  );
};

main().catch(console.error);
