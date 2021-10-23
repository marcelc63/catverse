import * as React from 'react'
import {
  Controller,
  Control,
  DeepMap,
  FieldError,
  FieldValues,
} from 'react-hook-form'

import ReactDatePicker from 'react-date-picker/dist/entry.nostyle'

interface IDatePicker {
  name: string
  control: Control<any>
  openCalendarOnFocus?: boolean
  format?: string
  errors?: DeepMap<FieldValues, FieldError>
  className?: string
}

const DatePicker: React.FC<IDatePicker> = ({
  name,
  control,
  errors,
  format = 'dd/MM/y',
  openCalendarOnFocus = true,
  className,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <ReactDatePicker
            format={format}
            openCalendarOnFocus={openCalendarOnFocus}
            onChange={(date: any) =>
              onChange(date ? (date as Date).toISOString() : null)
            }
            value={value ? new Date(value) : null}
            className={className}
          />
        )}
      />
      {errors?.[name] && (
        <p className="mt-1 text-red-500 text-sm">{errors[name].message}</p>
      )}
    </>
  )
}

export default DatePicker
