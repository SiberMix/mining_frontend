import { BarChartOutlined } from "@ant-design/icons"
import { message } from "antd"
import * as cn from "classnames"
import type { PropsWithChildren } from "react"
import React, { useEffect } from "react"
import SVG from "react-inlinesvg"
import { useSelector } from "react-redux"
import {
  Link,
  useNavigate
} from "react-router-dom"
import styled from "styled-components"

import miniLogo from "/src/assets/hectareLogoOnly.png"
import Trava from "/src/assets/icons/corn-seeds-svgrepo-com.svg"
import Field from "/src/assets/icons/field.svg"
import Equip from "/src/assets/icons/harvester2.svg"
import Job from "/src/assets/icons/job.svg"
import LogoutBtn from "/src/assets/icons/logout.svg"
import PlayBack from "/src/assets/icons/playback.svg"
import Setting from "/src/assets/icons/settings.svg"

import { getUsingStartMenuOptionsSelector } from "../../../../../redux/selectors/settingsSelector"
import { getSidebarOpenWindowSelector } from "../../../../../redux/selectors/sidebarSelectors"
import { setToken } from "../../../../../redux/slices/authSlice"
import { removeShowingPlayback } from "../../../../../redux/slices/playBackSlice"
import {
  setMapClickForNewBaseCoord,
  setShowSettingsModal
} from "../../../../../redux/slices/settingsSlice"
import type { SidebarOpenWindow } from "../../../../../redux/slices/sidebarSlice"
import { setOpenSidebarWindow } from "../../../../../redux/slices/sidebarSlice"
import { useAppDispatch } from "../../../../../redux/store"
import { RoutePath } from "../../../../../shared/consfigs/RouteConfig/RouteConfig"
import s from "./Sidebar.module.scss"

const Sidebar: React.FC<PropsWithChildren> = () => {
  const dispatch = useAppDispatch()
  const sidebarOpenWindow = useSelector(getSidebarOpenWindowSelector)
  const startMenuOptions = useSelector(getUsingStartMenuOptionsSelector)
  const navigate = useNavigate()
  /*
  * изначально выбранное меню в настройках
  * */
  useEffect(() => {
    const menu = startMenuOptions === "undefined" ? undefined : startMenuOptions as SidebarOpenWindow
    dispatch(setOpenSidebarWindow(menu))
  }, [])

  /*
  * Функционал для выхода из акаунта
  * */
  const logout = () => {
    dispatch(setToken(null))
    localStorage.removeItem("token")
    navigate(RoutePath.auth)
  }

  /*
  * Выбор бокового меню
  * */
  const handleChangeSidebarContent = (openSidebarContent: SidebarOpenWindow) => {
    dispatch(setOpenSidebarWindow(openSidebarContent))
  }

  const [messageApi, contextHolder] = message.useMessage()

  function alertMsg() {
    messageApi.info("Данный функционал недоступен в демонстрационном режиме")
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
            active={(sidebarOpenWindow === "PolygonList") ? "open" : ""}
            onClick={() => handleChangeSidebarContent("PolygonList")}
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
            active={(sidebarOpenWindow === "EquipmentList") ? "open" : ""}
            onClick={() => handleChangeSidebarContent("EquipmentList")}
          />
          <Svg
            src={PlayBack}
            title="Плэйбэк"
            active={(sidebarOpenWindow === "PlayBack") ? "open" : ""}
            onClick={() => handleChangeSidebarContent("PlayBack")}
          />
          <Svg
            src={Trava}
            title="Культура"
            active={(sidebarOpenWindow === "FieldList") ? "open" : ""}
            onClick={() => handleChangeSidebarContent("FieldList")}
          />
        </div>
        <div>
          <Link
            to="/analytics"
            onClick={() => dispatch(removeShowingPlayback(null))} //тут просто обнуляем то, что нам не нужно в аналитике
          >
            <BarChartOutlined
              className={s.icon}
              title="Аналитика"
            />
          </Link>
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
      {contextHolder}
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
        fill: ${({ active }) => (!active ? "#fff" : "#28b6fe")};
    }

    &:hover {
        path {
            fill: ${({ color }) => color || "#28b6fe"};
        }
    }
`
