import { useAccount, useChainId, useClient, useSwitchChain } from 'wagmi'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMemo } from 'react'

export function NetworkSwitcher() {
  const { error, switchChain, isPending, chains } = useSwitchChain()
  const chainId = useChainId()

  const { chain } = useAccount()
  const defaultValue = useMemo(() => chainId.toString(), [chainId])

  if (!chain) return null

  return (
    <Select
      onValueChange={(val) => {
        console.log(val)
        switchChain?.({ chainId: Number(val) })
      }}
      defaultValue={defaultValue}
      value={defaultValue}
    >
      <SelectTrigger className="flex h-9  text-base-1 items-center rounded-md border bg-transparent hover:dark:bg-opacity-1 dark:bg-black px-2 text-sm leading-9 dark:border-white/20 sm:flex sm:px-4 outline-none active:outline-none focus:ring-offset-none focus:ring-0">
        <SelectValue>
          <span className="flex-center select-none">
            {isPending && (
              <span className="i-line-md:loading-twotone-loop inline-flex mr-1 w-4 h-4 text-primary"></span>
            )}{' '}
            {chain?.name}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {chains.map((x) =>
            x.id === chainId ? null : (
              <SelectItem value={`${x.id}`} key={x.id}>
                <span className="flex-center">
                  {isPending && x.id === chain.id && (
                    <span className="i-line-md:loading-twotone-loop inline-flex mr-1 w-4 h-4 text-primary"></span>
                  )}{' '}
                  {x.name}
                </span>
              </SelectItem>
            )
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
