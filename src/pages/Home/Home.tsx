import { useRef, useCallback } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Button from 'components/bases/Button';
import Input from 'components/bases/Input';

interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  const handleGoClick = useCallback(
    () => {
      if (inputRef.current) {
        navigate(`./0x${inputRef.current.value}`, { replace: true })
      }
    },
    [navigate]
  )

  return (
    <div className='flex'>
      <div className='mx-auto my-10'>
        <p className='font-medium text-gray-500 mb-5'>
          Choose collection below, or enter contract address and hit "Go"
        </p>

        <Link to='/0x96d4d7707285d1d55725108f0e93515941b4d547' className='block text-center'>
          <Button variant='primary' className='w-48'>
            Meliora
          </Button>
        </Link>
        <Link to='/0x1d293cad3476f064cB684A37Ede558f8C1114a7a' className='block text-center mt-2'>
          <Button variant='primary' className='w-48'>
            Wolf Game
          </Button>
        </Link>

        <div className='flex items-center justify-center flex-wrap mt-2'>
          <label>
            Enter NFT Address
            <Input ref={inputRef} addr className='ml-2' />
          </label>
          <Button onClick={handleGoClick} variant='secondary' className='ml-2'>
            Go
          </Button>
        </div>
        <p className='text-center'>
          <a
            href="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol"
            rel="noreferrer"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            ERC721Enumerable
          </a>
          &nbsp;tokens only
        </p>
      </div>
    </div>
  )
}

export default Home
