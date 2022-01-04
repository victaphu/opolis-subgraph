import { Address, BigInt, ethereum, log } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as";
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
  Sweep,
} from "../../../../generated/OpolisPay/OpolisPay";
import {
  opolisPayMockData,
  stakingContractMockData,
} from "../../constants";
import { MockTokenData } from "../../token";

export function createSetupComplete(
  admin: Address,
  destination: Address,
  helper: Address,
  supportedTokens: MockTokenData[]
): SetupComplete {
  let event: SetupComplete = changetype<SetupComplete>(newMockEvent());
  event.address = opolisPayMockData.address;
  event.parameters = new Array();

  let adminParam = new ethereum.EventParam(
    "admin",
    ethereum.Value.fromAddress(admin)
  );
  let destinationParam = new ethereum.EventParam(
    "destination",
    ethereum.Value.fromAddress(destination)
  );
  let helperParam = new ethereum.EventParam(
    "helper",
    ethereum.Value.fromAddress(helper)
  );
  let supportedTokensParam = new ethereum.EventParam(
    "supportedTokens",
    ethereum.Value.fromAddressArray(
      supportedTokens.map<Address>((x) => x.address)
    )
  );

  event.parameters.push(adminParam);
  event.parameters.push(destinationParam);
  event.parameters.push(helperParam);
  event.parameters.push(supportedTokensParam);

  return event;
}

export function createStaked(
  staker: Address,
  memberId: BigInt,
  amount: BigInt,
  token: Address
): Staked {
  let event: Staked = changetype<Staked>(newMockEvent());
  event.address = stakingContractMockData.address;
  event.parameters = new Array();

  let stakerParam = new ethereum.EventParam(
    "staker",
    ethereum.Value.fromAddress(staker)
  );
  let memberIdParam = new ethereum.EventParam(
    "memberId",
    ethereum.Value.fromUnsignedBigInt(memberId)
  );
  let amountParam = new ethereum.EventParam(
    "amount",
    ethereum.Value.fromUnsignedBigInt(amount)
  );
  let tokenParam = new ethereum.EventParam(
    "token",
    ethereum.Value.fromAddress(token)
  );

  // Note: Order of parameters is important
  event.parameters.push(stakerParam);
  event.parameters.push(tokenParam);
  event.parameters.push(amountParam);
  event.parameters.push(memberIdParam);

  return event;
}

export function createPaid(
  payrollId: BigInt,
  token: Address,
  amount: BigInt,
  payor: Address
): Paid {
  let event: Paid = changetype<Paid>(newMockEvent());
  event.address = opolisPayMockData.address;
  event.parameters = new Array();

  let payrollIdParam = new ethereum.EventParam(
    "payrollId",
    ethereum.Value.fromUnsignedBigInt(payrollId)
  );
  let tokenParam = new ethereum.EventParam(
    "token",
    ethereum.Value.fromAddress(token)
  );
  let amountParam = new ethereum.EventParam(
    "amount",
    ethereum.Value.fromUnsignedBigInt(amount)
  );
  let payorParam = new ethereum.EventParam(
    "payor",
    ethereum.Value.fromAddress(payor)
  );

  event.parameters.push(payorParam);
  event.parameters.push(tokenParam);
  event.parameters.push(payrollIdParam);
  event.parameters.push(amountParam);

  return event;
}

export function createOpsPayrollWithdraw(
  token: Address,
  payrollId: BigInt,
  amount: BigInt
): OpsPayrollWithdraw {
  let event: OpsPayrollWithdraw = changetype<OpsPayrollWithdraw>(
    newMockEvent()
  );
  event.address = opolisPayMockData.address;
  event.parameters = new Array();

  let tokenParam = new ethereum.EventParam(
    "token",
    ethereum.Value.fromAddress(token)
  );
  let payrollIdParam = new ethereum.EventParam(
    "payrollId",
    ethereum.Value.fromUnsignedBigInt(payrollId)
  );
  let amountParam = new ethereum.EventParam(
    "amount",
    ethereum.Value.fromUnsignedBigInt(amount)
  );

  event.parameters.push(tokenParam);
  event.parameters.push(payrollIdParam);
  event.parameters.push(amountParam);

  return event;
}

export function createOpsStakeWithdraw(
  token: Address,
  stakeId: BigInt,
  amount: BigInt
): OpsStakeWithdraw {
  let event: OpsStakeWithdraw = changetype<OpsStakeWithdraw>(
    newMockEvent()
  );
  event.address = opolisPayMockData.address;
  event.parameters = new Array();

  let tokenParam = new ethereum.EventParam(
    "token",
    ethereum.Value.fromAddress(token)
  );
  let stakeIdParam = new ethereum.EventParam(
    "stakeId",
    ethereum.Value.fromUnsignedBigInt(stakeId)
  );
  let amountParam = new ethereum.EventParam(
    "amount",
    ethereum.Value.fromUnsignedBigInt(amount)
  );

  event.parameters.push(tokenParam);
  event.parameters.push(stakeIdParam);
  event.parameters.push(amountParam);

  return event;
}

export function createSweep(token: Address, amount: BigInt): Sweep {
  let event: Sweep = changetype<Sweep>(newMockEvent());
  event.address = opolisPayMockData.address;
  event.parameters = new Array();

  let tokenParam = new ethereum.EventParam(
    "token",
    ethereum.Value.fromAddress(token)
  );
  let amountParam = new ethereum.EventParam(
    "amount",
    ethereum.Value.fromUnsignedBigInt(amount)
  );

  event.parameters.push(tokenParam);
  event.parameters.push(amountParam);

  return event;
} 

export function createNewDestination(
  destination: Address
): NewDestination {
  let event: NewDestination = changetype<NewDestination>(newMockEvent());
  event.address = opolisPayMockData.address;
  event.parameters = new Array();

  let destinationParam = new ethereum.EventParam(
    "destination",
    ethereum.Value.fromAddress(destination)
  );

  event.parameters.push(destinationParam);

  return event;
}

export function createNewAdmin(
  admin: Address
): NewAdmin {
  let event: NewAdmin = changetype<NewAdmin>(newMockEvent());
  event.address = opolisPayMockData.address;
  event.parameters = new Array();

  let adminParam = new ethereum.EventParam(
    "admin",
    ethereum.Value.fromAddress(admin)
  );

  event.parameters.push(adminParam);

  return event;
}

export function createNewHelper(
  helper: Address
): NewHelper {
  let event: NewHelper = changetype<NewHelper>(newMockEvent());
  event.address = opolisPayMockData.address;
  event.parameters = new Array();

  let helperParam = new ethereum.EventParam(
    "helper",
    ethereum.Value.fromAddress(helper)
  );

  event.parameters.push(helperParam);

  return event;
}

export function createNewTokens(newTokens: Address[]): NewTokens {
  let event: NewTokens = changetype<NewTokens>(newMockEvent());
  event.address = opolisPayMockData.address;
  event.parameters = new Array();

  let newTokensParam = new ethereum.EventParam(
    "newTokens",
    ethereum.Value.fromAddressArray(newTokens)
  );

  event.parameters.push(newTokensParam);

  return event;
}
