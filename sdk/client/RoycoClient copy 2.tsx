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

// Instead of a custom ProxyClient type, we'll use the TypedRoycoClient type
type ProxyMethods = Pick<TypedRoycoClient, "from" | "rpc">;

const createProxyClient = (originId: string): TypedRoycoClient => {
  const makeRequest = async (method: string, path: string, body?: any) => {
    const response = await fetch(`/api/db/${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-royco-api-key": originId,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return response.json();
  };

  return {
    from: (table: string) => ({
      select: (query?: string) => makeRequest("POST", `${table}/select`, query),
      insert: (data: any) => makeRequest("POST", `${table}/insert`, data),
      update: (data: any) => makeRequest("POST", `${table}/update`, data),
      delete: () => makeRequest("DELETE", `${table}/delete`),
      upsert: (data: any) => makeRequest("POST", `${table}/upsert`, data),
      // Add all other methods from PostgrestClient
    }),
    rpc: (fn: string, params?: any) => makeRequest("POST", `rpc/${fn}`, params),
    auth: {
      // Implement auth methods
      getSession: () => makeRequest("GET", "auth/session"),
      getUser: () => makeRequest("GET", "auth/user"),
      // ... other auth methods
    },
    storage: {
      // Implement storage methods
      from: (bucket: string) => ({
        upload: (path: string, data: any) =>
          makeRequest("POST", `storage/${bucket}/upload/${path}`, data),
        download: (path: string) =>
          makeRequest("GET", `storage/${bucket}/download/${path}`),
        // ... other storage methods
      }),
    },
    // ... implement all other SupabaseClient methods
  } as TypedRoycoClient;
};

const useRoycoClient = (): TypedRoycoClient => {
  const { originId } = useContext(RoycoContext);

  // Memoize client creation
  if (!roycoClient) {
    roycoClient = createProxyClient(originId) as TypedRoycoClient;
    typedRoycoClient = roycoClient;
  }

  return roycoClient;
};

const useRpcApiKeys = (): TypedRpcApiKeys | undefined => {
  const { rpcApiKeys } = useContext<{
    originUrl: string;
    originKey: string;
    originId: string;
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
