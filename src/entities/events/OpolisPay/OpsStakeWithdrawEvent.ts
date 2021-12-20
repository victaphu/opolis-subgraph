import { OpsStakeWithdraw } from "../../../../generated/OpolisPay/OpolisPay";
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
  dbEvent.amount = toBigDecimal(event.params.amount, dbToken.decimals);
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}