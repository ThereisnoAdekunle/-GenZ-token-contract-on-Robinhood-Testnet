/**
 * Approve spending of GenZ tokens
 * Usage: npx hardhat run scripts/approve.js --network robinhood
 * 
 * Set environment variables:
 * - APPROVE_SPENDER: Address to approve
 * - APPROVE_AMOUNT: Amount to approve (in GenZ tokens, not wei)
 */

const CONTRACT_ADDRESS = "0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16";

async function main() {
  const [signer] = await ethers.getSigners();
  const spender = process.env.APPROVE_SPENDER || "0x0000000000000000000000000000000000000000";
  const amount = process.env.APPROVE_AMOUNT || "1000";

  if (spender === "0x0000000000000000000000000000000000000000") {
    console.error("❌ Error: Please set APPROVE_SPENDER environment variable");
    process.exit(1);
  }

  console.log("✔️ Approval Script");
  console.log("━".repeat(50));
  console.log(`Owner: ${signer.address}`);
  console.log(`Spender: ${spender}`);
  console.log(`Amount: ${amount} GenZ`);
  console.log("━".repeat(50));

  try {
    const contract = await ethers.getContractAt("GenerationZ", CONTRACT_ADDRESS);
    const amountInWei = ethers.parseUnits(amount, 18);

    // Check current allowance
    const currentAllowance = await contract.allowance(signer.address, spender);
    console.log(`\n📊 Current allowance: ${ethers.formatUnits(currentAllowance, 18)} GenZ`);

    // Execute approval
    console.log(`\n⏳ Approving ${amount} GenZ for spending...`);
    const tx = await contract.approve(spender, amountInWei);
    console.log(`📝 Transaction hash: ${tx.hash}`);

    // Wait for confirmation
    console.log("⏳ Waiting for confirmation...");
    const receipt = await tx.wait();
    console.log(`✅ Approval confirmed in block ${receipt.blockNumber}`);

    // Check new allowance
    const newAllowance = await contract.allowance(signer.address, spender);
    console.log(`\n📊 New allowance: ${ethers.formatUnits(newAllowance, 18)} GenZ`);
    console.log(`✨ Approval successful!`);

  } catch (error) {
    console.error("❌ Approval failed:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
