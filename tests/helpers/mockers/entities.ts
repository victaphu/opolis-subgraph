import { Address } from "@graphprotocol/graph-ts";
import { OwnershipTransferred } from "../../../generated/CommonsWhitelist/CommonsWhitelist";
import {
  handleAddedToWhitelist,
  handleOwnershipTransferred
} from "../../../src/mappings/CommonsWhitelist";
import {
  accounts,
  ownerAddress,
  whitelistContractMockData
} from "../constants";
import { createMockOwnershipTransferred } from "./events/Ownable";
import { createMockAddedToWhitelist } from "./events/CommonsWhitelist";

export function mockWhitelistUser(address: Address, isEmployee: boolean): void {
  let event = createMockAddedToWhitelist(address, isEmployee);
  handleAddedToWhitelist(event);
}

export function mockWhitelistContractEntity(): void {
  let event = createMockOwnershipTransferred<OwnershipTransferred>(
    whitelistContractMockData.address,
    accounts[0],
    ownerAddress
  );

  handleOwnershipTransferred(event);
}
