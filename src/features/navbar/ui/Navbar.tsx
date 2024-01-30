import './Navbar.scss'

import { message } from 'antd'
import React, { memo } from 'react'

import type { AnalyticConfigEnum } from '~features/navbar'
import { type ConfigObjType, MonitoringConfigEnum } from '~features/navbar'
import miniLogo from '~shared/assets/hectareLogoOnly.png'
import { Svg } from '~shared/ui/svg-styled'

type NavbarProps = {
  navbarConfig: Record<MonitoringConfigEnum | AnalyticConfigEnum, ConfigObjType>,
  sidebarOpenContent: MonitoringConfigEnum | AnalyticConfigEnum | null,
  setSidebarOpenContent: (sidebarContent: MonitoringConfigEnum | AnalyticConfigEnum | null) => void
}

export const Navbar = memo(({
  navbarConfig,
  sidebarOpenContent,
  setSidebarOpenContent
}: NavbarProps) => {

  const [messageApi, contextHolder] = message.useMessage()

  const handleChangeSidebarContent = (openSidebarContent: MonitoringConfigEnum) => {
    //замазали нераб. функц
    if (openSidebarContent === MonitoringConfigEnum.tasks) {
      messageApi.info('Данный функционал недоступен в демонстрационном режиме')
      return
    }

    if (openSidebarContent === sidebarOpenContent) {
      setSidebarOpenContent(null)
    } else {
      setSidebarOpenContent(openSidebarContent)
    }
  }

  return (
    <nav className='Navbar'>
      <img
        className='Navbar-img'
        src={miniLogo}
        alt='sidebarLogo'
      />
      {
        Object.keys(navbarConfig)
          .map((configKey) => {
            const {
              title,
              iconSrc
            } = navbarConfig[configKey as MonitoringConfigEnum]
            return (
              <Svg
                key={configKey}
                title={title}
                src={iconSrc}
                active={(sidebarOpenContent === configKey) ? 'open' : ''}
                onClick={() => handleChangeSidebarContent(configKey as MonitoringConfigEnum)}
              />
            )
          })
      }
      {contextHolder}
    </nav>
  )
})
