# GenerationZ dApp Guide

A full-featured decentralized application (dApp) for interacting with the GenerationZ (GenZ) token on Robinhood Testnet.

## 🚀 Quick Start

### Option 1: Open Locally (Easiest)
1. Navigate to your project folder: `c:\Users\user\Desktop\Robinhood Testnet\rh-testnet\`
2. Open `dapp.html` in your web browser
3. Install **MetaMask** extension if you haven't already
4. Connect your wallet and start using the dApp!

### Option 2: Deploy to Web
You can deploy this dApp to free hosting services:
- **Vercel**: Deploy in 1 click from GitHub
- **Netlify**: Drag & drop the HTML file
- **GitHub Pages**: Free hosting from your repo
- **Fleek**: IPFS-based hosting

## 🎯 Features

### 1. **Wallet Connection**
- Connect MetaMask wallet
- Automatic network detection (Robinhood Testnet)
- Real-time balance updates
- Multi-account support

### 2. **Single Transfer**
- Send GenZ tokens to any address
- Real-time balance verification
- Transaction hash display
- Success/error notifications

### 3. **Bulk Transfer** ⭐
- Send tokens to multiple addresses at once
- Paste addresses (one per line)
- Real-time progress tracking
- Individual transaction confirmation

### 4. **Approve Spending**
- Approve addresses/contracts to spend your tokens
- Set custom spending limits
- Useful for DeFi interactions

### 5. **Token Burning**
- Permanently remove tokens from circulation
- Confirmation dialog for safety
- Real-time supply updates

### 6. **Contract Information**
- View total supply
- Check token decimals
- Access contract details
- View verified contract link

## 📋 System Requirements

### Browser
- Chrome, Firefox, Brave, or Edge (any modern browser)
- Internet connection

### Wallet
- MetaMask wallet extension
- Small amount of RON for gas fees (on Robinhood Testnet)

### Network
- Robinhood Testnet chain
- dApp auto-detects and prompts to switch if needed

## 🔐 Security Notes

⚠️ **Important Security Information:**

1. **MetaMask Security**
   - Never share your private key
   - Always verify contract addresses
   - MetaMask handles all transactions securely

2. **Contract Address**
   - Official Contract: `0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16`
   - Always verify this address before interacting

3. **Transaction Verification**
   - Check transaction hash on [Robinhood Explorer](https://explorer.testnet.chain.robinhood.com)
   - Verify amounts before confirming transactions
   - Burned tokens cannot be recovered

4. **Gas Fees**
   - All transactions cost gas (paid in RON)
   - Check gas price before sending large transactions
   - Failed transactions still consume gas

## 📖 How to Use Each Feature

### Connect Your Wallet

1. Click **"Connect MetaMask"** button
2. MetaMask will pop up - select your account
3. Approve the connection request
4. Status will show "Connected"

### Send Single Transfer

1. Paste recipient address in **"Recipient Address"** field
2. Enter amount in **"Amount"** field
3. Click **"Send Tokens"** button
4. Confirm transaction in MetaMask
5. Wait for confirmation

### Perform Bulk Transfer

1. Set **"Amount per Address"** (e.g., 1200)
2. Paste recipient addresses in textarea (one per line):
   ```
   0xF691446e9386DEDF7364340fE35B09E8fE884d81
   0xa160781E2535C479D53120086De58e859EA17444
   0x77AD59Bf36E07b0a896dA6d448374F967013472C
   ```
3. Click **"Send to Multiple Addresses"**
4. Confirm each transaction as prompted
5. Monitor progress in real-time

### Approve Spending

1. Enter spender address (contract or wallet)
2. Enter amount to approve
3. Click **"Approve"**
4. Confirm in MetaMask
5. Use approved amount in DeFi protocols

### Burn Tokens

1. Enter amount to burn
2. Click **"Burn Tokens"**
3. Confirm the warning dialog
4. Approve in MetaMask
5. Tokens are permanently removed

## 🌐 Network Configuration

The dApp is configured for **Robinhood Testnet**:

| Property | Value |
|----------|-------|
| Chain ID | 46630 |
| RPC URL | https://explorer.testnet.chain.robinhood.com/rpc |
| Currency | RON |
| Block Explorer | https://explorer.testnet.chain.robinhood.com |

**Auto-switching**: The dApp will prompt you to switch to Robinhood Testnet if you're on a different chain.

## 🐛 Troubleshooting

### "MetaMask Not Found"
- Install MetaMask: https://metamask.io
- Refresh the page after installation
- Make sure MetaMask is enabled

### "Wrong Network"
- Click "Connect MetaMask" again
- Accept the network switch request
- Status should show "✓ Robinhood Testnet"

### "Transaction Failed"
- Insufficient balance? Check your GenZ balance
- Insufficient gas? You need RON for gas fees
- Invalid address? Verify recipient address format
- Check [Explorer](https://explorer.testnet.chain.robinhood.com) for error details

### "Balance Not Updating"
- Click "Refresh Info" in Contract Info card
- Wait a few seconds for blockchain confirmation
- Reload the page

### Slow Transactions
- Network congestion - wait and try again
- Check gas price on [Explorer](https://explorer.testnet.chain.robinhood.com)
- Batch transfers may take longer

## 📱 Mobile Support

The dApp works on mobile with MetaMask Mobile browser:

1. Install MetaMask Mobile app
2. Open the dApp in MetaMask's in-app browser
3. Same features available as desktop

## 💾 Data Privacy

- No data stored on our servers
- All transactions broadcast to blockchain
- MetaMask handles your keys (not transmitted)
- Browser-based, fully decentralized

## 🔗 Useful Links

- **Contract on Explorer**: https://explorer.testnet.chain.robinhood.com/token/0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16
- **Robinhood Testnet**: https://explorer.testnet.chain.robinhood.com
- **MetaMask**: https://metamask.io
- **Web3.js Docs**: https://web3js.readthedocs.io

## 🚀 Advanced Usage

### Deploying Your Own dApp

1. Fork the repository
2. Host on Vercel/Netlify/GitHub Pages
3. Customize colors and styling
4. Add additional features

### Customizing the dApp

Edit `dapp.html`:
- Change colors in CSS `style` section
- Add more contract methods
- Customize UI layout
- Add additional features

Example: Adding a new function:
```javascript
async function myNewFunction() {
    const result = await contract.methods.myMethod().call();
    console.log(result);
}
```

## 📞 Support

- Check Robinhood documentation
- Review Web3.js documentation
- Check transaction hash on Explorer for details
- Verify contract address before use

## 📜 License

This dApp is open source and free to use, modify, and distribute.

---

**Version**: 1.0.0  
**Last Updated**: February 11, 2026  
**Network**: Robinhood Testnet  
**Contract Address**: 0x63C8BD63563B9d6A1e698585bC8f86D1249ADC16
