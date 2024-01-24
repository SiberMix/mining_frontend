import './Navbar.scss'

import { message } from 'antd'
import React, { memo } from 'react'

import type { NavbarOpenContent } from '~features/navbar'
import { monitoringConfig } from '~features/navbar/consts/monitoring-config'
import miniLogo from '~shared/assets/hectareLogoOnly.png'
import { Svg } from '~shared/ui/svg-styled'

type NavbarProps = {
  sidebarOpenContent: NavbarOpenContent,
  setSidebarOpenContent: (sidebarContent: NavbarOpenContent) => void
}

export const Navbar = memo(({
  sidebarOpenContent,
  setSidebarOpenContent
}: NavbarProps) => {

  const [messageApi, contextHolder] = message.useMessage()

  const handleChangeSidebarContent = (openSidebarContent: NavbarOpenContent) => {
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
    <nav className='Navbar'>
      <img
        className='Navbar-img'
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
            key={id}
            title={title}
            src={src}
            active={(sidebarOpenContent === id) ? 'open' : ''}
            onClick={() => handleChangeSidebarContent(id)}
          />
        ))
      }
      {contextHolder}
    </nav>
  )
})
