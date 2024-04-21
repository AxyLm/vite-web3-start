import { Header } from '@/layout/Header'
import Main from '@/pages'
import { NetworkSwitcher } from '@/components/SwitchNetworks'
import { ConnectWalletButton } from '@/components/ConnectWallet'
import { useAccount } from 'wagmi'
import { useEthersProvider, useEthersSigner } from '@/lib/wagmi'

const Home = () => {
  const { address, chain } = useAccount()
  const provider = useEthersProvider()
  const signer = useEthersSigner()

  return (
    <>
      <Header
        action={
          <>
            <NetworkSwitcher />
            <ConnectWalletButton />
          </>
        }
      />
      <Main />
    </>
  )
}

export default Home
