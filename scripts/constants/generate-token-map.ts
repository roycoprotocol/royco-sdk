import fs from "fs";
import path from "path";
import prettier from "prettier";

const projectRoot = process.cwd();

const CHAIN_IDS = [1, 11155111, 8453, 42161, 21000000, 98865];

const generateTokenMap = async () => {
  // Generate maps for each chain ID
  CHAIN_IDS.forEach(async (chainId) => {
    const definitionsDir = path.join(
      projectRoot,
      `sdk/constants/token-map/${chainId}/definitions`,
    );
    const outputFile = path.join(
      projectRoot,
      `sdk/constants/token-map/${chainId}/index.ts`,
    );

    // Create directories if they don't exist
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });

    // Read all files and convert to lowercase if needed
    const files = fs.existsSync(definitionsDir)
      ? fs.readdirSync(definitionsDir).map((file) => {
          if (file.endsWith(".ts")) {
            const lowercaseFile = file.toLowerCase();
            if (file !== lowercaseFile) {
              const oldPath = path.join(definitionsDir, file);
              const newPath = path.join(definitionsDir, lowercaseFile);
              fs.renameSync(oldPath, newPath);
            }
            return lowercaseFile;
          }
          return file;
        })
      : [];

    // Generate import statements and map entries
    const imports: string[] = [];
    const mapEntries: string[] = [];

    files.forEach((file) => {
      if (file.endsWith(".ts")) {
        const tokenName = file.replace(".ts", "");
        const importName = `token_${tokenName.replace(/-/g, "_")}`;

        imports.push(`import ${importName} from "./definitions/${tokenName}";`);
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

            // Find the defineToken argument object
            const match = content.match(/defineToken\(({[\s\S]*?})\)/);
            if (match) {
              const tokenConfig = match[1];
              // Parse the object
              const tokenData = eval(`(${tokenConfig})`);

              // Convert specific fields to lowercase
              if (tokenData.id) {
                tokenData.id = tokenData.id.toLowerCase();
              }
              if (tokenData.contract_address) {
                tokenData.contract_address =
                  tokenData.contract_address.toLowerCase();
              }

              // Create new content preserving the import and structure
              content = `import { defineToken } from "@/sdk/constants";

export default defineToken(${JSON.stringify(tokenData, null, 2)});
`;
            }

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
export const TokenMap${chainId} = {
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

    console.log(`Token map for chain ${chainId} generated successfully!`);
  });
};

generateTokenMap().catch(console.error);
