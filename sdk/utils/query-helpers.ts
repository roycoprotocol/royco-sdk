import { createHash } from "crypto";

export const generateQueryKey = (
  prefix: string | null | undefined,
  params: Record<string, any> | null | undefined,
) => {
  const safePrefix = prefix ?? "default";
  const safeParams = params ?? {};

  const sortedEntries = Object.entries(safeParams)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}=${value ?? "null"}`)
    .join(":");

  const hash = createHash("sha256").update(sortedEntries).digest("hex");
  return [safePrefix, hash];
};
