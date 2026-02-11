# GenerationZ Token Scripts

This directory contains utility scripts for interacting with the GenerationZ (GenZ) token on the Robinhood Testnet.

**Contract Address:** `0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16`

## Available Scripts

### 1. `info.js` - Get Contract Information
Displays comprehensive information about the contract and current account.

```bash
npx hardhat run scripts/info.js --network robinhood
```

**Output:**
- Token name, symbol, decimals, total supply
- Contract address and network info
- Current account balance and transaction count
- Network details (chain ID, block number, gas price)
- Supported token features

---

### 2. `balance.js` - Check Token Balance
Check the GenZ balance of any address (default: current account).

```bash
npx hardhat run scripts/balance.js --network robinhood
# Or check a specific address:
CHECK_ADDRESS=0x123... npx hardhat run scripts/balance.js --network robinhood
```

**Environment Variables:**
- `CHECK_ADDRESS`: Address to check (optional, defaults to deployer)

**Output:**
- Formatted balance in GenZ tokens
- Raw balance in wei
- Total supply
- Percentage of total supply

---

### 3. `transfer.js` - Transfer Tokens
Transfer GenZ tokens from your account to another address.

```bash
TRANSFER_TO=0x123... TRANSFER_AMOUNT=100 npx hardhat run scripts/transfer.js --network robinhood
```

**Environment Variables:**
- `TRANSFER_TO`: Recipient address (required)
- `TRANSFER_AMOUNT`: Amount in GenZ tokens (optional, default: 100)

**Output:**
- Pre-transfer balance
- Transaction hash
- Block confirmation
- Post-transfer balance

---

### 4. `transferFrom.js` - Transfer From Another Account
Transfer tokens from another address (requires prior approval).

```bash
TRANSFER_FROM=0x123... TRANSFER_TO=0x456... TRANSFER_AMOUNT=50 npx hardhat run scripts/transferFrom.js --network robinhood
```

**Environment Variables:**
- `TRANSFER_FROM`: Source address (required)
- `TRANSFER_TO`: Recipient address (required)
- `TRANSFER_AMOUNT`: Amount in GenZ tokens (optional, default: 100)

**Requirements:**
- The source address must have approved the spending limit for your account

**Output:**
- Current allowance
- Source account balance
- Transaction hash
- Updated balances after transfer

---

### 5. `approve.js` - Approve Token Spending
Approve another address to spend your tokens (required before using `transferFrom`).

```bash
APPROVE_SPENDER=0x123... APPROVE_AMOUNT=1000 npx hardhat run scripts/approve.js --network robinhood
```

**Environment Variables:**
- `APPROVE_SPENDER`: Address to approve (required)
- `APPROVE_AMOUNT`: Amount in GenZ tokens (optional, default: 1000)

**Output:**
- Current allowance before approval
- Transaction hash
- Block confirmation
- New allowance after approval

---

### 6. `burn.js` - Burn Tokens
Permanently remove tokens from circulation.

```bash
BURN_AMOUNT=100 npx hardhat run scripts/burn.js --network robinhood
```

**Environment Variables:**
- `BURN_AMOUNT`: Amount to burn in GenZ tokens (optional, default: 100)

**Output:**
- Balance before burn
- Total supply before burn
- Transaction hash
- Updated balance and total supply after burn
- Confirmation of successful burn

---

## Token Features

The GenerationZ token supports:

- **ERC20**: Standard token transfer functionality
- **ERC1363**: Allows smart contracts to handle token receives and perform actions
- **Burnable**: Tokens can be permanently removed from circulation
- **Flash Minting**: Flash loan support for decentralized finance
- **Permit**: Meta-transaction support (EIP-2612) for gasless approvals

---

## Common Use Cases

### 1. Send tokens to a friend
```bash
TRANSFER_TO=0x123... TRANSFER_AMOUNT=500 npx hardhat run scripts/transfer.js --network robinhood
```

### 2. Check your balance
```bash
npx hardhat run scripts/balance.js --network robinhood
```

### 3. Allow a contract to spend your tokens
```bash
APPROVE_SPENDER=0xcontract... APPROVE_AMOUNT=10000 npx hardhat run scripts/approve.js --network robinhood
```

### 4. Permanently remove tokens from circulation
```bash
BURN_AMOUNT=1000 npx hardhat run scripts/burn.js --network robinhood
```

---

## Environment Setup

Before running scripts, make sure:

1. Your `.env` file contains:
   - `PRIVATE_KEY`: Your wallet's private key
   - `ETHERSCAN_API_KEY`: For contract verification (optional)

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Hardhat for Robinhood Testnet in `hardhat.config.js`

---

## Network Configuration

All scripts use the Robinhood Testnet network. Make sure your `hardhat.config.js` includes:

```javascript
networks: {
  robinhood: {
    url: "https://testnet-rpc.chain.robinhood.com",
    accounts: [process.env.PRIVATE_KEY]
  }
}
```

---

## Tips & Tricks

- **View all transactions**: Visit the [Robinhood Testnet Explorer](https://explorer.testnet.chain.robinhood.com)
- **Get testnet tokens**: Request from the Robinhood faucet
- **View contract**: https://explorer.testnet.chain.robinhood.com/token/0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16
- **Gas optimization**: Review transaction costs before burning large amounts

---

## Troubleshooting

**"Insufficient balance" error**
- You don't have enough tokens. Check your balance with `balance.js`

**"Insufficient allowance" error**
- You haven't approved enough spending. Use `approve.js` first

**"Private key error"**
- Make sure `PRIVATE_KEY` is set in your `.env` file

**"Network error"**
- Verify your internet connection and the Robinhood Testnet RPC endpoint is accessible

---

## Support

For more information about the GenerationZ token contract, visit:
- Contract on Explorer: https://explorer.testnet.chain.robinhood.com/token/0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16
- Contract Source Code: See `contracts/GenerationZ.sol`
