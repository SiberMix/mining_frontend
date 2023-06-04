import React, { useRef } from 'react'
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

type Props = {
  sidebarState: any
}

const SidebarContainer: React.FC<Props> = ({ sidebarState }) => {
  const sidebarOpenWindow = useSelector(getSidebarOpenWindowSelector)

  return (
    <>
      <Sidebar />
      <TransitionGroup>
        {/*<SwitchTransition mode="out-in" >*/}
        {/*  <CSSTransition*/}
        {/*    key={state}*/}
        {/*    addEndListener={(done) => {*/}
        {/*      nodeRef.current.addEventListener('transitionend', done, false)*/}
        {/*    }}*/}
        {/*    classNames="fade"*/}
        {/*  >*/}
        {/*    <div />*/}
        {/*  </CSSTransition>*/}
        {/*</SwitchTransition>*/}
        {sidebarState.isPolygonListOpen
          ? <CSSTransition
            classNames="sidebar"
            timeout={300}
          >
            <PolygonList />
          </CSSTransition>
          : null}
        {sidebarState.isEquipmentListOpen
          ? <CSSTransition
            classNames="sidebar"
            timeout={300}
          >
            <LibraryList />
          </CSSTransition>
          : null}
        {sidebarState.isFieldListOpen
          ? <CSSTransition
            classNames="sidebar"
            timeout={300}
          >
            <FieldList />
          </CSSTransition>
          : null}
        {sidebarState.isCalendarOpen
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
