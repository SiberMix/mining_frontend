import s from './Sidebar.module.scss'
import * as cn from 'classnames'
import type { PropsWithChildren } from 'react'
import React from 'react'
import Field from '/src/assets/icons/field.svg'
import Job from '/src/assets/icons/job.svg'
import Equip from '/src/assets/icons/harvester2.svg'
import Calendar from '/src/assets/sevo/sevooborot.svg'
import Setting from '/src/assets/icons/settings.svg'
import LogoutBtn from '/src/assets/icons/logout.svg'
import Trava from '/src/assets/icons/corn-seeds-svgrepo-com.svg'
import miniLogo from '/src/assets/hectareLogoOnly.png'
import styled from 'styled-components'
import {
  atom,
  useAtom,
  useSetAtom
} from 'jotai'
import SVG from 'react-inlinesvg'
import { tokenAtom } from '../../../../App'
import { useAppDispatch } from '../../../../redux/store'
import type { SidebarOpenWindow } from '../../../../redux/slices/sidebarSlice'
import { setOpenSidebarWindow } from '../../../../redux/slices/sidebarSlice'

export const SidebarStateAtom = atom({
  isPolygonListOpen: true,
  isEquipmentListOpen: false,
  isFieldListOpen: false,
  isCalendarOpen: false
})

const Sidebar: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch()

  /*
  * Функционал для выхода из акаунта
  * */
  const setToken = useSetAtom(tokenAtom)
  const [state, setState] = useAtom(SidebarStateAtom)
  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
  }

  /*
  * Выбор бокового меню
  * */
  const handleChangeSidebarContent = (openSidebarContent: SidebarOpenWindow) => {
    dispatch(setOpenSidebarWindow(openSidebarContent))
  }
  const changeState = (key: keyof typeof state) => () => {
    setState((prevState) => {
      const newState = Object.keys(prevState).reduce<any>((acc, keys) => {
        acc[keys] = false
        return acc
      }, {} as typeof state)

      newState[key] = !prevState[key]
      return newState
    })
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
            active={+state.isPolygonListOpen}
            onClick={changeState('isPolygonListOpen')}
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
            active={+state.isEquipmentListOpen}
            onClick={changeState('isEquipmentListOpen')}
          />
          <Svg
            src={Trava}
            title="Культура"
            active={+state.isFieldListOpen}
            onClick={changeState('isFieldListOpen')}
          />
          <Svg
            src={Calendar}
            title="Планирование"
            active={+state.isCalendarOpen}
            onClick={changeState('isCalendarOpen')}
          />
        </div>
        <div>
          <Svg src={Setting} />
          <Svg
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

const Svg = styled(SVG)<{ active?: number }>`
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
