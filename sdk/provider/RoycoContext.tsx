"use client";

import { createContext } from "react";
import type { TypedRpcApiKeys } from "@/sdk/client";

const RoycoContext = createContext({
  originUrl: "",
  originKey: "",
  rpcApiKeys: undefined,
} as {
  originUrl: string;
  originKey: string;
  rpcApiKeys: TypedRpcApiKeys | undefined;
});

export { RoycoContext };
