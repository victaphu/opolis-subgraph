import { Address, log } from "@graphprotocol/graph-ts";
import { unStake } from "../../../../generated/CommonsEasyStaking/CommonsEasyStaking";
import {
  StakingContract,
  Token,
  UnstakeEvent,
  Wallet
} from "../../../../generated/schema";
import { toBigDecimal } from "../../../utils/toBigDecimal";
import { ensureToken } from "../../Token";
import { ensureWallet } from "../../Wallet";

export function createUnstakeEvent(event: unStake): void {
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let dbEvent: UnstakeEvent = new UnstakeEvent(eventId);
  let dbWallet: Wallet = ensureWallet(
    event.params.unstaker,
    event.block.timestamp
  );
  let dbContract = StakingContract.load(event.address.toHex());
  if (!dbContract) {
    log.error("StakingContract with id: {} doesn't exist!", [
      event.address.toHex()
    ]);
    return;
  }
  let dbToken: Token = ensureToken(Address.fromString(dbContract.stakeToken));

  dbEvent.user = dbWallet.user;
  dbEvent.wallet = dbWallet.id;
  dbEvent.amount = toBigDecimal(event.params.amountUnstaked, dbToken.decimals);
  dbEvent.totalStaked = toBigDecimal(
    event.params.totalStaked,
    dbToken.decimals
  );
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}
