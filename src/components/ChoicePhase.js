import React from 'react';
import { useGame } from '../context/GameContext';
import './ChoicePhase.css';

const ChoicePhase = () => {
  const { handleInningsChoice } = useGame();

  const handleChoice = (choice) => {
    handleInningsChoice(choice);
  };

  return (
    <div className="choice-phase">
      <div className="choice-header">
        <h2>You Won the Toss!</h2>
        <p>Choose to Bat or Bowl first</p>
      </div>
      
      <div className="choice-options">
        <div className="choice-card bat-card">
          <div className="choice-icon">🏏</div>
          <h3>Bat First</h3>
          <p>Set a target for the computer to chase</p>
          <ul>
            <li>Score as many runs as possible</li>
            <li>You have 5 overs (30 balls)</li>
            <li>5 wickets available</li>
          </ul>
          <button 
            className="choice-btn bat-btn"
            onClick={() => handleChoice('bat')}
          >
            Choose to Bat
          </button>
        </div>
        
        <div className="choice-card bowl-card">
          <div className="choice-icon">🎯</div>
          <h3>Bowl First</h3>
          <p>Try to restrict the computer's score</p>
          <ul>
            <li>Take wickets to limit runs</li>
            <li>Computer has 5 overs (30 balls)</li>
            <li>5 wickets available</li>
          </ul>
          <button 
            className="choice-btn bowl-btn"
            onClick={() => handleChoice('bowl')}
          >
            Choose to Bowl
          </button>
        </div>
      </div>
      
      <div className="choice-tip">
        <p><strong>Tip:</strong> Consider the pitch conditions and your strategy!</p>
      </div>
    </div>
  );
};

export default ChoicePhase; 