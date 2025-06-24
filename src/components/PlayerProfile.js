import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Card = styled.div`
  max-width: 400px;
  margin: 30px auto 0 auto;
  padding: 2rem 1.5rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(102, 126, 234, 0.13);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  @media (max-width: 500px) {
    margin: 20px 8px 0 8px;
    padding: 1.2rem 0.5rem;
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.2rem;
`;

const StatRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const Label = styled.span`
  color: #555;
`;

const Value = styled.span`
  font-weight: 600;
  color: #667eea;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #43e97b;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  animation: spin 1s linear infinite;
  margin: 1.5rem auto;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const RefreshRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
`;

const RefreshBtn = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #43e97b 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 7px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.10);
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: linear-gradient(135deg, #43e97b 0%, #667eea 100%);
    transform: translateY(-2px) scale(1.04);
  }
`;

function PlayerProfile({ contract, address }) {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPlayer = async () => {
    if (contract && address) {
      setLoading(true);
      try {
        const p = await contract.getPlayer(address);
        if (p && p.exists) {
          setPlayer(p);
        } else {
          setPlayer(null);
        }
      } catch (err) {
        setPlayer(null);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayer();
    // eslint-disable-next-line
  }, [contract, address]);

  if (!contract || !address) {
    return <Card><Title>Your Profile</Title><div style={{color:'#888'}}>Connect your wallet to view your stats.</div></Card>;
  }
  if (loading) {
    return <Card><Title>Your Profile</Title><Spinner /></Card>;
  }
  if (!player) {
    return <Card><Title>Your Profile</Title><div style={{color:'#888'}}>No profile found. Register a nickname to start tracking your stats!</div></Card>;
  }
  return (
    <Card>
      <Title>👤 {player.nickname}</Title>
      <RefreshRow>
        <RefreshBtn onClick={fetchPlayer} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </RefreshBtn>
      </RefreshRow>
      <StatRow><Label>Games Played:</Label><Value>{player.gamesPlayed.toString()}</Value></StatRow>
      <StatRow><Label>Wins:</Label><Value>{player.wins.toString()}</Value></StatRow>
      <StatRow><Label>Losses:</Label><Value>{player.losses.toString()}</Value></StatRow>
      <StatRow><Label>Highest Score:</Label><Value>{player.highestScore.toString()}</Value></StatRow>
      <StatRow><Label>Total Runs:</Label><Value>{player.totalRuns.toString()}</Value></StatRow>
    </Card>
  );
}

export default PlayerProfile; 