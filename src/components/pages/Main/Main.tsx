import "./styles.scss"

import React, {
  useEffect,
  useState
} from "react"
import { toast } from "react-toastify"

import { axiosInstance } from "../../../api/abstract"
import { webSocketServices } from "../../../api/sockets"
import { getAllFields } from "../../../redux/slices/fieldSlice"
import type {
  EquipEventsSocket,
  EquipmentSocketData
} from "../../../redux/slices/mapSlice"
import {
  getAllEquipment,
  getAllPolygons,
  setEquipmentCoordinatesWebSocket,
  setEquipStatusArrWebSocket
} from "../../../redux/slices/mapSlice"
import {
  getEquipsModelsList,
  getTrailerList,
  getTypesList
} from "../../../redux/slices/optionalEquipmentSlice"
import { getAllPlaybacks } from "../../../redux/slices/playBackSlice"
import { useAppDispatch } from "../../../redux/store"
import BasePreloader from "../../common/BasePreloader/BasePreloader"
import MainLayout from "./MainLayout/MainLayout"
import Map from "./Map/Map"
import {
  EquipPreviewRightSide
} from "./modules/libraryEquipment/Equipment/EquipPreviewRightSide/EquipPreviewRightSide"
import PolygonListAddModal from "./modules/polygons/PolygonList/PolygonListAddModal"
import SidebarContainer from "./Sidebar/SidebarContainer"

const MainPage = () => {
  const dispatch = useAppDispatch()

  const [isLoad, setIsLoad] = useState(false)
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
        pending: "Загружаем информацию с сервера...",
        success: "Информация успешно загружена",
        error: "Произошла ошибка при загрузке информации"
      })

      /**
       * Костыльное получение анала сокета
       * */
      const crutchWayForWS = await axiosInstance.get("http://myhectare.ru:8000/api/v1/get_ws/")
      // console.log('crutchWayForWS.data', crutchWayForWS.data)
      setCrutchWS(crutchWayForWS.data)

      setIsLoad(true)
    } catch (error) {
      console.error("Произошла ошибка при загрузке данных:", error)
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

    if (isLoad) {
      webSocketServices.equipCoordsSocket.connect(equipCoordsSocketHandler)

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
      webSocketServices.equipCoordsSocket.disconnect()
      superMegaCrutchWebSocket?.close()
      // webSocketServices.equipEventsSocket.disconnect() todo как можно быстрей, чтоб не стало поздно
    }
  }, [isLoad])

  return (
    <div style={{
      position: "relative",
      height: "100vh"
    }}
    >
      {isLoad
        ? (
          <MainLayout>
            <SidebarContainer />
            <Map />
            <PolygonListAddModal />
            <EquipPreviewRightSide />
          </MainLayout>
        )
        : <BasePreloader />
      }
    </div>
  )
}

export default MainPage
