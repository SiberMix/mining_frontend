import './Sidebar.scss'
import './SidebarCSSTransition.scss'

import React, { memo, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import type { AnalyticConfigEnum, ConfigObjType, MonitoringConfigEnum } from '~features/navbar'
import { Navbar } from '~features/navbar'
import { Settings } from '~features/settings'
import { SidebarFooter } from '~features/sidebar-footer'

type SidebarProps = {
  navbarConfig: Record<MonitoringConfigEnum, ConfigObjType>
    | Record<AnalyticConfigEnum, ConfigObjType>,
  defaultSidebarContent?: any,
  withAnimation?: boolean
}

export const Sidebar = memo(({
  defaultSidebarContent = null,
  navbarConfig,
  withAnimation
}: SidebarProps) => {

  const [sidebarOpenContent, setSidebarOpenContent] = useState(defaultSidebarContent)

  return (
    <>
      <aside className='Sidebar'>
        <Navbar
          navbarConfig={navbarConfig}
          sidebarOpenContent={sidebarOpenContent}
          setSidebarOpenContent={setSidebarOpenContent}
        />

        <SidebarFooter setSidebarOpenContent={setSidebarOpenContent} />
        <Settings />
      </aside>
      {
        withAnimation
          ? <SwitchTransition mode='out-in'>
            <CSSTransition
              key={sidebarOpenContent}
              classNames='sidebar-fade'
              timeout={280}
            >
              {
                sidebarOpenContent
                  ? navbarConfig[sidebarOpenContent]?.component || <></>
                  : <></>
              }
            </CSSTransition>
          </SwitchTransition>
          : sidebarOpenContent && navbarConfig[sidebarOpenContent]?.component || null
      }
    </>
  )
})
