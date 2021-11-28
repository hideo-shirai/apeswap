import clsx from 'clsx'

interface ImageProps {
  src: string
  owned?: boolean
  className?: string
}

const Image: React.FC<ImageProps> = ({ owned, className, src}) => (
  <div className={clsx('relative overflow-hidden border border-gray-200', className)}>
    <img alt='asset' src={src} />
    {owned && (
      <div className='bg-yellow-500 h-32 w-32 absolute transform -rotate-45 -translate-x-1/2 -translate-y-1/2 top-0 left-0 text-lg font-medium text-white flex'>
        <span className='mt-auto mx-auto pb-1'>Owned</span>
      </div>
    )}
  </div>
)

export default Image
