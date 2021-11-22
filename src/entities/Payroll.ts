import { Address, BigInt, log } from "@graphprotocol/graph-ts";
import { Payroll } from "../../generated/schema";
import { toBigDecimal } from "../utils/toBigDecimal";
import { ensureToken } from "./Token";

export function createPayroll(id: BigInt, token: Address, amount: BigInt, payor: Address, createdAt: BigInt): void {
  let dbPayroll = new Payroll(id.toString());
  let dbToken = ensureToken(token);
  dbPayroll.amount =  toBigDecimal(amount, dbToken.decimals);
  dbPayroll.payor = payor;
  dbPayroll.token = dbToken.id;
  dbPayroll.createdAt = createdAt;

  dbPayroll.save();
}

export function withdrawPayroll(id: BigInt, withdrawnAt: BigInt): void {
  let dbPayroll = Payroll.load(id.toString())
  if (!dbPayroll) {
    log.critical("withdrawPayroll: payroll with payrollId: {} doesn't exist!", [dbPayroll.id.toString()]);
  }

  dbPayroll.withdrawnAt = withdrawnAt;
  dbPayroll.save();
}