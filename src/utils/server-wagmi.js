(async () => {
    const { http, createConfig } = await import('@wagmi/core');
    const { 
        base,
        mainnet,
        sepolia,
        hardhat,
        baseSepolia
    } = await import('@wagmi/core/chains');
  
    const config = createConfig({
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
  
        transports: {
          [mainnet.id]: http(),
          [sepolia.id]: http(),
        },
    });

    module.exports = { config };
  })();
  