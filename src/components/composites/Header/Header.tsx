import Button from "components/bases/Button";
import MetamaskImage from 'images/metamask.svg'

interface HeaderProps {
  onConnectWalletClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onConnectWalletClick }) => (
  <div className='sticky top-0 bg-white bg-opacity-95	z-10 backdrop-filter backdrop-blur-sm	shadow-md flex py-6 px-4 justify-between items-center flex-wrap'>
    <a href='/'>
      <p className='text-3xl font-medium text-gray-400 hover:text-gray-300'>
        Apeswap Finance Assignment
      </p>
    </a>
    <div>
      <Button variant='secondary' onClick={onConnectWalletClick}>
        <img src={MetamaskImage} alt='img' />
      </Button>
    </div>
  </div>
)

export default Header
