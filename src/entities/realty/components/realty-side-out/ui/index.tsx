import './index.scss'

import { useRealtyStore } from '~entities/realty'
import { RealtyItemModal } from '~entities/realty/components/realty-item-modal'
import { SideOutLayout } from '~shared/ui/side-out-layout'

import { RealtyList } from '../../realty-list'

export const RealtySideOut = () => {
  const realtyList = useRealtyStore(state => state.realtyList)
  const isPickCenterModeActive = useRealtyStore(state => state.isPickCenter)
  const setIsPickCenterModeActive = useRealtyStore(state => state.setIsPickCenter)

  const onAddButtonClick = () => {
    setIsPickCenterModeActive(!isPickCenterModeActive)
  }

  return (
    <SideOutLayout className='RealtySideOut'>
      <div className='RealtySideOut-header'>
        <p>
          Список недвижимости
        </p>
        <p>
          Всего
          {' '}
          {realtyList.length}
          {' '}
          объекта
        </p>
      </div>
      <button
        className='addButton'
        onClick={onAddButtonClick}
      >
        {isPickCenterModeActive ? 'Отменить' : '+ Добавить недвижимость'}
      </button>
      <RealtyList />
      <RealtyItemModal />
    </SideOutLayout>
  )
}
