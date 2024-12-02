"use client";

import type { Database } from "@/sdk/types/data";
import type { RPC_API_KEYS_OBJECT_TYPE } from "@/sdk/types";

import { useContext } from "react";

import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

import { RoycoContext } from "@/sdk/provider";

type TypedRoycoClient = SupabaseClient<Database>;
type RoycoClient = TypedRoycoClient;
type TypedRpcApiKeys = RPC_API_KEYS_OBJECT_TYPE;

let typedRoycoClient: TypedRoycoClient;
let roycoClient: RoycoClient;
let RPC_API_KEYS: TypedRpcApiKeys | undefined;

const useRoycoClient = (): RoycoClient => {
  const { originUrl, originKey } = useContext<{
    originUrl: string;
    originKey: string;
    rpcApiKeys: TypedRpcApiKeys | undefined;
  }>(RoycoContext);

  // RPC_API_KEYS = rpcApiKeys;

  // if (!RPC_API_KEYS && rpcApiKeys) {
  //   RPC_API_KEYS = rpcApiKeys;
  // }

  if (roycoClient) {
    return roycoClient;
  }

  roycoClient = createBrowserClient<Database>(originUrl, originKey);

  typedRoycoClient = roycoClient as TypedRoycoClient;

  return roycoClient;
};

const useRpcApiKeys = (): TypedRpcApiKeys | undefined => {
  const { rpcApiKeys } = useContext<{
    originUrl: string;
    originKey: string;
    rpcApiKeys: TypedRpcApiKeys | undefined;
  }>(RoycoContext);

  if (RPC_API_KEYS) {
    return RPC_API_KEYS;
  }

  RPC_API_KEYS = rpcApiKeys;

  return RPC_API_KEYS;
};

export {
  useRoycoClient,
  useRpcApiKeys,
  roycoClient,
  typedRoycoClient,
  RPC_API_KEYS,
};
export type { RoycoClient, TypedRoycoClient, TypedRpcApiKeys };
