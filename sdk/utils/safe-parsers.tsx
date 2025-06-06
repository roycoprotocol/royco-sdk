import { BigNumber, ethers } from "ethers";

export const parseNumber = (value: number | undefined | null): number => {
  try {
    if (!value) throw new Error("Value is undefined");

    if (isNaN(value)) throw new Error("Value is NaN");

    return value;
  } catch (err) {
    return 0;
  }
};

export const parseRawAmount = (
  value: string | number | bigint | undefined | null,
): string => {
  try {
    if (!value) throw new Error("Value is undefined");

    const refinedValue = BigNumber.from(value).toString();

    return refinedValue;
  } catch (err) {
    return BigNumber.from("0").toString();
  }
};

export const parseTokenAmountToRawAmount = (
  value: string | undefined | null,
  decimals: number,
): string => {
  try {
    if (!value) throw new Error("Value is undefined");

    const refinedValue = ethers.utils
      .parseUnits(
        parseFloat(value).toFixed(decimals), // Format to the correct number of decimals
        decimals,
      )
      .toString();

    return refinedValue;
  } catch (err) {
    return "0";
  }
};

export const parseRawAmountToTokenAmount = (
  value: string | undefined | null,
  decimals: number,
): number => {
  try {
    if (!value) throw new Error("Value is undefined");

    const refinedValue = parseFloat(
      ethers.utils.formatUnits(BigNumber.from(value), decimals),
    );

    if (isNaN(refinedValue)) throw new Error("Value is NaN");

    return refinedValue;
  } catch (err) {
    return 0;
  }
};

export const parseTokenAmountToTokenAmountUsd = (
  value: number | undefined | null,
  price: number,
): number => {
  try {
    if (!value) throw new Error("Value is undefined");

    const refinedValue = value * price;

    if (isNaN(refinedValue)) throw new Error("Value is NaN");

    return refinedValue;
  } catch (err) {
    return 0;
  }
};

export const parseRawAmountToTokenAmountUsd = (
  value: string | undefined | null,
  decimals: number,
  price: number,
): number => {
  return parseTokenAmountToTokenAmountUsd(
    parseRawAmountToTokenAmount(value, decimals),
    price,
  );
};

export const parseTextToFormattedValue = (
  value: string | undefined | null,
): string => {
  try {
    if (!value) return "";
    // Don't format if it's just a decimal point
    if (value === ".") return value;
    // Split number into integer and decimal parts
    const [intPart, decimalPart] = value.split(".");
    // Format integer part with commas
    const formattedInt = Intl.NumberFormat("en-US").format(
      parseFloat(intPart || "0"),
    );
    // Return formatted number with decimal part if it exists
    return decimalPart !== undefined
      ? `${formattedInt}.${decimalPart}`
      : formattedInt;
  } catch (err) {
    return "";
  }
};

export const parseFormattedValueToText = (
  value: string | undefined | null,
): string => {
  try {
    if (!value) throw new Error("Value is undefined");
    const refinedValue = value.replace(/,/g, "");

    if (
      refinedValue.endsWith(".") &&
      refinedValue.indexOf(".") !== refinedValue.length - 1
    ) {
      return refinedValue.slice(0, -1);
    }

    if (isNaN(Number(refinedValue))) {
      throw new Error("Invalid number");
    }

    return refinedValue;
  } catch (err) {
    return "";
  }
};
