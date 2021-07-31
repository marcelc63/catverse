import * as React from 'react'
import { useEffect } from 'react'

import { IResponses, SuccessStatus, ErrorStatus } from '~/interfaces/Responses'
import { useAppDispatch } from '~/store/store'

interface IErrorAlert {
  responses: any
  type: string
  reset: any
  className?: string
  successMessage?: string
  errorMessage?: string
}

const Error: React.FC<IErrorAlert> = ({
  responses,
  type,
  reset,
  className,
  successMessage,
  errorMessage,
}) => {
  const response: IResponses = responses[type]
  if (!response) {
    return <></>
  }

  const dispatch = useAppDispatch()

  setTimeout(() => {
    dispatch(reset(type))
  }, 3000)

  const statusText = response.payload.statusText
  const code = response.payload.status

  let bg = `bg-gray-400`
  let message = 'Memuat...'
  if (SuccessStatus.includes(code)) {
    bg = `bg-green-400`
    if (statusText) {
      message = `${
        statusText === 'Created'
          ? 'Berhasil Didaftarkan'
          : 'Berhasil Diperbaharui'
      }`
    }
    if (!statusText) {
      message = `Berhasil`
    }
    if (successMessage) {
      message = successMessage
    }
  }
  if (ErrorStatus.includes(code)) {
    bg = `bg-red-500`
    message = `${code}: Tidak berhasil`
    if (errorMessage) {
      message = errorMessage
    }
    if (code === 412) {
      message = `${code}: ${statusText}`
    }
  }

  return (
    <div
      className={`fixed top-10 right-10 flex flex-row p-2 rounded shadow-md text-white justify-center ${bg} ${className}`}
    >
      <p>{message}</p>
    </div>
  )
}

export default Error
