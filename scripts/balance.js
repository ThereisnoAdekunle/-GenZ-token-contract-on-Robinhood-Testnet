/**
 * Check GenZ token balance
 * Usage: npx hardhat run scripts/balance.js --network robinhood
 * 
 * Set environment variable:
 * - CHECK_ADDRESS: Address to check balance (default: deployer)
 */

const CONTRACT_ADDRESS = "0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16";

async function main() {
  const contract = await ethers.getContractAt("GenerationZ", CONTRACT_ADDRESS);
  const [signer] = await ethers.getSigners();
  
  const address = process.env.CHECK_ADDRESS || signer.address;

  console.log("💰 Balance Checker");
  console.log("━".repeat(50));
  console.log(`Address: ${address}`);
  console.log("━".repeat(50));

  try {
    const balance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    const formattedBalance = ethers.formatUnits(balance, decimals);

    console.log(`\n✅ Balance: ${formattedBalance} GenZ`);
    console.log(`📦 Raw balance (wei): ${balance.toString()}`);

    // Also get total supply info
    const totalSupply = await contract.totalSupply();
    const formattedSupply = ethers.formatUnits(totalSupply, decimals);
    console.log(`\n📊 Total Supply: ${formattedSupply} GenZ`);

    const percentage = (Number(balance) / Number(totalSupply) * 100).toFixed(4);
    console.log(`📈 Percentage of supply: ${percentage}%`);

  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
