// ESM
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon, 
  sepolia,
  hardhat,
  baseSepolia
} from 'wagmi/chains';  // 네트워크 추가하고 싶으면 https://wagmi.sh/core/api/chains <= 들어가서 네트워크 확인할 것

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'ff23280bca50eefae0bbcafa1cf5c270', // Reown 홈페이지 이용
  chains: [
    mainnet,
    hardhat,
    base,
    baseSepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []), 
  ],
  ssr: true,
});

