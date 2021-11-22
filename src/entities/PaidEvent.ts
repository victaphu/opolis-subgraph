import { Paid } from "../../generated/OpolisPay/OpolisPay";
import { PaidEvent } from "../../generated/schema";
import { toBigDecimal } from "../utils/toBigDecimal";
import { ensureToken } from "./Token";

export function createPaidEvent(event: Paid): void {
  let eventId: string =
  event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let dbEvent: PaidEvent = new PaidEvent(eventId);
  let dbToken = ensureToken(event.params.token)
  dbEvent.token = dbToken.id;
  dbEvent.payor = event.params.payor
  dbEvent.amount = toBigDecimal(event.params.amount, dbToken.decimals);
  dbEvent.payrollId = event.params.payrollId;
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}