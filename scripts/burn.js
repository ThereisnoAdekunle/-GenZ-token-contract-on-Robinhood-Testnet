/**
 * Burn GenZ tokens
 * Usage: npx hardhat run scripts/burn.js --network robinhood
 * 
 * Set environment variable:
 * - BURN_AMOUNT: Amount to burn (in GenZ tokens, not wei)
 */

const CONTRACT_ADDRESS = "0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16";

async function main() {
  const [signer] = await ethers.getSigners();
  const amount = process.env.BURN_AMOUNT || "100";

  console.log("🔥 Burn Script");
  console.log("━".repeat(50));
  console.log(`Account: ${signer.address}`);
  console.log(`Amount to burn: ${amount} GenZ`);
  console.log("━".repeat(50));

  try {
    const contract = await ethers.getContractAt("GenerationZ", CONTRACT_ADDRESS);
    const amountInWei = ethers.parseUnits(amount, 18);

    // Check balance before burn
    const balanceBefore = await contract.balanceOf(signer.address);
    console.log(`\n📊 Balance before: ${ethers.formatUnits(balanceBefore, 18)} GenZ`);

    if (balanceBefore < amountInWei) {
      console.error(`❌ Insufficient balance. Need ${amount} GenZ but have ${ethers.formatUnits(balanceBefore, 18)}`);
      process.exit(1);
    }

    // Get total supply before burn
    const supplyBefore = await contract.totalSupply();
    console.log(`📊 Total supply before: ${ethers.formatUnits(supplyBefore, 18)} GenZ`);

    // Execute burn
    console.log(`\n⏳ Burning ${amount} GenZ...`);
    const tx = await contract.burn(amountInWei);
    console.log(`📝 Transaction hash: ${tx.hash}`);

    // Wait for confirmation
    console.log("⏳ Waiting for confirmation...");
    const receipt = await tx.wait();
    console.log(`✅ Burn confirmed in block ${receipt.blockNumber}`);

    // Check balance and supply after burn
    const balanceAfter = await contract.balanceOf(signer.address);
    const supplyAfter = await contract.totalSupply();
    
    console.log(`\n📊 Balance after: ${ethers.formatUnits(balanceAfter, 18)} GenZ`);
    console.log(`📊 Total supply after: ${ethers.formatUnits(supplyAfter, 18)} GenZ`);
    console.log(`🔥 Successfully burned ${amount} GenZ!`);

  } catch (error) {
    console.error("❌ Burn failed:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
