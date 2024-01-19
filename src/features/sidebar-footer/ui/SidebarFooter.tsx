import './SidebarFooter.scss'

import { BarChartOutlined } from '@ant-design/icons'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import type { NavbarOpenContent } from '~features/navbar'
import LogoutBtn from '~shared/assets/icons/logout.svg'
import Setting from '~shared/assets/icons/settings.svg'
import { RoutePath } from '~shared/config/route-config'
import { Svg } from '~shared/ui/svg-styled'

import { setToken } from '../../../../srcOld/redux/slices/authSlice'
import { removeShowingPlayback } from '../../../../srcOld/redux/slices/playBackSlice'
import { setMapClickForNewBaseCoord, setShowSettingsModal } from '../../../../srcOld/redux/slices/settingsSlice'
import { useAppDispatch } from '../../../../srcOld/redux/store'

type SidebarFooterProps = {
  setSidebarOpenContent: (sidebarContent: NavbarOpenContent) => void
}

export const SidebarFooter = ({ setSidebarOpenContent }: SidebarFooterProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(setToken(null))
    localStorage.removeItem('token')
    navigate(RoutePath.auth)
  }

  return (
    <div className='SidebarFooter'>
      <Link
        to='/analytics'
        onClick={() => dispatch(removeShowingPlayback(null))} //тут просто обнуляем то, что нам не нужно в аналитике
      >
        <BarChartOutlined
          className='SidebarFooter-icon'
          title='Аналитика'
        />
      </Link>
      <Svg
        title='Настройки'
        src={Setting}
        onClick={() => {
          setSidebarOpenContent(null)
          dispatch(setMapClickForNewBaseCoord(false))
          dispatch(setShowSettingsModal(true))
        }}
      />
      <Svg
        title='Выход'
        color='#b53f42'
        src={LogoutBtn}
        onClick={logout}
      />
    </div>
  )
}
