/**
 * Transfer GenZ tokens from one address to another (requires approval)
 * Usage: npx hardhat run scripts/transferFrom.js --network robinhood
 * 
 * Set environment variables:
 * - TRANSFER_FROM: Source address (token owner)
 * - TRANSFER_TO: Recipient address
 * - TRANSFER_AMOUNT: Amount to transfer (in GenZ tokens, not wei)
 */

const CONTRACT_ADDRESS = "0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16";

async function main() {
  const [signer] = await ethers.getSigners();
  const from = process.env.TRANSFER_FROM || "0x0000000000000000000000000000000000000000";
  const to = process.env.TRANSFER_TO || "0x0000000000000000000000000000000000000000";
  const amount = process.env.TRANSFER_AMOUNT || "100";

  if (from === "0x0000000000000000000000000000000000000000") {
    console.error("❌ Error: Please set TRANSFER_FROM environment variable");
    process.exit(1);
  }

  if (to === "0x0000000000000000000000000000000000000000") {
    console.error("❌ Error: Please set TRANSFER_TO environment variable");
    process.exit(1);
  }

  console.log("💼 TransferFrom Script");
  console.log("━".repeat(50));
  console.log(`From: ${from}`);
  console.log(`To: ${to}`);
  console.log(`Amount: ${amount} GenZ`);
  console.log(`Spender: ${signer.address}`);
  console.log("━".repeat(50));

  try {
    const contract = await ethers.getContractAt("GenerationZ", CONTRACT_ADDRESS);
    const amountInWei = ethers.parseUnits(amount, 18);

    // Check allowance
    const allowance = await contract.allowance(from, signer.address);
    console.log(`\n📊 Current allowance: ${ethers.formatUnits(allowance, 18)} GenZ`);

    if (allowance < amountInWei) {
      console.error(`❌ Insufficient allowance. Need ${amount} GenZ but approved ${ethers.formatUnits(allowance, 18)}`);
      console.log("💡 Tip: Ask the token owner to approve your address first");
      process.exit(1);
    }

    // Check balance of source address
    const balance = await contract.balanceOf(from);
    console.log(`📊 Balance of source address: ${ethers.formatUnits(balance, 18)} GenZ`);

    if (balance < amountInWei) {
      console.error(`❌ Insufficient balance at source. Need ${amount} GenZ but have ${ethers.formatUnits(balance, 18)}`);
      process.exit(1);
    }

    // Execute transferFrom
    console.log(`\n⏳ Transferring ${amount} GenZ...`);
    const tx = await contract.transferFrom(from, to, amountInWei);
    console.log(`📝 Transaction hash: ${tx.hash}`);

    // Wait for confirmation
    console.log("⏳ Waiting for confirmation...");
    const receipt = await tx.wait();
    console.log(`✅ Transfer confirmed in block ${receipt.blockNumber}`);

    // Check balances after transfer
    const balanceFrom = await contract.balanceOf(from);
    const balanceTo = await contract.balanceOf(to);
    const newAllowance = await contract.allowance(from, signer.address);

    console.log(`\n📊 Source balance after: ${ethers.formatUnits(balanceFrom, 18)} GenZ`);
    console.log(`📊 Recipient balance after: ${ethers.formatUnits(balanceTo, 18)} GenZ`);
    console.log(`📊 Remaining allowance: ${ethers.formatUnits(newAllowance, 18)} GenZ`);
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
