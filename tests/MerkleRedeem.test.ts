import { assert, test } from "matchstick-as";
import { MerkleRedeem } from "../generated/MerkleRedeem/MerkleRedeem";
import { merkleRedeemMockData } from "./constants";
import { mockMerkleRedeemContract } from "./utils";

test("can mock MerkleRedeem contract calls", () => {
  mockMerkleRedeemContract();

  let contract: MerkleRedeem = MerkleRedeem.bind(merkleRedeemMockData.address);
  let tokenAddressResult = contract.try_token();
  assert.booleanEquals(false, tokenAddressResult.reverted);
  assert.addressEquals(
    merkleRedeemMockData.rewardToken,
    tokenAddressResult.value
  );
})