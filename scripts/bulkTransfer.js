/**
 * Bulk Transfer - Send the same amount of GenZ tokens to multiple addresses
 * Usage: npx hardhat run scripts/bulkTransfer.js --network robinhood
 * 
 * Create a bulkTransferList.json file with recipient addresses
 * Or set BULK_TRANSFER_FILE environment variable to point to a custom file
 */

const fs = require('fs');
const path = require('path');

const CONTRACT_ADDRESS = "0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16";

async function main() {
  const [signer] = await ethers.getSigners();
  
  // Get file path from env or use default
  const fileName = process.env.BULK_TRANSFER_FILE || 'bulkTransferList.json';
  const filePath = path.join(__dirname, `../${fileName}`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: File not found: ${fileName}`);
    console.log(`\n📋 Create a ${fileName} file with the following structure:`);
    console.log(JSON.stringify({
      amount: "100",
      recipients: [
        "0x123...",
        "0x456...",
        "0x789..."
      ]
    }, null, 2));
    process.exit(1);
  }

  // Read and parse the file
  let transferData;
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    transferData = JSON.parse(fileContent);
  } catch (error) {
    console.error("❌ Error parsing JSON file:", error.message);
    process.exit(1);
  }

  // Validate data structure
  if (!transferData.amount || !transferData.recipients || !Array.isArray(transferData.recipients)) {
    console.error("❌ Invalid file structure. Must contain 'amount' and 'recipients' array");
    process.exit(1);
  }

  const { amount, recipients } = transferData;
  const amountInWei = ethers.parseUnits(amount, 18);
  const totalTokens = ethers.parseUnits((parseFloat(amount) * recipients.length).toString(), 18);

  console.log("📦 Bulk Transfer Script");
  console.log("━".repeat(60));
  console.log(`From: ${signer.address}`);
  console.log(`Amount per recipient: ${amount} GenZ`);
  console.log(`Number of recipients: ${recipients.length}`);
  console.log(`Total tokens to send: ${ethers.formatUnits(totalTokens, 18)} GenZ`);
  console.log("━".repeat(60));

  try {
    const contract = await ethers.getContractAt("GenerationZ", CONTRACT_ADDRESS);

    // Check balance before transfer
    const balanceBefore = await contract.balanceOf(signer.address);
    console.log(`\n📊 Balance before: ${ethers.formatUnits(balanceBefore, 18)} GenZ`);

    if (balanceBefore < totalTokens) {
      console.error(`\n❌ Insufficient balance!`);
      console.error(`Need: ${ethers.formatUnits(totalTokens, 18)} GenZ`);
      console.error(`Have: ${ethers.formatUnits(balanceBefore, 18)} GenZ`);
      process.exit(1);
    }

    // Validate addresses
    console.log(`\n🔍 Validating addresses...`);
    for (let i = 0; i < recipients.length; i++) {
      const addr = recipients[i];
      if (!ethers.isAddress(addr)) {
        console.error(`❌ Invalid address at index ${i}: ${addr}`);
        process.exit(1);
      }
    }
    console.log(`✅ All addresses valid`);

    // Execute transfers
    console.log(`\n⏳ Starting bulk transfer of ${amount} GenZ to ${recipients.length} addresses...`);
    console.log("━".repeat(60));

    let successCount = 0;
    let failCount = 0;
    const txHashes = [];

    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];
      try {
        process.stdout.write(`[${i + 1}/${recipients.length}] Transferring to ${recipient.substring(0, 10)}...`);
        
        const tx = await contract.transfer(recipient, amountInWei);
        txHashes.push({ recipient, hash: tx.hash });
        
        console.log(` ✅ TX: ${tx.hash}`);
        successCount++;

      } catch (error) {
        console.log(` ❌ Failed: ${error.message.substring(0, 50)}`);
        failCount++;
      }
    }

    console.log("━".repeat(60));

    // Wait for all transactions to be mined
    console.log(`\n⏳ Waiting for confirmations...`);
    const receipts = [];
    for (const { recipient, hash } of txHashes) {
      try {
        const receipt = await ethers.provider.waitForTransaction(hash);
        receipts.push({ recipient, receipt });
      } catch (error) {
        console.warn(`⚠️ Failed to wait for TX ${hash}`);
      }
    }

    // Check final balance
    const balanceAfter = await contract.balanceOf(signer.address);
    console.log(`\n📊 Balance after: ${ethers.formatUnits(balanceAfter, 18)} GenZ`);

    // Summary
    console.log(`\n📋 Transfer Summary`);
    console.log("━".repeat(60));
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`📍 Block confirmations: ${receipts.length}`);
    console.log("━".repeat(60));

    if (failCount === 0) {
      console.log(`\n✨ All ${successCount} transfers completed successfully!`);
    } else {
      console.log(`\n⚠️ Completed with ${failCount} failures`);
    }

  } catch (error) {
    console.error("❌ Bulk transfer failed:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
