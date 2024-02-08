import './PlayBackEquipPicker.scss'

import { Avatar, Button, Card } from 'antd'
import { Meta } from 'antd/lib/list/Item'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { getRandomColor } from '~shared/lib/get-random-color'

import { getAllEquipmentSelector } from '../../../../../srcOld/redux/selectors/mapSelectors'
import type { EquipmentData } from '../../../../../srcOld/redux/slices/playBackSlice'

type PlayBackEquipPickerProps = {
  selectedEquipment: EquipmentData[],
  setSelectedEquipment: (equipArr: EquipmentData[]) => void,
  colorForThisEquip: number | null,
  setColorForThisEquip: (equipId: number | null) => void
}

export const PlayBackEquipPicker = memo(({
  selectedEquipment,
  setSelectedEquipment,
  setColorForThisEquip,
  colorForThisEquip
}: PlayBackEquipPickerProps) => {
  const defaultColor = getRandomColor()
  const allEquipment = useSelector(getAllEquipmentSelector)

  const toggleEquipment = (id: number) => {
    if (selectedEquipment.some(s => s.equip_id === id)) {
      setColorForThisEquip(null)
      setSelectedEquipment(selectedEquipment.filter(s => s.equip_id !== id))
    } else {
      setSelectedEquipment([...selectedEquipment, {
        equip_id: id,
        equip_color: defaultColor
      }])
      setColorForThisEquip(id)
    }
  }

  const pickColorForThisEquip = (event: React.MouseEvent, id: number) => {
    event.preventDefault()
    event.stopPropagation()
    if (colorForThisEquip !== id) {
      setColorForThisEquip(id)
    } else {
      setColorForThisEquip(null)
    }
  }

  return (
    <div className='PlayBackAddModal__equippicker'>
      {
        allEquipment.map(equip => (
          <div
            className='PlayBackAddModal__equippicker-card-wrapper'
            key={'PlayBackAddModal__equippicker_' + equip.id}
          >
            <Card
              size='small'
              onClick={() => toggleEquipment(equip.id)}
            >
              <Meta
                avatar={
                  <div className='PlayBackAddModal__equippicker-header'>
                    <Avatar
                      className='PlayBackAddModal__equippicker-avatar'
                      src={`/src/shared/assets/icons_enum/main_icons/${equip.image_status}.svg`}
                      shape='square'
                    />
                    <div
                      className='PlayBackAddModal__equippicker-colorline'
                      style={{
                        backgroundColor:
                          selectedEquipment.find(s => s.equip_id === equip.id)?.equip_color
                          || ''
                      }}
                    />
                  </div>
                }
                title={
                  <div className='PlayBackAddModal__equippicker-title'>
                    {equip.equip_name}
                  </div>
                }
                description={
                  <div className='PlayBackAddModal__equippicker-options'>
                    {
                      selectedEquipment.find(s => s.equip_id === equip.id)
                        ? (
                          <Button
                            className='PlayBackAddModal__equippicker-options-btn'
                            onClick={(event: React.MouseEvent) => pickColorForThisEquip(event, equip.id)}
                          >
                            {
                              colorForThisEquip === null
                              || colorForThisEquip !== equip.id
                                ? 'Выбрать цвет'
                                : 'Закрыть'
                            }
                          </Button>
                        )
                        : null
                    }
                  </div>
                }
              />
            </Card>
          </div>
        ))
      }
    </div>
  )
})
