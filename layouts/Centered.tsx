import * as React from 'react'

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-row justify-center items-center bg-gray-100 min-h-screen min-w-screen p-2">
      {children}
    </div>
  )
}

export default Layout
