import * as React from 'react'

import TabStop from '~/components/base/TabStop'
import { ITabStop } from '~/components/base/TabStop'

interface ITabStops {
  items: Array<ITabStop>
  className?: string
}

const TabStops: React.FC<ITabStops> = ({ items, className }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {items.map((item: ITabStop, index: number) => {
        return <TabStop label={item.label} value={item.value} key={index} />
      })}
    </div>
  )
}

export default TabStops
