import * as React from 'react'
import {
  UseFormRegister,
  FieldValues,
  FieldValue,
  DeepMap,
  FieldError,
} from 'react-hook-form'

interface IInput {
  placeholder: string
  type?: string
  name?: FieldValue<any>
  value?: string
  className?: string
  register?: UseFormRegister<FieldValues>
  errors?: DeepMap<FieldValues, FieldError>
}

const Input: React.FC<IInput> = ({
  placeholder,
  type = 'text',
  className = '',
  name,
  value,
  register,
  errors,
}: IInput) => {
  return register ? (
    <>
      <input
        className={`border border-gray-200 rounded w-full p-2 ${className}`}
        placeholder={placeholder}
        type={type}
        value={value}
        {...register(name)}
      />
      {errors?.[name] && (
        <p className="mt-1 text-red-500 text-sm">{errors[name].message}</p>
      )}
    </>
  ) : (
    <input
      className={`border border-gray-200 rounded w-full p-2 ${className}`}
      placeholder={placeholder}
      type={type}
      value={value}
      name={name}
    />
  )
}
export default Input
