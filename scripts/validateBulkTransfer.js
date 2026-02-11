/**
 * Bulk Transfer - Standalone version that prepares the transaction list
 * This generates the transaction data without requiring RPC connection during validation
 */

const fs = require('fs');
const path = require('path');

const CONTRACT_ADDRESS = "0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16";

async function main() {
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

  console.log("📦 Bulk Transfer - Validation Report");
  console.log("━".repeat(70));
  console.log(`Contract Address: ${CONTRACT_ADDRESS}`);
  console.log(`Amount per recipient: ${amount} GenZ`);
  console.log(`Number of recipients: ${recipients.length}`);
  console.log(`Total tokens needed: ${(parseFloat(amount) * recipients.length)} GenZ`);
  console.log("━".repeat(70));

  // Validate addresses
  console.log(`\n🔍 Validating ${recipients.length} addresses...`);
  
  let validCount = 0;
  let invalidCount = 0;
  const invalidAddresses = [];

  for (let i = 0; i < recipients.length; i++) {
    const addr = recipients[i];
    // Simple Ethereum address validation (starts with 0x, 40 hex chars)
    const isValid = /^0x[a-fA-F0-9]{40}$/.test(addr);
    
    if (isValid) {
      validCount++;
    } else {
      invalidCount++;
      invalidAddresses.push({ index: i, address: addr });
    }
  }

  console.log(`✅ Valid addresses: ${validCount}`);
  
  if (invalidCount > 0) {
    console.log(`❌ Invalid addresses: ${invalidCount}`);
    console.log("\n Invalid address details:");
    invalidAddresses.forEach(({ index, address }) => {
      console.log(`  [${index}]: ${address}`);
    });
    process.exit(1);
  }

  // Generate transaction summary
  console.log(`\n📊 Transaction Summary`);
  console.log("━".repeat(70));
  console.log(`Network: Robinhood Testnet (Chain ID: 46630)`);
  console.log(`Contract: ${CONTRACT_ADDRESS}`);
  console.log(`Method: transfer(address to, uint256 amount)`);
  console.log(`\nRecipients (${recipients.length}):`);
  
  recipients.forEach((addr, idx) => {
    console.log(`  ${(idx + 1).toString().padStart(3, ' ')}. ${addr}`);
  });

  console.log("\n" + "━".repeat(70));
  console.log(`✨ Validation complete! All ${recipients.length} addresses are valid.`);
  console.log(`\n💡 To execute the transfer, run:`);
  console.log(`   npx hardhat run scripts/bulkTransfer.js --network robinhood`);
  console.log("━".repeat(70));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
