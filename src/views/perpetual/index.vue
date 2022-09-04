<template>
  <div class="max-w-lg px-4">
    <div class="m-h-20 mb-4 w-full rounded-xl bg-skin-100 p-6 dark:bg-base-11">
      <div class="text-md font-semibold">
        <span>USDC</span>
        <span class="ml-10 text-skin-500 dark:text-skin-400">0</span>
      </div>

      <div class="mt-4 flex font-medium">
        <div
          class="mr-2 h-10 w-full rounded-xl bg-skin-400 text-center text-lg leading-10 dark:bg-skin-800"
        >
          Withdraw
        </div>
        <div
          class="ml-2 h-10 w-full rounded-xl bg-skin-300 text-center text-lg leading-10 dark:bg-skin-600"
        >
          Deposit
        </div>
      </div>
    </div>
    <div class="m-h-20 mb-4 w-full rounded-xl bg-skin-100 p-6 dark:bg-base-11">
      <div>
        <input
          type="text"
          class="h-14 w-full rounded-lg bg-skin-200 p-4 text-xl ring-0 ring-skin-700 ring-offset-0 transition-colors hover:ring-2 focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-skin-600 focus-visible:ring-offset-0 dark:bg-base-13"
        />
      </div>
      <div class="mt-4 flex font-medium">
        <div
          class="text-md mr-2 h-10 w-full rounded-xl bg-skin-400 text-center leading-10 dark:bg-skin-800"
        >
          LONG
        </div>
        <div
          class="text-md ml-2 h-10 w-full rounded-xl bg-skin-300 text-center leading-10 dark:bg-skin-600"
        >
          SHORT
        </div>
      </div>
    </div>
  </div>
</template>
