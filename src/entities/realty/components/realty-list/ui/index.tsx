import './index.scss'

import { useRealtyStore } from '~entities/realty'
import { RealtyListItem } from '~entities/realty/components/realty-list-item'

export const RealtyList = () => {
  const realtyList = useRealtyStore(state => state.realtyList)

  return (
    <div className='RealtyList'>
      {
        realtyList.map((item) => (
          <RealtyListItem
            key={item.id}
            item={item}
          />
        ))
      }
    </div>
  )
}
