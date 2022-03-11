import { Address, ethereum } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as";

export function createMockOwnershipTransferred<T extends ethereum.Event>(
  contractAddress: Address,
  previousOwnerAddress: Address,
  newOwnerAddress: Address
): T {
  let event: T = changetype<T>(newMockEvent());
  event.address = contractAddress;
  event.parameters = new Array();
  let previousOwner = new ethereum.EventParam(
    "previousOwner",
    ethereum.Value.fromAddress(previousOwnerAddress)
  );
  let newOwner = new ethereum.EventParam(
    "newOwner",
    ethereum.Value.fromAddress(newOwnerAddress)
  );

  event.parameters.push(previousOwner);
  event.parameters.push(newOwner);

  return event;
}
