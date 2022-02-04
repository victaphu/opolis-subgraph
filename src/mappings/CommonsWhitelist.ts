import {
  AddedToWhitelist,
  OwnershipTransferred,
  RemovedFromWhitelist,
  UpdatedWhitelistAddress,
  MassAdd
} from "../../generated/CommonsWhitelist/CommonsWhitelist";
import { WhitelistContract } from "../../generated/schema";
import {
  createWhitelistContract,
  decreaseWhitelistUserCount,
  increaseWhitelistUserCount
} from "../entities/contracts/WhitelistContract";
import { createAddedToWhitelistEvent } from "../entities/events/CommonsWhitelist/AddedToWhitelistEvent";
import { createRemovedFromWhitelistEvent } from "../entities/events/CommonsWhitelist/RemovedFromWhitelistEvent";
import { createUpdatedWhitelistAddressEvent } from "../entities/events/CommonsWhitelist/UpdatedWhitelistAddressEvent";
import {
  createUser,
  isEmployee,
  removeUserFromWhitelist,
  updatePreferredWallet
} from "../entities/User";

import { log } from "@graphprotocol/graph-ts";

export function handleMassAdd(event: MassAdd): void {
  let accounts = event.params.accounts;
  log.info("mass add {}", [accounts.toHexString()]);
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let dbContract = WhitelistContract.load(event.address.toHex());
  if (dbContract) {
    dbContract.owner = event.params.newOwner;
    dbContract.save();
  } else {
    createWhitelistContract(
      event.address,
      event.params.newOwner,
      event.block.timestamp
    );
  }
}

export function handleAddedToWhitelist(event: AddedToWhitelist): void {
  createUser(
    event.params.account,
    event.params.employee,
    true,
    event.block.timestamp
  );
  increaseWhitelistUserCount(event.address, event.params.employee);
  createAddedToWhitelistEvent(event);
}

export function handleRemovedFromWhitelist(event: RemovedFromWhitelist): void {
  removeUserFromWhitelist(event.params.account);
  decreaseWhitelistUserCount(event.address, isEmployee(event.address));
  createRemovedFromWhitelistEvent(event);
}

export function handleUpdatedWhitelistAddress(
  event: UpdatedWhitelistAddress
): void {
  updatePreferredWallet(
    event.params.oldAddress,
    event.params.newMemberAddress,
    event.block.timestamp
  );
  createUpdatedWhitelistAddressEvent(event);
}
