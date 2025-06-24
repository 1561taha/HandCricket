import React from 'react';
import { useGame } from '../context/GameContext';
import styled, { keyframes } from 'styled-components';
import './ResultPhase.css';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Card = styled.div`
  max-width: 500px;
  margin: 40px auto 0 auto;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.13);
  padding: 2.5rem 2rem 2rem 2rem;
  animation: ${fadeIn} 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (max-width: 900px) {
    padding: 1.1rem 0.5rem 1rem 0.5rem;
    max-width: 98vw;
  }
  @media (max-width: 600px) {
    padding: 0.7rem 0.1rem 0.7rem 0.1rem;
    max-width: 100vw;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.10);
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Emoji = styled.div`
  font-size: 3.2rem;
  margin-bottom: 0.5rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #43e97b 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

const Subtitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #555;
  margin: 0.2rem 0 0 0;
`;

const Scores = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  margin-bottom: 1.2rem;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const ScoreCard = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 18px 24px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScoreNumber = styled.span`
  font-size: 2.1rem;
  font-weight: 700;
  color: #667eea;
`;

const ScoreLabel = styled.span`
  font-size: 1.1rem;
  color: #888;
  margin-left: 4px;
`;

const WicketsInfo = styled.div`
  font-size: 1rem;
  color: #555;
  margin-top: 4px;
`;

const VsFinal = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #667eea;
`;

const ResultMessageBox = styled.div`
  background: #e0f7fa;
  color: #333;
  border-radius: 10px;
  padding: 14px 18px;
  margin: 1.2rem 0 1.5rem 0;
  font-size: 1.13rem;
  font-weight: 500;
  text-align: center;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.2rem;
`;

const PlayAgainBtn = styled.button`
  padding: 13px 44px;
  border: none;
  border-radius: 12px;
  font-size: 1.13rem;
  font-weight: 700;
  cursor: pointer;
  background: linear-gradient(135deg, #667eea 0%, #43e97b 100%);
  color: white;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.13);
  transition: all 0.3s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.18);
  }
`;

const ResultPhase = () => {
  const { 
    playerScore, 
    computerScore, 
    winner, 
    resetGame,
    playerWickets,
    computerWickets,
    maxWickets
  } = useGame();

  const getResultMessage = () => {
    if (winner === 'player') {
      return {
        title: 'Congratulations!',
        subtitle: 'You Won the Match!',
        message: `You defeated the computer by ${playerScore - computerScore} runs!`,
        emoji: '🏆'
      };
    } else {
      return {
        title: 'Better Luck Next Time!',
        subtitle: 'Computer Won the Match',
        message: `Computer defeated you by ${computerScore - playerScore} runs!`,
        emoji: '😔'
      };
    }
  };

  const result = getResultMessage();
  const isTie = playerScore === computerScore;

  return (
    <Card>
      <Header>
        <Emoji>{isTie ? '🤝' : result.emoji}</Emoji>
        <Title>{isTie ? "It's a Tie!" : result.title}</Title>
        <Subtitle>{isTie ? 'Match Drawn' : result.subtitle}</Subtitle>
      </Header>
      <Scores>
        <ScoreCard>
          <div style={{ fontWeight: 600, color: '#333', marginBottom: 6 }}>Your Team</div>
          <ScoreNumber>{playerScore}</ScoreNumber>
          <ScoreLabel>runs</ScoreLabel>
          <WicketsInfo>{playerWickets}/{maxWickets} wickets</WicketsInfo>
        </ScoreCard>
        <VsFinal>VS</VsFinal>
        <ScoreCard>
          <div style={{ fontWeight: 600, color: '#333', marginBottom: 6 }}>Computer Team</div>
          <ScoreNumber>{computerScore}</ScoreNumber>
          <ScoreLabel>runs</ScoreLabel>
          <WicketsInfo>{computerWickets}/{maxWickets} wickets</WicketsInfo>
        </ScoreCard>
      </Scores>
      {!isTie && (
        <ResultMessageBox>
          <p>{result.message}</p>
        </ResultMessageBox>
      )}
      <ActionButtons>
        <PlayAgainBtn onClick={resetGame}>
          Play Again
        </PlayAgainBtn>
      </ActionButtons>
    </Card>
  );
};

export default ResultPhase; 