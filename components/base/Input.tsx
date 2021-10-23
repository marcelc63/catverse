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
  isNotFullWidth?: boolean
  disabled?: boolean
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
  isNotFullWidth,
  disabled,
}: IInput) => {
  let style = `border border-gray-200 rounded w-full p-2 ${className}`
  if (isNotFullWidth) {
    style = `border border-gray-200 rounded p-2 ${className}`
  }

  return register ? (
    <>
      <input
        required={required}
        className={style}
        placeholder={placeholder}
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        {...register(name)}
      />
      {errors?.[name] && (
        <p className="text-red-500 text-xs italic mb-2">
          {errors[name].message}
        </p>
      )}
    </>
  ) : (
    <input
      required={required}
      className={style}
      placeholder={placeholder}
      type={type}
      name={name}
      disabled={disabled}
      defaultValue={defaultValue}
    />
  )
}
export default Input
