import './Header.scss'

import React from 'react'
import { useNavigate } from 'react-router-dom'

import { setToken } from '~processes/redux/slices/authSlice'
import { useAppDispatch } from '~processes/redux/store'
import miniLogo from '~shared/assets/smartops.jpeg'
import LogoutBtn from '~shared/assets/icons/logout.svg'
import Setting from '~shared/assets/icons/settings.svg'
import { RoutePath } from '~shared/config/route-config'
import { DeleteOption } from '~shared/ui/delete-option'
import { StyledSvg } from '~shared/ui/styled-svg'
import { NotificationsCenter } from '~widgets/notifications'
import { settingsStore } from '~widgets/settings'
import { WeatherBtn } from '~widgets/weather'
import { useTranslation } from 'react-i18next';
import { TelegramCenter } from '~widgets/telegram/components/notifications-center';

export const Header = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const setIsSettingsOpen = settingsStore(state => state.setIsSettingsOpen)
  const setIsClickMapForNewBaseCord = settingsStore(state => state.setIsClickMapForNewBaseCord)
  const { t } = useTranslation();

  const logout = () => {
    dispatch(setToken(null))
    localStorage.removeItem('token')
    navigate(RoutePath.auth)
  }

  const settingsButtonClick = () => {
    setIsClickMapForNewBaseCord(false)
    setIsSettingsOpen(true)
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
          <TelegramCenter />
          <NotificationsCenter />
          <StyledSvg
            $margin='0'
            title={t('Настройки')}
            src={Setting}
            onClick={settingsButtonClick}
          />
          <DeleteOption
            title={t('Выйти из аккаунта?')} // Оборачиваем в t для перевода
            popConfirmDescription={t('Вы уверены, что хотите выйти из аккаунта?')} // Оборачиваем в t для перевода
            onDelete={logout}
          >
            <StyledSvg
              title={t('Выход')}
              color='#b53f42'
              src={LogoutBtn}
            />
          </DeleteOption>
        </div>
      </div>
    </div>
  )
}
