import '../EquipsAnalyticMenu.scss'
import React from 'react'
import * as cn from 'classnames'
import { useAppDispatch } from '../../../../../../../redux/store'
import { Equip } from '../../../../../../../types/equip'
import { useSelector } from 'react-redux'
import { getAllEquipmentSelector } from '../../../../../../../redux/selectors/mapSelectors'
import { getPikedEquipsColorsSelector, getPikedEquipsIdSelector } from '../../../../../../../redux/selectors/equipsAnalyticSlectors'
import { setPikedEquipsColors, setPikedEquipsId } from '../../../../../../../redux/slices/EquipsAnalytic'
import { getRandomColor } from '../../reusingFunctions'

const EquipsAnalyticMenuItems = () => {

  const dispatch = useAppDispatch()
  const allEquips: Equip[] = useSelector(getAllEquipmentSelector)
  const pikedEquipsId = useSelector(getPikedEquipsIdSelector)
  const pikedEquipsColors = useSelector(getPikedEquipsColorsSelector)

  const pickEquipment = (equipId: number) => {
    const equipIndex = pikedEquipsId.indexOf(equipId)

    if (equipIndex !== -1) {
      // Если оборудование уже выбрано, удаляем его из списка
      const updatedEquipsId = pikedEquipsId.filter((id) => id !== equipId)
      const updatedEquipsColors = pikedEquipsColors.filter((_, index) => index !== equipIndex)

      dispatch(setPikedEquipsId(updatedEquipsId))
      dispatch(setPikedEquipsColors(updatedEquipsColors))
    } else {
      // Если оборудование не выбрано, добавляем его и генерируем цвет
      const newColor = getRandomColor()
      dispatch(setPikedEquipsId([...pikedEquipsId, equipId]))
      dispatch(setPikedEquipsColors([...pikedEquipsColors, newColor]))
    }
  }

  return (
    <div className='equipsAnalyticMenu-container'>
      {
        allEquips.map((equip) => {
          const equipsIndexInPikedEquipsId = pikedEquipsId.indexOf(equip.id)
          return (
            <div
              className={cn(
                'equipsAnalyticMenu-container-item',
                { 'selected': pikedEquipsId.some(id => id === equip.id) }
              )}
              onClick={() => pickEquipment(equip.id)}
              key={'equipsAnalyticMenu-container-item_' + equip.id}
            >
              <div
                className='equipsAnalyticMenu-container-item-color'
                style={{
                  backgroundColor: equipsIndexInPikedEquipsId >= 0
                    ? pikedEquipsColors[equipsIndexInPikedEquipsId]
                    : 'inherit'
                }}
              />
              <img
                className='equipsAnalyticMenu-container-item-icon'
                src={`/src/assets/icons_enum/${equip.image_status}.svg`}
                alt={equip.equip_name + ' icon'}
              />
              <span>
                Название:
              </span>
              <div className='equipsAnalyticMenu-container-item-name'>
                {equip.equip_name}
              </div>
              <span>
                IMEI:
              </span>
              <div className='equipsAnalyticMenu-container-item-name'>
                {equip.imei}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default EquipsAnalyticMenuItems
