import { Sweep } from "../../generated/OpolisPay/OpolisPay";
import {SweepEvent} from "../../generated/schema";
import { toBigDecimal } from "../utils/toBigDecimal";
import { ensureToken } from "./Token";

export function createSweepEvent(event: Sweep): void {
  let eventId: string =
  event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let dbEvent: SweepEvent = new SweepEvent(eventId);
  let dbToken = ensureToken(event.params.token)
  dbEvent.token = dbToken.id;
  dbEvent.amount = toBigDecimal(event.params.amount, dbToken.decimals);
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}