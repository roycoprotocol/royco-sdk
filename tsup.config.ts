import { defineConfig, type Options } from "tsup";

export default defineConfig({
  minify: true, // Minify output
  sourcemap: true, // Generate sourcemaps
  treeshake: true, // Remove unused code
  splitting: true, // Split output into chunks
  clean: true, // Clean output directory before building
  outDir: "dist", // Output directory
  entry: [
    "sdk/index.tsx",
    "sdk/client/index.tsx",
    "sdk/constants/index.tsx",
    "sdk/contracts/index.ts",
    "sdk/hooks/index.tsx",
    "sdk/market/index.tsx",
    "sdk/provider/index.tsx",
    "sdk/queries/index.tsx",
    "sdk/types/index.tsx",
    "sdk/utils/index.tsx",
  ], // Entry point(s)
  format: ["cjs", "esm"], // Output format(s)
  dts: false,
});
