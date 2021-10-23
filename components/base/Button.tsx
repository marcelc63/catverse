import * as React from 'react'

export interface IButton {
  className?: string
  type?: string
  submit?: boolean
  onClick?: Function
  primary?: boolean
  secondary?: boolean
  gray?: boolean
  danger?: boolean
  danger_secondary?: boolean
  download?: boolean
  small?: boolean
  regular?: boolean
  large?: boolean
  disabled?: boolean
}

const Button: React.FC<IButton> = React.forwardRef(
  (
    {
      className,
      children,
      type = 'button',
      submit,
      onClick,
      disabled,
      ...rest
    },
    _
  ) => {
    let style = {
      general: 'bg-blue-500 hover:bg-blue-600 text-white',
      size: 'px-2 py-1',
    }

    if (rest.secondary) {
      style.general =
        'bg-blue-300 hover:bg-blue-600 text-white bg-white hover:bg-green-100'
    }
    if (rest.gray) {
      style.general = 'bg-gray-400 hover:bg-gray-500 text-white'
    }
    if (rest.danger) {
      style.general = 'bg-red-400 hover:bg-red-500 text-white'
    }
    if (rest.danger_secondary) {
      style.general =
        'border border-red-400 text-red-400 bg-white hover:bg-red-100'
    }
    if (rest.download) {
      style.general = 'bg-tango hover:bg-tango-600 text-white'
    }

    if (rest.small) {
      style.size = 'text-sm px-2 py-1'
    }
    if (rest.regular) {
      style.size = 'text-md px-2 py-1'
    }
    if (rest.large) {
      style.size = 'text-lg px-4 py-2'
    }

    let consolidatedClass = `rounded cursor-pointer ${style.general} ${style.size} ${className}`
    if (disabled) {
      consolidatedClass = `${consolidatedClass} opacity-50`
    }
    if (onClick) {
      return (
        <div
          className={consolidatedClass}
          onClick={(event) => {
            if (disabled) {
              return
            }
            onClick(event)
          }}
        >
          {children}
        </div>
      )
    }
    if (submit || type === 'submit') {
      return (
        <button className={consolidatedClass} type="submit" disabled={disabled}>
          {children}
        </button>
      )
    }
    return <div className={consolidatedClass}>{children}</div>
  }
)

export default Button
