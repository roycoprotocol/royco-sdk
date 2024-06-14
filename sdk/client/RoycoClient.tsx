import { useContext } from "react";

import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

import { RoycoContext } from "@/sdk/provider";
import type { Database } from "@/sdk/types/data";

type TypedRoycoClient = SupabaseClient<Database>;
type RoycoClient = TypedRoycoClient;

let typedRoycoClient: TypedRoycoClient;
let roycoClient: RoycoClient;

const useRoycoClient = (): RoycoClient => {
  const { roycoUrl, roycoKey } = useContext<{
    roycoUrl: string;
    roycoKey: string;
  }>(RoycoContext);

  if (roycoClient) {
    return roycoClient;
  }

  roycoClient = createBrowserClient<Database>(roycoUrl, roycoKey);

  typedRoycoClient = roycoClient as TypedRoycoClient;

  return roycoClient;
};

export { useRoycoClient, roycoClient, typedRoycoClient };
export type { RoycoClient, TypedRoycoClient };
