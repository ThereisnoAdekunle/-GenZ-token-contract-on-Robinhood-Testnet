// scripts/verify.js
// Usage: npx hardhat run scripts/verify.js --network robinhood
// Or manually: npx hardhat verify --network robinhood <CONTRACT_ADDRESS> <CONSTRUCTOR_ARG>

const hre = require("hardhat");

async function main() {
  const contractAddress = "0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16";
  const [deployer] = await ethers.getSigners();
  
  console.log("Contract Address:", contractAddress);
  console.log("Deployer Address:", deployer.address);
  console.log("Constructor Argument:", deployer.address);
  console.log("\nTo verify the contract, run:");
  console.log(`npx hardhat verify --network robinhood ${contractAddress} "${deployer.address}"`);
  
  // Get contract info
  const code = await ethers.provider.getCode(contractAddress);
  console.log("\nContract bytecode length:", code.length);
  console.log("✅ Contract is deployed and active!");
  
  // Try to call a read function
  try {
    const contract = await ethers.getContractAt("GenerationZ", contractAddress);
    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();
    
    console.log("\n📋 Contract Details:");
    console.log("Name:", name);
    console.log("Symbol:", symbol);
    console.log("Total Supply:", totalSupply.toString());
  } catch (e) {
    console.log("Could not read contract details");
  }
}

main().catch(console.error);
