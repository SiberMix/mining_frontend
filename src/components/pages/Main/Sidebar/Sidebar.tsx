import s from './Sidebar.module.scss'
import * as cn from 'classnames'
import type { PropsWithChildren } from 'react'
import React, { useEffect } from 'react'
import Field from '/src/assets/icons/field.svg'
import Job from '/src/assets/icons/job.svg'
import Equip from '/src/assets/icons/harvester2.svg'
import Calendar from '/src/assets/sevo/sevooborot.svg'
import Setting from '/src/assets/icons/settings.svg'
import LogoutBtn from '/src/assets/icons/logout.svg'
import Trava from '/src/assets/icons/corn-seeds-svgrepo-com.svg'
import miniLogo from '/src/assets/hectareLogoOnly.png'
import styled from 'styled-components'
import SVG from 'react-inlinesvg'
import { useAppDispatch } from '../../../../redux/store'
import type { SidebarOpenWindow } from '../../../../redux/slices/sidebarSlice'
import { setOpenSidebarWindow } from '../../../../redux/slices/sidebarSlice'
import { useSelector } from 'react-redux'
import { getSidebarOpenWindowSelector } from '../../../../redux/selectors/sidebarSelectors'
import {
  setMapClickForNewBaseCoord,
  setShowSettingsModal
} from '../../../../redux/slices/settingsSlice'
import { getUsingStartMenuOptionsSelector } from '../../../../redux/selectors/settingsSelector'
import { setToken } from '../../../../redux/slices/authSlice'

const Sidebar: React.FC<PropsWithChildren> = () => {
  const dispatch = useAppDispatch()
  const sidebarOpenWindow = useSelector(getSidebarOpenWindowSelector)
  const startMenuOptions = useSelector(getUsingStartMenuOptionsSelector)
  /*
  * изначально выбранное меню в настройках
  * */
  useEffect(() => {
    const menu = startMenuOptions === 'undefined' ? undefined : startMenuOptions as SidebarOpenWindow
    dispatch(setOpenSidebarWindow(menu))
  }, [])

  /*
  * Функционал для выхода из акаунта
  * */
  const logout = () => {
    dispatch(setToken(''))
    localStorage.removeItem('token')
  }

  /*
  * Выбор бокового меню
  * */
  const handleChangeSidebarContent = (openSidebarContent: SidebarOpenWindow) => {
    dispatch(setOpenSidebarWindow(openSidebarContent))
  }
  function alertMsg() {
    alert('Данный функционал недоступен в демонстрационном режиме')
  }

  return (
    <div className={cn(s.nav)}>
      <div className={cn(s.navWrapper)}>
        <div>
          <img
            className={cn(s.navImg)}
            src={miniLogo}
            alt=""
          />
          <Svg
            title="Список полей"
            active={(sidebarOpenWindow === 'PolygonList') ? 'open' : ''}
            onClick={() => handleChangeSidebarContent('PolygonList')}
            src={Field}
          />
          <Svg
            src={Job}
            title="Задания"
            onClick={alertMsg}
          />
          <Svg
            src={Equip}
            title="Оборудование"
            active={(sidebarOpenWindow === 'EquipmentList') ? 'open' : ''}
            onClick={() => handleChangeSidebarContent('EquipmentList')}
          />
          <Svg
            src={Trava}
            title="Культура"
            active={(sidebarOpenWindow === 'FieldList') ? 'open' : ''}
            onClick={() => handleChangeSidebarContent('FieldList')}
          />
          <Svg
            src={Calendar}
            title="Планирование"
            active={(sidebarOpenWindow === 'Calendar') ? 'open' : ''}
            onClick={() => handleChangeSidebarContent('Calendar')}
          />
        </div>
        <div>
          <Svg
            title="Настройки"
            src={Setting}
            onClick={() => {
              dispatch(setOpenSidebarWindow(undefined))
              dispatch(setMapClickForNewBaseCoord(false))
              dispatch(setShowSettingsModal(true))
            }}
          />
          <Svg
            title="Выход"
            color="#b53f42"
            src={LogoutBtn}
            onClick={logout}
          />
        </div>
      </div>
    </div>
  )
}

export default Sidebar

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
