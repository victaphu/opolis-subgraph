import {
  NewAdmin,
  NewDestination,
  NewHelper,
  NewTokens,
  OpsWithdraw,
  Paid,
  SetupComplete,
  Staked,
  Sweep,
} from "../../generated/OpolisPay/OpolisPay";
import { createNewAdminEvent } from "../entities/NewAdminEvent";
import { createNewDestinationEvent } from "../entities/NewDestinationEvent";
import { createNewHelperEvent } from "../entities/NewHelperEvent";
import { createNewTokensEvent } from "../entities/NewTokensEvent";
import { addTokens, createOpolisPayContract, updateAdmin, updateDestination, updateHelper } from "../entities/OpolisPayContract";
import { createOpsWithdrawEvent } from "../entities/OpsWithdrawEvent";
import { createPaidEvent } from "../entities/PaidEvent";
import { createPayroll, withdrawPayroll } from "../entities/Payroll";
import { createSetupCompleteEvent } from "../entities/SetupCompleteEvent";
import { createStakedEvent } from "../entities/StakedEvent";
import { createSweepEvent } from "../entities/SweepEvent";

export function handleSetupComplete(event: SetupComplete): void {
  createOpolisPayContract(
    event.address,
    event.params.destination,
    event.params.admin,
    event.params.helper,
    event.params.tokens,
    event.block.timestamp
  );

  createSetupCompleteEvent(event);
}

export function handleStaked(event: Staked): void {
  createStakedEvent(event);
}

export function handlePaid(event: Paid): void {
  createPayroll(event.params.payrollId, event.params.token, event.params.amount, event.params.payor, event.block.timestamp);
  createPaidEvent(event);
}

export function handleOpsWithdraw(event: OpsWithdraw): void {
  withdrawPayroll(event.params.payrollId, event.block.timestamp);
  createOpsWithdrawEvent(event);
}

export function handleSweep(event: Sweep): void {
  createSweepEvent(event);
}

export function handleNewDestination(event: NewDestination): void {
  updateDestination(event.address, event.params.destination);
  createNewDestinationEvent(event);
}

export function handleNewAdmin(event: NewAdmin): void {
  updateAdmin(event.address, event.params.opolisAdmin);
  createNewAdminEvent(event);
}

export function handleNewHelper(event: NewHelper): void {
  updateHelper(event.address, event.params.newHelper);
  createNewHelperEvent(event);
}

export function handleNewTokens(event: NewTokens): void {
  addTokens(event.address, event.params.newTokens);
  createNewTokensEvent(event);
}
