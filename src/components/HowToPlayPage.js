import React from 'react';
import styled from 'styled-components';

const Page = styled.div`
  max-width: 700px;
  margin: 32px auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.13);
  padding: 2.5rem 1.5rem 2rem 1.5rem;
  @media (max-width: 600px) {
    padding: 1.2rem 0.3rem 1rem 0.3rem;
    border-radius: 8px;
  }
`;
const Section = styled.section`
  margin-bottom: 2.2rem;
`;
const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #43e97b 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.2rem;
`;
const SubTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.7rem;
`;
const List = styled.ul`
  margin: 0 0 0.7rem 1.2rem;
  padding: 0;
`;
const Q = styled.div`
  font-weight: 700;
  margin-top: 1.1rem;
`;
const A = styled.div`
  margin-bottom: 0.7rem;
`;
const HandSignals = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 0.7rem;
`;
const Signal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.1rem;
`;
const HandEmoji = styled.span`
  font-size: 2rem;
`;

const HowToPlayPage = () => (
  <Page>
    <Title>How to Play Hand Cricket (On-Chain)</Title>

    <Section>
      <SubTitle>🎮 Game Overview</SubTitle>
      <p>
        <strong>Hand Cricket</strong> is a strategic game where you and the computer show numbers (1-6) with your fingers. Score more runs than your opponent while defending your wickets! This version is powered by blockchain: your nickname, stats, and leaderboard position are stored on the Somnia testnet.
      </p>
    </Section>

    <Section>
      <SubTitle>🚀 Getting Started</SubTitle>
      <List>
        <li>Connect your crypto wallet (MetaMask, etc.) to the Somnia testnet.</li>
        <li>Register a unique nickname (stored on-chain).</li>
        <li>Select a game mode: Classic, Super Over, or Fifer.</li>
        <li>Play and see your stats update on the global leaderboard!</li>
      </List>
    </Section>

    <Section>
      <SubTitle>🏏 Game Modes</SubTitle>
      <List>
        <li><strong>Classic:</strong> 5 wickets, 5 overs per side. Highest score wins!</li>
        <li><strong>Super Over:</strong> 1 over, 2 wickets. Fast and furious!</li>
        <li><strong>Fifer:</strong> Lose 5 wickets or chase the target. No over limit.</li>
      </List>
    </Section>

    <Section>
      <SubTitle>🕹️ Gameplay</SubTitle>
      <List>
        <li>Each turn, choose a number (1-6) to bat or bowl.</li>
        <li><strong>Batting:</strong> If your number ≠ computer's, you score runs. If equal, you're OUT!</li>
        <li><strong>Bowling:</strong> If your number = computer's, it's a WICKET! Otherwise, computer scores runs.</li>
        <li>Try to outscore the computer or take all their wickets!</li>
      </List>
    </Section>

    <Section>
      <SubTitle>✋ Hand Signals Guide</SubTitle>
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
      <SubTitle>🔗 Wallet & Blockchain</SubTitle>
      <List>
        <li>Connect your wallet to the Somnia testnet (see app instructions).</li>
        <li>Your nickname, stats, and leaderboard position are stored on-chain.</li>
        <li>All game results are updated via blockchain transactions.</li>
        <li>You need test SOM tokens for gas (get from Somnia faucet).</li>
      </List>
    </Section>

    <Section>
      <SubTitle>🏅 Leaderboard & Stats</SubTitle>
      <List>
        <li>See your global rank, wins, and best scores on the leaderboard.</li>
        <li>Stats are updated after each game and are visible to all players.</li>
        <li>Nicknames are unique and tied to your wallet address.</li>
      </List>
    </Section>

    <Section>
      <SubTitle>❓ FAQ & Troubleshooting</SubTitle>
      <Q>How do I get test SOM tokens?</Q>
      <A>Use the official Somnia faucet (see app or Somnia docs) to get free testnet tokens for gas.</A>
      <Q>Why do I need to connect my wallet?</Q>
      <A>To register your nickname, save your stats, and appear on the leaderboard—all on-chain!</A>
      <Q>What if my transaction fails?</Q>
      <A>Check that you have enough test SOM for gas and are on the Somnia testnet in MetaMask.</A>
      <Q>Can I change my nickname?</Q>
      <A>Nicknames are unique and tied to your wallet. To use a new nickname, connect a different wallet.</A>
      <Q>Who can see my stats?</Q>
      <A>All players can see the leaderboard and your public stats, but only you control your wallet and nickname.</A>
    </Section>

    <Section>
      <SubTitle>💡 Strategy Tips</SubTitle>
      <List>
        <li>Watch for patterns in your opponent's choices.</li>
        <li>Mix up your numbers to avoid being predictable.</li>
        <li>When batting, aim for higher numbers to score more runs.</li>
        <li>When bowling, try to predict and match the batsman's choice.</li>
      </List>
    </Section>
  </Page>
);

export default HowToPlayPage; 