import { type BoycoPosition } from "./utils";
import BoycoPositions from "./boyco_positions.json";
import { getSupportedToken, type SupportedToken } from "@/sdk/constants";

const main = async () => {
  const boycoPositions = BoycoPositions as BoycoPosition[];

  let receiptTokenMap = new Map<string, SupportedToken>();

  for (const boycoPosition of boycoPositions) {
    const inputTokenId = boycoPosition.token_0_id;
    const inputToken = getSupportedToken(inputTokenId);

    if (!inputToken) continue;

    const receipTokenId = boycoPosition.receipt_token_id;

    const receiptToken: SupportedToken = {
      id: receipTokenId,
      chain_id: Number(boycoPosition.destination_chain_id),
      contract_address: boycoPosition.receipt_token_id.split("-")[1] ?? "",
      name: inputToken.name,
      symbol: inputToken.symbol,
      image: inputToken.image,
      decimals: inputToken.decimals,
      source: inputToken.source,
      search_id: inputToken.search_id,
      type: "token",
    };

    // const receiptTokenId = boycoPosition.token_1_id;
  }
};

main();
