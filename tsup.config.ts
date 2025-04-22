import { defineConfig } from "tsup";

export default defineConfig({
  minify: true,
  sourcemap: false,
  treeshake: true,
  splitting: true,
  clean: true,
  outDir: "dist",
  entry: [
    "sdk/index.tsx",
    "sdk/client/index.tsx",
    "sdk/constants/index.ts",
    "sdk/contracts/index.ts",
    "sdk/hooks/index.tsx",
    "sdk/market/index.tsx",
    "sdk/provider/index.tsx",
    "sdk/queries/index.tsx",
    "sdk/types/index.tsx",
    "sdk/utils/index.tsx",
    "sdk/boyco/index.tsx",
    "sdk/sonic/index.tsx",
    "sdk/vault/index.tsx",
    "sdk/transaction/index.ts",
    "sdk/api/index.ts",
  ],
  format: ["cjs", "esm"],
  dts: true,
  external: [
    "react",
    "@wagmi/core",
    "wagmi",
    "@tanstack/react-query",
    "@tanstack/react-table",
  ],
  target: "node14",
  noExternal: [],
  platform: "node",
  skipNodeModulesBundle: true,
  esbuildOptions(options) {
    options.chunkNames = "chunks/[name]-[hash]";
    options.treeShaking = true;
    options.minify = true;
  },
});
