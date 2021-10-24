import * as React from 'react'

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen min-w-screen p-2">
      {children}
    </div>
  )
}

export default Layout
