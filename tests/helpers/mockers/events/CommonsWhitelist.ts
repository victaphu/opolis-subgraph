import { Address, ethereum } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as";
import {
  AddedToWhitelist,
  RemovedFromWhitelist,
  UpdatedWhitelistAddress
} from "../../../../generated/CommonsWhitelist/CommonsWhitelist";
import { whitelistContractMockData } from "../../constants";

export function createMockAddedToWhitelist(
  accountAddress: Address,
  isEmployee: boolean
): AddedToWhitelist {
  let event: AddedToWhitelist = changetype<AddedToWhitelist>(newMockEvent());
  event.address = whitelistContractMockData.address;
  event.parameters = new Array();
  let account = new ethereum.EventParam(
    "account",
    ethereum.Value.fromAddress(accountAddress)
  );
  let employee = new ethereum.EventParam(
    "employee",
    ethereum.Value.fromBoolean(isEmployee)
  );

  event.parameters.push(account);
  event.parameters.push(employee);

  return event;
}

export function createMockUpdatedWhitelistAddress(
  oldAddress: Address,
  newAddress: Address
): UpdatedWhitelistAddress {
  let event: UpdatedWhitelistAddress = changetype<UpdatedWhitelistAddress>(
    newMockEvent()
  );
  event.address = whitelistContractMockData.address;
  event.parameters = new Array();
  let oldAddr = new ethereum.EventParam(
    "oldAddress",
    ethereum.Value.fromAddress(oldAddress)
  );
  let newAddr = new ethereum.EventParam(
    "newAddress",
    ethereum.Value.fromAddress(newAddress)
  );

  event.parameters.push(oldAddr);
  event.parameters.push(newAddr);

  return event;
}

export function createMockRemovedFromWhitelist(
  accountAddress: Address
): RemovedFromWhitelist {
  let event: RemovedFromWhitelist = changetype<RemovedFromWhitelist>(
    newMockEvent()
  );
  event.address = whitelistContractMockData.address;
  event.parameters = new Array();
  let account = new ethereum.EventParam(
    "account",
    ethereum.Value.fromAddress(accountAddress)
  );

  event.parameters.push(account);

  return event;
}
