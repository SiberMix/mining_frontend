import './Header.scss'

import React from 'react'
import { useNavigate } from 'react-router-dom'

import { setToken } from '~processes/redux/slices/authSlice'
import { setMapClickForNewBaseCoord, setShowSettingsModal } from '~processes/redux/slices/settingsSlice'
import { useAppDispatch } from '~processes/redux/store'
import miniLogo from '~shared/assets/hectareLogoOnly.png'
import LogoutBtn from '~shared/assets/icons/logout.svg'
import Setting from '~shared/assets/icons/settings.svg'
import { RoutePath } from '~shared/config/route-config'
import { DeleteOption } from '~shared/ui/delete-option'
import { StyledSvg } from '~shared/ui/styled-svg'
import { NotificationsCenter } from '~widgets/notifications'
import { WeatherBtn } from '~widgets/weather'

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
        <WeatherBtn />
        <div className='Header-content-const'>
          <NotificationsCenter />
          <StyledSvg
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
            <StyledSvg
              title='Выход'
              color='#b53f42'
              src={LogoutBtn}
            />
          </DeleteOption>
        </div>
      </div>
    </div>
  )
}
