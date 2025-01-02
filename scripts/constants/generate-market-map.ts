import fs from "fs";
import path from "path";
import prettier from "prettier";

const projectRoot = process.cwd();

const CHAIN_IDS = [1, 11155111, 8453, 42161, 21000000, 98865];

const generateMarketMap = async () => {
  // Generate maps for each chain ID
  CHAIN_IDS.forEach(async (chainId) => {
    const definitionsDir = path.join(
      projectRoot,
      `sdk/constants/market-map/${chainId}/definitions`,
    );
    const outputFile = path.join(
      projectRoot,
      `sdk/constants/market-map/${chainId}/index.ts`,
    );

    // Create directories if they don't exist
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });

    // Read all files in the definitions directory
    const files = fs.existsSync(definitionsDir)
      ? fs.readdirSync(definitionsDir)
      : [];

    // Generate import statements and map entries
    const imports: string[] = [];
    const mapEntries: string[] = [];

    files.forEach((file) => {
      if (file.endsWith(".ts")) {
        const marketName = file.replace(".ts", "");
        const importName = `market_${marketName.replace(/-/g, "_")}`;

        imports.push(
          `import ${importName} from "./definitions/${marketName}";`,
        );
        mapEntries.push(`  [${importName}.id]: ${importName},`);
      }
    });

    // Format definition files
    if (fs.existsSync(definitionsDir)) {
      const definitionFiles = fs.readdirSync(definitionsDir);
      for (const file of definitionFiles) {
        if (file.endsWith(".ts")) {
          const filePath = path.join(definitionsDir, file);

          try {
            let content = fs.readFileSync(filePath, "utf-8");

            // // Trim whitespace in name and description fields
            // content = content.replace(
            //   /(name|description):\s*"([^"]*?)"\s*,/g,
            //   (match, field, value) => `${field}: "${value.trim()}",`,
            // );

            const formattedContent = await prettier.format(content, {
              parser: "typescript",
              semi: true,
              singleQuote: false,
            });
            fs.writeFileSync(filePath, formattedContent);
          } catch (error) {
            console.warn(
              `Skipping file ${file} due to formatting error:`,
              error.message,
            );
            continue;
          }
        }
      }
    }

    // Generate the file content
    const content = `${imports.join("\n")}\n
export const MarketMap${chainId} = {
${mapEntries.join("\n")}
};
`;

    // Write the file
    fs.writeFileSync(outputFile, content);

    // Format the file using prettier
    const formattedContent = await prettier.format(content, {
      parser: "typescript",
      semi: true,
      singleQuote: false,
    });
    fs.writeFileSync(outputFile, formattedContent);

    console.log(`Market map for chain ${chainId} generated successfully!`);
  });
};

generateMarketMap().catch(console.error);
