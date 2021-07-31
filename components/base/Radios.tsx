import * as React from 'react'
import {
  UseFormRegister,
  FieldValues,
  FieldValue,
  DeepMap,
  FieldError,
} from 'react-hook-form'

import Radio from '~/components/base/Radio'

interface IRadio {
  label: string
  value: string
}

interface IRadios {
  items: Array<IRadio>
  name: string
  className?: string
  register: UseFormRegister<FieldValues>
  errors?: DeepMap<FieldValues, FieldError>
}

const Radios: React.FC<IRadios> = ({
  items,
  name,
  className,
  register,
  errors,
}) => {
  return (
    <>
      <div className={`flex flex-row items-center ${className}`}>
        {items.map((item: IRadio, index: number) => {
          return (
            <Radio
              key={index}
              label={item.label}
              name={name}
              value={item.value}
              register={register}
              className="mr-4"
            />
          )
        })}
      </div>
      {errors?.[name] && (
        <p className="mt-1 text-red-500 text-sm">{errors[name].message}</p>
      )}
    </>
  )
}

export default Radios
