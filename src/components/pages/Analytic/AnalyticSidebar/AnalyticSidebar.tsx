import s from './AnalyticSidebar.module.scss'
import * as cn from 'classnames'
import type { PropsWithChildren } from 'react'
import React from 'react'
import LogoutBtn from '/src/assets/icons/logout.svg'
import Calendar from '/src/assets/sevo/sevooborot.svg'
import miniLogo from '/src/assets/hectareLogoOnly.png'
import styled from 'styled-components'
import SVG from 'react-inlinesvg'
import { useAppDispatch } from '../../../../redux/store'
import { setToken } from '../../../../redux/slices/authSlice'
import { NavLink, useNavigate } from 'react-router-dom'
import { GlobalOutlined, LineChartOutlined } from '@ant-design/icons'
import Setting from '/src/assets/icons/settings.svg'
import { setOpenSidebarWindow } from '../../../../redux/slices/sidebarSlice'
import { setMapClickForNewBaseCoord, setShowSettingsModal } from '../../../../redux/slices/settingsSlice'

const AnalyticSidebar: React.FC<PropsWithChildren> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  /*
  * Функционал для выхода из акаунта
  * */
  const logout = () => {
    dispatch(setToken(null))
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className={cn(s.nav)}>
      <div className={cn(s.navWrapper)}>
        <div>
          <img
            className={cn(s.navImg)}
            src={miniLogo}
            alt=''
          />
          {/*<NavLink*/}
          {/*  to='/analytics/field'*/}
          {/*>*/}
          {/*  {({ isActive }) => (*/}
          {/*    <PieChartOutlined*/}
          {/*      style={{ color: isActive ? '#28b6fe' : '' }}*/}
          {/*      className={s.icon}*/}
          {/*      title='Аналитика'*/}
          {/*    />*/}
          {/*  )}*/}
          {/*</NavLink>*/}
          <NavLink
            to='/analytics/equipments'
          >
            {({ isActive }) => (
              <LineChartOutlined
                style={{ color: isActive ? '#28b6fe' : '' }}
                className={s.icon}
                title='Аналитика'
              />
            )}
          </NavLink>
          <NavLink
            to='/analytics/crop_rotation'
          >
            {({ isActive }) => (
              <Svg
                src={Calendar}
                title='Планирование'
                active={isActive ? 'open' : ''}
              />
            )}
          </NavLink>
        </div>
        <div>
          <NavLink
            to='/monitoring'
          >
            <GlobalOutlined
              className={s.icon}
              title='Аналитика'
            />
          </NavLink>
          <Svg
            title='Настройки'
            src={Setting}
            onClick={() => {
              dispatch(setOpenSidebarWindow(undefined))
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
      </div>
    </div>
  )
}

export default AnalyticSidebar

const Svg = styled(SVG)<{ active?: string }>`
  height: 20px;
  width: 20px;
  margin-bottom: 25px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  path {
    fill: ${({ active }) => (!active ? '#fff' : '#28b6fe')};
  }

  &:hover {
    path {
      fill: ${({ color }) => color || '#28b6fe'};
    }
  }
`
