import React from 'react'
import clsx from 'clsx'

interface InputProps extends React.ComponentProps<'input'> {
  addr?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ addr, className, ...other }, ref_) => {
  const inputComp = (
    <input
      type='text'
      ref={ref_}
      className={clsx(
        { 'pl-7 relative': addr },
        'px-3 py-2 rounded-md text-sm font-normal border text-gray-500 focus:border-blue-600 outline-none',
      )}
      {...other}
    />
  )

  if (addr) {
    return (
      <div className={clsx('relative inline-block', className)}>
        {inputComp}
        <label className='pointer-events-none absolute inset-0 text-gray-400 font-normal text-sm py-2 pl-3'>0x</label>
      </div>
    )
  } else {
    return inputComp
  }
})

export default Input
