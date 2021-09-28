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
  className?: string
  register?: UseFormRegister<FieldValues>
  errors?: DeepMap<FieldValues, FieldError>
  defaultValue?: any
  required?: boolean
}

const Input: React.FC<IInput> = ({
  placeholder,
  type = 'text',
  className = '',
  name,
  register,
  errors,
  defaultValue,
  required,
}: IInput) => {
  return register ? (
    <>
      <input
        required={required}
        className={`border border-gray-200 rounded w-full p-2 ${className}`}
        placeholder={placeholder}
        type={type}
        defaultValue={defaultValue}
        {...register(name)}
      />
      {errors?.[name] && (
        <p className="mt-1 text-red-500 text-sm">{errors[name].message}</p>
      )}
    </>
  ) : (
    <input
      required={required}
      className={`border border-gray-200 rounded w-full p-2 ${className}`}
      placeholder={placeholder}
      type={type}
      name={name}
      defaultValue={defaultValue}
    />
  )
}
export default Input
