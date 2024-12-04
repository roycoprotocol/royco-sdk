import { TokenMap1 } from "./1";
import { TokenMap42161 } from "./42161";
import { TokenMap421614 } from "./421614";
import { TokenMap11155111 } from "./11155111";
import { TokenMap8453 } from "./8453";
import { TokenMap84532 } from "./84532";

import { NULL_ADDRESS } from "../market-utils";
import type { SupportedToken } from "./utils";

export {
  TokenMap1,
  TokenMap42161,
  TokenMap421614,
  TokenMap11155111,
  TokenMap8453,
  TokenMap84532,
};

export const SupportedTokenMap = {
  ...TokenMap1,
  ...TokenMap42161,
  ...TokenMap421614,
  ...TokenMap11155111,
  ...TokenMap8453,
  ...TokenMap84532,
} as Record<string, SupportedToken>;

export const SupportedTokenList = Object.values(SupportedTokenMap);

export const UnknownToken: SupportedToken = {
  id: `0-${NULL_ADDRESS}`,
  chain_id: 0,
  contract_address: NULL_ADDRESS,
  name: "Unknown",
  symbol: "N/D",
  image: "https://chainlist.org/unknown-logo.png",
  decimals: 18,
  source: "external",
  search_id: "unknown",
  type: "token",
};

export const getSupportedToken = (
  key: string | null | undefined,
): SupportedToken => {
  if (!key) {
    return UnknownToken;
  }

  const [chain_id, contract_address] = key.split("-");

  if (!chain_id || !contract_address) {
    return UnknownToken;
  }

  const token =
    SupportedTokenMap[`${chain_id}-${contract_address.toLowerCase()}`];

  if (!token) {
    return {
      ...UnknownToken,
      id: `${chain_id}-${contract_address}`,
      chain_id: Number(chain_id),
      contract_address: contract_address,
    };
  }

  return token;
};
