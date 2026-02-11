async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);
  
  // Get current nonce
  const nonce = await ethers.provider.getTransactionCount(deployer.address);
  console.log("Current nonce:", nonce);

  const GenerationZ = await ethers.getContractFactory("GenerationZ");
  const contract = await GenerationZ.deploy(deployer.address);

  await contract.deployed();

  console.log("✅ GenerationZ deployed to:", contract.address);
  console.log("📝 Transaction hash:", contract.deployTransaction.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
