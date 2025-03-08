import { createClient } from "@supabase/supabase-js";
import PositionsByMarket from "./data/positions-by-market.json";
import { PositionByMarket } from "./types";
import { Database } from "@/sdk/types/data";

import dotenv from "dotenv";

dotenv.config();

const main = async () => {
  const positionsByMarket = Object.values(
    PositionsByMarket,
  ) as PositionByMarket[];

  const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  let rows: {
    id: string;
    locked_quantity: string;
    locked_quantity_usd: number;
  }[] = [];

  for (let i = 0; i < positionsByMarket.length; i++) {
    const position = positionsByMarket[i];

    if (!position) continue;

    const lockedQuantity = position.inputRawAmount;
    const lockedQuantityUsd = position.inputTokenAmountUSD;

    rows.push({
      id: position.marketId,
      locked_quantity: lockedQuantity,
      locked_quantity_usd: lockedQuantityUsd,
    });
  }

  await supabase.from("boyco_static").upsert(rows);
};

main();
