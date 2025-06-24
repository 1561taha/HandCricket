import React, { useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import './GameLog.css';

const GameLog = () => {
  const { gameLog } = useGame();
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

  return (
    <div className="game-log">
      <div className="log-header">
        <h3>Match Commentary</h3>
        <div className="log-controls">
          <span className="log-count">{gameLog.length} events</span>
        </div>
      </div>
      
      <div className="log-container" ref={logRef}>
        {gameLog.length === 0 ? (
          <div className="empty-log">
            <p>Match commentary will appear here...</p>
          </div>
        ) : (
          <div className="log-entries">
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