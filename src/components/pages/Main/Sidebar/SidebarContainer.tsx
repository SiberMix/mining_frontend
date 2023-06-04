import './SidebarCSSTransition.css'
import React from 'react'
import PolygonList from '../../../modules/polygons/PolygonList/PolygonList'
import LibraryList from '../../../modules/library/LibraryList/LibraryList'
import FieldList from '../../../modules/field/FieldList/FieldList'
import CropRotation from '../../../modules/crop-rotation/CropRotation'
import Sidebar from './Sidebar'
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup
} from 'react-transition-group'
import { useSelector } from 'react-redux'
import { getSidebarOpenWindowSelector } from '../../../../redux/selectors/sidebarSelectors'

type Props = {}

const SidebarContainer: React.FC<Props> = () => {
  const sidebarOpenWindow = useSelector(getSidebarOpenWindowSelector)
  // todo проверить на открываниае и закрывание одного и тогоже контента
  return (
    <>
      <Sidebar />
      <TransitionGroup>
        {/*<SwitchTransition mode="out-in" >*/}
        {/*  <CSSTransition*/}
        {/*    key={sidebarOpenWindow}*/}
        {/*    classNames="fade"*/}
        {/*  >*/}
        {/*    <div />*/}
        {/*  </CSSTransition>*/}
        {/*</SwitchTransition>*/}
        {sidebarOpenWindow === 'PolygonList'
          ? <CSSTransition
            classNames="sidebar"
            timeout={300}
          >
            <PolygonList />
          </CSSTransition>
          : null}
        {sidebarOpenWindow === 'EquipmentList'
          ? <CSSTransition
            classNames="sidebar"
            timeout={300}
          >
            <LibraryList />
          </CSSTransition>
          : null}
        {sidebarOpenWindow === 'FieldList'
          ? <CSSTransition
            classNames="sidebar"
            timeout={300}
          >
            <FieldList />
          </CSSTransition>
          : null}
        {sidebarOpenWindow === 'Calendar'
          ? <CSSTransition
            classNames="sidebar"
            timeout={300}
          >
            <CropRotation active />
          </CSSTransition>
          : null}
      </TransitionGroup>
    </>
  )
}

export default React.memo(SidebarContainer)
