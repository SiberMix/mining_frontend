import './styles.scss'
import React, { useEffect, useState } from 'react'
import MainLayout from './MainLayout/MainLayout'
import SidebarContainer from './Sidebar/SidebarContainer'
import Map from './Map/Map'
import { EquipEventsSocket, EquipmentSocketData, getAllEquipment, getAllPolygons, setEquipmentCoordinatesWebSocket, setEquipStatusArrWebSocket } from '../../../redux/slices/mapSlice'
import { useAppDispatch } from '../../../redux/store'
import { getAllFields } from '../../../redux/slices/fieldSlice'
import BasePreloader from '../../common/BasePreloader/BasePreloader'
import { getEquipsModelsList, getTrailerList, getTypesList } from '../../../redux/slices/optionalEquipmentSlice'
import PolygonListAddModal from './modules/polygons/PolygonList/PolygonListAddModal'
import { getAllPlaybacks } from '../../../redux/slices/playBackSlice'
import { toast } from 'react-toastify'
import { webSocketServices } from '../../../api/sockets'

const MainPage = () => {
  const dispatch = useAppDispatch()

  const [isLoad, setIsLoad] = useState(false)
  //fixme костыль для срабатывания initialLoading только 1 раз
  const [isMounted, setIsMounted] = useState(false)

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

      setIsLoad(true)
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
    if (isLoad) {
      webSocketServices.equipCoordsSocket.connect(equipCoordsSocketHandler)
      webSocketServices.equipEventsSocket.connect(equipEventsSocketHandler)
    }
    return () => {
      webSocketServices.equipCoordsSocket.disconnect()
      webSocketServices.equipEventsSocket.disconnect()
    }
  }, [isLoad])

  return (
    <div style={{
      position: 'relative',
      height: '100vh'
    }}
    >
      {isLoad
        ? (
          <MainLayout>
            <SidebarContainer />
            <Map />
            <PolygonListAddModal />
          </MainLayout>
        )
        : <BasePreloader />
      }
    </div>
  )
}

export default MainPage
