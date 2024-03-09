import './Navbar.scss'

import React, { memo } from 'react'

import type { AnalyticConfigEnum, MonitoringConfigEnum } from '~features/navbar'
import { type ConfigObjType } from '~features/navbar'
import miniLogo from '~shared/assets/hectareLogoOnly.png'
import { Svg } from '~shared/ui/svg-styled'

type NavbarProps = {
  navbarConfig: Record<MonitoringConfigEnum, ConfigObjType> | Record<AnalyticConfigEnum, ConfigObjType>,
  sidebarOpenContent: MonitoringConfigEnum | AnalyticConfigEnum | null,
  setSidebarOpenContent: (sidebarContent: MonitoringConfigEnum | AnalyticConfigEnum | null) => void
}

export const Navbar = memo(({
  navbarConfig,
  sidebarOpenContent,
  setSidebarOpenContent
}: NavbarProps) => {

  const handleChangeSidebarContent = (openSidebarContent: MonitoringConfigEnum) => {
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
            } = navbarConfig[configKey as keyof typeof navbarConfig]
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
    </nav>
  )
})
