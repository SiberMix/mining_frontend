import { RoutePath } from "~shared/config/route-config"
import Setting from "~shared/assets/icons/settings.svg"
import { setMapClickForNewBaseCoord, setShowSettingsModal } from "../../../../srcOld/redux/slices/settingsSlice"
import { Svg } from "~shared/ui/svg-styled"
import React from "react"
import type { AnalyticConfigEnum, MonitoringConfigEnum } from "~features/navbar"

type CreateNavigateBtnType {

}

export const createNavigateBtn = (pathname: string, setSidebarOpenContent: (sidebarContent: MonitoringConfigEnum | AnalyticConfigEnum | null) => void) => {
  switch (pathname) {
    case RoutePath.auth:
      return null
    case RoutePath.monitoring:
      return (
        <Svg
          title='Настройки'
          src={Setting}
          onClick={() => {
            setSidebarOpenContent(null)
            dispatch(setMapClickForNewBaseCoord(false))
            dispatch(setShowSettingsModal(true))
          }}
        />
      )
    case RoutePath.analytics:
    case RoutePath.not_found:
      return
    default: return null
  }

}
