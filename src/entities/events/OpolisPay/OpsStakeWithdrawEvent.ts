import { BigInt } from "@graphprotocol/graph-ts";
import { OpsStakeWithdraw } from "../../../../generated/OpolisPay/OpolisPay";
import { OpsStakeWithdraw as OpsStakeWithdrawV2 } from "../../../../generated/OpolisPayV2/OpolisPayV2";
import { OpsStakeWithdrawEvent } from "../../../../generated/schema";
import { toBigDecimal } from "../../../utils/toBigDecimal";
import { ensureToken } from "../../Token";

export function createOpsStakeWithdrawEvent(event: OpsStakeWithdraw): void {
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let dbEvent: OpsStakeWithdrawEvent = new OpsStakeWithdrawEvent(eventId);
  let dbToken = ensureToken(event.params.token);
  dbEvent.token = dbToken.id;
  dbEvent.stakeId = event.params.stakeId;
  dbEvent.stakeNumber = BigInt.fromI32(1);
  dbEvent.amount = toBigDecimal(event.params.amount, dbToken.decimals);
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}

export function createOpsStakeWithdrawEventV2(event: OpsStakeWithdrawV2): void {
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let dbEvent: OpsStakeWithdrawEvent = new OpsStakeWithdrawEvent(eventId);
  let dbToken = ensureToken(event.params.token);
  dbEvent.token = dbToken.id;
  dbEvent.stakeId = event.params.stakeId;
  dbEvent.stakeNumber = event.params.stakeNumber;
  dbEvent.amount = toBigDecimal(event.params.amount, dbToken.decimals);
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}
