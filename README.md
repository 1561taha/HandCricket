# Somnia Hand Cricket 🏏

A blockchain-powered hand cricket game built on the Somnia testnet. Players can compete in strategic finger-based cricket matches with on-chain leaderboards, statistics, and achievements. Experience the perfect blend of traditional cricket strategy and modern blockchain technology.

## 🚀 Features

### Core Gameplay
- **Strategic Hand Cricket**: Classic finger-based cricket with numbers 1-6
- **Multiple Game Modes**: Classic, Super Over, and Fifer modes
- **Smart AI Opponent**: Intelligent computer player with pattern recognition
- **Real-time Match Commentary**: Live updates and game events
- **Interactive UI**: Modern, responsive design with smooth animations

### Blockchain Integration
- **On-Chain Data Storage**: All game data stored on Somnia testnet
- **Global Leaderboard**: Real-time ranking system with player statistics
- **Unique Player Profiles**: Permanent on-chain nicknames and achievements
- **Transaction History**: Transparent record of all game outcomes
- **Wallet Integration**: MetaMask and Web3 wallet support

### Advanced Features
- **Network Detection**: Automatic Somnia testnet detection and switching
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Game State Management**: Robust state handling with React Context
- **Error Handling**: Comprehensive error management and user feedback
- **Performance Optimized**: Fast loading and smooth gameplay

## 🎮 Game Modes

### Classic Mode
- **5 wickets** per side
- **5 overs (30 balls)** per innings
- Traditional cricket format with two innings
- **Highest total score** wins the match
- Perfect for strategic gameplay

### Super Over
- **1 over (6 balls)** per side
- **2 wickets** per side
- Fast-paced action-packed format
- Ideal for quick games and tournaments
- High-pressure situations

### Fifer Mode
- **No over limit** - play until 5 wickets lost
- **5 wickets** per side
- Strategic gameplay with endless possibilities
- Can win by chasing target before losing all wickets
- Perfect for extended sessions

## 🛠️ Getting Started

### Prerequisites
- **MetaMask** or any Web3-compatible wallet
- **Test STT tokens** (available from Somnia faucet)
- **Modern browser** with Web3 support (Chrome, Firefox, Edge)
- **Node.js** (version 14 or higher)

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd handcricket-react
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm start
```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

### Setup Instructions

1. **Connect Wallet**: 
   - Click "Connect Wallet" button
   - Ensure you're on Somnia testnet (Chain ID: 50312)

2. **Network Configuration**:
   - If not on Somnia testnet, the app will prompt you to switch
   - Add Somnia testnet to your wallet if not already added

3. **Register Nickname**:
   - Choose a unique nickname (stored permanently on-chain)
   - This becomes your permanent player identity

4. **Get Test Tokens**:
   - Visit the Somnia faucet to get test STT for gas fees
   - Ensure you have sufficient tokens for transactions

5. **Start Playing**:
   - Choose your preferred game mode
   - Begin your cricket journey!

## 🔧 Smart Contract

The game uses a smart contract deployed on Somnia testnet:

**Contract Address**: `0xB5B004edbF056A94acA947adB565F4d594247EA8`

### Key Functions

#### Player Management
- `registerNickname(string nickname)`: Register a unique player nickname
- `getPlayer(address addr)`: Retrieve individual player data and statistics

#### Game Statistics
- `updateStats(uint256 score, bool win)`: Update player statistics after each game
- `getTopPlayers()`: Retrieve global leaderboard with top performers
- `getMVPOfWeek()`: Get the current MVP player of the week

#### Data Retrieval
- `allNicknames`: Get list of all registered nicknames
- `nicknameToAddress`: Map nicknames to wallet addresses
- `players`: Access player data by wallet address

### Contract Structure

```solidity
struct Player {
    string nickname;
    address playerAddress;
    uint256 gamesPlayed;
    uint256 wins;
    uint256 losses;
    uint256 highestScore;
    uint256 totalRuns;
    bool exists;
}
```

## 🏗️ Technology Stack

### Frontend
- **React.js 18**: Modern React with hooks and functional components
- **Styled Components**: CSS-in-JS for component-based styling
- **React Router**: Client-side routing and navigation
- **Context API**: Global state management for game logic

### Blockchain
- **Somnia Testnet**: Layer 1 blockchain for game data storage
- **Solidity**: Smart contract development language
- **Web3.js**: Ethereum JavaScript API for blockchain interaction
- **MetaMask**: Wallet integration and transaction signing

### Development Tools
- **Node.js**: JavaScript runtime environment
- **npm**: Package manager for dependencies
- **Create React App**: Development environment setup
- **ESLint**: Code quality and consistency

## 🌐 Somnia Testnet Configuration

### Network Details
- **Network Name**: Somnia Testnet
- **Chain ID**: 50312 (0xc488 in hex)
- **RPC URL**: https://dream-rpc.somnia.network
- **Currency Symbol**: STT (Somnia Test Token)
- **Block Explorer**: https://somnia-devnet.socialscan.io
- **Decimals**: 18

### Adding to MetaMask
1. Open MetaMask
2. Click "Add Network"
3. Enter the above details
4. Save and switch to Somnia testnet

## 🎯 Game Rules

### Basic Concept
Players show numbers from 1-6 using finger signals, similar to cricket scoring. The game combines strategy, pattern recognition, and luck.

### Batting Phase
- **Choose a number** (1-6) using finger signals
- **If your number ≠ computer's**: Score runs equal to your number
- **If your number = computer's**: You're OUT! (lose a wicket)
- **Strategy**: Predict computer's bowling pattern

### Bowling Phase
- **Choose a number** (1-6) to bowl
- **If your number = computer's**: WICKET! (computer loses a wicket)
- **If your number ≠ computer's**: Computer scores runs equal to their number
- **Strategy**: Analyze computer's batting patterns

### Hand Signals Guide
- ☝️ **1 finger** = 1 run
- ✌️ **2 fingers** = 2 runs
- 🤟 **3 fingers** = 3 runs
- 🖖 **4 fingers** = 4 runs
- 🖐️ **5 fingers** = 5 runs
- 🤙 **6 fingers** = 6 runs

### Game Flow
1. **Toss**: Choose heads or tails to determine batting/bowling order
2. **First Innings**: Set a target score
3. **Second Innings**: Chase the target
4. **Result**: Winner determined by highest score

## 🤖 AI System

The game features an intelligent computer opponent with:

### Pattern Recognition
- **60% chance** to match player's recent choices when bowling
- **70% chance** to avoid player's recent choices when batting
- **Learning capability** from player's patterns

### Strategic Behavior
- **Adaptive gameplay** based on match situation
- **Pressure handling** in critical moments
- **Balanced difficulty** for engaging gameplay

## 📱 User Interface

### Main Components
- **Game Container**: Central gameplay area with number selection
- **Scoreboard**: Real-time score and wicket display
- **Match Commentary**: Live game events and updates
- **Leaderboard**: Global player rankings and statistics
- **Player Profile**: Individual player data and achievements
- **Wallet Connect**: Blockchain wallet integration

### Responsive Design
- **Desktop**: Full-featured interface with sidebar layout
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly interface with simplified navigation

## 🚀 Available Scripts

### Development
```bash
npm start          # Runs the app in development mode
npm test           # Launches the test runner
npm run build      # Builds the app for production
npm run eject      # Ejects from Create React App (one-way operation)
```

### Production
```bash
npm run build      # Creates optimized production build
npm run serve      # Serves the production build locally
```

## 🔍 Troubleshooting

### Common Issues

#### Network Problems
- **"Wrong Network" Error**
  - Ensure you're connected to Somnia testnet (Chain ID: 50312)
  - Use the "Switch to Somnia Testnet" button in the app
  - Manually add Somnia testnet to MetaMask if needed

#### Transaction Issues
- **Transaction Failures**
  - Check you have enough test STT for gas fees
  - Verify network connection is stable
  - Try increasing gas limit if needed

#### Wallet Problems
- **Wallet Connection Issues**
  - Make sure MetaMask is installed and unlocked
  - Try refreshing the page
  - Check if wallet is connected to correct network

#### Game Issues
- **Nickname Registration Fails**
  - Ensure the nickname is unique (not already taken)
  - Check you have sufficient gas fees
  - Try a different nickname

#### Performance Issues
- **Slow Loading**
  - Check internet connection
  - Clear browser cache
  - Try refreshing the page

### Error Messages

| Error | Solution |
|-------|----------|
| "User rejected transaction" | User cancelled the transaction - try again |
| "Insufficient funds" | Get more test STT from faucet |
| "Network not supported" | Switch to Somnia testnet |
| "Contract not found" | Check if contract is deployed correctly |

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Submit a pull request**

### Code Guidelines
- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

### Areas for Contribution
- **UI/UX improvements**
- **Game mechanics enhancements**
- **Smart contract optimizations**
- **Documentation updates**
- **Bug fixes and testing**

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- **In-App Guide**: Check the "How to Play" section for detailed instructions
- **FAQ Section**: Common questions and answers
- **Community**: Join our community discussions

### Contact Information
- **Issues**: Report bugs and feature requests via GitHub Issues
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Email**: Contact the development team for direct support

### Resources
- **Somnia Documentation**: [https://docs.somnia.network](https://docs.somnia.network)
- **MetaMask Documentation**: [https://docs.metamask.io](https://docs.metamask.io)
- **React Documentation**: [https://reactjs.org/docs](https://reactjs.org/docs)

## 🔮 Future Roadmap

### Planned Features
- **Multiplayer Mode**: Real-time player vs player matches
- **Tournament System**: Organized competitions with prizes
- **Achievement System**: Badges and rewards for milestones
- **Mobile App**: Native iOS and Android applications
- **Advanced AI**: Multiple difficulty levels and learning algorithms

### Technical Improvements
- **Layer 2 Integration**: Faster and cheaper transactions
- **Cross-Chain Support**: Multi-blockchain compatibility
- **NFT Integration**: Player cards and collectibles
- **API Development**: Public API for third-party integrations

## ⚠️ Important Notes

### Testnet Application
- This is a **testnet application** for demonstration purposes
- All tokens and data are for **testing only** and have no real value
- Do not use real funds or expect monetary returns

### Security Considerations
- **Never share your private keys** or seed phrases
- **Use only test wallets** for this application
- **Verify contract addresses** before transactions
- **Keep your wallet software updated**

### Disclaimer
This software is provided "as is" without warranty of any kind. Use at your own risk. The developers are not responsible for any loss of funds or data.

---

**🎉 Enjoy playing Somnia Hand Cricket! May the best strategist win! 🏏**

*Built with ❤️ for the Somnia blockchain community*
