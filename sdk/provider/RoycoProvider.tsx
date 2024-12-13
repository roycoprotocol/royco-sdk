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

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

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

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage:
      typeof window !== "undefined" ? window.localStorage : cookieStorage,
  }),
  batch: {
    multicall: true,
  },
  // transports: {
  //   [mainnet.id]: http(),
  //   [sepolia.id]: http(
  //     "https://eth-sepolia.g.alchemy.com/v2/1loBE7C025PbFMLCiTAhbG3WrIqH0J1y"
  //   ),
  //   // [sepolia.id]: http(),
  //   [arbitrum.id]: http(),
  //   [arbitrumSepolia.id]: http(),
  // },
  // ...wagmiOptions, // Optional - Override createConfig parameters
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

// "use client";

// import { useState } from "react";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import type { DefaultOptions } from "@tanstack/react-query";

// import type { ReactNode } from "react";

// import { RoycoContext } from "./RoycoContext";
// import type { TypedRpcApiKeys } from "@/sdk/client";

// interface RoycoProviderProps {
//   children: ReactNode;
//   originUrl: string;
//   originKey: string;
//   originId: string;
//   rpcApiKeys: TypedRpcApiKeys | undefined;
//   defaultOptions?: DefaultOptions;
// }

// const RoycoProvider = ({
//   children,
//   originUrl,
//   originKey,
//   originId,
//   rpcApiKeys,
//   defaultOptions = {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: 3,
//       refetchIntervalInBackground: true,
//       refetchOnReconnect: true,
//     },
//   },
// }: RoycoProviderProps): React.ReactElement => {
//   const value = { originUrl, originKey, originId, rpcApiKeys };

//   const [queryClient] = useState(
//     () =>
//       new QueryClient({
//         defaultOptions: defaultOptions,
//       }),
//   );

//   return (
//     <RoycoContext.Provider value={value}>
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     </RoycoContext.Provider>
//   );
// };

// export { RoycoProvider };
// export type { RoycoProviderProps };
