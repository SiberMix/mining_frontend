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
  const deleteRealty = useRealtyStore(state => state.deleteRealty)
  const setIsOpenModal = useRealtyStore(state => state.setIsOpenModal)
  const setRealtyForEdit = useRealtyStore(state => state.setRealtyForEdit)

  const onEditHandler = () => {
    setRealtyForEdit(item)
    setIsOpenModal(true)
  }

  return (
    <div className='RealtyListItem'>
      <div
        className={cn('content', { ['contentActive']: (item.id === realtyFlyTo && !!realtyFlyTo) })}
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
                  onClick: onEditHandler
                }
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
            onDelete={deleteRealty.bind(null, item.id)}
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
