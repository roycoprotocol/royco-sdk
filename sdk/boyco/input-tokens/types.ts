import { type SupportedToken } from "@/sdk/constants";

export interface Market {
  id: string; // rawMarketRefId from Subgraph, <CHAIN_ID>_<MARKET_TYPE>_<MARKET_HASH>
  name: string; // Name of the market
  description: string; // Description of the market
  lockup_time: string; // Lockup time in seconds
  input_token_id: string; // Input token id, <CHAIN_ID>-<TOKEN_ADDRESS>
  input_token_name: string; // Input token name
  input_token_symbol: string; // Input token symbol
  input_token_decimals: number; // Input token decimals
  incentive_token_id: string; // Incentive token id, <CHAIN_ID>-<TOKEN_ADDRESS>
  incentive_token_name: string; // Incentive token name
  incentive_token_symbol: string; // Incentive token symbol
  incentive_token_decimals: number; // Incentive token decimals
}

export interface DestinationMarket {
  vid: string;
  block_range: string;
  id: string;
  source_chain_id: string;
  destination_chain_id: string;
  market_type: number;
  market_id: string;
  unlock_timestamp: string;
  receipt_token_id: string;
  input_token_ids: string[];
  _gs_chain: string;
  _gs_gid: string;
}

export interface MerkleProof {
  market_hash: string;
  merkle_root: string;
  proofs: {
    id: string;
    proof: string[];
  }[];
}
