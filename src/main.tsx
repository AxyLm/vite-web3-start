import './polyfills'
import './global.css'
import '@rainbow-me/rainbowkit/styles.css'
import '@/style/dark.less'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { rainbowConfig } from './configs/rainbow'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={rainbowConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en-US">
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
