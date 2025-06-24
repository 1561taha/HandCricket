import { ethers } from "ethers";

// Replace with your contract address
export const CONTRACT_ADDRESS = "0xB5B004edbF056A94acA947adB565F4d594247EA8";

// Paste your ABI here (replace the ... below)
export const CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "nickname",
                "type": "string"
            }
        ],
        "name": "registerNickname",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "win",
                "type": "bool"
            }
        ],
        "name": "updateStats",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "allNicknames",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "addr",
                "type": "address"
            }
        ],
        "name": "getPlayer",
        "outputs": [
            {
                "components": [
                    { "internalType": "string", "name": "nickname", "type": "string" },
                    { "internalType": "address", "name": "playerAddress", "type": "address" },
                    { "internalType": "uint256", "name": "gamesPlayed", "type": "uint256" },
                    { "internalType": "uint256", "name": "wins", "type": "uint256" },
                    { "internalType": "uint256", "name": "losses", "type": "uint256" },
                    { "internalType": "uint256", "name": "highestScore", "type": "uint256" },
                    { "internalType": "uint256", "name": "totalRuns", "type": "uint256" },
                    { "internalType": "bool", "name": "exists", "type": "bool" }
                ],
                "internalType": "struct HandCricketLeaderboard.Player",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTopPlayers",
        "outputs": [
            {
                "components": [
                    { "internalType": "string", "name": "nickname", "type": "string" },
                    { "internalType": "address", "name": "playerAddress", "type": "address" },
                    { "internalType": "uint256", "name": "gamesPlayed", "type": "uint256" },
                    { "internalType": "uint256", "name": "wins", "type": "uint256" },
                    { "internalType": "uint256", "name": "losses", "type": "uint256" },
                    { "internalType": "uint256", "name": "highestScore", "type": "uint256" },
                    { "internalType": "uint256", "name": "totalRuns", "type": "uint256" },
                    { "internalType": "bool", "name": "exists", "type": "bool" }
                ],
                "internalType": "struct HandCricketLeaderboard.Player[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "string", "name": "", "type": "string" }
        ],
        "name": "nicknameToAddress",
        "outputs": [
            { "internalType": "address", "name": "", "type": "address" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "", "type": "address" }
        ],
        "name": "players",
        "outputs": [
            { "internalType": "string", "name": "nickname", "type": "string" },
            { "internalType": "address", "name": "playerAddress", "type": "address" },
            { "internalType": "uint256", "name": "gamesPlayed", "type": "uint256" },
            { "internalType": "uint256", "name": "wins", "type": "uint256" },
            { "internalType": "uint256", "name": "losses", "type": "uint256" },
            { "internalType": "uint256", "name": "highestScore", "type": "uint256" },
            { "internalType": "uint256", "name": "totalRuns", "type": "uint256" },
            { "internalType": "bool", "name": "exists", "type": "bool" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

export async function connectWallet() {
  if (!window.ethereum) throw new Error("MetaMask not found");
  const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
  return account;
}

export function getContract(signerOrProvider) {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
}

export async function updatePlayerStats(contract, score, win) {
  const tx = await contract.updateStats(score, win);
  await tx.wait();
}

export async function fetchLeaderboard(contract) {
  return await contract.getTopPlayers();
}
