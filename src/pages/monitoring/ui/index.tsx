import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { EquipPreviewRightSide } from '~entities/equipment'
import { useRealtyStore } from '~entities/realty'
import { monitoringConfig } from '~features/navbar'
import { MonitoringConfigEnum } from '~features/navbar'
import { useAuthStore } from '~pages/auth'
import {
  setEquipmentCoordinatesWebSocket,
  setEquipStatusArrWebSocket
} from '~processes/redux/slices/mapSlice'
import { useAppDispatch } from '~processes/redux/store'
import type { WebSocketMessage } from '~shared/api/socket'
import { SocketManager, WebSocketMessageTypeEvent } from '~shared/api/socket'
import { usePermissions } from '~shared/hooks/user-permissions/usePermissions'
import { BasePreloader } from '~shared/ui/base-preloader'
import { PageLayout } from '~shared/ui/page-layout'
import { MonitoringMap } from '~widgets/map'
import type { Notification } from '~widgets/notifications'
import { useNotificationStore } from '~widgets/notifications'
import { Sidebar } from '~widgets/sidebar'

import { monitoringInitialLoading } from '../lib'

export const Monitoring = () => {
  const dispatch = useAppDispatch()
  const token = useAuthStore((state) => state.token)
  const addNotification = useNotificationStore((state) => state.addNotification)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const socketRef = useRef<SocketManager<WebSocketMessage> | null>(null)
  const getRealtyList = useRealtyStore((state) => state.getRealtyList)
  const { t } = useTranslation()

  const { permissions, loading: permissionsLoading } = usePermissions()

  useEffect(() => {
    if (isMounted && !permissionsLoading) {
      monitoringInitialLoading({ dispatch, setIsLoading, t })
      getRealtyList()
    } else {
      setIsMounted(true)
    }
  }, [dispatch, getRealtyList, isMounted, permissionsLoading])

  const equipCoordsSocketHandler = useCallback(
    ({ type_event, message }: WebSocketMessage) => {
      const messageParsed = JSON.parse(message as any)

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
          console.log('socket message without type', messageParsed)
      }
    },
    [addNotification, dispatch]
  )

  useEffect(() => {
    if (isLoading) {
      addNotification({
        type: 'info',
        message: 'Ожидается поступление новых данных. Пожалуйста, подождите.'
      })
    }

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
  }, [equipCoordsSocketHandler, isLoading, token, addNotification])

  const filteredConfig = React.useMemo(() => {
    if (!permissions) return {}

    const accessMap = {
      [MonitoringConfigEnum.polygon_list]: permissions.access_web_polygons,
      [MonitoringConfigEnum.tasks]: permissions.access_calendar,
      [MonitoringConfigEnum.equipment_list]: permissions.access_equipment,
      [MonitoringConfigEnum.realty]: true,
      [MonitoringConfigEnum.play_back]: permissions.access_archive,
      [MonitoringConfigEnum.field_list]: true
    }

    return Object.fromEntries(Object.entries(monitoringConfig).filter(([key]) => accessMap[key as MonitoringConfigEnum]))
  }, [permissions])

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {isLoading || permissionsLoading
        ? (
          <BasePreloader />
        )
        : (
          <PageLayout>
            <Sidebar
              navbarConfig={filteredConfig}
              withAnimation={true} />
            <MonitoringMap />
            <EquipPreviewRightSide />
          </PageLayout>
        )}
    </div>
  )
}
