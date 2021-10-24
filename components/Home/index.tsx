import * as React from 'react'
import Button from '~/components/base/Button'

interface IProps {
  connectWallet: any
}

const Component: React.FC<IProps> = ({ connectWallet }) => {
  return (
    <div className="max-w-4xl w-full relative h-500px">
      <img
        src="/screens/Screen-1.png"
        className="object-cover rounded absolute top-0 left-0 h-500px w-full"
      />
      <div className="absolute top-0 left-0 h-500px flex flex-col items-center justify-end w-full">
        <div
          className="bg-black p-4 w-full text-center cursor-pointer "
          onClick={connectWallet}
        >
          <p className="animate-pulse text-xl">Click to Start</p>
        </div>
      </div>
    </div>
  )
}

export default Component
