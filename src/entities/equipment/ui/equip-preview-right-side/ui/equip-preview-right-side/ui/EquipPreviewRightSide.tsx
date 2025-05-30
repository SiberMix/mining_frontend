import './EquipPreviewRightSide.scss'

import { Drawer } from 'antd'
import moment from 'moment'
import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {
  getAllEquipmentSelector,
  getEquipmentCoordinatesWebSocketSelector,
  getEquipStatusArrWebSocketSelector,
  getShowRightSideEquipInfoImeiSelector
} from '~processes/redux/selectors/mapSelectors'
import { setShowRightSideEquipInfo } from '~processes/redux/slices/mapSlice'
import { useAppDispatch } from '~processes/redux/store'
import { formatEquipStatus } from '~shared/lib/format-equip-status'
import { settingsStore } from '~widgets/settings'

import { EquipPreviewRightSideInfoRow } from '../../equip-preview-right-side-row'

export const EquipPreviewRightSide = memo(() => {
  const dispatch = useAppDispatch()

  const showRightSideEquipInfoImei = useSelector(getShowRightSideEquipInfoImeiSelector)
  const allEquipment = useSelector(getAllEquipmentSelector)
  const equipmentCoordinates = useSelector(getEquipmentCoordinatesWebSocketSelector)
  const equipStatusArr = useSelector(getEquipStatusArrWebSocketSelector)

  // zustand
  const equipmentOptionsObj = settingsStore(state => state.settings.equipmentOptions)
    .reduce((acc, cur) => {
      return { ...acc, [cur.title]: cur.value }
    }, {} as any) // мне лень писать дополнительные 10 типов. На выходе получаем {Название: true}

  const showRightSideEquipInfo = allEquipment.find(equip => +equip.imei === showRightSideEquipInfoImei)
  const wsDataForEquip = equipmentCoordinates.find(equip => equip.imei === showRightSideEquipInfo?.imei)
  const equipSocketStatus = equipStatusArr.find(e => e.imei === showRightSideEquipInfo?.imei)?.status

  const equipStatus = equipSocketStatus || showRightSideEquipInfo?.last_status || 'Offline'

  const fuelFromFirstAndSec = () => {
    if (wsDataForEquip?.fuel_s === null && wsDataForEquip.fuel_s_second == null) {
      return 'Данные не зарегистрированы'
    }
    const fuelFirst = wsDataForEquip?.fuel_s || showRightSideEquipInfo?.fuel || 0
    const fuelSecond = wsDataForEquip?.fuel_s_second || 0

    return fuelFirst + fuelSecond
  }

  const onCloseHandler = () => {
    dispatch(setShowRightSideEquipInfo(null))
  }

  const initialTimeNotActive = moment()
    .valueOf() / 1000 - +(showRightSideEquipInfo?.last_coord?.last_upd_ts || '')
  const initialDuration = moment.duration(initialTimeNotActive, 'seconds')

  const [timeEquipIsNotActive, setTimeEquipIsNotActive] = useState({
    days: Math.floor(initialDuration.asDays()),
    hours: initialDuration.hours(),
    minutes: initialDuration.minutes(),
    seconds: initialDuration.seconds()
  })

  /**
   * таймер простоя техники без дела
   * */
  useEffect(() => {
    let timeout: NodeJS.Timeout

    if ((equipStatus === 'Offline' || equipStatus === 'Idle')) {
      timeout = setTimeout(() => {
        const timeNotActive = moment()
          .valueOf() / 1000 - +(showRightSideEquipInfo?.last_coord?.last_upd_ts || '')

        const duration = moment.duration(timeNotActive, 'seconds')
        setTimeEquipIsNotActive({
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds()
        })
      }, 1000)

      if (!showRightSideEquipInfoImei) { //если окно закрыто просто останавливаем подсчет
        clearTimeout(timeout)
      }
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [timeEquipIsNotActive, showRightSideEquipInfoImei])

  return (
    <Drawer
      className='EquipPreviewRightSide'
      title='Информация по технике'
      placement='right'
      onClose={onCloseHandler}
      open={!!showRightSideEquipInfoImei}
      width='25%'
    >
      {
        showRightSideEquipInfo?.image_status && equipStatus
          ? <img
            className='EquipPreviewRightSide__info__img'
            src={`/src/shared/assets/icons_enum/equips_events/${showRightSideEquipInfo?.image_status}${equipStatus}.svg`}
            alt='EquipPreviewRightSide-icon'
          />
          : null
      }
      <div className='EquipPreviewRightSide__info__grid-container'>
        <EquipPreviewRightSideInfoRow
          title='Статус:'
          value={formatEquipStatus(equipStatus)}
        />
        {equipmentOptionsObj['Название']
          ? <EquipPreviewRightSideInfoRow
            title='Название:'
            value={showRightSideEquipInfo?.equip_name}
          />
          : null}
        <EquipPreviewRightSideInfoRow
          title='Модель:'
          value={showRightSideEquipInfo?.equip_model}
        />
        {
          showRightSideEquipInfo?.radius
            ? <EquipPreviewRightSideInfoRow
              title='Радиус:'
              value={showRightSideEquipInfo?.radius}
            />
            : null
        }
        <EquipPreviewRightSideInfoRow
          title='Тип:'
          value={showRightSideEquipInfo?.equip_type}
        />
        <EquipPreviewRightSideInfoRow
          title='Гос. номер:'
          value={showRightSideEquipInfo?.gosnomer}
        />
        {
          equipmentOptionsObj['IMEI']
            ? <EquipPreviewRightSideInfoRow
              title='IMEI:'
              value={showRightSideEquipInfo?.imei}
            />
            : null}
        {equipmentOptionsObj['Гос.номер']
          ? <EquipPreviewRightSideInfoRow
            title='Гос.номер:'
            value={showRightSideEquipInfo?.gosnomer.toUpperCase()}
          />
          : null}
        {equipmentOptionsObj['Уровень топлива']
          ? <EquipPreviewRightSideInfoRow
            title='Уровень топлива:'
            value={fuelFromFirstAndSec()}
          />
          : null}
        {equipmentOptionsObj['Скорость']
          ? <EquipPreviewRightSideInfoRow
            title='Скорость:'
            value={`${wsDataForEquip?.speed || 0} км/ч`}
          />
          : null}
        <EquipPreviewRightSideInfoRow
          title='Зажигание:'
          value={wsDataForEquip?.ignition ? 'Вкл.' : 'Выкл.'}
        />
        {
          equipmentOptionsObj['Последняя активность'] &&
          (equipStatus === 'Offline' || equipStatus === 'Idle') &&
          !!showRightSideEquipInfoImei
            ? <EquipPreviewRightSideInfoRow
              style={{ gridColumn: '1 / -1' }}
              title='Оборудование не активно:'
              value={` 
                ${timeEquipIsNotActive.days}д.
                ${timeEquipIsNotActive.hours}ч.
                ${timeEquipIsNotActive.minutes}м. 
                ${timeEquipIsNotActive.seconds}сек.
              `}
            />
            : null
        }
      </div>
    </Drawer>
  )
})
