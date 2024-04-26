import './Header.scss'

import React from 'react'
import { useNavigate } from 'react-router-dom'

import miniLogo from '~shared/assets/hectareLogoOnly.png'
import LogoutBtn from '~shared/assets/icons/logout.svg'
import Setting from '~shared/assets/icons/settings.svg'
import { RoutePath } from '~shared/config/route-config'
import { DeleteOption } from '~shared/ui/delete-option'
import { Svg } from '~shared/ui/svg-styled'
import { NotificationsCenter } from '~widgets/notifications'

import { setToken } from '../../../srcOld/redux/slices/authSlice'
import { setMapClickForNewBaseCoord, setShowSettingsModal } from '../../../srcOld/redux/slices/settingsSlice'
import { useAppDispatch } from '../../../srcOld/redux/store'

export const Header = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(setToken(null))
    localStorage.removeItem('token')
    navigate(RoutePath.auth)
  }

  return (
    <div className='Header'>
      <img
        className='Header-logo'
        src={miniLogo}
        alt='sidebarLogo'
      />
      <div className='Header-content'>
        <NotificationsCenter />
        <Svg
          $margin='0'
          title='Настройки'
          src={Setting}
          onClick={() => {
            dispatch(setMapClickForNewBaseCoord(false))
            dispatch(setShowSettingsModal(true))
          }}
        />
        <DeleteOption
          title='Выйти из аккаунта?'
          popConfirmDescription='Вы уверены, что хотите выйти из аккаунта?'
          onDelete={logout}
        >
          <Svg
            title='Выход'
            color='#b53f42'
            src={LogoutBtn}
          />
        </DeleteOption>
      </div>
    </div>
  )
}
