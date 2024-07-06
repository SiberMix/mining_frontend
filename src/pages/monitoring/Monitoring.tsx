import React, { useCallback, useEffect, useRef, useState } from 'react'

import { EquipPreviewRightSide } from '~entities/equipment'
import { monitoringConfig } from '~features/navbar'
import { useAuthStore } from '~pages/auth/model'
import { monitoringInitialLoading } from '~pages/monitoring/lib'
import { setEquipmentCoordinatesWebSocket, setEquipStatusArrWebSocket } from '~processes/redux/slices/mapSlice'
import { useAppDispatch } from '~processes/redux/store'
import type { WebSocketMessage } from '~shared/api/socket'
import { SocketManager, WebSocketMessageTypeEvent } from '~shared/api/socket'
import { BasePreloader } from '~shared/ui/base-preloader'
import { PageLayout } from '~shared/ui/page-layout'
import { MonitoringMap } from '~widgets/map'
import { settingsStore } from '~widgets/settings'
import { Sidebar } from '~widgets/sidebar'

const Monitoring = () => {
  const dispatch = useAppDispatch()

  const token = useAuthStore(state => state.token)
  const monitoringStartMenuSection = settingsStore(state => state.settings.monitoringStartMenuSection)
  const [isLoading, setIsLoading] = useState(true)
  // костыль для срабатывания initialLoading только 1 раз
  const [isMounted, setIsMounted] = useState(false)
  const socketRef = useRef<SocketManager<WebSocketMessage> | null>(null)

  useEffect(() => {
    if (isMounted) {
      monitoringInitialLoading({ dispatch, setIsLoading })
    } else { // костыль для срабатывания initialLoading только 1 раз
      setIsMounted(true)
    }
  }, [dispatch, isMounted, setIsMounted])

  /**
   * Подключаем веб сокеты для оборудования
   * */
  const equipCoordsSocketHandler = useCallback(({ type_event, message }: WebSocketMessage) => {
    switch (type_event) {
      case WebSocketMessageTypeEvent.POSITION:
        dispatch(setEquipmentCoordinatesWebSocket(message))
        break
      case WebSocketMessageTypeEvent.ACTIVE_STATUS:
        dispatch(setEquipStatusArrWebSocket(message))
        break
      case WebSocketMessageTypeEvent.NOTIFICATION:
        console.log('socet message', message)
        break
      default:
        console.log('socet message', message)
    }
  }, [dispatch])

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = new SocketManager<WebSocketMessage>(`ws://myhectare.ru:8003/ws/frontend/?user_id=${token}`)
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

export default Monitoring
