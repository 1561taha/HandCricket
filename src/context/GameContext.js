import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { updatePlayerStats } from '../ethereum';

// Game state reducer
const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GAME_PHASE':
      return { ...state, phase: action.payload };
    
    case 'SET_TOSS_RESULT':
      return { 
        ...state, 
        tossResult: action.payload.result,
        playerWonToss: action.payload.playerWon 
      };
    
    case 'SET_INNINGS_CHOICE':
      return { 
        ...state, 
        playerBatting: action.payload === 'bat',
        phase: 'playing' 
      };
    
    case 'SHOW_PROMPT':
      return { ...state, prompt: { show: true, ...action.payload } };

    case 'HIDE_PROMPT':
      return { ...state, prompt: { show: false, title: '', message: '' } };
    
    case 'PLAY_TURN':
      const { playerNumber, computerNumber } = action.payload;
      const isOut = playerNumber === computerNumber;
      let newState = {
        ...state,
        lastPlayerChoice: playerNumber,
        lastComputerChoice: computerNumber,
        currentBall: state.currentBall + 1,
      };

      if (state.playerBatting) {
        if (isOut) {
          newState = {
            ...newState,
            playerWickets: state.playerWickets + 1,
            gameLog: [...state.gameLog, `OUT! You chose ${playerNumber}, Computer chose ${computerNumber}`]
          };
        } else {
          newState = {
            ...newState,
            playerScore: state.playerScore + playerNumber,
            gameLog: [...state.gameLog, `You scored ${playerNumber} runs! (You: ${playerNumber}, Computer: ${computerNumber})`]
          };
        }
      } else {
        if (isOut) {
          newState = {
            ...newState,
            computerWickets: state.computerWickets + 1,
            gameLog: [...state.gameLog, `WICKET! You chose ${playerNumber}, Computer chose ${computerNumber}`]
          };
        } else {
          newState = {
            ...newState,
            computerScore: state.computerScore + computerNumber,
            gameLog: [...state.gameLog, `Computer scored ${computerNumber} runs! (You: ${playerNumber}, Computer: ${computerNumber})`]
          };
        }
      }
      return newState;
    
    case 'SWITCH_INNINGS':
      return {
        ...state,
        playerBatting: !state.playerBatting,
        currentBall: 0,
        currentOver: 0,
        inningsCompleted: state.inningsCompleted + 1,
        target: state.playerBatting ? state.playerScore : state.computerScore,
        phase: 'playing'
      };
    
    case 'END_GAME':
      return {
        ...state,
        gameOver: true,
        winner: action.payload,
        phase: 'result'
      };
    
    case 'RESET_GAME':
      const modeSettings = getModeSettings(state.mode);
      return {
        phase: 'toss',
        playerBatting: false,
        playerScore: 0,
        playerWickets: 0,
        computerScore: 0,
        computerWickets: 0,
        currentOver: 0,
        currentBall: 0,
        ...modeSettings,
        inningsCompleted: 0,
        target: 0,
        gameOver: false,
        tossResult: '',
        playerWonToss: false,
        gameLog: [],
        lastPlayerChoice: null,
        lastComputerChoice: null,
        prompt: {
          show: false,
          title: '',
          message: ''
        },
        mode: state.mode,
      };
    
    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload,
        ...getModeSettings(action.payload),
        currentOver: 0,
        currentBall: 0,
        playerScore: 0,
        playerWickets: 0,
        computerScore: 0,
        computerWickets: 0,
        inningsCompleted: 0,
        target: 0,
        gameOver: false,
        gameLog: [],
        lastPlayerChoice: null,
        lastComputerChoice: null,
      };
    
    default:
      return state;
  }
};

const getModeSettings = (mode) => {
  switch (mode) {
    case 'superover':
      return { maxOvers: 1, maxWickets: 2 };
    case 'fifer':
      return { maxOvers: 99, maxWickets: 5 };
    case 'classic':
    default:
      return { maxOvers: 5, maxWickets: 5 };
  }
};

// Initial game state
const initialState = {
  phase: 'toss', // toss, choice, playing, result
  playerBatting: false,
  playerScore: 0,
  playerWickets: 0,
  computerScore: 0,
  computerWickets: 0,
  currentOver: 0,
  currentBall: 0,
  ...getModeSettings('classic'),
  inningsCompleted: 0,
  target: 0,
  gameOver: false,
  tossResult: '',
  playerWonToss: false,
  gameLog: [],
  lastPlayerChoice: null,
  lastComputerChoice: null,
  prompt: {
    show: false,
    title: '',
    message: ''
  },
  mode: 'classic', // classic, superover, fifer
};

// Create context
const GameContext = createContext();

// Provider component
export const GameProvider = ({ children, contract }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Game logic functions
  const showPrompt = (title, message) => {
    dispatch({ type: 'SHOW_PROMPT', payload: { title, message } });
  };

  const hidePrompt = () => {
    dispatch({ type: 'HIDE_PROMPT' });
  };

  const handleToss = (choice) => {
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    const playerWon = choice === result;
    
    dispatch({
      type: 'SET_TOSS_RESULT',
      payload: { result, playerWon }
    });
    
    setTimeout(() => {
      if (playerWon) {
        showPrompt('You Won the Toss!', 'Congratulations! You get to choose whether to bat or bowl first.');
        dispatch({ type: 'SET_GAME_PHASE', payload: 'choice' });
      } else {
        const computerChoice = Math.random() < 0.5 ? 'bat' : 'bowl';
        showPrompt('Computer Won the Toss!', `The computer has chosen to ${computerChoice} first.`);
        dispatch({ type: 'SET_INNINGS_CHOICE', payload: computerChoice === 'bat' ? 'bowl' : 'bat' });
      }
    }, 500);
  };

  const handleInningsChoice = (choice) => {
    dispatch({ type: 'SET_INNINGS_CHOICE', payload: choice });
    const message = choice === 'bat'
      ? 'You have chosen to bat first.\n\nYour goal is to set a high score for the computer to chase. Good luck!'
      : 'You have chosen to bowl first.\n\nYour goal is to restrict the computer to a low score. Try to take all their wickets!';
    showPrompt(`You are ${choice}ing first!`, message);
  };

  const playTurn = (playerNumber) => {
    const computerNumber = getComputerNumber();
    const isOut = playerNumber === computerNumber;
    const isPlayerBatting = state.playerBatting;
    const currentBall = state.currentBall;
    const maxOvers = state.maxOvers;
    const ballsAfter = currentBall + 1;
    const overCompleted = ballsAfter % 6 === 0 && ballsAfter !== 0 && ballsAfter !== maxOvers * 6;
    let promptTitle = null;
    let promptMsg = null;

    // Determine if wicket
    if (isPlayerBatting && isOut) {
      promptTitle = 'Wicket!';
      promptMsg = `You are OUT! You chose ${playerNumber}, Computer chose ${computerNumber}.`;
    } else if (!isPlayerBatting && isOut) {
      promptTitle = 'Wicket!';
      promptMsg = `WICKET! You chose ${playerNumber}, Computer chose ${computerNumber}.`;
    }

    // Determine if over completed (but not at start or end of innings)
    if (overCompleted) {
      const overNum = Math.floor(ballsAfter / 6);
      if (!promptTitle) {
        promptTitle = 'Over Complete';
        promptMsg = `Over ${overNum} completed.\n\nYou: ${state.playerScore}/${state.playerWickets} | Computer: ${state.computerScore}/${state.computerWickets}`;
      } else {
        // If both wicket and over, combine
        promptMsg += `\n\nAlso, Over ${overNum} completed.\nYou: ${state.playerScore}/${state.playerWickets} | Computer: ${state.computerScore}/${state.computerWickets}`;
      }
    }

    // If prompt needed, show it and wait for confirmation before dispatching
    if (promptTitle) {
      showPrompt(promptTitle, promptMsg);
      // Wait for user to click OK before dispatching the turn
      // We'll use a callback after prompt is hidden
      const onConfirm = () => {
        dispatch({
          type: 'PLAY_TURN',
          payload: { playerNumber, computerNumber }
        });
        hidePrompt();
      };
      // Attach a temporary listener to hidePrompt
      // We'll use a workaround: store callback in a ref on state
      window._handcricket_onPromptConfirm = onConfirm;
      return;
    }

    // Otherwise, just dispatch as normal
    dispatch({
      type: 'PLAY_TURN',
      payload: { playerNumber, computerNumber }
    });
  };

  const getComputerNumber = () => {
    // Simple AI: 60% chance to try to match player's recent choices when bowling
    // 70% chance to avoid player's recent choices when batting
    const recentChoices = state.gameLog
      .slice(-3)
      .map(log => {
        const match = log.match(/You chose (\d+)/);
        return match ? parseInt(match[1]) : null;
      })
      .filter(Boolean);

    if (state.playerBatting && recentChoices.length > 0 && Math.random() < 0.6) {
      // Computer is bowling - try to match player's recent choices
      return recentChoices[Math.floor(Math.random() * recentChoices.length)];
    } else if (!state.playerBatting && recentChoices.length > 0 && Math.random() < 0.7) {
      // Computer is batting - try to avoid player's recent choices
      const availableNumbers = [1, 2, 3, 4, 5, 6].filter(num => !recentChoices.includes(num));
      if (availableNumbers.length > 0) {
        return availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
      }
    }
    return Math.floor(Math.random() * 6) + 1;
  };

  const checkGameStatus = useCallback(() => {
    let inningsOver;
    if (state.mode === 'fifer') {
      // Ignore overs, only wickets or chase
      inningsOver = (state.playerBatting ? state.playerWickets >= state.maxWickets : state.computerWickets >= state.maxWickets);
      // Chasing team can win before losing all wickets
      if (state.inningsCompleted === 1) {
        if (state.playerBatting && state.playerScore > state.target) {
          inningsOver = true;
        } else if (!state.playerBatting && state.computerScore > state.target) {
          inningsOver = true;
        }
      }
    } else {
      inningsOver =
        state.currentBall >= state.maxOvers * 6 ||
        (state.playerBatting ? state.playerWickets >= state.maxWickets : state.computerWickets >= state.maxWickets);
      // Check if chasing team won
      if (state.inningsCompleted === 1) {
        if (state.playerBatting && state.playerScore > state.target) {
          inningsOver = true;
        } else if (!state.playerBatting && state.computerScore > state.target) {
          inningsOver = true;
        }
      }
    }

    if (inningsOver) {
      if (state.inningsCompleted === 0) {
        const firstInningsScore = state.playerBatting ? state.playerScore : state.computerScore;
        const chasingTeam = state.playerBatting ? 'Computer' : 'You';
        showPrompt('Innings Over!', `First innings is complete. The score to beat is ${firstInningsScore + 1}.\n\n${chasingTeam} will now chase the target.`);
        dispatch({ type: 'SWITCH_INNINGS' });
      } else {
        const playerWins = state.playerScore > state.computerScore;
        const winner = playerWins ? 'You' : 'the Computer';
        const margin = Math.abs(state.playerScore - state.computerScore);
        showPrompt('Game Over!', `${winner} won the match by ${margin} runs.`);
        dispatch({ type: 'END_GAME', payload: playerWins ? 'player' : 'computer' });
        // On-chain stats update
        if (contract && window.ethereum && window.ethereum.selectedAddress) {
          // Only update if wallet is connected and contract is present
          updatePlayerStats(contract, state.playerScore, playerWins).catch(() => {});
        }
      }
    }
  }, [state.currentBall, state.maxOvers, state.playerBatting, state.playerWickets, state.maxWickets, state.computerWickets, state.inningsCompleted, state.playerScore, state.computerScore, state.target, contract, state.mode]);

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const setMode = (mode) => {
    dispatch({ type: 'SET_MODE', payload: mode });
  };



  // Check game status whenever state changes
  useEffect(() => {
    if (state.phase === 'playing' && !state.gameOver) {
      checkGameStatus();
    }
  }, [state.phase, state.gameOver, checkGameStatus, state.currentBall]);

  const value = {
    ...state,
    handleToss,
    handleInningsChoice,
    playTurn,
    resetGame,
    showPrompt,
    hidePrompt,
    setMode,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}; 