/**
 * Transfer GenZ tokens to an address
 * Usage: npx hardhat run scripts/transfer.js --network robinhood
 * 
 * Set environment variables:
 * - TRANSFER_TO: Recipient address
 * - TRANSFER_AMOUNT: Amount to transfer (in GenZ tokens, not wei)
 */

const CONTRACT_ADDRESS = "0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16";

async function main() {
  const [signer] = await ethers.getSigners();
  const recipient = process.env.TRANSFER_TO || "0x0000000000000000000000000000000000000000";
  const amount = process.env.TRANSFER_AMOUNT || "100";

  if (recipient === "0x0000000000000000000000000000000000000000") {
    console.error("❌ Error: Please set TRANSFER_TO environment variable");
    process.exit(1);
  }

  console.log("💼 Transfer Script");
  console.log("━".repeat(50));
  console.log(`From: ${signer.address}`);
  console.log(`To: ${recipient}`);
  console.log(`Amount: ${amount} GenZ`);
  console.log("━".repeat(50));

  // Get contract instance
  const contract = await ethers.getContractAt("GenerationZ", CONTRACT_ADDRESS);

  // Convert amount to wei (18 decimals)
  const amountInWei = ethers.parseUnits(amount, 18);

  try {
    // Check balance before transfer
    const balanceBefore = await contract.balanceOf(signer.address);
    console.log(`\n📊 Balance before: ${ethers.formatUnits(balanceBefore, 18)} GenZ`);

    if (balanceBefore < amountInWei) {
      console.error(`❌ Insufficient balance. Need ${amount} GenZ but have ${ethers.formatUnits(balanceBefore, 18)}`);
      process.exit(1);
    }

    // Execute transfer
    console.log(`\n⏳ Transferring ${amount} GenZ...`);
    const tx = await contract.transfer(recipient, amountInWei);
    console.log(`📝 Transaction hash: ${tx.hash}`);

    // Wait for confirmation
    console.log("⏳ Waiting for confirmation...");
    const receipt = await tx.wait();
    console.log(`✅ Transfer confirmed in block ${receipt.blockNumber}`);

    // Check balance after transfer
    const balanceAfter = await contract.balanceOf(signer.address);
    console.log(`\n📊 Balance after: ${ethers.formatUnits(balanceAfter, 18)} GenZ`);
    console.log(`✨ Transfer successful!`);

  } catch (error) {
    console.error("❌ Transfer failed:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
