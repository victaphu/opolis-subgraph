import { OpsPayrollWithdraw } from "../../../../generated/OpolisPay/OpolisPay";
import { OpsPayrollWithdrawEvent } from "../../../../generated/schema";
import { toBigDecimal } from "../../../utils/toBigDecimal";
import { ensureToken } from "../../Token";

export function createOpsPayrollWithdrawEvent(event: OpsPayrollWithdraw): void {
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let dbEvent: OpsPayrollWithdrawEvent = new OpsPayrollWithdrawEvent(eventId);
  let dbToken = ensureToken(event.params.token);
  dbEvent.token = dbToken.id;
  dbEvent.payrollId = event.params.payrollId;
  dbEvent.amount = toBigDecimal(event.params.amount, dbToken.decimals);
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}