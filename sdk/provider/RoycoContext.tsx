"use client";

import { createContext } from "react";
import type { TypedRpcApiKeys } from "@/sdk/client";

const RoycoContext = createContext({
  originUrl: "",
  originKey: "",
  originId: "",
  rpcApiKeys: undefined,
} as {
  originUrl: string;
  originKey: string;
  originId: string;
  rpcApiKeys: TypedRpcApiKeys | undefined;
});

export { RoycoContext };
