import { defineConfig, type Options } from "tsup";

export default defineConfig({
  dts: true, // Generate .d.ts files
  minify: true, // Minify output
  sourcemap: true, // Generate sourcemaps
  treeshake: true, // Remove unused code
  splitting: true, // Split output into chunks
  clean: true, // Clean output directory before building
  outDir: "dist", // Output directory
  entry: [
    "sdk/index.tsx",
    "sdk/provider/index.tsx",
    "sdk/client/index.tsx",
    "sdk/utils/index.tsx",
    "sdk/types/index.tsx",
    "sdk/queries/index.tsx",
  ], // Entry point(s)
  format: ["cjs", "esm"], // Output format(s)
});
