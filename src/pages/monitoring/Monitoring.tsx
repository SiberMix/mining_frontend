import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { EquipPreviewRightSide } from '~entities/equipment'
import { monitoringConfig } from '~features/navbar'
import { getUsingStartMenuOptionsSelector } from '~processes/redux/selectors/settingsSelector'
import { getAllFields } from '~processes/redux/slices/fieldSlice'
import type { EquipEventsSocket, EquipmentSocketData } from '~processes/redux/slices/mapSlice'
import {
  getAllEquipment,
  getAllPolygons,
  setEquipmentCoordinatesWebSocket,
  setEquipStatusArrWebSocket
} from '~processes/redux/slices/mapSlice'
import { getEquipsModelsList, getTrailerList, getTypesList } from '~processes/redux/slices/optionalEquipmentSlice'
import { getAllPlaybacks } from '~processes/redux/slices/playBackSlice'
import { useAppDispatch } from '~processes/redux/store'
import { axiosInstance } from '~shared/api/axios-instance'
import { soket } from '~shared/api/socket'
import { BasePreloader } from '~shared/ui/base-preloader'
import { PageLayout } from '~shared/ui/page-layout'
import { MonitoringMap } from '~widgets/map'
import { Sidebar } from '~widgets/sidebar'

const Monitoring = () => {
  const dispatch = useAppDispatch()

  const startMenuOptions = useSelector(getUsingStartMenuOptionsSelector)
  const [isLoading, setIsLoading] = useState(true)
  //fixme костыль для срабатывания initialLoading только 1 раз
  const [isMounted, setIsMounted] = useState(false)
  //fixme костыльное сохранение адреса сокета ивентов
  const [crutchWS, setCrutchWS] = useState<URL | null>(null)

  /**
   * Подгружаем всю первоначальную информацию
   * //todo вынести в отдельную функцию в карту
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
  }, [isMounted, setIsMounted, initialLoading])

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
            <Sidebar
              navbarConfig={monitoringConfig}
              // defaultSidebarContent={startMenuOptions} //todo вернуть, + обнулить настройки под новые ключи
              withAnimation={true}
            />
            <MonitoringMap />
            <EquipPreviewRightSide />
          </PageLayout>
        )
      }
    </div>
  )
}

export default Monitoring
