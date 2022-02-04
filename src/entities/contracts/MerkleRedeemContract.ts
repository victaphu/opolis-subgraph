import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import { MerkleRedeem } from "../../../generated/MerkleRedeem/MerkleRedeem";
import { MerkleRedeemContract, Token } from "../../../generated/schema";
import { toBigDecimal } from "../../utils/toBigDecimal";
import { ensureToken } from "../Token";

export function createMerkleRedeemContract(
  contractAddress: Address,
  ownerAddress: Address,
  createdAt: BigInt
): void {
  let contract: MerkleRedeem = MerkleRedeem.bind(contractAddress);
  let tokenAddressResult = contract.try_token();
  if (tokenAddressResult.reverted) {
    log.critical("token() call (Address) reverted!", []);
  }
  let dbToken: Token = ensureToken(tokenAddressResult.value);
  if (dbToken.id == "Unknown") {
    log.critical("stakeToken: {} isn't standard ERC20 token!", [
      tokenAddressResult.value.toHex()
    ]);
  }

  let dbContract = new MerkleRedeemContract(contractAddress.toHex());
  dbContract.createdAt = createdAt;
  dbContract.owner = ownerAddress;
  dbContract.rewardToken = dbToken.id;
  dbContract.totalRewardCycles = BigInt.fromString("0");
  dbContract.totalTokenAllocation = BigDecimal.fromString("0");

  dbContract.save();
}

export function increaseTotalRewardCycles(address: Address): void {
  let dbContract = MerkleRedeemContract.load(address.toHex());
  if (!dbContract) {
    log.error("MerkleRedeemContract with id: {} doesn't exist!", [
      address.toHex()
    ]);
    return;
  }
  dbContract.totalRewardCycles = dbContract.totalRewardCycles.plus(
    BigInt.fromString("1")
  );
  dbContract.save();
}

export function increaseTotalTokenAllocationBy(
  address: Address,
  value: BigInt
): void {
  let dbContract = MerkleRedeemContract.load(address.toHex());
  if (!dbContract) {
    log.error("MerkleRedeemContract with id: {} doesn't exist!", [
      address.toHex()
    ]);
    return;
  }
  let dbToken: Token = ensureToken(Address.fromString(dbContract.rewardToken));
  dbContract.totalTokenAllocation = dbContract.totalTokenAllocation.plus(
    toBigDecimal(value, dbToken.decimals)
  );
  dbContract.save();
}
