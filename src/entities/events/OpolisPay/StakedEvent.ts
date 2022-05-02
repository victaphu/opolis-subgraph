import { BigInt } from "@graphprotocol/graph-ts";
import { Staked } from "../../../../generated/OpolisPay/OpolisPay";
import { Staked as StakedV2 } from "../../../../generated/OpolisPayV2/OpolisPayV2";
import { StakedEvent } from "../../../../generated/schema";
import { toBigDecimal } from "../../../utils/toBigDecimal";
import { ensureToken } from "../../Token";

export function createStakedEvent(event: Staked): void {
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let dbEvent: StakedEvent = new StakedEvent(eventId);
  let dbToken = ensureToken(event.params.token);
  dbEvent.staker = event.params.staker;
  dbEvent.memberId = event.params.memberId;
  dbEvent.stakeNumber = BigInt.fromI32(1);
  dbEvent.token = dbToken.id;
  dbEvent.amount = toBigDecimal(event.params.amount, dbToken.decimals);
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}

export function createStakedEventV2(event: StakedV2): void {
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let dbEvent: StakedEvent = new StakedEvent(eventId);
  let dbToken = ensureToken(event.params.token);
  dbEvent.staker = event.params.staker;
  dbEvent.memberId = event.params.memberId;
  dbEvent.stakeNumber = event.params.stakeNumber;
  dbEvent.token = dbToken.id;
  dbEvent.amount = toBigDecimal(event.params.amount, dbToken.decimals);
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}
