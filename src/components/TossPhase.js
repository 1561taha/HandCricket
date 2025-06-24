import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faHandPointUp } from '@fortawesome/free-solid-svg-icons';
import './TossPhase.css';

const TossPhase = () => {
  const { handleToss, tossResult, playerWonToss } = useGame();
  const [showResult, setShowResult] = useState(false);

  const handleTossChoice = (choice) => {
    handleToss(choice);
    setShowResult(true);
  };

  const getTossResultMessage = () => {
    if (!showResult) return '';
    
    const resultText = tossResult.toUpperCase();
    if (playerWonToss) {
      return `Toss result: ${resultText}\nCongratulations! You won the toss!`;
    } else {
      return `Toss result: ${resultText}\nComputer won the toss!`;
    }
  };

  return (
    <div className="toss-phase">
      {!showResult ? (
        <>
          <div className="toss-header">
            <h2>Coin Toss</h2>
            <p>Choose Heads or Tails to start the game</p>
          </div>
          
          <div className="coin-animation">
            <div className="coin">
              <div className="coin-face heads">H</div>
              <div className="coin-face tails">T</div>
            </div>
          </div>
          
          <div className="toss-buttons">
            <button 
              className="toss-btn heads-btn"
              onClick={() => handleTossChoice('heads')}
            >
              <FontAwesomeIcon icon={faCoins} className="btn-icon" />
              Heads
            </button>
            <button 
              className="toss-btn tails-btn"
              onClick={() => handleTossChoice('tails')}
            >
              <FontAwesomeIcon icon={faCoins} className="btn-icon" />
              Tails
            </button>
          </div>
        </>
      ) : (
        <div className="toss-result">
          <div className="result-animation">
            <div className={`coin-result ${tossResult}`}>
              {tossResult.toUpperCase()}
            </div>
          </div>
          
          <div className="result-message">
            <h3>{playerWonToss ? 'You Won!' : 'Computer Won!'}</h3>
            <p className="toss-details">{getTossResultMessage()}</p>
          </div>
          
          {playerWonToss && (
            <div className="next-step">
              <p><FontAwesomeIcon icon={faHandPointUp} /> Now, choose to Bat or Bowl first!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TossPhase; 