import { Database } from "@/sdk/types/data";
import { createClient } from "@supabase/supabase-js";
import BoycoPositions from "./boyco_positions.json";
import { BoycoPosition } from "./utils";

import dotenv from "dotenv";

dotenv.config();

const main = async () => {
  const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const boycoPositions = BoycoPositions as BoycoPosition[];

  const formattedPositions = boycoPositions.map((pos) => ({
    id: pos.id,
    account_address: pos.account_address,
    amount_deposited: pos.amount_deposited,
    bridge_transaction_hash: pos.bridge_transaction_hash,
    ccdm_nonce: pos.ccdm_nonce,
    deposit_leaf: pos.deposit_leaf,
    deposit_transaction_hash: pos.deposit_transaction_hash,
    destination_chain_id: pos.destination_chain_id,
    execute_transaction_hash: pos.execute_transaction_hash,
    market_id: pos.market_id,
    merkle_deposit_nonce: pos.merkle_deposit_nonce,
    merkle_proof: pos.merkle_proof,
    process_transaction_hash: pos.process_transaction_hash,
    raw_market_ref_id: pos.raw_market_ref_id,
    raw_offer_ref_id: pos.raw_offer_ref_id,
    raw_weiroll_wallet_withdrawn_destination_ref_id:
      pos.raw_weiroll_wallet_withdrawn_destination_ref_id,
    receipt_token_amount: pos.receipt_token_amount,
    receipt_token_id: pos.receipt_token_id,
    reward_style: pos.reward_style,
    source_chain_id: pos.source_chain_id,
    token_0_amount: pos.token_0_amount,
    token_0_id: pos.token_0_id,
    token_1_amounts: pos.token_1_amounts,
    token_1_ids: pos.token_1_ids,
    total_amount_bridged: pos.total_amount_bridged,
    unlock_timestamp: pos.unlock_timestamp,
    weiroll_wallet: pos.weiroll_wallet,
  }));

  await supabase.from("boyco_positions").upsert(formattedPositions);
};

main();
