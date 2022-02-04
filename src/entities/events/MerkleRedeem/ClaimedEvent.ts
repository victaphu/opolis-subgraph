import { Address, log } from "@graphprotocol/graph-ts";
import { Claimed } from "../../../../generated/MerkleRedeem/MerkleRedeem";
import {
  ClaimedEvent,
  MerkleRedeemContract,
  Token,
  Wallet
} from "../../../../generated/schema";
import { toBigDecimal } from "../../../utils/toBigDecimal";
import { ensureToken } from "../../Token";
import { ensureWallet } from "../../Wallet";

export function createClaimedEvent(event: Claimed): void {
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let dbContract = MerkleRedeemContract.load(event.address.toHex());
  if (!dbContract) {
    log.error("MerkleRedeemContract with id: {} doesn't exist!", [
      event.address.toHex()
    ]);
    return;
  }
  let dbToken: Token = ensureToken(Address.fromString(dbContract.rewardToken));
  let dbWallet: Wallet = ensureWallet(
    event.params.claimant,
    event.block.timestamp
  );

  let dbEvent: ClaimedEvent = new ClaimedEvent(eventId);
  dbEvent.wallet = dbWallet.id;
  dbEvent.rewardEpoch = event.params.rewardEpoch;
  dbEvent.claimedBalance = toBigDecimal(event.params.balance, dbToken.decimals);
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}
