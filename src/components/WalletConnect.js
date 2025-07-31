import React, { useState } from "react";
import { connectWallet, getContract } from "../ethereum";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Card = styled.div`
  max-width: 400px;
  margin: 60px auto;
  padding: 2.5rem 2rem;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  @media (max-width: 500px) {
    margin: 30px 8px;
    padding: 1.5rem 0.5rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.2rem;
`;

const ConnectBtn = styled.button`
  padding: 14px 40px;
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.18);
  margin-bottom: 1.5rem;
  transition: all 0.2s;
  &:hover {
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.25);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1.5px solid #d1d5db;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  outline: none;
  transition: border 0.2s;
  &:focus {
    border-color: #667eea;
  }
`;

const RegisterBtn = styled(ConnectBtn)`
  margin-bottom: 0;
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
`;

const Address = styled.div`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1.2rem;
  word-break: break-all;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
  margin: 1rem auto;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Feedback = styled.div`
  color: #e53e3e;
  font-size: 1rem;
  margin-bottom: 1rem;
  min-height: 24px;
`;

function WalletConnect({ setContract, setAddress }) {
  const [address, setLocalAddress] = useState("");
  const [nickname, setNickname] = useState("");
  const [localContract, setLocalContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [registeredNickname, setRegisteredNickname] = useState("");

  async function handleConnect() {
    setFeedback("");
    try {
      const addr = await connectWallet();
      setLocalAddress(addr);
      if (setAddress) setAddress(addr);
      const { ethers } = await import("ethers");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractInstance = getContract(signer);
      setLocalContract(contractInstance);
      if (setContract) setContract(contractInstance);
      // Check if nickname is already registered
      try {
        const player = await contractInstance.getPlayer(addr);
        if (player && player.exists) {
          setRegisteredNickname(player.nickname);
        } else {
          setRegisteredNickname("");
        }
      } catch (err) {
        setRegisteredNickname("");
      }
    } catch (err) {
      if (err.message === "WRONG_NETWORK") {
        setFeedback("⚠️ Please switch to Somnia testnet in MetaMask to continue");
      } else {
        setFeedback("Failed to connect wallet");
      }
    }
  }

  async function registerNickname() {
    const contract = localContract;
    if (!contract) return;
    if (!nickname.trim()) {
      setFeedback("Please enter a nickname");
      return;
    }
    setLoading(true);
    setFeedback("");
    try {
      const tx = await contract.registerNickname(nickname.trim());
      setFeedback("Waiting for confirmation...");
      await tx.wait();
      setFeedback("✅ Nickname registered!");
      // Re-fetch player info
      try {
        const player = await contract.getPlayer(address);
        if (player && player.exists) {
          setRegisteredNickname(player.nickname);
        }
      } catch (err) {
        setRegisteredNickname(nickname.trim());
      }
    } catch (err) {
      if (err && err.message && err.message.includes("Nickname taken")) {
        setFeedback("❌ Nickname already taken");
      } else {
        setFeedback("❌ Registration failed");
      }
    }
    setLoading(false);
  }

  return (
    <Card>
      <Title>Connect Your Wallet</Title>
      {!address ? (
        <ConnectBtn onClick={handleConnect}>Connect Wallet</ConnectBtn>
      ) : registeredNickname ? (
        <>
          <Address>Connected: {address.slice(0, 6)}...{address.slice(-4)}</Address>
          <div style={{fontSize: '1.1rem', color: '#38a169', marginBottom: '1rem'}}>Nickname: <b>{registeredNickname}</b></div>
        </>
      ) : (
        <>
          <Address>Connected: {address.slice(0, 6)}...{address.slice(-4)}</Address>
          <Input
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="Enter unique nickname"
            disabled={loading}
            maxLength={20}
          />
          <RegisterBtn onClick={registerNickname} disabled={loading}>
            Register Nickname
          </RegisterBtn>
        </>
      )}
      {loading && <Spinner />}
      <Feedback>{feedback}</Feedback>
    </Card>
  );
}

export default WalletConnect;
