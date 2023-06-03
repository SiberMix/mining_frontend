import React from 'react'
import PolygonList from '../../../modules/polygons/PolygonList/PolygonList'
import LibraryList from '../../../modules/library/LibraryList/LibraryList'
import FieldList from '../../../modules/field/FieldList/FieldList'
import CropRotation from '../../../modules/crop-rotation/CropRotation'
import Sidebar from './Sidebar'
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'

type Props = {
  sidebarState: any,
  editPolygonHandler: any
}

const SidebarContainer: React.FC<Props> = ({ sidebarState, editPolygonHandler }) => {
  return (
    <Sidebar>
      <TransitionGroup>
        {sidebarState.isPolygonListOpen
          ? <CSSTransition
            classNames="sidebar"
            timeout={300}
          >
            <PolygonList
              onEdit={editPolygonHandler}
            />
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
    </Sidebar>
  )
}

export default React.memo(SidebarContainer)
