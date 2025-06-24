import React from 'react';
import { useGame } from '../context/GameContext';
import Scoreboard from './Scoreboard';
import TossPhase from './TossPhase';
import ChoicePhase from './ChoicePhase';
import PlayPhase from './PlayPhase';
import ResultPhase from './ResultPhase';
import GameLog from './GameLog';
import Rules from './Rules';
import Prompt from './Prompt';
import './GameContainer.css';
import styled from 'styled-components';

const ModeSelectorWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 18px;
  background: #f8fafc;
  border-radius: 12px;
  padding: 18px 12px;
  box-shadow: 0 2px 12px rgba(102, 126, 234, 0.07);
`;
const ModeOptions = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 10px;
`;
const ModeBtn = styled.button`
  background: ${({ active }) => (active ? 'linear-gradient(135deg, #667eea 0%, #43e97b 100%)' : '#e2e8f0')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: none;
  border-radius: 8px;
  padding: 8px 22px;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.10);
  transition: background 0.2s, color 0.2s, transform 0.2s;
  &:hover {
    background: linear-gradient(135deg, #43e97b 0%, #667eea 100%);
    color: #fff;
    transform: translateY(-2px) scale(1.04);
  }
`;
const ModeDesc = styled.div`
  font-size: 1rem;
  color: #555;
  text-align: center;
  min-height: 24px;
`;

const modeDescriptions = {
  classic: 'Classic: 5 wickets, 5 overs per side. Highest score wins!',
  superover: 'Super Over: 1 over per side. Highest score in 6 balls wins!',
  fifer: 'Fifer: Take 5 wickets as quickly as possible or score as many runs as you can before losing 5 wickets!'
};

function ModeSelector({ mode, setMode, disabled }) {
  return (
    <ModeSelectorWrap>
      <ModeOptions>
        <ModeBtn active={mode === 'classic'} onClick={() => setMode('classic')} disabled={disabled}>Classic</ModeBtn>
        <ModeBtn active={mode === 'superover'} onClick={() => setMode('superover')} disabled={disabled}>Super Over</ModeBtn>
        <ModeBtn active={mode === 'fifer'} onClick={() => setMode('fifer')} disabled={disabled}>Fifer</ModeBtn>
      </ModeOptions>
      <ModeDesc>{modeDescriptions[mode]}</ModeDesc>
    </ModeSelectorWrap>
  );
}

const GameContainer = () => {
  const { phase, prompt, hidePrompt, mode, setMode } = useGame();

  const renderPhase = () => {
    switch (phase) {
      case 'toss':
        return <TossPhase />;
      case 'choice':
        return <ChoicePhase />;
      case 'playing':
        return <PlayPhase />;
      case 'result':
        return <ResultPhase />;
      default:
        return <TossPhase />;
    }
  };

  return (
    <div className="game-container">
      {prompt.show && (
        <Prompt 
          title={prompt.title} 
          message={prompt.message} 
          onConfirm={hidePrompt} 
        />
      )}
      <div className="game-title">
        <h1>Hand Cricket</h1>
        <p className="subtitle">A Modern Cricket Experience</p>
      </div>
      {/* Show mode selector only before the toss phase starts */}
      {phase === 'toss' && (
        <ModeSelector mode={mode} setMode={setMode} disabled={phase !== 'toss'} />
      )}
      <Scoreboard />
      <div className="game-area">
        {renderPhase()}
      </div>
      <div className="game-footer">
        <GameLog />
        <Rules />
      </div>
    </div>
  );
};

export default GameContainer; 