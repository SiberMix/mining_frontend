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
  editPolygonHandler: any,
  polygonHandleItemClick: (index: number) => void,
  isDrawing: boolean,
  setIsDrawing: (isDrawing: boolean) => void,
  equipmentHandleItemClick: (imei: number) => void
}

const SidebarContainer: React.FC<Props> = ({ sidebarState, editPolygonHandler, polygonHandleItemClick, isDrawing, setIsDrawing, equipmentHandleItemClick }) => {
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
              polygonHandleItemClick={polygonHandleItemClick}
              isDrawing={isDrawing}
              setIsDrawing={setIsDrawing}
            />
          </CSSTransition>
          : null}
        {sidebarState.isEquipmentListOpen
          ? <CSSTransition
            classNames="sidebar"
            timeout={300}
          >
            <LibraryList equipmentHandleItemClick={equipmentHandleItemClick} />
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
