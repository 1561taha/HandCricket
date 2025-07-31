import React, { useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import './GameLog.css';

const GameLog = () => {
  const { gameLog, phase } = useGame();
  const logRef = useRef(null);

  // Auto-scroll to bottom when new log entries are added
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [gameLog]);

  const getLogIcon = (message) => {
    if (message.includes('OUT!') || message.includes('WICKET!')) {
      return '🏏';
    } else if (message.includes('scored')) {
      return '🏃';
    } else if (message.includes('Toss')) {
      return '🪙';
    } else if (message.includes('chose')) {
      return '🎯';
    }
    return '📝';
  };

  const getInitialContent = () => {
    if (phase === 'toss') {
      return [
        { icon: '🏏', text: 'Welcome to Somnia Hand Cricket!', time: 'Game Start' },
        { icon: '🪙', text: 'Toss phase begins - choose Heads or Tails', time: 'Toss' },
        { icon: '📊', text: 'Select your game mode: Classic, Super Over, or Fifer', time: 'Setup' },
        { icon: '🎯', text: 'Get ready to show your cricket skills!', time: 'Ready' }
      ];
    }
    return [];
  };

  const initialContent = getInitialContent();

  return (
    <div className="game-log">
      <div className="log-header">
        <h3>Match Commentary</h3>
        <div className="log-controls">
          <span className="log-count">{gameLog.length + initialContent.length} events</span>
        </div>
      </div>
      
      <div className="log-container" ref={logRef}>
        {gameLog.length === 0 && initialContent.length === 0 ? (
          <div className="empty-log">
            <p>Match commentary will appear here...</p>
          </div>
        ) : (
          <div className="log-entries">
            {/* Show initial content when game starts */}
            {initialContent.map((entry, index) => (
              <div key={`initial-${index}`} className="log-entry initial">
                <span className="log-icon">{entry.icon}</span>
                <span className="log-text">{entry.text}</span>
                <span className="log-time">{entry.time}</span>
              </div>
            ))}
            
            {/* Show actual game log entries */}
            {gameLog.map((entry, index) => (
              <div key={index} className="log-entry">
                <span className="log-icon">{getLogIcon(entry)}</span>
                <span className="log-text">{entry}</span>
                <span className="log-time">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameLog; 