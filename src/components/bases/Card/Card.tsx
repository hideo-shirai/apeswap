import clsx from "clsx"

interface CardProps {
  children: React.ReactNode
  className?: string
}

const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={clsx('p-3 shadow mb-3 rounded-lg border-gray-100 border', className)}>
    {children}
  </div>
)

export default Card
