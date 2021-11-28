import clsx from 'clsx'

interface ButtonProps extends React.ComponentProps<'button'> {
  variant: 'primary' | 'secondary'
}

const variantStyles = {
  'primary': 'bg-blue-500 border-blue-600 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300',
  'secondary': 'bg-yellow-500 border-yellow-600 hover:bg-yellow-600 active:bg-yellow-700 focus:ring-yellow-300'
}

const Button: React.FC<ButtonProps> = ({ variant, className, ...props }) => (
  <button
    className={clsx(
      variantStyles[variant],
      'px-4 py-2 rounded-md text-sm font-medium border-b-2 focus:outline-none focus:ring transition text-white',
      className
    )}
    {...props}
  />
)

Button.defaultProps = {
  variant: 'primary'
}

export default Button
