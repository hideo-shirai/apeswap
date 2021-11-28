import { useContext, useEffect, useState, useCallback, ChangeEvent } from 'react'
import { Contract } from 'ethers'
import { useParams } from 'react-router-dom';
import Collection from 'components/composites/Collection';
import { SignerContext } from 'App'
import {
  getAllTokenIds,
  getOwnedTokenIds,
  getCollectionName,
  isERC721Enumerable,
  getContract,
  getOwnedTokenCount
} from 'api/token';

interface NftProp { }

const getAllTokens = async (contract: Contract, owner: string) => {
  const [uris, owners] = await getAllTokenIds(contract)
  const tokenData = await Promise.all(uris.map(uri => fetch(uri).then(res => res.json())))

  return tokenData.map((token: any, index) => ({
    image: token.image,
    name: token.name,
    desc: token.description,
    owned: owners[index] === owner
  } as NftAssetData))
}

const getOwnedTokens = async (contract: Contract, owner: string) => {
  const uris = await getOwnedTokenIds(contract, owner)
  const tokenData = await Promise.all(uris.map(uri => fetch(uri).then(res => res.json())))

  return tokenData.map((token: any) => ({
    image: token.image,
    name: token.name,
    desc: token.description,
    owned: true
  } as NftAssetData))
}

const getData = async (
  address: string,
  signer: Nullable<string>,
  onlyOwned: boolean
) => {
  const contract = getContract(address)

  try {
    const res = await isERC721Enumerable(contract)
    if (!res) {
      throw Error('This contract is not ERC721 Enumerable')
    }
  } catch (e: any) {
    throw Error('This contract is not ERC721 Enumerable')
  }

  try {
    const result = { name: '', totalOwned: 0,  data: [] as NftAssetData[] }
    result.name = await getCollectionName(contract)
    if (signer) {
      const totalOwned = await getOwnedTokenCount(contract, signer)
      result.totalOwned = totalOwned.toNumber()
    }
    if (onlyOwned && signer) {
      result.data = await getOwnedTokens(contract, signer)
    } else {
      result.data = await getAllTokens(contract, signer ?? 'NO_SIGNER')
    }

    return result
  } catch (e: any) {
    throw Error(`${e.code}: ${e.reason}`)
  }
}

const Nft: React.FC<NftProp> = () => {
  const { address } = useParams()
  const signer = useContext(SignerContext)
  const [onlyOwned, setOnlyOwned] = useState(false)
  const [data, setData] = useState<Nullable<NftAssetData[]>>(null)
  const [totalOwned, setTotalOwned] = useState<number>(0)
  const [status, setStatus] = useState<Nullable<string>>(null)
  const [name, setName] = useState<string>()

  useEffect(() => {
    if (!address) {
      return
    }

    setStatus('Loading...')
    getData(address, signer, onlyOwned)
      .then(res => {
        setName(res.name)
        setTotalOwned(res.totalOwned)
        setData(res.data)
        setStatus(null)
      }).catch((e: any) => setStatus(e.message))
  }, [address, signer, onlyOwned])

  const handleOnlyOwnedClick = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setOnlyOwned(e.target.checked),
    [],
  )

  return (
    <div>
      <div className='flex justify-between items-center flex-wrap'>
        {name && (
          <p className='text-2xl font-medium text-gray-400 mb-3'>
            Collection Name: {name}
          </p>
        )}
        {!status && signer && (
          <p className='text-2xl font-medium text-gray-400 mb-3'>
            Total Owned: {totalOwned}
          </p>
        )}
        {!signer && (
          <p className='text-2xl font-medium text-gray-400 mb-3'>
            Total Owned: Your wallet is not connected
          </p>
        )}
        {signer && (
          <label>
            <input type='checkbox' checked={onlyOwned} onChange={handleOnlyOwnedClick} />
            &nbsp;Show only my NFTs
          </label>
        )}
      </div>
      {status ? (
        <div className='text-lg font-medium text-gray-400 text-center'>
          {status}
        </div>
      ) : data && (
        <Collection data={data} />
      )}
    </div>
  )
}

export default Nft
