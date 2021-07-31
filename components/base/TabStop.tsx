import * as React from 'react'

export interface ITabStop {
  label: string
  value: any
  className?: string
}

const TabStop: React.FC<ITabStop> = ({ label, value, className }) => {
  return (
    <div className={`flex flex-row border-b border-gray-200 py-1 ${className}`}>
      <div className="w-4/12 text-sm font-semibold">
        <p>{label}</p>
      </div>
      <div className="w-6/12 text-sm">
        <p>{value}</p>
      </div>
    </div>
  )
}

export default TabStop
