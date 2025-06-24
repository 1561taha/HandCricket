import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(102,126,234,0.18);
  padding: 2.2rem 2rem 2rem 2rem;
  width: 95vw;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.5s;
  @media (max-width: 600px) {
    padding: 1.2rem 0.5rem 1rem 0.5rem;
    max-width: 98vw;
  }
`;

const StepIndicator = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 1.2rem;
`;

const StepDot = styled.div`
  width: 12px; height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #43e97b 100%)' : '#e0e7ef'};
  transition: background 0.2s;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #43e97b 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 0.7rem 0;
  text-align: center;
`;

const Description = styled.p`
  color: #555;
  font-size: 1.08rem;
  margin: 0 0 1.2rem 0;
  text-align: center;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px 0;
  border: none;
  border-radius: 12px;
  font-size: 1.13rem;
  font-weight: 700;
  cursor: pointer;
  background: linear-gradient(135deg, #667eea 0%, #43e97b 100%);
  color: white;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.13);
  margin-top: 1.2rem;
  transition: all 0.3s;
  &:hover:enabled {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.18);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 13px 12px;
  border-radius: 10px;
  border: 1.5px solid #e0e7ef;
  font-size: 1.1rem;
  margin-bottom: 1.1rem;
  margin-top: 0.2rem;
  outline: none;
  &:focus {
    border-color: #667eea;
  }
`;

const ModeGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const ModeCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${props => props.selected ? 'linear-gradient(135deg, #e0f7fa 0%, #e0ffe7 100%)' : '#f8fafc'};
  border: 2px solid ${props => props.selected ? '#43e97b' : 'transparent'};
  border-radius: 12px;
  padding: 1rem 1rem;
  cursor: pointer;
  transition: border 0.2s, background 0.2s;
`;

const ModeIcon = styled.div`
  font-size: 2rem;
`;

const ModeInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModeTitle = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  color: #333;
`;

const ModeDesc = styled.div`
  font-size: 0.98rem;
  color: #666;
`;

const OnboardingModal = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState('');
  const [mode, setMode] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);

  // Dummy wallet connect for UI demo
  const handleConnectWallet = () => {
    setWalletConnected(true);
    setStep(1);
  };

  const handleContinueNickname = () => {
    setStep(2);
  };

  const handleSelectMode = (selectedMode) => {
    setMode(selectedMode);
  };

  const handleFinish = () => {
    if (onComplete) onComplete({ nickname, mode });
  };

  return (
    <Overlay>
      <Modal>
        <StepIndicator>
          {[0,1,2].map(i => <StepDot key={i} active={i===step} />)}
        </StepIndicator>
        {step === 0 && (
          <>
            <Title>Connect Your Wallet</Title>
            <Description>To play and save your progress, connect your crypto wallet.</Description>
            <Button onClick={handleConnectWallet}>Connect Wallet</Button>
          </>
        )}
        {step === 1 && (
          <>
            <Title>Choose a Nickname</Title>
            <Description>This will be your unique name on the leaderboard.</Description>
            <Input
              type="text"
              placeholder="Enter nickname..."
              value={nickname}
              maxLength={16}
              onChange={e => setNickname(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
              autoFocus
            />
            <Button
              onClick={handleContinueNickname}
              disabled={!nickname.trim()}
            >Continue</Button>
          </>
        )}
        {step === 2 && (
          <>
            <Title>Select Game Mode</Title>
            <Description>Pick your preferred hand cricket mode.</Description>
            <ModeGrid>
              <ModeCard selected={mode==='classic'} onClick={()=>handleSelectMode('classic')}>
                <ModeIcon>🏏</ModeIcon>
                <ModeInfo>
                  <ModeTitle>Classic</ModeTitle>
                  <ModeDesc>2 innings, 2 overs, 2 wickets per side.</ModeDesc>
                </ModeInfo>
              </ModeCard>
              <ModeCard selected={mode==='superover'} onClick={()=>handleSelectMode('superover')}>
                <ModeIcon>⚡</ModeIcon>
                <ModeInfo>
                  <ModeTitle>Super Over</ModeTitle>
                  <ModeDesc>1 over, 2 wickets. Fast and furious!</ModeDesc>
                </ModeInfo>
              </ModeCard>
              <ModeCard selected={mode==='fifer'} onClick={()=>handleSelectMode('fifer')}>
                <ModeIcon>5️⃣</ModeIcon>
                <ModeInfo>
                  <ModeTitle>Fifer</ModeTitle>
                  <ModeDesc>Lose 5 wickets or chase the target. No over limit.</ModeDesc>
                </ModeInfo>
              </ModeCard>
            </ModeGrid>
            <Button
              style={{marginTop:'1.5rem'}}
              onClick={handleFinish}
              disabled={!mode}
            >Start Playing</Button>
          </>
        )}
      </Modal>
    </Overlay>
  );
};

export default OnboardingModal; 