import clsx from 'clsx'
import Image from 'components/bases/Image'
import Card from 'components/bases/Card'

interface NftAssetProps extends NftAssetData {
  className?: string,
}

const Nft: React.FC<NftAssetProps> = ({
  image,
  owned,
  name,
  desc,
  className,
}) => (
  <Card className={clsx('md:flex', className)}>
    <Image src={image} owned={owned} className='max-w-100 md:w-64 md:flex-grow-0 md:flex-shrink-0' />
    <div className='mt-3 md:mt-0 md:ml-3 text-gray-700 font-normal text-sm'>
      <p className='mb-2 font-bold text-lg'>{name}</p>
      <p>{desc}</p>
    </div>
  </Card>
)

export default Nft
