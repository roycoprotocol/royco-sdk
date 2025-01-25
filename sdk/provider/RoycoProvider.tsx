"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { DefaultOptions } from "@tanstack/react-query";

import type { ReactNode } from "react";

import { RoycoContext } from "./RoycoContext";
import type { TypedRpcApiKeys } from "@/sdk/client";

interface RoycoProviderProps {
  children: ReactNode;
  originUrl: string;
  originKey: string;
  originId: string;
  rpcApiKeys: TypedRpcApiKeys | undefined;
  defaultOptions?: DefaultOptions;
}

const RoycoProvider = ({
  children,
  originUrl,
  originKey,
  originId,
  rpcApiKeys,
  defaultOptions = {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: true,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 60 * 24, // 1 day
    },
  },
}: RoycoProviderProps): React.ReactElement => {
  const value = { originUrl, originKey, originId, rpcApiKeys };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: defaultOptions,
      }),
  );

  return (
    <RoycoContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RoycoContext.Provider>
  );
};

export { RoycoProvider };
export type { RoycoProviderProps };
