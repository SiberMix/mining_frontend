import './Sidebar.scss'
import './SidebarCSSTransition.scss'

import React, { memo, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import type { AnalyticConfigEnum, ConfigObjType, MonitoringConfigEnum } from '~features/navbar'
import { Navbar } from '~features/navbar'
import { Settings } from '~features/settings'
import { SidebarFooter } from '~features/sidebar-footer'

type SidebarProps = {
  withAnimation?: boolean
} & ({ navbarConfig: Record<MonitoringConfigEnum, ConfigObjType>, defaultSidebarContent?: MonitoringConfigEnum | null }
  | { navbarConfig: Record<AnalyticConfigEnum, ConfigObjType>, defaultSidebarContent?: AnalyticConfigEnum | null })

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
                  //не получается нормально, быстро типизировать
                  ? (navbarConfig as any)[sidebarOpenContent]?.component || <></>
                  : <></>
              }
            </CSSTransition>
          </SwitchTransition>
          //не получается нормально, быстро типизировать
          : sidebarOpenContent && (navbarConfig as any)[sidebarOpenContent]?.component || null
      }
    </>
  )
})
