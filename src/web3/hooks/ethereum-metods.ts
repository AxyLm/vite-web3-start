export function ethAccounts(): Promise<string[] | []> {
  return window.ethereum.request({ method: 'eth_accounts' });
}
