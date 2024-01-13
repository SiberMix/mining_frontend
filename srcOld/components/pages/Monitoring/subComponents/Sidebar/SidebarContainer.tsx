import "./SidebarContainerCSSTransition.scss"

import React from "react"
import { useSelector } from "react-redux"
import {
  CSSTransition,
  SwitchTransition
} from "react-transition-group"

import { getSidebarOpenWindowSelector } from "../../../../../redux/selectors/sidebarSelectors"
import FieldList from "../../modules/field/FieldList/FieldList"
import LibraryList from "../../modules/libraryEquipment/LibraryList/LibraryList"
import PlayBack from "../../modules/play-back/PlayBack"
import PolygonList from "../../modules/polygons/PolygonList/PolygonList"
import SettingsModal from "../../modules/settings/SettingsModal"
import Sidebar from "./Sidebar"

type Props = {}

const SidebarContainer: React.FC<Props> = () => {
  const sidebarOpenWindow = useSelector(getSidebarOpenWindowSelector)

  return (
    <>
      <Sidebar />
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={sidebarOpenWindow}
          classNames="sidebar-fade"
          timeout={280}
        >
          {
            sidebarOpenWindow === "PolygonList"
              ? <PolygonList />
              : sidebarOpenWindow === "EquipmentList"
                ? <LibraryList />
                : sidebarOpenWindow === "FieldList"
                  ? <FieldList />
                  : sidebarOpenWindow === "PlayBack"
                    ? <PlayBack />
                    : <></>
          }
        </CSSTransition>
      </SwitchTransition>
      <SettingsModal />
    </>
  )
}

export default React.memo(SidebarContainer)
