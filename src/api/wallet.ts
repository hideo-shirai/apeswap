import { ethers } from "ethers"

const getWalletSigner = () => new Promise<ethers.providers.JsonRpcSigner>((resolve, reject) => {
  const ethereum = (window as {[key in any]: any})['ethereum']

  if (typeof ethereum === undefined) {
    alert('Metamask is not installed')
  }

  ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(async () => {
      const provider = new ethers.providers.Web3Provider(ethereum, 'any')
      const network = await provider.getNetwork()

      if (network.chainId !== 1) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x38',
              rpcUrls: ['https://bsc-dataseed.binance.org/']
            }]
          })
        } catch (switchError) {
          reject(switchError)
        }
      }
      resolve(provider.getSigner())
    })
    .catch(reject)
})

export default getWalletSigner
