import './EquipPreviewRightSide.scss'
import { Drawer } from 'antd'
import React from 'react'
import { Equip } from '../../../../../../../types/equip'

type Props = {
  equip: Equip,
  onClose: () => void,
  isOpen: boolean
}

export const EquipPreviewRightSide: React.FC<Props> = ({
  equip,
  isOpen,
  onClose
}) => {

  /*
  * todo сделать проброс по сокету в redux, чтоб не открывать здесь второй сокет, а работать только с одним
  * */

  return (
    <Drawer
      className='EquipPreviewRightSide'
      title='Информация по технике'
      placement='right'
      onClose={onClose}
      open={isOpen}
      width={'25%'}
    >
      <p>
        <span className='EquipPreviewRightSide-info_name'>Название: </span>
        <span className='EquipPreviewRightSide-info'>{equip.equip_name}</span>
      </p>
      <p>
        <span className='EquipPreviewRightSide-info_name'>Модель: </span>
        <span className='EquipPreviewRightSide-info'>{equip.equip_model}</span>
      </p>
      <p>
        <span className='EquipPreviewRightSide-info_name'>Тип: </span>
        <span className='EquipPreviewRightSide-info'>{equip.equip_type}</span>
      </p>
      <p>
        <span className='EquipPreviewRightSide-info_name'>IMEI: </span>
        <span className='EquipPreviewRightSide-info'>{equip.imei}</span>
      </p>
    </Drawer>
  )
}
