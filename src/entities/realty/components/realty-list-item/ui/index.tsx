import './index.scss'

import { Dropdown } from 'antd'
import cn from 'classnames'
import React from 'react'

import { useRealtyStore } from '~entities/realty'
import type { RealtyType } from '~entities/realty/types'
import EditBox from '~shared/assets/icons/edit.svg'
import GeoBox from '~shared/assets/icons/GPS-navigate.svg'
import { DeleteOption } from '~shared/ui/delete-option'

type RealtyListItemProps = {
  item: RealtyType
}

export const RealtyListItem = ({ item }: RealtyListItemProps) => {
  const realtyFlyTo = useRealtyStore(state => state.realtyFlyTo)
  const setRealtyFlyTo = useRealtyStore(state => state.setRealtyFlyTo)

  const onDelete = () => {
    /// TODO delete realty
  }

  return (
    <div className='RealtyListItem'>
      <div
        className={cn('content', { ['contentActive']: item.id === realtyFlyTo })}
      >
        <div className='canvasRef'>
          <div className='row'>
            <div className='nameDiv'>
              <p className='title'>
                {item.name}
              </p>
              <img
                className='geo'
                src={GeoBox}
                onClick={() => setRealtyFlyTo(item.id)}
                alt=''
                title='Перейти к недвижимости на карте'
              />
            </div>
            <p className='culture'>
              {item.type}
            </p>
          </div>
        </div>
        <div className='geoDiv'>
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  label: 'Редактировать недвижимость',
                  onClick: () => {}
                },
                {
                  key: '2',
                  label: 'Редактировать название',
                  onClick: () => {}
                }
                // { todo сделать редактирование типа
                //   key: '3',
                //   label: 'Редактировать тип недвижимости',
                //   onClick: () => setShowEditModal(ModalTypeEnum.EDIT_POLYGON_TYPE)
                // }
              ]
            }}
          >
            <img
              className='edit'
              src={EditBox}
              alt=''
              title='Редактировать недвижимость'
            />
          </Dropdown>
          <DeleteOption
            onDelete={onDelete}
            className='trash'
            title='Удалить недвижимость'
            popConfirmTitle='Вы хотите удалить недвижимость?'
            popConfirmDescription='Удалить недвижимость'
          />
        </div>
      </div>
    </div>
  )
}
