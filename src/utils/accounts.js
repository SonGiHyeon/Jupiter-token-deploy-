// accounts.js
require('dotenv').config(); // .env 파일 로드

const { createWalletClient, http } = require('viem');
const { baseSepolia } = require('viem/chains');
const { privateKeyToAccount } = require('viem/accounts');

// walletClient 생성
const walletClient = createWalletClient({
  chain: baseSepolia,
  transport: http('https://sepolia.base.org')
});

const adminAccount = privateKeyToAccount(process.env.ADMIN_PRIVATE_KEY);

module.exports = { walletClient, adminAccount };