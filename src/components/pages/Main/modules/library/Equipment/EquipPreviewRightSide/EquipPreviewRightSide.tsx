import './EquipPreviewRightSide.scss'
import { Drawer } from 'antd'
import React, { memo } from 'react'
import { Equip } from '../../../../../../../types/equip'
import { formatEquipStatus } from '../../../../../../../shared/additionalFunctions/formatEquipStatus'
import { useSelector } from 'react-redux'
import { getEquipmentCoordinatesWebSocket, getEquipStatusArrWebSocket } from '../../../../../../../redux/selectors/mapSelectors'
import { TimeEquipIsNotActive } from '../../../../Map/MapEquipments/TimeEquipIsNotActive/TimeEquipIsNotActive'

type Props = {
  equip: Equip,
  onClose: () => void,
  isOpen: boolean
}

export const EquipPreviewRightSide: React.FC<Props> = memo(({
  equip,
  isOpen,
  onClose
}) => {
  const {
    equip_name,
    gosnomer,
    image_status,
    equip_model,
    equip_type,
    imei,
    fuel,
    last_status,
    last_coord,
    radius
  } = equip

  const equipmentCoordinates = useSelector(getEquipmentCoordinatesWebSocket)
  const equipStatusArr = useSelector(getEquipStatusArrWebSocket)

  const wsDataForEquip: any = equipmentCoordinates.find(equip => equip.imei === imei)
  const equipSocketStatus = equipStatusArr.find(e => e.imei === imei)?.status

  const equipStatus = equipSocketStatus || last_status || 'Offline'

  return (
    <Drawer
      className='EquipPreviewRightSide'
      title='Информация по технике'
      placement='right'
      onClose={onClose}
      open={isOpen}
      width={'25%'}
    >
      <img
        className='EquipPreviewRightSide-info_img'
        src={`src/assets/icons_enum/equips_events/${image_status}${equipStatus}.svg`}
        alt='EquipPreviewRightSide-icon'
      />
      <p>
        <span className='EquipPreviewRightSide-info_name'>Статус: </span>
        <span className='EquipPreviewRightSide-info'>{formatEquipStatus(equipStatus)}</span>
      </p>
      <p>
        <span className='EquipPreviewRightSide-info_name'>Название:</span>
        <span className='EquipPreviewRightSide-info'>{equip_name}</span>
      </p>
      <p>
        <span className='EquipPreviewRightSide-info_name'>Модель:</span>
        <span className='EquipPreviewRightSide-info'>{equip_model}</span>
      </p>
      {
        radius && <p>
          <span className='EquipPreviewRightSide-info_name'>Радиус:</span>
          <span className='EquipPreviewRightSide-info'>{radius} метров</span>
        </p>
      }
      <p>
        <span className='EquipPreviewRightSide-info_name'>Тип:</span>
        <span className='EquipPreviewRightSide-info'>{equip_type}</span>
      </p>
      <p>
        <span className='EquipPreviewRightSide-info_name'>Гос. номер:</span>
        <span className='EquipPreviewRightSide-info'>{gosnomer}</span>
      </p>
      <p>
        <span className='EquipPreviewRightSide-info_name'>IMEI:</span>
        <span className='EquipPreviewRightSide-info'>{imei}</span>
      </p>
      <p>
        <span className='EquipPreviewRightSide-info_name'>Топливо:</span>
        <span className='EquipPreviewRightSide-info'>{wsDataForEquip?.fuel || fuel || 'Нет информации'}</span>
      </p>
      <p>
        <span className='EquipPreviewRightSide-info_name'>Скорость: </span>
        <span className='EquipPreviewRightSide-info'>{wsDataForEquip?.speed || 0} км/ч</span>
      </p>
      {
        (equipStatus === 'Offline' || equipStatus === 'Idle') &&
        isOpen &&
        <TimeEquipIsNotActive
          wrapperClassName='timer-wrapper'
          mainTextClassName='EquipPreviewRightSide-info_name'
          subTextClassName='EquipPreviewRightSide-info'
          lastUpdDtt={last_coord?.last_upd_ts || ''}
          status={equipStatus}
        />
      }
    </Drawer>
  )
})
