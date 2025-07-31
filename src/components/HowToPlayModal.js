import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 5px;
  }
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  
  @media (max-width: 768px) {
    max-width: 95vw;
    max-height: 95vh;
    border-radius: 12px;
  }
  
  @media (max-width: 480px) {
    max-width: 98vw;
    max-height: 98vh;
    border-radius: 8px;
  }
`;

const ModalHeader = styled.div`
  position: sticky;
  top: 0;
  background: #fff;
  padding: 1.5rem 2rem 1rem 2rem;
  border-bottom: 1px solid #eee;
  border-radius: 18px 18px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  
  @media (max-width: 768px) {
    padding: 1rem 1.5rem 0.5rem 1.5rem;
    border-radius: 12px 12px 0 0;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1rem 0.5rem 1rem;
    border-radius: 8px 8px 0 0;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #43e97b 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const CloseButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 600;
  color: #495057;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #e9ecef;
    border-color: #adb5bd;
  }
  
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 0.8rem;
  }
`;

const ModalBody = styled.div`
  padding: 0 2rem 2rem 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem 1.5rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem 1rem 1rem;
  }
`;

const Section = styled.section`
  margin-bottom: 2.2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1.8rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.7rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.4rem;
  }
`;

const List = styled.ul`
  margin: 0 0 0.7rem 1.2rem;
  padding: 0;
  
  @media (max-width: 768px) {
    margin: 0 0 0.5rem 1rem;
  }
  
  @media (max-width: 480px) {
    margin: 0 0 0.4rem 0.8rem;
  }
`;

const Q = styled.div`
  font-weight: 700;
  margin-top: 1.1rem;
  
  @media (max-width: 768px) {
    margin-top: 0.8rem;
  }
  
  @media (max-width: 480px) {
    margin-top: 0.6rem;
  }
`;

const A = styled.div`
  margin-bottom: 0.7rem;
  
  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 0.4rem;
  }
`;

const HandSignals = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 1rem 0;
  
  @media (max-width: 768px) {
    gap: 10px;
    margin: 0.8rem 0;
  }
  
  @media (max-width: 480px) {
    gap: 8px;
    margin: 0.6rem 0;
  }
`;

const Signal = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  
  @media (max-width: 768px) {
    padding: 8px 10px;
    gap: 6px;
  }
  
  @media (max-width: 480px) {
    padding: 6px 8px;
    gap: 4px;
    font-size: 0.9rem;
  }
`;

const HandEmoji = styled.span`
  font-size: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const HowToPlayModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>How to Play Somnia Hand Cricket</Title>
          <CloseButton onClick={onClose}>✕ Close</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <Section>
            <SubTitle>🎮 What is Hand Cricket?</SubTitle>
            <p>
              <strong>Hand Cricket</strong> is a strategic finger-based game that simulates cricket using hand signals. 
              Players show numbers from 1-6 using their fingers, similar to how cricket runs are scored. 
              This blockchain version runs on the Somnia testnet, storing all your stats, nicknames, and leaderboard positions on-chain!
            </p>
          </Section>

          <Section>
            <SubTitle>🚀 Getting Started</SubTitle>
            <List>
              <li><strong>Connect Wallet:</strong> Use MetaMask or any Web3 wallet connected to Somnia testnet</li>
              <li><strong>Register Nickname:</strong> Choose a unique nickname that will be stored on the blockchain</li>
              <li><strong>Get Test Tokens:</strong> You'll need test STT tokens for gas fees (available from Somnia faucet)</li>
              <li><strong>Start Playing:</strong> Choose your game mode and begin your cricket journey!</li>
            </List>
          </Section>

          <Section>
            <SubTitle>🏏 Game Modes Explained</SubTitle>
            <List>
              <li><strong>Classic Mode:</strong> Traditional format with 5 wickets and 5 overs (30 balls) per innings. Highest total score wins!</li>
              <li><strong>Super Over:</strong> Fast-paced format with only 1 over (6 balls) and 2 wickets. Perfect for quick games!</li>
              <li><strong>Fifer Mode:</strong> No over limit - play until you lose all 5 wickets or successfully chase the target.</li>
            </List>
          </Section>

          <Section>
            <SubTitle>🕹️ Detailed Gameplay Rules</SubTitle>
            <p><strong>Basic Concept:</strong> Each turn, both you and the computer secretly choose a number from 1-6 and reveal them simultaneously.</p>
            
            <SubTitle>🏏 Batting Phase</SubTitle>
            <List>
              <li>Choose your batting number (1-6) using the number buttons</li>
              <li><strong>If numbers DON'T match:</strong> You score runs equal to your chosen number</li>
              <li><strong>If numbers DO match:</strong> You're OUT! You lose a wicket and your turn ends</li>
              <li>Continue batting until you're out or your innings ends</li>
              <li>Your total runs become the target for the computer to chase</li>
            </List>

            <SubTitle>🎯 Bowling Phase</SubTitle>
            <List>
              <li>Choose your bowling number (1-6) to try to get the computer out</li>
              <li><strong>If numbers match:</strong> It's a WICKET! Computer loses a wicket</li>
              <li><strong>If numbers don't match:</strong> Computer scores runs equal to their number</li>
              <li>Try to take all computer wickets or restrict their scoring</li>
              <li>If computer scores more than your total, you lose</li>
            </List>
          </Section>

          <Section>
            <SubTitle>✋ Hand Signals Guide</SubTitle>
            <p>Use these finger combinations to represent numbers:</p>
            <HandSignals>
              <Signal><HandEmoji>☝️</HandEmoji><span>1 finger</span></Signal>
              <Signal><HandEmoji>✌️</HandEmoji><span>2 fingers</span></Signal>
              <Signal><HandEmoji>🤟</HandEmoji><span>3 fingers</span></Signal>
              <Signal><HandEmoji>🖖</HandEmoji><span>4 fingers</span></Signal>
              <Signal><HandEmoji>🖐️</HandEmoji><span>5 fingers</span></Signal>
              <Signal><HandEmoji>🤙</HandEmoji><span>6 fingers</span></Signal>
            </HandSignals>
          </Section>

          <Section>
            <SubTitle>🏆 Match Flow & Scoring</SubTitle>
            <List>
              <li><strong>Toss:</strong> Start with a coin toss to decide who bats first</li>
              <li><strong>First Innings:</strong> Winner of toss chooses to bat or bowl first</li>
              <li><strong>Batting:</strong> Score as many runs as possible within your allocated overs/wickets</li>
              <li><strong>Target Setting:</strong> Your total runs become the target for the opponent</li>
              <li><strong>Second Innings:</strong> Opponent tries to chase your target</li>
              <li><strong>Result:</strong> Team with higher score wins (or team that successfully chases the target)</li>
            </List>
          </Section>

          <Section>
            <SubTitle>🔗 Blockchain Integration</SubTitle>
            <List>
              <li><strong>On-Chain Storage:</strong> Your nickname, stats, and leaderboard position are permanently stored on Somnia blockchain</li>
              <li><strong>Smart Contract:</strong> All game results are processed through smart contracts for transparency</li>
              <li><strong>Gas Fees:</strong> Each transaction (nickname registration, stats update) requires a small amount of test STT</li>
              <li><strong>Immutability:</strong> Your achievements and stats cannot be altered or deleted</li>
              <li><strong>Global Leaderboard:</strong> Real-time ranking system visible to all players worldwide</li>
            </List>
          </Section>

          <Section>
            <SubTitle>🏅 Leaderboard & Statistics</SubTitle>
            <List>
              <li><strong>Games Played:</strong> Total number of matches completed</li>
              <li><strong>Wins/Losses:</strong> Your win-loss record</li>
              <li><strong>Highest Score:</strong> Your best individual innings score</li>
              <li><strong>Total Runs:</strong> Cumulative runs scored across all games</li>
              <li><strong>Global Ranking:</strong> Your position on the worldwide leaderboard</li>
              <li><strong>Performance Score:</strong> Calculated rating based on wins, scores, and consistency</li>
            </List>
          </Section>

          <Section>
            <SubTitle>💡 Advanced Strategy Tips</SubTitle>
            <List>
              <li><strong>Pattern Recognition:</strong> Observe the computer's number choices to predict future moves</li>
              <li><strong>Risk Management:</strong> When batting, balance between scoring runs and avoiding getting out</li>
              <li><strong>Psychological Play:</strong> Mix up your numbers to avoid being predictable</li>
              <li><strong>Target Setting:</strong> When batting first, aim for a competitive total that's defendable</li>
              <li><strong>Chase Strategy:</strong> When chasing, prioritize survival early and accelerate later</li>
              <li><strong>Pressure Handling:</strong> Stay calm during crucial moments - the computer can't read your emotions!</li>
            </List>
          </Section>

          <Section>
            <SubTitle>🔧 Technical Requirements</SubTitle>
            <List>
              <li><strong>Wallet:</strong> MetaMask or any Web3-compatible wallet</li>
              <li><strong>Network:</strong> Must be connected to Somnia testnet</li>
              <li><strong>Tokens:</strong> Test STT tokens for gas fees (get from official Somnia faucet)</li>
              <li><strong>Browser:</strong> Modern browser with Web3 support</li>
              <li><strong>Connection:</strong> Stable internet connection for blockchain transactions</li>
            </List>
          </Section>

          <Section>
            <SubTitle>❓ FAQ & Troubleshooting</SubTitle>
            <Q>How do I get test STT tokens?</Q>
            <A>Visit the official Somnia testnet faucet to get free test tokens for gas fees. These tokens have no real value and are only for testing.</A>
            
            <Q>Why do I need to connect my wallet?</Q>
            <A>Your wallet is your identity in the game. It stores your nickname, tracks your stats, and ensures your achievements are permanently recorded on the blockchain.</A>
            
            <Q>What if my transaction fails?</Q>
            <A>Check that you have enough test STT for gas fees and that you're connected to the Somnia testnet. Increase gas limit if needed.</A>
            
            <Q>Can I change my nickname?</Q>
            <A>Nicknames are unique and permanently tied to your wallet address. To use a different nickname, you'll need to connect a different wallet.</A>
            
            <Q>Who can see my stats?</Q>
            <A>All players can view the public leaderboard and see your game statistics. This creates a competitive and transparent gaming environment.</A>
            
            <Q>Is the game fair?</Q>
            <A>Yes! The computer uses the same rules as you, and all game logic is transparent. Your success depends purely on strategy and skill.</A>
            
            <Q>What happens if I lose connection during a game?</Q>
            <A>If you disconnect during a game, you may lose your progress. Always ensure a stable connection before starting important matches.</A>
          </Section>

          <Section>
            <SubTitle>🎯 Pro Tips for Success</SubTitle>
            <List>
              <li>Practice regularly to understand the computer's patterns</li>
              <li>Don't always choose the same numbers - be unpredictable</li>
              <li>When batting, aim for higher numbers (4-6) to maximize scoring</li>
              <li>When bowling, try to read the computer's batting patterns</li>
              <li>Stay patient during chases - don't take unnecessary risks early</li>
              <li>Learn from your losses and adapt your strategy</li>
              <li>Keep track of your performance to identify areas for improvement</li>
            </List>
          </Section>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default HowToPlayModal; 