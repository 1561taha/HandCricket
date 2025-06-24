import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { fetchLeaderboard } from "../ethereum";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Card = styled.div`
  max-width: 500px;
  margin: 0 auto;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.13);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  animation: ${fadeIn} 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (max-width: 900px) {
    padding: 1.1rem 0.5rem 1rem 0.5rem;
    max-width: 98vw;
  }
  @media (max-width: 600px) {
    padding: 0.7rem 0.1rem 0.7rem 0.1rem;
    max-width: 100vw;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.10);
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 1.2rem;
`;

const TrophyIcon = styled.span`
  font-size: 2.1rem;
  color: #43e97b;
  filter: drop-shadow(0 2px 6px #38f9d7aa);
`;

const Title = styled.h2`
  font-size: 1.7rem;
  font-weight: 800;
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
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

const TableWrap = styled.div`
  width: 100%;
  overflow-x: auto;
  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(102, 126, 234, 0.07);
  border: 1.5px solid #e2e8f0;
`;

const Th = styled.th`
  background: #667eea;
  color: #fff;
  font-weight: 700;
  font-size: 1.08rem;
  padding: 14px 8px;
  letter-spacing: 0.02em;
  border-right: 1px solid #5a67d8;
  &:last-child {
    border-right: none;
  }
`;

const Td = styled.td`
  padding: 12px 8px;
  text-align: center;
  font-size: 1.05rem;
  border-bottom: 1px solid #e2e8f0;
  background: #fff;
`;

const Tr = styled.tr`
  transition: background 0.18s;
  &:nth-child(even) ${Td} {
    background: #f8fafc;
  }
  &:hover ${Td} {
    background: #e0f7fa;
  }
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #43e97b;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
  margin: 2rem auto;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function Leaderboard({ contract }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadLeaderboard = async () => {
    if (contract) {
      setLoading(true);
      try {
        const data = await fetchLeaderboard(contract);
        setPlayers(data);
      } catch (err) {
        setPlayers([]);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaderboard();
    // eslint-disable-next-line
  }, [contract]);

  return (
    <Card>
      <TitleRow>
        <TrophyIcon>🏆</TrophyIcon>
        <Title>Leaderboard</Title>
      </TitleRow>
      <RefreshRow>
        <RefreshBtn onClick={loadLeaderboard} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </RefreshBtn>
      </RefreshRow>
      {!contract ? (
        <div style={{textAlign: 'center', color: '#888', padding: '2rem 0'}}>Connect your wallet to view the leaderboard.</div>
      ) : loading ? (
        <Spinner />
      ) : (
        <TableWrap>
          <Table>
            <thead>
              <Tr>
                <Th>Rank</Th>
                <Th>Nickname</Th>
                <Th>Wins</Th>
                <Th>Games</Th>
                <Th>High Score</Th>
                <Th>Total Runs</Th>
              </Tr>
            </thead>
            <tbody>
              {players.map((p, i) => (
                <Tr key={p.playerAddress}>
                  <Td>{i + 1}</Td>
                  <Td>{p.nickname}</Td>
                  <Td>{p.wins.toString()}</Td>
                  <Td>{p.gamesPlayed.toString()}</Td>
                  <Td>{p.highestScore.toString()}</Td>
                  <Td>{p.totalRuns.toString()}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      )}
    </Card>
  );
}

export default Leaderboard; 