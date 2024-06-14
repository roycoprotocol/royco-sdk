"use client";

import type { ReactNode } from "react";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { QueryClientConfig, DefaultOptions } from "@tanstack/react-query";

import { RoycoContext } from "./RoycoContext";

interface RoycoProviderProps {
  children: ReactNode;
  roycoUrl: string;
  roycoKey: string;
  defaultOptions?: DefaultOptions;
}

const RoycoProvider = ({
  children,
  roycoUrl,
  roycoKey,
  defaultOptions = {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      refetchIntervalInBackground: true,
    },
  },
}: RoycoProviderProps): React.ReactElement => {
  const value = { roycoUrl, roycoKey };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: defaultOptions,
      })
  );

  return (
    <RoycoContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RoycoContext.Provider>
  );
};

export { RoycoProvider };
export type { RoycoProviderProps };
