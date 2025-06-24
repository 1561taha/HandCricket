import React from 'react';
import { useGame } from '../context/GameContext';
import styled, { keyframes } from 'styled-components';
import './Scoreboard.css';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Card = styled.div`
  max-width: 600px;
  margin: 0 auto 24px auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 6px 24px rgba(102, 126, 234, 0.13);
  padding: 1.5rem 1.2rem 1.2rem 1.2rem;
  animation: ${fadeIn} 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (max-width: 900px) {
    padding: 1.1rem 0.5rem 1rem 0.5rem;
    max-width: 98vw;
  }
  @media (max-width: 700px) {
    padding: 0.7rem 0.1rem 0.7rem 0.1rem;
    max-width: 100vw;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.10);
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 8px;
    margin-bottom: 6px;
  }
`;

const Team = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ active }) => (active ? 'linear-gradient(135deg, #e0e7ff 0%, #f0fff4 100%)' : 'transparent')};
  border-radius: 12px;
  padding: 10px 0;
  box-shadow: ${({ active }) => (active ? '0 2px 8px rgba(67, 233, 123, 0.08)' : 'none')};
  transition: background 0.2s, box-shadow 0.2s;
`;

const TeamTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 6px 0;
  color: #333;
`;

const Stat = styled.div`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StatIcon = styled.span`
  font-size: 1.2rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 18px;
`;

const InfoText = styled.div`
  font-size: 1.08rem;
  font-weight: 600;
  color: #667eea;
  margin-bottom: 2px;
`;

const Target = styled.div`
  font-size: 1.05rem;
  color: #ff6b6b;
  font-weight: 700;
  margin-top: 2px;
`;

const ModeTag = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #43e97b 100%);
  color: #fff;
  font-size: 0.98rem;
  font-weight: 600;
  border-radius: 8px;
  padding: 3px 14px;
  margin-bottom: 10px;
  letter-spacing: 0.03em;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.10);
`;

function Scoreboard() {
  const {
    playerScore,
    playerWickets,
    computerScore,
    computerWickets,
    currentBall,
    maxOvers,
    maxWickets,
    inningsCompleted,
    target,
    playerBatting,
    mode
  } = useGame();

  const currentOver = Math.floor(currentBall / 6);
  const ballsInOver = currentBall % 6;
  const overDisplay = `${currentOver}.${ballsInOver}`;

  const getMatchStatus = () => {
    if (inningsCompleted === 0) {
      return playerBatting ? 'You are batting' : 'You are bowling';
    } else {
      if (playerBatting) {
        const needed = target - playerScore + 1;
        return needed > 0 ? `You need ${needed} runs to win` : 'You are chasing';
      } else {
        const needed = target - computerScore + 1;
        return needed > 0 ? `Computer needs ${needed} runs to win` : 'Computer is chasing';
      }
    }
  };

  const modeLabel = {
    classic: 'Classic',
    superover: 'Super Over',
    fifer: 'Fifer'
  };

  return (
    <Card>
      <ModeTag>{modeLabel[mode] || 'Classic'} Mode</ModeTag>
      <Row>
        <Team active={playerBatting}>
          <TeamTitle>You</TeamTitle>
          <Stat><StatIcon>🏏</StatIcon>Score: <b>{playerScore}</b></Stat>
          <Stat><StatIcon>❌</StatIcon>Wickets: <b>{playerWickets}/{maxWickets}</b></Stat>
        </Team>
        <Info>
          <InfoText>{getMatchStatus()}</InfoText>
          <Stat><StatIcon>🕒</StatIcon>Over: <b>{overDisplay}/{maxOvers === 99 ? '∞' : maxOvers}</b></Stat>
          {inningsCompleted > 0 && target > 0 && (
            <Target>Target: {target}</Target>
          )}
        </Info>
        <Team active={!playerBatting}>
          <TeamTitle>Computer</TeamTitle>
          <Stat><StatIcon>🏏</StatIcon>Score: <b>{computerScore}</b></Stat>
          <Stat><StatIcon>❌</StatIcon>Wickets: <b>{computerWickets}/{maxWickets}</b></Stat>
        </Team>
      </Row>
    </Card>
  );
}

export default Scoreboard; 