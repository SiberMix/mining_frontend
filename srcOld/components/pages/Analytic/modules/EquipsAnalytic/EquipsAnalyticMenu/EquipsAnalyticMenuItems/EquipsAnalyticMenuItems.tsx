import '../EquipsAnalyticMenu.scss'

import * as cn from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'

import { getRandomColor } from '~shared/lib/get-random-color'

import { getPikedEquipsIdSelector } from '../../../../../../../redux/selectors/equipsAnalyticSlectors'
import { getAllEquipmentSelector } from '../../../../../../../redux/selectors/mapSelectors'
import type { PickedEquip } from '../../../../../../../redux/slices/EquipsAnalyticSlice'
import { setPikedEquips } from '../../../../../../../redux/slices/EquipsAnalyticSlice'
import { useAppDispatch } from '../../../../../../../redux/store'
import type { Equip } from '../../../../../../../types/equip'

const EquipsAnalyticMenuItems = () => {

  const dispatch = useAppDispatch()
  const allEquips: Equip[] = useSelector(getAllEquipmentSelector)
  const pikedEquips: PickedEquip[] = useSelector(getPikedEquipsIdSelector)

  const pickEquipment = (equipId: number) => {
    const equipExist = pikedEquips.some(equip => equip.equipsId === equipId)

    if (equipExist) {
      // Если оборудование уже выбрано, удаляем его из списка
      const filteredEquips = pikedEquips.filter(equip => equip.equipsId !== equipId)
      dispatch(setPikedEquips(filteredEquips))
    } else {
      // Если оборудование не выбрано, добавляем его и генерируем цвет
      const newColor = getRandomColor()
      const newEquip: PickedEquip = {
        equipsId: equipId,
        equipColor: newColor
      }
      dispatch(setPikedEquips([...pikedEquips, newEquip]))
    }
  }

  const formatDateToDayMonth = (date: string) => {
    const lastUpdateDate = new Date(+date * 1000)
    const options: { day: 'numeric', month: 'long' } = {
      day: 'numeric',
      month: 'long'
    }
    return new Intl.DateTimeFormat('ru-RU', options).format(lastUpdateDate)
  }

  return (
    <div className='equipsAnalyticMenu-container'>
      {
        allEquips.map((equip: Equip) => {
          const findInPickedEquips = pikedEquips.find(pikedEquip => pikedEquip.equipsId === equip.id)

          return (
            <div
              className={cn(
                'equipsAnalyticMenu-container-item',
                { 'selected': !!findInPickedEquips }
              )}
              onClick={() => pickEquipment(equip.id)}
              key={'equipsAnalyticMenu-container-item_' + equip.id}
            >
              <div
                className='equipsAnalyticMenu-container-item-color'
                style={{
                  backgroundColor: findInPickedEquips
                    ? findInPickedEquips.equipColor
                    : 'inherit'
                }}
              />
              <img
                className='equipsAnalyticMenu-container-item-icon'
                src={`/src/shared/assets/icons_enum/main_icons/${equip.image_status}.svg`}
                alt={equip.equip_name + ' icon'}
              />
              <span>
                {equip.equip_name}
              </span>
              <div className='equipsAnalyticMenu-container-item-name'>
                Последняя активность:
                <br />
                {equip.last_coord ? formatDateToDayMonth(equip.last_coord?.last_upd_ts) : 'Нет данных'}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default EquipsAnalyticMenuItems
