# Vite-web3-start

![Website](https://img.shields.io/website?url=http%3A%2F%2Fdapp.soulfree.cn)

A use Vue 3 + Typescript + Vite web3 Dapp start template, use metamask connect. support Ethereum, Bsc network ..

[Dapp Demo](http://dapp.soulfree.cn)

## TODO

- [ ] wallet connect
  - [x] Metamask
  - [ ] Coinbase Wallet
  - [ ] Trust Wallet
  - [ ] WalletConnect
  - [ ] more...
- [ ] Support Network
  - [x] Ethereum
  - [x] BNB Chain
  - [ ] Support for more networks..
- [ ] Transfer
  - [x] ui style
  - [ ] Transfer assets from bsc to eth, No commissions!!

## Start

### development

Just run and visit [http://localhost:5173/](http://localhost:5173/)

```bash
yarn dev
```

### build

```bash
yarn build
```

### Deploy on you git pages

Go to [GitHub Pages](https://github.com/AxyLm/vite-web3-start/settings/pages)

1. Under "Build and deployment", under "Source", select **Deploy from a branch**.
2. Under "Build and deployment", under "Branch", select **gh-pages**

- This option can be modified in [action.yml](./.github/workflows/action.yml#L35-L20) on line 35

3. Click **Save**.

## LICENSE

[MIT license](./LICENSE)
