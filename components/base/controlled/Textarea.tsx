import * as React from 'react'

interface ITextarea {
  placeholder: string
  name?: string
  value?: string
  className?: string
  onChange: Function
}

const Textarea: React.FC<ITextarea> = ({
  placeholder,
  className = '',
  name,
  value,
  onChange,
}: ITextarea) => {
  return (
    <textarea
      className={`border border-gray-200 rounded w-full p-2 ${className}`}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={(e) => onChange(e)}
    />
  )
}
export default Textarea
