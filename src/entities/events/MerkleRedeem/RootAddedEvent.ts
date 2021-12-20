import { Address, log } from "@graphprotocol/graph-ts";
import { RootAdded } from "../../../../generated/MerkleRedeem/MerkleRedeem";
import {
  MerkleRedeemContract,
  RootAddedEvent,
  Token
} from "../../../../generated/schema";
import { toBigDecimal } from "../../../utils/toBigDecimal";
import { ensureToken } from "../../Token";

export function createRootAddedEvent(event: RootAdded): void {
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let dbContract = MerkleRedeemContract.load(event.address.toHex());
  if (!dbContract) {
    log.error("MerkleRedeemContract with id: {} doesn't exist!", [
      event.address.toHex()
    ]);
    return;
  }
  let dbToken: Token = ensureToken(Address.fromString(dbContract.rewardToken));

  let dbEvent: RootAddedEvent = new RootAddedEvent(eventId);
  dbEvent.depositor = event.params.depositor;
  dbEvent.rewardEpoch = event.params.rewardEpoch;
  dbEvent.totalAllocation = toBigDecimal(
    event.params.totalAllocation,
    dbToken.decimals
  );
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}
