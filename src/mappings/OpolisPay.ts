import {
  NewAdmin,
  NewDestination,
  NewHelper,
  NewTokens,
  OpsPayrollWithdraw,
  OpsStakeWithdraw,
  Paid,
  SetupComplete,
  Staked,
  Sweep
} from "../../generated/OpolisPay/OpolisPay";
import {
  addTokens,
  createOpolisPayContract,
  updateAdmin,
  updateDestination,
  updateHelper
} from "../entities/contracts/OpolisPayContract";
import { createNewAdminEvent } from "../entities/events/OpolisPay/NewAdminEvent";
import { createNewDestinationEvent } from "../entities/events/OpolisPay/NewDestinationEvent";
import { createNewHelperEvent } from "../entities/events/OpolisPay/NewHelperEvent";
import { createNewTokensEvent } from "../entities/events/OpolisPay/NewTokensEvent";
import { createOpsPayrollWithdrawEvent } from "../entities/events/OpolisPay/OpsPayrollWithdrawEvent";
import { createOpsStakeWithdrawEvent } from "../entities/events/OpolisPay/OpsStakeWithdrawEvent";
import { createPaidEvent } from "../entities/events/OpolisPay/PaidEvent";
import { createSetupCompleteEvent } from "../entities/events/OpolisPay/SetupCompleteEvent";
import { createStakedEvent } from "../entities/events/OpolisPay/StakedEvent";
import { createSweepEvent } from "../entities/events/OpolisPay/SweepEvent";
import { createPayroll, withdrawPayroll } from "../entities/Payroll";

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
  createPayroll(
    event.params.payrollId,
    event.params.token,
    event.params.amount,
    event.params.payor,
    event.block.timestamp
  );
  createPaidEvent(event);
}

export function handleOpsPayrollWithdraw(event: OpsPayrollWithdraw): void {
  withdrawPayroll(event.params.payrollId, event.block.timestamp);
  createOpsPayrollWithdrawEvent(event);
}

export function handleOpsStakeWithdraw(event: OpsStakeWithdraw): void {
  withdrawPayroll(event.params.stakeId, event.block.timestamp);
  createOpsStakeWithdrawEvent(event);
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
