"use client";

import { useState } from "react";

/**
 * @TODO Fix the error of type not being found
 */
// @ts-ignore
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * @TODO Fix the error of type not being found
 */
// @ts-ignore
import type { DefaultOptions } from "@tanstack/react-query";

import type { ReactNode } from "react";

import { RoycoContext } from "./RoycoContext";
import type { TypedRpcApiKeys } from "@/sdk/client";

interface RoycoProviderProps {
  children: ReactNode;
  originUrl: string;
  originKey: string;
  rpcApiKeys: TypedRpcApiKeys | undefined;
  defaultOptions?: DefaultOptions;
}

const RoycoProvider = ({
  children,
  originUrl,
  originKey,
  rpcApiKeys,
  defaultOptions = {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      refetchIntervalInBackground: true,
      refetchOnReconnect: true,
    },
  },
}: RoycoProviderProps): React.ReactElement => {
  const value = { originUrl, originKey, rpcApiKeys };

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
