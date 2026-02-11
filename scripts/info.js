/**
 * Get comprehensive contract information
 * Usage: npx hardhat run scripts/info.js --network robinhood
 */

const CONTRACT_ADDRESS = "0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16";

async function main() {
  const [signer] = await ethers.getSigners();
  const contract = await ethers.getContractAt("GenerationZ", CONTRACT_ADDRESS);

  console.log("ℹ️ Contract Information");
  console.log("━".repeat(50));

  try {
    // Basic contract info
    const name = await contract.name();
    const symbol = await contract.symbol();
    const decimals = await contract.decimals();
    const totalSupply = await contract.totalSupply();

    console.log(`\n📋 Token Details:`);
    console.log(`  Name: ${name}`);
    console.log(`  Symbol: ${symbol}`);
    console.log(`  Decimals: ${decimals}`);
    console.log(`  Total Supply: ${ethers.formatUnits(totalSupply, decimals)} GenZ`);

    // Contract address and network info
    console.log(`\n🔗 Contract Details:`);
    console.log(`  Contract Address: ${CONTRACT_ADDRESS}`);
    console.log(`  Network: Robinhood Testnet`);

    // Get current signer info
    const balance = await contract.balanceOf(signer.address);
    const nonce = await ethers.provider.getTransactionCount(signer.address);

    console.log(`\n👤 Current Account:`);
    console.log(`  Address: ${signer.address}`);
    console.log(`  GenZ Balance: ${ethers.formatUnits(balance, decimals)} GenZ`);
    console.log(`  Transaction Count: ${nonce}`);

    // Network details
    const network = await ethers.provider.getNetwork();
    const blockNumber = await ethers.provider.getBlockNumber();
    const gasPrice = await ethers.provider.getGasPrice();

    console.log(`\n🌐 Network Details:`);
    console.log(`  Network Name: ${network.name}`);
    console.log(`  Chain ID: ${network.chainId}`);
    console.log(`  Current Block: ${blockNumber}`);
    console.log(`  Gas Price: ${ethers.formatUnits(gasPrice, 9)} Gwei`);

    // ERC1363 support info
    console.log(`\n✨ Token Features:`);
    console.log(`  ✓ ERC20: Standard token`);
    console.log(`  ✓ ERC1363: Token receiving & callback support`);
    console.log(`  ✓ Burnable: Token burning capability`);
    console.log(`  ✓ Flash Minting: Flash loan support`);
    console.log(`  ✓ Permit: Meta-transaction support (EIP-2612)`);

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
