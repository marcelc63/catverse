import * as React from 'react'

interface IOption {
  text: string
  value: string
  default?: boolean
}

interface ISelect {
  options: Array<IOption>
  disabled?: boolean
  className?: string
  onChange: Function
}

const Select: React.FC<ISelect> = ({
  options,
  disabled,
  className,
  onChange,
}: ISelect) => {
  const defaultOptions = options.length ? options : [{ text: '-', value: '' }]
  return (
    <select
      className={`block appearance-none w-full border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none  ${className}`}
      onChange={(e) => onChange(e)}
    >
      {defaultOptions.map((option: IOption, index: number) => {
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
  )
}

export default Select
