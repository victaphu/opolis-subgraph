import { Address, BigInt, log } from "@graphprotocol/graph-ts";
import { Stake } from "../../generated/schema";
import { toBigDecimal } from "../utils/toBigDecimal";
import { ensureToken, ethAddress } from "./Token";

export function createStake(
  id: BigInt,
  token: Address,
  amount: BigInt,
  staker: Address,
  createdAt: BigInt,
  value: BigInt
): void {
  let dbStake = new Stake(id.toString());
  let dbToken = ensureToken(token);
  dbStake.memberId = id;
  if (token.toHex() == ethAddress) {
    dbStake.amount = toBigDecimal(value, dbToken.decimals);
    dbStake.withdrawnAt = createdAt;
  } else {
    dbStake.amount = toBigDecimal(amount, dbToken.decimals);
  }
  dbStake.staker = staker;
  dbStake.token = dbToken.id;
  dbStake.createdAt = createdAt;

  dbStake.save();
}

export function withdrawStake(id: BigInt, withdrawnAt: BigInt): void {
  let dbStake = Stake.load(id.toString());
  if (!dbStake) {
    log.critical("withdrawStake: stake with stakeId: {} doesn't exist!", [
      id.toString(),
    ]);
    return;
  }

  dbStake.withdrawnAt = withdrawnAt;
  dbStake.save();
}
