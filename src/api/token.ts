import { ethers, Contract } from 'ethers'
import erc721Abi from './abis/ERC721Enumerable.json'

const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/', { name: 'binance', chainId: 56 })

export const getContract = (address: string) => new ethers.Contract(address, erc721Abi.abi, provider)

export const getCollectionName = (contract: Contract) => contract.name()

export const isERC721Enumerable = (contract: Contract) => contract.supportsInterface('0x780e9d63')

export const getOwnedTokenCount = (contract: Contract, owner: string) => contract.balanceOf(owner)

export const getAllTokenIds = async (contract: Contract, limit: number = 20) => {
  const totalSupply = await contract.totalSupply()
  const getTokenIds = Array(Math.min(totalSupply.toNumber(), limit))
    .fill(0)
    .map((_, index) => contract.tokenByIndex(index))
  const tokenIds = await Promise.all(getTokenIds)
  const getTokenUris = tokenIds.map(tokenId => contract.tokenURI(tokenId))
  const getOwners = tokenIds.map(tokenId => contract.ownerOf(tokenId))
  const tokenUris = await Promise.all(getTokenUris)
  const owners = await Promise.all(getOwners)

  return [tokenUris as string[], owners as string[]]
}

export const getOwnedTokenIds = async (contract: Contract, owner: string, limit: number = 20) => {
  const total = await contract.balanceOf(owner)
  const getTokenIds = Array(Math.min(total.toNumber(), limit))
    .fill(0)
    .map((_, index) => contract.tokenOfOwnerByIndex(owner, index))
  const tokenIds = await Promise.all(getTokenIds)
  const getTokenUris = tokenIds.map(tokenId => contract.tokenURI(tokenId))
  const tokenUris = await Promise.all(getTokenUris)
  return tokenUris as string[]
}
