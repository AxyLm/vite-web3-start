import { useAccount, useConnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { SVGProps } from 'react'

export function LineMdLoadingLoop(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
        <path
          strokeDasharray="60"
          strokeDashoffset="60"
          strokeOpacity=".3"
          d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
        >
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"></animate>
        </path>
        <path strokeDasharray="15" strokeDashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12">
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"></animate>
          <animateTransform
            attributeName="transform"
            dur="1.5s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          ></animateTransform>
        </path>
      </g>
    </svg>
  )
}

export function FluentWallet28Regular(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 28 28" {...props}>
      <path
        fill="currentColor"
        d="M18.75 16a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5zM3 5.75A2.75 2.75 0 0 1 5.75 3h13.5A2.75 2.75 0 0 1 22 5.75v1.258a3.75 3.75 0 0 1 3.5 3.742v10.5A3.75 3.75 0 0 1 21.75 25H6.754a3.75 3.75 0 0 1-3.75-3.75v-10.5H3V6h.011A3 3 0 0 1 3 5.75M21.75 8.5H4.504v12.75a2.25 2.25 0 0 0 2.25 2.25H21.75A2.25 2.25 0 0 0 24 21.25v-10.5a2.25 2.25 0 0 0-2.25-2.25M20.5 5.75c0-.69-.56-1.25-1.25-1.25H5.75a1.25 1.25 0 1 0 0 2.5H20.5z"
      ></path>
    </svg>
  )
}

const ConnectWalletButton = () => {
  const { address, isConnecting } = useAccount()
  const { openConnectModal, connectModalOpen } = useConnectModal()

  return (
    <>
      <Button
        className="flex h-9  text-base-1 items-center rounded-md border bg-transparent hover:dark:bg-opacity-1 dark:bg-black px-2 text-sm leading-9 dark:border-white/20 sm:flex sm:px-4"
        onClick={openConnectModal}
      >
        <div className="mr-1 w-4 h-4">{connectModalOpen ? <LineMdLoadingLoop /> : <FluentWallet28Regular />}</div>
        <span className='select-none'>
          {address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : 'Connect Wallet'}
        </span>
      </Button>
    </>
  )
}

export { ConnectWalletButton }
