import * as React from 'react'
import { useState } from 'react'

import Button, { IButton } from '~/components/base/Button'
import Modal from '~/components/base/Modal'

interface IButtonConfirm extends IButton {
  message?: string
}

const ButtonConfirm: React.FC<IButtonConfirm> = React.forwardRef(
  ({ className, message, children, onClick, ...rest }, _) => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <div className={className}>
          <Button {...rest} onClick={() => setOpen(true)}>
            {children}
          </Button>
        </div>
        <Modal open={open} close={() => setOpen(false)}>
          <div className="p-4 flex flex-col items-center">
            <p className="text-sm font-bold mb-2">
              {message ||
                `Anda yakin melakukan tindakan berikut? Bila iya, klik sekali lagi`}
            </p>
            <div>
              <Button
                large
                onClick={(e: any) => {
                  if (onClick) {
                    onClick(e)
                    setOpen(false)
                  }
                }}
              >
                Ya, saya yakin
              </Button>
            </div>
          </div>
        </Modal>
      </>
    )
  }
)

export default ButtonConfirm
