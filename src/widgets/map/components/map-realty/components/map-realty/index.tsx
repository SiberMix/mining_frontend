import React from 'react'

import { useRealtyStore } from '~entities/realty'
import { MapOneRealty } from '~widgets/map/components/map-realty/components/map-one-realty'

export const MapRealty = () => {
  const realtyList = useRealtyStore(state => state.realtyList)

  return (
    <>
      {realtyList.map((item) => (<MapOneRealty
        key={item.id}
        item={item} />
      ))}
    </>
  )
}
