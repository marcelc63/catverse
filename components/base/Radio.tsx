import * as React from 'react'
import { UseFormRegister, FieldValues, FieldValue } from 'react-hook-form'

interface IRadio {
  label: string
  name?: FieldValue<any>
  value?: string
  className?: string
  register?: UseFormRegister<FieldValues>
}

const Radio: React.FC<IRadio> = ({
  label,
  name,
  value,
  className,
  register,
}) => {
  const random = Math.random()
  return register ? (
    <div className={`flex flex-row items-center ${className}`}>
      <input
        type="radio"
        id={`name${random}`}
        value={value}
        className="text-green-500"
        {...register(name)}
      />
      <label htmlFor={`name${random}`} className="pl-1">
        {label}
      </label>
    </div>
  ) : (
    <div className={`flex flex-row items-center ${className}`}>
      <input
        type="radio"
        id={`name${random}`}
        value={value}
        className="mr-1 text-green-500"
      />
      <label htmlFor={`name${random}`}>{label}</label>
    </div>
  )
}

export default Radio
