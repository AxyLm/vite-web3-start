import { connectorsForWallets, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { arbitrum, base, mainnet, optimism, polygon } from 'wagmi/chains'
import { injectedWallet, rabbyWallet, metaMaskWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
import { createConfig, http } from 'wagmi'

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [injectedWallet, rabbyWallet, metaMaskWallet, walletConnectWallet],
    },
  ],
  {
    appName: 'My RainbowKit App',
    projectId: 'f041aa430a4a7cdd424209d1b8e752f3',
  }
)

// const rainbowConfig = getDefaultConfig({
//   appName: 'My React App',
//   projectId: 'f041aa430a4a7cdd424209d1b8e752f3',
//   chains: [mainnet, polygon, optimism, arbitrum],
// })

const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum],
  connectors,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
})
export { config as rainbowConfig }
