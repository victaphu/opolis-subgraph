import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import { Stake } from "../../generated/schema";
import { toBigDecimal } from "../utils/toBigDecimal";
import { ensureToken, ethAddress } from "./Token";

export function createStake(
  id: BigInt,
  token: Address,
  amount: BigInt,
  staker: Address,
  stakeNumber: BigInt,
  createdAt: BigInt,
  value: BigInt,
  txHash: Bytes,
  contractAddress: Bytes
): void {
  let dbStake = new Stake(id.toString() + "-" + stakeNumber.toString());
  let dbToken = ensureToken(token);
  dbStake.memberId = id;
  if (token.toHex() == ethAddress.toLowerCase()) {
    dbStake.amount = toBigDecimal(value, dbToken.decimals);
    dbStake.withdrawnAt = createdAt;
  } else {
    dbStake.amount = toBigDecimal(amount, dbToken.decimals);
  }
  dbStake.staker = staker;
  dbStake.token = dbToken.id;
  dbStake.stakeNumber = stakeNumber;
  dbStake.createdAt = createdAt;
  dbStake.txHash = txHash;
  dbStake.contract = contractAddress.toHex();

  dbStake.save();
}

export function withdrawStake(
  id: BigInt,
  stakeNumber: BigInt,
  withdrawnAt: BigInt
): void {
  let dbStake = Stake.load(id.toString() + "-" + stakeNumber.toString());
  if (!dbStake) {
    log.critical("withdrawStake: stake with stakeId: {} doesn't exist!", [
      id.toString()
    ]);
    return;
  }

  dbStake.withdrawnAt = withdrawnAt;
  dbStake.save();
}
