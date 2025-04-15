import { Address } from "abitype";
import { Addresses1 } from "./addresses-1";
import { Addresses146 } from "./addresses-146";
import { Addresses999 } from "./addresses-999";
import { Addresses8453 } from "./addresses-8453";
import { Addresses42161 } from "./addresses-42161";
import { Addresses80094 } from "./addresses-80094";
import { Addresses98866 } from "./addresses-98866";
import { Addresses11155111 } from "./addresses-11155111";
import { Addresses21000000 } from "./addresses-21000000";

export const AddressMap = new Map<string, Address>([
  ...Addresses1.map(
    (address) =>
      [`1_${address.name}`, address.address as Address] as [string, Address],
  ),
  ...Addresses146.map(
    (address) =>
      [`146_${address.name}`, address.address as Address] as [string, Address],
  ),
  ...Addresses999.map(
    (address) =>
      [`999_${address.name}`, address.address as Address] as [string, Address],
  ),
  ...Addresses8453.map(
    (address) =>
      [`8453_${address.name}`, address.address as Address] as [string, Address],
  ),
  ...Addresses42161.map(
    (address) =>
      [`42161_${address.name}`, address.address as Address] as [
        string,
        Address,
      ],
  ),
  ...Addresses80094.map(
    (address) =>
      [`80094_${address.name}`, address.address as Address] as [
        string,
        Address,
      ],
  ),
  ...Addresses98866.map(
    (address) =>
      [`98866_${address.name}`, address.address as Address] as [
        string,
        Address,
      ],
  ),
  ...Addresses11155111.map(
    (address) =>
      [`11155111_${address.name}`, address.address as Address] as [
        string,
        Address,
      ],
  ),
  ...Addresses21000000.map(
    (address) =>
      [`21000000_${address.name}`, address.address as Address] as [
        string,
        Address,
      ],
  ),
]);
