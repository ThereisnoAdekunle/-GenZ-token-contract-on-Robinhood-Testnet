# GenerationZ (GenZ) Token - Robinhood Testnet

A comprehensive ERC20 token implementation with advanced features, deployed and verified on the Robinhood Testnet chain.

![Status](https://img.shields.io/badge/status-verified-brightgreen)
![Network](https://img.shields.io/badge/network-Robinhood%20Testnet-blue)
![Contract](https://img.shields.io/badge/contract-ERC20%2B-orange)

## 🎯 Overview

GenerationZ is a feature-rich ERC20 token built with OpenZeppelin contracts, combining multiple advanced functionalities:

- **Standard ERC20**: Complete token transfer functionality
- **ERC1363**: Token callbacks and smart contract integration
- **Burnable**: Permanent token removal from circulation
- **Flash Minting**: Flash loan support for DeFi
- **Permit (EIP-2612)**: Gasless meta-transaction approvals

**Total Supply**: 1,000,000,000 GenZ tokens

## 📋 Quick Links

- **Contract Address**: `0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16`
- **Explorer**: https://explorer.testnet.chain.robinhood.com/token/0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16
- **Network**: Robinhood Testnet
- **GitHub**: https://github.com/ThereisnoAdekunle/-GenZ-token-contract-on-Robinhood-Testnet

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 16.0.0
npm or yarn
```

### Installation

```bash
# Clone the repository
git clone https://github.com/ThereisnoAdekunle/-GenZ-token-contract-on-Robinhood-Testnet.git
cd rh-testnet

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
PRIVATE_KEY=your_wallet_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key_optional
```

**⚠️ Never commit your `.env` file or expose your private key!**

## 📝 Smart Contract

### GenerationZ.sol

```solidity
contract GenerationZ is ERC20, ERC20Burnable, ERC1363, ERC20Permit, ERC20FlashMint {
    constructor(address recipient)
        ERC20("Generation Z", "GenZ")
        ERC20Permit("Generation Z")
    {
        _mint(recipient, 1000000000 * 10 ** decimals());
    }
}
```

**Contract Features:**
- Initial mint of 1 billion tokens to deployer
- Burnable tokens capability
- ERC1363 callbacks support
- EIP-2612 Permit functionality
- Flash minting capabilities

## 🛠️ Available Scripts

Navigate to the `scripts/` directory for all interaction scripts.

### `info.js` - Contract Information
```bash
npx hardhat run scripts/info.js --network robinhood
```
Displays comprehensive contract and account details.

### `balance.js` - Check Balance
```bash
npx hardhat run scripts/balance.js --network robinhood
CHECK_ADDRESS=0x123... npx hardhat run scripts/balance.js --network robinhood
```
Check GenZ token balance for any address.

### `transfer.js` - Transfer Tokens
```bash
TRANSFER_TO=0x123... TRANSFER_AMOUNT=100 npx hardhat run scripts/transfer.js --network robinhood
```
Transfer tokens from your account.

### `approve.js` - Approve Spending
```bash
APPROVE_SPENDER=0x123... APPROVE_AMOUNT=1000 npx hardhat run scripts/approve.js --network robinhood
```
Approve another address to spend your tokens.

### `transferFrom.js` - Transfer From Another
```bash
TRANSFER_FROM=0x123... TRANSFER_TO=0x456... TRANSFER_AMOUNT=50 npx hardhat run scripts/transferFrom.js --network robinhood
```
Transfer tokens from another address (requires approval).

### `burn.js` - Burn Tokens
```bash
BURN_AMOUNT=100 npx hardhat run scripts/burn.js --network robinhood
```
Permanently remove tokens from circulation.

## 📚 Detailed Documentation

See [scripts/README.md](./scripts/README.md) for comprehensive documentation on all available scripts and usage examples.

## 🔗 Network Configuration

The project is configured for Robinhood Testnet. Update `hardhat.config.js` with your network settings:

```javascript
networks: {
  robinhood: {
    url: process.env.ROBINHOOD_RPC_URL || "https://testnet-rpc.chain.robinhood.com",
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
  }
}
```

## 📦 Project Structure

```
rh-testnet/
├── contracts/
│   └── GenerationZ.sol          # Main token contract
├── scripts/
│   ├── deploy.js                # Deployment script
│   ├── verify.js                # Verification script
│   ├── transfer.js              # Token transfer
│   ├── balance.js               # Check balance
│   ├── approve.js               # Approve spending
│   ├── burn.js                  # Burn tokens
│   ├── transferFrom.js          # Transfer from another account
│   ├── info.js                  # Contract info
│   └── README.md                # Scripts documentation
├── artifacts/                   # Compiled contracts
├── cache/                       # Hardhat cache
├── hardhat.config.js            # Hardhat configuration
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🧪 Testing

### Compile Contracts
```bash
npx hardhat compile
```

### Get Contract Info
```bash
npx hardhat run scripts/info.js --network robinhood
```

### Check Balance
```bash
npx hardhat run scripts/balance.js --network robinhood
```

## 📤 Deployment

### Deploy to Robinhood Testnet
```bash
npx hardhat run scripts/deploy.js --network robinhood
```

### Verify Contract
```bash
npx hardhat run scripts/verify.js --network robinhood
```

Contract is already verified at: https://explorer.testnet.chain.robinhood.com/token/0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16

## 🔐 Security Considerations

1. **Private Keys**: Never share or commit private keys
2. **Token Approval**: Review spending limits before approving
3. **Transactions**: Verify gas prices and amounts before sending
4. **Testnet**: This is testnet - tokens have no real value

## 📊 Token Metrics

| Property | Value |
|----------|-------|
| Name | Generation Z |
| Symbol | GenZ |
| Decimals | 18 |
| Total Supply | 1,000,000,000 |
| Contract Address | 0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16 |
| Network | Robinhood Testnet |
| Status | ✅ Verified |

## 🔍 Verification

The contract has been verified on the Robinhood Testnet explorer:
- **Verification Status**: ✅ Verified
- **Compiler Version**: 0.8.27
- **Optimization**: Enabled
- **Optimizer Runs**: 200

View on Explorer: https://explorer.testnet.chain.robinhood.com/token/0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16?tab=contract

## 🚦 Common Operations

### Send GenZ to a friend
```bash
TRANSFER_TO=0xRecipientAddress TRANSFER_AMOUNT=500 npx hardhat run scripts/transfer.js --network robinhood
```

### Check your balance
```bash
npx hardhat run scripts/balance.js --network robinhood
```

### Approve a contract or address
```bash
APPROVE_SPENDER=0xContractAddress APPROVE_AMOUNT=10000 npx hardhat run scripts/approve.js --network robinhood
```

### Burn tokens
```bash
BURN_AMOUNT=1000 npx hardhat run scripts/burn.js --network robinhood
```

## 🐛 Troubleshooting

### "Insufficient balance" error
- Check your balance: `npx hardhat run scripts/balance.js --network robinhood`
- Request testnet tokens if needed

### "Insufficient allowance" error
- Approve the spending first using `approve.js`

### "Private key error"
- Ensure `PRIVATE_KEY` is set in `.env` file

### "Network error"
- Verify internet connection
- Check Robinhood Testnet RPC endpoint status

## 📞 Support & Resources

- **Robinhood Testnet Explorer**: https://explorer.testnet.chain.robinhood.com
- **Hardhat Documentation**: https://hardhat.org
- **OpenZeppelin Contracts**: https://docs.openzeppelin.com/contracts
- **ERC20 Standard**: https://eips.ethereum.org/EIPS/eip-20

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests or open issues for suggestions and improvements.

## 📝 Changelog

### v1.0.0 (Initial Release)
- ✅ GenerationZ token contract deployed
- ✅ Contract verified on Robinhood Testnet
- ✅ Comprehensive utility scripts
- ✅ Full documentation

## 👤 Author

**Adekunle**
- GitHub: [@ThereisnoAdekunle](https://github.com/ThereisnoAdekunle)

---

**Last Updated**: February 11, 2026
**Network**: Robinhood Testnet
**Status**: ✅ Active & Verified
