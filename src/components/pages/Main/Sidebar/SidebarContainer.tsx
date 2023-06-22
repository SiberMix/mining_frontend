import './SidebarContainerCSSTransition.scss'
import React from 'react'
import PolygonList from '../modules/polygons/PolygonList/PolygonList'
import LibraryList from '../modules/library/LibraryList/LibraryList'
import FieldList from '../modules/field/FieldList/FieldList'
import CropRotation from '../modules/crop-rotation/CropRotation'
import Sidebar from './Sidebar'
import {
  CSSTransition,
  SwitchTransition
} from 'react-transition-group'
import { useSelector } from 'react-redux'
import { getSidebarOpenWindowSelector } from '../../../../redux/selectors/sidebarSelectors'
import SettingsModal from '../modules/settings/SettingsModal'

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
          {sidebarOpenWindow === 'PolygonList'
            ? <PolygonList />
            : sidebarOpenWindow === 'EquipmentList'
              ? <LibraryList />
              : sidebarOpenWindow === 'FieldList'
                ? <FieldList />
                : sidebarOpenWindow === 'Calendar'
                  ? <CropRotation />
                  : <></>}
        </CSSTransition>
      </SwitchTransition>
      <SettingsModal />
    </>
  )
}

export default React.memo(SidebarContainer)
