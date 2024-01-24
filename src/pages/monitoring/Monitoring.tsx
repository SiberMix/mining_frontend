import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { PolygonAddModal } from '~entities/polygon'
import { axiosInstance } from '~shared/api/axios-instance'
import { soket } from '~shared/api/socket'
import { PageLayout } from '~shared/ui/page-layout'
import { Settings } from '~widgets/settings'
import { Sidebar } from '~widgets/sidebar'

import BasePreloader from '../../../srcOld/components/common/BasePreloader/BasePreloader'
import { EquipPreviewRightSide } from '../../../srcOld/components/pages/Monitoring/libraryEquipment/Equipment/EquipPreviewRightSide/EquipPreviewRightSide'
import MonitoringMap from '../../../srcOld/components/pages/Monitoring/MonitoringMap/MonitoringMap'
import { getAllFields } from '../../../srcOld/redux/slices/fieldSlice'
import type { EquipEventsSocket, EquipmentSocketData } from '../../../srcOld/redux/slices/mapSlice'
import { getAllEquipment, getAllPolygons, setEquipmentCoordinatesWebSocket, setEquipStatusArrWebSocket } from '../../../srcOld/redux/slices/mapSlice'
import { getEquipsModelsList, getTrailerList, getTypesList } from '../../../srcOld/redux/slices/optionalEquipmentSlice'
import { getAllPlaybacks } from '../../../srcOld/redux/slices/playBackSlice'
import { useAppDispatch } from '../../../srcOld/redux/store'

const Monitoring = () => {
  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(true)
  //fixme костыль для срабатывания initialLoading только 1 раз
  const [isMounted, setIsMounted] = useState(false)
  //fixme костыльное сохранение адреса сокета ивентов
  const [crutchWS, setCrutchWS] = useState<URL | null>(null)

  /**
   * Подгружаем всю первоначальную информацию
   * */
  const initialLoading = async () => {
    try {
      await toast.promise(Promise.all([
        dispatch(getAllFields()),
        dispatch(getAllPolygons()),
        dispatch(getAllEquipment()),
        dispatch(getTypesList()),
        dispatch(getEquipsModelsList()),
        dispatch(getTrailerList()),
        dispatch(getAllPlaybacks())
      ]), {
        pending: 'Загружаем информацию с сервера...',
        success: 'Информация успешно загружена',
        error: 'Произошла ошибка при загрузке информации'
      })

      /**
       * Костыльное получение анала сокета
       * */
      const crutchWayForWS = await axiosInstance.get('http://myhectare.ru:8000/api/v1/get_ws/')
      // console.log('crutchWayForWS.data', crutchWayForWS.data)
      setCrutchWS(crutchWayForWS.data)

      setIsLoading(false)
    } catch (error) {
      console.error('Произошла ошибка при загрузке данных:', error)
    }
  }

  useEffect(() => {
    if (isMounted) {
      initialLoading()
    } else { //fixme костыль для срабатывания initialLoading только 1 раз
      setIsMounted(true)
    }
  }, [isMounted])

  /**
   * Подключаем веб сокеты для оборудования
   * */
  const equipCoordsSocketHandler = (data: EquipmentSocketData) => {
    dispatch(setEquipmentCoordinatesWebSocket(data))
  }

  const equipEventsSocketHandler = (data: EquipEventsSocket) => {
    dispatch(setEquipStatusArrWebSocket(data))
  }

  useEffect(() => { //todo почему блять два сокета а не 1 для работы с оборудованиями??? въебать бэкендерам.
    let superMegaCrutchWebSocket: WebSocket //fixme создание ебанутого сокета

    if (!isLoading) {
      soket.connect(equipCoordsSocketHandler)

      if (crutchWS) { //fixme подключение ебанутого сокета
        superMegaCrutchWebSocket = new WebSocket(crutchWS)

        superMegaCrutchWebSocket.onmessage = (message) => {
          const data: EquipEventsSocket = JSON.parse(message.data)
          if (!data) return
          equipEventsSocketHandler(data)
        }
      }
      // webSocketServices.equipEventsSocket.connect(equipEventsSocketHandler) todo как можно быстрей, чтоб не стало поздно
    }
    return () => {
      soket.disconnect()
      superMegaCrutchWebSocket?.close()
      // webSocketServices.equipEventsSocket.disconnect() todo как можно быстрей, чтоб не стало поздно
    }
  }, [isLoading])

  return (
    <div style={{
      position: 'relative',
      height: '100vh'
    }}
    >
      {isLoading
        ? <BasePreloader />
        : (
          <PageLayout>
            <Sidebar />
            <MonitoringMap />
            <PolygonAddModal />
            <EquipPreviewRightSide />
            <Settings />
          </PageLayout>
        )
      }
    </div>
  )
}

export default Monitoring
