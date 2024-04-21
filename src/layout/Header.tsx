import { ReactNode } from 'react'
import './header.less'
export const Header = ({ action }: { action?: ReactNode }) => {
  return (
    <div className="header sticky inset-x-0 top-0 z-20 flex items-center justify-between border-b border-b-white/5 px-4 sm:h-20 sm:px-7.5 xl:px-10">
      <div className="flex items-center font-bold cursor-pointer">
        <span className="text-xl"></span>
        <span className="flex-col-center ml-3 py-.25 px-1.5 text-xs text-#666 bg-white rounded-full font-light">
          {/* <span
            style={
              {
                backgroundImage: 'linear-gradient(270deg, #B4EAA1 0%, #F8D07A 100%)',
                display: 'inline-block',
                lineHeight: 1,
                WebkitTextFillColor: 'transparent',
              } as any
            }
            className="bg-clip-text"
          >

            ccip
          </span> */}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {action}
        <a href="https://github.com/AxyLm/vite-web3-start" target="_blank" rel="noopener" className="block h-6 w-6">
          <span className="i-mdi:github h-6 w-6"></span>
        </a>
      </div>
    </div>
  )
}
