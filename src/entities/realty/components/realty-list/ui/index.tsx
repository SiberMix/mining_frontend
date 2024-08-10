import './index.scss'

import { RealtyListItem } from '~entities/realty/components/realty-list-item'
import { realtyFakeData } from '~entities/realty/const/fakedata'

export const RealtyList = () => {
  return (
    <div className='RealtyList'>
      {
        realtyFakeData.map((item) => (
          <RealtyListItem
            key={item.id}
            item={item}
          />
        ))
      }
    </div>
  )
}
