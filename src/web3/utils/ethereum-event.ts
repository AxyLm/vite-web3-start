import mitt from 'mitt';

type WalletEvents = {
  ethereum_chainChanged: number;
  ethereum_accountChanged: string[];
};
const ethereumEmitter = mitt<WalletEvents>();

export default ethereumEmitter;
