import React, { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import Leaderboard from "./components/Leaderboard";
import PlayerProfile from "./components/PlayerProfile";
import { GameProvider } from './context/GameContext';
import GameContainer from './components/GameContainer';
import HowToPlayPage from './components/HowToPlayPage';
import styled from "styled-components";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

const AppBg = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Sidebar = styled.div`
  width: 370px;
  min-width: 300px;
  max-width: 95vw;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 18px 32px 32px;
  @media (max-width: 900px) {
    width: 100%;
    min-width: 0;
    padding: 18px 8px 0 8px;
    gap: 18px;
  }
`;

const MainArea = styled.div`
  flex: 1;
  min-width: 0;
  padding: 32px 32px 32px 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  @media (max-width: 900px) {
    padding: 0 0 32px 0;
  }
`;

const LeaderboardWrapper = styled.div`
  margin: 40px auto 0 auto;
  max-width: 900px;
  width: 100%;
  @media (max-width: 1000px) {
    max-width: 98vw;
  }
`;

function App() {
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState("");

  return (
    <BrowserRouter>
      <GameProvider contract={contract}>
        <Routes>
          <Route path="/how-to-play" element={<HowToPlayPage />} />
          <Route path="/" element={
            <AppBg>
              <Sidebar>
                <WalletConnect setContract={setContract} setAddress={setAddress} />
                <PlayerProfile contract={contract} address={address} />
              </Sidebar>
              <MainArea>
                <GameContainer />
                <LeaderboardWrapper>
                  <Leaderboard contract={contract} />
                </LeaderboardWrapper>
              </MainArea>
            </AppBg>
          } />
        </Routes>
      </GameProvider>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
