import * as React from 'react'
import {
  UseFormRegister,
  FieldValues,
  FieldValue,
  DeepMap,
  FieldError,
} from 'react-hook-form'

interface IOption {
  text: string
  value: string
  default?: boolean
}

interface ISelect {
  options: Array<IOption>
  name?: FieldValue<any>
  disabled?: boolean
  className?: string
  register: UseFormRegister<FieldValues>
  errors?: DeepMap<FieldValues, FieldError>
}

const Select: React.FC<ISelect> = ({
  options,
  name,
  disabled,
  className,
  register,
  errors,
}: ISelect) => {
  return (
    <>
      <select
        className={`block appearance-none w-full border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none  ${className}`}
        {...register(name)}
      >
        {options.map((option: IOption, index: number) => {
          return (
            <option
              value={option.value}
              key={index}
              disabled={disabled && !option.default}
            >
              {option.text}
            </option>
          )
        })}
      </select>
      {errors?.[name] && (
        <p className="mt-1 text-red-500 text-sm">{errors[name].message}</p>
      )}
    </>
  )
}

export default Select
