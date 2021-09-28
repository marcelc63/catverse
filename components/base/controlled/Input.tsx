import * as React from 'react'
import { FieldError } from 'react-hook-form'

interface IInput {
  placeholder: string
  type?: string
  name?: string
  value?: string
  className?: string
  onChange: Function
  error?: FieldError
}

const Input: React.FC<IInput> = ({
  placeholder,
  type = 'text',
  className = '',
  name,
  value,
  onChange,
  error,
}: IInput) => {
  return error ? (
    <>
      <input
        className={`border border-gray-200 rounded w-full p-2 ${className}`}
        placeholder={placeholder}
        type={type}
        value={value}
        name={name}
        onChange={(e) => onChange(e)}
      />
      {error && <p className="mt-1 text-red-500 text-sm">{error.message}</p>}
    </>
  ) : (
    <input
      className={`border border-gray-200 rounded w-full p-2 ${className}`}
      placeholder={placeholder}
      type={type}
      value={value}
      name={name}
      onChange={(e) => onChange(e)}
    />
  )
}
export default Input
