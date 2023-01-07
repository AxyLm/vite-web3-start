import { ethAccounts } from '~/web3/hooks/ethereum-metods';

export async function getAcocunts() {
  const [account] = await ethAccounts();
  return account;
}
