import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import styled, { keyframes } from 'styled-components';
import './PlayPhase.css';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Card = styled.div`
  max-width: 600px;
  margin: 0 auto 32px auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 6px 24px rgba(102, 126, 234, 0.13);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  animation: ${fadeIn} 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (max-width: 900px) {
    padding: 1.2rem 0.5rem 1rem 0.5rem;
    max-width: 98vw;
  }
  @media (max-width: 600px) {
    padding: 0.7rem 0.1rem 0.7rem 0.1rem;
    max-width: 100vw;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.10);
  }
`;

const GameStatus = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
  width: 100%;
`;

const OverDisplay = styled.div`
  margin-bottom: 15px;
  font-size: 1.1rem;
  color: #666;
`;

const PromptMessage = styled.div`
  font-size: 1.15rem;
  font-weight: 600;
  color: #333;
  padding: 10px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(79, 172, 254, 0.13);
`;

const NumberSelection = styled.div`
  margin-bottom: 40px;
  width: 100%;
`;

const NumberGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  max-width: 300px;
  margin: 0 auto;
  @media (max-width: 600px) {
    gap: 10px;
    max-width: 220px;
  }
  @media (max-width: 400px) {
    gap: 6px;
    max-width: 160px;
  }
`;

const NumberBtn = styled.button`
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.13);
  position: relative;
  overflow: hidden;
  outline: none;
  &:hover:not(:disabled) {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.18);
  }
  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ResultDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 18px;
  gap: 32px;
`;

const Hand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HandIcon = styled.div`
  font-size: 2.2rem;
  margin-bottom: 4px;
`;

const NumberDisplay = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
`;

const VsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 18px;
`;

const VsText = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 2px;
`;

const ResultMessage = styled.div`
  font-size: 1.08rem;
  color: #43e97b;
  font-weight: 600;
`;

const ThinkingAnimation = styled.div`
  margin-top: 18px;
  text-align: center;
`;

const ThinkingDots = styled.div`
  display: inline-block;
  & span {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 2px;
    background: #667eea;
    border-radius: 50%;
    animation: blink 1.4s infinite both;
  }
  & span:nth-child(2) { animation-delay: 0.2s; }
  & span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes blink {
    0%, 80%, 100% { opacity: 0.3; }
    40% { opacity: 1; }
  }
`;

function PlayPhase() {
  const { 
    playTurn, 
    playerBatting, 
    currentBall, 
    maxOvers, 
    inningsCompleted,
    target,
    playerScore,
    computerScore,
    lastPlayerChoice,
    lastComputerChoice
  } = useGame();

  const [isAnimating, setIsAnimating] = useState(false);

  const currentOver = Math.floor(currentBall / 6);
  const ballsInOver = currentBall % 6;
  const overDisplay = `${currentOver}.${ballsInOver}`;

  const handleNumberClick = (number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    playTurn(number);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  const getHandIcon = (number) => {
    const handIcons = {
      1: '☝️',
      2: '✌️',
      3: '🤟',
      4: '🖖',
      5: '🖐️',
      6: '🤙'
    };
    return handIcons[number] || '✋';
  };

  const getPromptMessage = () => {
    if (inningsCompleted === 0) {
      return playerBatting 
        ? 'Choose a number to score runs!' 
        : 'Choose a number to bowl!';
    } else {
      if (playerBatting) {
        const needed = target - playerScore + 1;
        return needed > 0 ? `You need ${needed} runs to win!` : 'Keep scoring!';
      } else {
        const needed = target - computerScore + 1;
        return needed > 0 ? `Computer needs ${needed} runs! Bowl well!` : 'Keep bowling!';
      }
    }
  };

  return (
    <Card>
      <GameStatus>
        <OverDisplay>
          <span>Over:</span>
          <span style={{ fontWeight: 700, color: '#667eea', marginLeft: 8 }}>{overDisplay}/{maxOvers === 99 ? '∞' : maxOvers}</span>
        </OverDisplay>
        <PromptMessage>
          {getPromptMessage()}
        </PromptMessage>
      </GameStatus>
      <NumberSelection>
        <h3 style={{ textAlign: 'center', fontWeight: 600, marginBottom: 18 }}>Your Choice</h3>
        <NumberGrid>
          {[1, 2, 3, 4, 5, 6].map(number => (
            <NumberBtn
              key={number}
              className={isAnimating ? 'disabled' : ''}
              onClick={() => handleNumberClick(number)}
              disabled={isAnimating}
            >
              {number}
            </NumberBtn>
          ))}
        </NumberGrid>
      </NumberSelection>
      <ResultDisplay>
        <Hand>
          <HandIcon>{lastPlayerChoice ? getHandIcon(lastPlayerChoice) : '✋'}</HandIcon>
          <NumberDisplay>{lastPlayerChoice || '?'}</NumberDisplay>
        </Hand>
        <VsSection>
          <VsText>VS</VsText>
          {lastPlayerChoice && (
            <ResultMessage>
              {lastPlayerChoice === lastComputerChoice ? (playerBatting ? 'OUT!' : 'WICKET!') : `${playerBatting ? `You scored ${lastPlayerChoice}` : `Computer scored ${lastComputerChoice}`} runs!`}
            </ResultMessage>
          )}
        </VsSection>
        <Hand>
          <HandIcon>{lastComputerChoice ? getHandIcon(lastComputerChoice) : '✋'}</HandIcon>
          <NumberDisplay>{lastComputerChoice || '?'}</NumberDisplay>
        </Hand>
      </ResultDisplay>
      {isAnimating && (
        <ThinkingAnimation>
          <ThinkingDots>
            <span></span>
            <span></span>
            <span></span>
          </ThinkingDots>
          <p style={{ margin: 0, color: '#888', fontSize: '1rem' }}>Computer is thinking...</p>
        </ThinkingAnimation>
      )}
    </Card>
  );
}

export default PlayPhase; 