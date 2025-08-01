import React, { useState } from 'react';
import './Rules.css';
import { Link } from 'react-router-dom';

const Rules = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rules-container">
      <div className="rules-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>How to Play Somnia Hand Cricket</h3>
        <span className="expand-icon">{isExpanded ? '−' : '+'}</span>
      </div>
      
      <div className={`rules-content ${isExpanded ? 'expanded' : ''}`}>
        <div className="rule-section">
          <h4>🎮 Game Overview</h4>
          <p>
            <strong>Somnia Hand Cricket</strong> is a strategic blockchain-based game where players show numbers using fingers (1-6).
            The goal is to score more runs than your opponent while defending your wickets. All your stats and achievements are stored on the Somnia blockchain!
          </p>
        </div>

        <div className="rule-section">
          <h4>🏏 Batting Rules</h4>
          <ul>
            <li>Choose a number from 1-6 using your fingers</li>
            <li>If your number differs from the computer's, you score runs equal to your number</li>
            <li>If numbers match, you're OUT and lose a wicket</li>
            <li>Score as many runs as possible in 5 overs (30 balls)</li>
          </ul>
        </div>

        <div className="rule-section">
          <h4>🎯 Bowling Rules</h4>
          <ul>
            <li>Choose a number from 1-6 to bowl</li>
            <li>If your number matches the computer's, it's a WICKET!</li>
            <li>If numbers differ, computer scores runs equal to their number</li>
            <li>Try to take all 5 wickets or restrict runs</li>
          </ul>
        </div>

        <div className="rule-section">
          <h4>🏆 Match Format</h4>
          <ul>
            <li>Each team gets 5 wickets and 5 overs (30 balls)</li>
            <li>Two innings: First team bats, then second team chases</li>
            <li>Team with highest score wins</li>
            <li>If scores are tied, it's a draw</li>
          </ul>
        </div>

        <div className="rule-section">
          <h4>🔗 Blockchain Features</h4>
          <ul>
            <li>Connect your wallet to the Somnia testnet</li>
            <li>Register a unique nickname stored on-chain</li>
            <li>All game results and stats are permanently recorded</li>
            <li>Compete on the global leaderboard</li>
          </ul>
        </div>

        <div className="rule-section">
          <h4>💡 Strategy Tips</h4>
          <ul>
            <li>Watch for patterns in your opponent's choices</li>
            <li>Mix up your numbers to avoid being predictable</li>
            <li>When batting, aim for higher numbers to score more runs</li>
            <li>When bowling, try to predict and match the batsman's choice</li>
          </ul>
        </div>

        <div className="hand-guide">
          <h4>✋ Hand Signals Guide</h4>
          <div className="hand-signals">
            <div className="signal">
              <span className="hand-emoji">☝️</span>
              <span>1 finger</span>
            </div>
            <div className="signal">
              <span className="hand-emoji">✌️</span>
              <span>2 fingers</span>
            </div>
            <div className="signal">
              <span className="hand-emoji">🤟</span>
              <span>3 fingers</span>
            </div>
            <div className="signal">
              <span className="hand-emoji">🖖</span>
              <span>4 fingers</span>
            </div>
            <div className="signal">
              <span className="hand-emoji">🖐️</span>
              <span>5 fingers</span>
            </div>
            <div className="signal">
              <span className="hand-emoji">🤙</span>
              <span>6 fingers</span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link to="/how-to-play" style={{
            display: 'inline-block',
            padding: '12px 32px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #667eea 0%, #43e97b 100%)',
            color: 'white',
            fontWeight: 700,
            fontSize: '1.08rem',
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(102, 126, 234, 0.13)',
            transition: 'all 0.2s',
          }}>Full Guide</Link>
        </div>
      </div>
    </div>
  );
};

export default Rules; 