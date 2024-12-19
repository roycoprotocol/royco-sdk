"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { DefaultOptions } from "@tanstack/react-query";

import type { ReactNode } from "react";

import { RoycoContext } from "./RoycoContext";
import type { TypedRpcApiKeys } from "@/sdk/client";
import {
  cookieStorage,
  createConfig,
  createStorage,
  WagmiProvider,
} from "wagmi";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";

interface RoycoProviderProps {
  children: ReactNode;
  originUrl: string;
  originKey: string;
  originId: string;
  rpcApiKeys: TypedRpcApiKeys | undefined;
  defaultOptions?: DefaultOptions;
}

import {
  mainnet,
  sepolia,
  arbitrum,
  arbitrumSepolia,
  baseSepolia,
  base,
} from "wagmi/chains";

// Create wagmiConfig
const chains = [
  mainnet,
  arbitrum,
  base,
  sepolia,
  arbitrumSepolia,
  baseSepolia,
] as const;

const projectId = "1ce2b86020b67f63d71494567a750347";

export const metadata = {
  name: "Royco",
  description:
    "Royco is a marketplace for exclusive incentives from the best projects.",
  // url: "http://localhost:3000", // origin must match your domain & subdomain
  url: "https://royco.org", // origin must match your domain & subdomain
  icons: ["/icon.png"],
};

export const wagmiConfig = getDefaultConfig({
  appName: "Royco",
  projectId,
  chains,
  ssr: true,
  // storage: createStorage({
  //   storage:
  //     typeof window !== "undefined" ? window.localStorage : cookieStorage,
  // }),
  batch: {
    multicall: true,
  },
});

const RoycoProvider = ({
  children,
  originUrl,
  originKey,
  originId,
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
  const value = { originUrl, originKey, originId, rpcApiKeys };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: defaultOptions,
      }),
  );

  return (
    <RoycoContext.Provider value={value}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </RoycoContext.Provider>
  );
};

export { RoycoProvider };
export type { RoycoProviderProps };
