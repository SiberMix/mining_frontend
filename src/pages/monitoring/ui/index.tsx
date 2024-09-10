import React, { useCallback, useEffect, useRef, useState } from 'react'

import { EquipPreviewRightSide } from '~entities/equipment'
import { useRealtyStore } from '~entities/realty'
import { monitoringConfig } from '~features/navbar'
import { useAuthStore } from '~pages/auth'
import { setEquipmentCoordinatesWebSocket, setEquipStatusArrWebSocket } from '~processes/redux/slices/mapSlice'
import { useAppDispatch } from '~processes/redux/store'
import type { WebSocketMessage } from '~shared/api/socket'
import { SocketManager, WebSocketMessageTypeEvent } from '~shared/api/socket'
import { BasePreloader } from '~shared/ui/base-preloader'
import { PageLayout } from '~shared/ui/page-layout'
import { MonitoringMap } from '~widgets/map'
import type { Notification } from '~widgets/notifications'
import { useNotificationStore } from '~widgets/notifications'
import { settingsStore } from '~widgets/settings'
import { Sidebar } from '~widgets/sidebar'

import { monitoringInitialLoading } from '../lib'

export const Monitoring = () => {
  const dispatch = useAppDispatch()

  const token = useAuthStore(state => state.token)
  const monitoringStartMenuSection = settingsStore(state => state.settings.monitoringStartMenuSection)
  const addNotification = useNotificationStore(state => state.addNotification)
  const [isLoading, setIsLoading] = useState(true)
  // костыль для срабатывания initialLoading только 1 раз
  const [isMounted, setIsMounted] = useState(false)
  const socketRef = useRef<SocketManager<WebSocketMessage> | null>(null)
  // функции для инит загрузки
  const getRealtyList = useRealtyStore(state => state.getRealtyList)

  useEffect(() => {
    if (isMounted) {
      monitoringInitialLoading({ dispatch, setIsLoading })
      getRealtyList()
    } else { // костыль для срабатывания initialLoading только 1 раз
      setIsMounted(true)
    }
  }, [dispatch, getRealtyList, isMounted, setIsMounted])

  /**
   * Подключаем веб сокеты для оборудования
   * */
  const equipCoordsSocketHandler = useCallback(({ type_event, message }: WebSocketMessage) => {
    const messageParsed = JSON.parse(message as any)
    console.log('messageParsed', messageParsed)

    switch (type_event) {
      case WebSocketMessageTypeEvent.POSITION:
        dispatch(setEquipmentCoordinatesWebSocket(messageParsed))
        break
      case WebSocketMessageTypeEvent.ACTIVE_STATUS:
        dispatch(setEquipStatusArrWebSocket(messageParsed))
        break
      case WebSocketMessageTypeEvent.NOTIFICATION:
        addNotification(messageParsed as Notification)
        break
      default:
        console.log('socet message without type', messageParsed)
    }
  }, [addNotification, dispatch])

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = new SocketManager<WebSocketMessage>(`ws://109.111.187.147:8003/ws/frontend/?user_id=${token}`)
    }

    if (!isLoading) {
      socketRef.current.connect(equipCoordsSocketHandler)
    }

    return () => {
      socketRef.current?.disconnect()
      socketRef.current = null
    }
  }, [equipCoordsSocketHandler, isLoading, token])

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
              // defaultSidebarContent={monitoringStartMenuSection} //todo вернуть, + обнулить настройки под новые ключи
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
