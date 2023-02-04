// import { ref, shallowRef, watchSyncEffect } from 'vue';
// import UniversalProvider from '@walletconnect/universal-provider';
// import QRCodeModal from '@walletconnect/qrcode-modal';
// import { useProvider } from '~/composables/use-provider';
// import { ethers } from 'ethers';
// import { useAccounts } from '~/composables/use-account';
// import { Address } from 'abitype';

// const PROJECT_ID = '';

// const UniversalProviderOpts = {
//   logger: 'warn',
//   relayUrl: 'wss://relay.walletconnect.com',
//   projectId: PROJECT_ID,
//   metadata: {
//     name: 'Moseu',
//     description: '',
//     url: window.location.href,
//     icons: ['/favicon.png'],
//   },
// };

// const namespance = {
//   eip155: {
//     methods: [
//       'eth_accounts',
//       'eth_sendTransaction',
//       'eth_signTransaction',
//       'eth_sign',
//       'personal_sign',
//       'eth_signTypedData',
//       '_signTypedData',
//       'eth_signTypedData_v4',
//     ],
//     chains: ['eip155:56'],
//     events: ['chainChanged', 'accountsChanged'],
//     rpcMap: {
//       56: `https://rpc.walletconnect.com?chainId=eip155:56&projectId=${PROJECT_ID}`,
//     },
//   },
// };

// const universalProvider = shallowRef<UniversalProvider>();

// export enum WalletConnectEvents {
//   CONNECT = 'connect',
//   DISPLAY_URI = 'display_uri',
//   DISCONNECT = 'disconnect',
//   CALL_REQUEST = 'call_request',
//   SESSION_REQUEST = 'session_request',
//   SESSION_UPDATE = 'session_update',
//   WC_SESSION_REQUEST = 'wc_sessionRequest',
//   WC_SESSION_UPDATE = 'wc_sessionUpdate',
// }

// export const useWalletConnect = () => {
//   const [_, setProvider] = useProvider();

//   watchSyncEffect(async () => {
//     if (universalProvider.value) {
//       console.log('111');

//       universalProvider.value.on(WalletConnectEvents.SESSION_REQUEST, (e: any) => {
//         console.log(WalletConnectEvents.SESSION_REQUEST, e);
//       });
//       universalProvider.value.on(WalletConnectEvents.SESSION_UPDATE, (e: any) => {
//         console.log(WalletConnectEvents.SESSION_UPDATE, e);
//       });

//       universalProvider.value.on(WalletConnectEvents.DISCONNECT, () => {
//         console.log('disconnect');
//         setProvider(undefined);
//       });
//       universalProvider.value.on(WalletConnectEvents.CONNECT, () => {
//         if (universalProvider.value) {
//           const web3Provider = new ethers.providers.Web3Provider(universalProvider.value!);
//           setProvider(web3Provider);
//         }
//       });
//     }
//   });

//   const initLoading = ref(false);
//   async function initClient() {
//     initLoading.value = true;

//     try {
//       const cli = await UniversalProvider.init(UniversalProviderOpts);
//       universalProvider.value = cli;
//       await cli
//         .disconnect()
//         .catch((e) => {
//           console.log('no conneted');
//         })
//         .finally(() => {
//           awaitConnect().finally(() => {
//             initLoading.value = false;
//           });
//         });
//       //   const web3Provider = new ethers.providers.Web3Provider(universalProvider.value);

//       //   const signer = web3Provider.getSigner();

//       //   console.log(web3Provider.getSigner());

//       //   if (signer) {
//       //     setProvider(web3Provider);

//       //     const account = await signer.getAddress();
//       //     const accountStore = useAccounts();
//       //     const { accounts } = storeToRefs(accountStore);

//       //     accounts.value = [account as Address];

//       //     initLoading.value = false;
//       //   } else {
//       //     console.log(universalProvider.value);
//       //     universalProvider.value.connect({ namespaces: namespance }).then((e) => {
//       //       setProvider(web3Provider);
//       //       setAccounts();
//       //       QRCodeModal.close();
//       //     });
//       //     universalProvider.value.on(WalletConnectEvents.DISPLAY_URI, (e: string) => {
//       //       QRCodeModal.open(e, () => {
//       //         initLoading.value = false;
//       //         console.log('EVENT', 'QR Code Modal closed');
//       //       });
//       //     });

//       //     universalProvider.value.on(WalletConnectEvents.CONNECT, (e: string) => {
//       //       initLoading.value = false;
//       //       QRCodeModal.close();
//       //     });

//       //     // setTimeout(() => {
//       //     //   if (accounts.length > 0) return;
//       //     //   cli.disconnect();
//       //     //   initLoading.value = false;
//       //     //   throw Error('[initClient] connect timeout');
//       //     // }, 1000 * 10);
//       //   }
//     } catch (error) {
//       console.log('[useWalletConnect] initClient \n', error);
//       initLoading.value = false;
//     }

//     return universalProvider.value;
//   }

//   async function awaitConnect() {
//     if (!universalProvider.value) throw Error('[disconnect] client not found');
//     const web3Provider = new ethers.providers.Web3Provider(universalProvider.value);

//     universalProvider.value.connect({ namespaces: namespance }).then(async (e) => {
//       setProvider(web3Provider);
//       const accounts = await universalProvider.value?.enable();
//       const accountStore = useAccounts();
//       accountStore.accounts = accounts as Address[];
//       QRCodeModal.close();
//     });
//     universalProvider.value.on(WalletConnectEvents.DISPLAY_URI, (e: string) => {
//       QRCodeModal.open(e, () => {
//         initLoading.value = false;
//       });
//     });

//     universalProvider.value.on(WalletConnectEvents.CONNECT, (e: string) => {
//       initLoading.value = false;
//       QRCodeModal.close();
//     });
//   }

//   async function disconnect() {
//     if (!universalProvider.value) throw Error('[disconnect] client not found');
//     const [_, setProvider] = useProvider();

//     await universalProvider.value.disconnect().finally(() => {
//       setProvider(undefined);
//     });
//   }

//   async function setAccounts() {
//     if (!universalProvider.value) {
//       initLoading.value = false;
//       return;
//     }
//     const [_, setProvider] = useProvider();
//     setProvider(new ethers.providers.Web3Provider(universalProvider.value));
//     const accountStore = useAccounts();
//     await accountStore.requestAccounts().finally(() => {
//       console.log(accountStore.accounts);
//       initLoading.value = false;
//     });
//   }

//   return {
//     universalProvider,
//     initLoading,
//     initClient,
//     disconnect,
//   };
// };

export {};
