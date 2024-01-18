import './Sidebar.scss'

import { message } from 'antd'
import React, { memo } from 'react'

import miniLogo from '~shared/assets/hectareLogoOnly.png'
import { Svg } from '~shared/ui/svg-styled'
import { monitoringConfig } from '~widgets/navigation/consts/monitoring-config'
import { SidebarFooter } from '~widgets/navigation/ui/footer/SidebarFooter'

import type { SidebarOpenWindow } from './container/SidebarContainer'

type Props = {
  sidebarOpenContent: SidebarOpenWindow,
  setSidebarOpenContent: (sidebarContent: SidebarOpenWindow) => void
}

export const Sidebar: React.FC<Props> = memo(({
  sidebarOpenContent,
  setSidebarOpenContent
}) => {
  const [messageApi, contextHolder] = message.useMessage()

  const handleChangeSidebarContent = (openSidebarContent: SidebarOpenWindow) => {
    //замазали нераб. функц
    if (openSidebarContent === 'Tasks') {
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
    <div className='navbar'>
      <div className='navbar-wrapper'>
        <div>
          <img
            className='navbar-img'
            src={miniLogo}
            alt='sidebarLogo'
          />
          {
            monitoringConfig.map(({
              id,
              title,
              src
            }) => (
              <Svg
                title={title}
                src={src}
                active={(sidebarOpenContent === id) ? 'open' : ''}
                onClick={() => handleChangeSidebarContent(id)}
              />
            ))
          }
        </div>
        <SidebarFooter handleChangeSidebarContent={handleChangeSidebarContent} />
      </div>
      {contextHolder}
    </div>
  )
})
