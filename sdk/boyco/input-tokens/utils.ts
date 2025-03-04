import { writeFile } from "fs/promises";

export type BoycoPosition = {
  id: string;
  raw_market_ref_id: string;
  raw_offer_ref_id: string;
  raw_weiroll_wallet_withdrawn_destination_ref_id: string;
  source_chain_id: string;
  destination_chain_id: string;
  weiroll_wallet: string;
  account_address: string;
  market_id: string;
  reward_style: number;
  token_0_id: string;
  token_0_amount: string;
  token_1_ids: string[];
  token_1_amounts: string[];
  receipt_token_id: string;
  receipt_token_amount: string;
  unlock_timestamp: string;
  ccdm_nonce: string;
  deposit_leaf: string;
  merkle_deposit_nonce: string;
  amount_deposited: string;
  total_amount_bridged: string;
  deposit_transaction_hash: string;
  bridge_transaction_hash: string;
  process_transaction_hash: string;
  execute_transaction_hash: string;
  merkle_proof: string[];
};

export const createJsonFile = async (data: any, filePath: string) => {
  try {
    // await writeFile(filePath, data, "utf-8");
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`\nSuccessfully wrote data to ${filePath}`);
  } catch (error) {
    console.error(`\nError writing to ${filePath}:`, error);
    throw error;
  }
};
