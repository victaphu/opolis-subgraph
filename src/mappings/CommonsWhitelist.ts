import { WhitelistContract } from "./../../generated/schema";
import {
  OwnershipTransferred,
  AddedToWhitelist,
  RemovedFromWhitelist,
  UpdatedWhitelistAddress
} from "./../../generated/CommonsWhitelist/CommonsWhitelist";
import {
  createWhitelistContract,
  decreaseWhitelistUserCount,
  increaseWhitelistUserCount
} from "../entities/WhitelistContract";
import { createUser, updatePreferredWallet } from "../entities/User";
import { createAddedToWhitelistEvent } from "../entities/AddedToWhitelistEvent";
import { createRemovedFromWhitelistEvent } from "../entities/RemovedFromWhitelistEvent";
import { createUpdatedWhitelistAddressEvent } from "../entities/UpdatedWhitelistAddressEvent";

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let dbWhitelistContract = WhitelistContract.load(event.address.toHex());
  if (dbWhitelistContract) {
    dbWhitelistContract.owner = event.params.newOwner;
    dbWhitelistContract.save();
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
    false,
    event.block.timestamp
  );
  increaseWhitelistUserCount(event.address, event.params.employee);
  createAddedToWhitelistEvent(event);
}

export function handleRemovedFromWhitelist(event: RemovedFromWhitelist): void {
  decreaseWhitelistUserCount(event.address);
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
