import './SidebarContainerCSSTransition.scss'

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import FieldList from '../../../../../srcOld/components/pages/Monitoring/modules/field/FieldList/FieldList'
import LibraryList from '../../../../../srcOld/components/pages/Monitoring/modules/libraryEquipment/LibraryList/LibraryList'
import PlayBack from '../../../../../srcOld/components/pages/Monitoring/modules/play-back/PlayBack'
import PolygonList from '../../../../../srcOld/components/pages/Monitoring/modules/polygons/PolygonList/PolygonList'
import SettingsModal from '../../../../../srcOld/components/pages/Monitoring/modules/settings/SettingsModal'
import { getUsingStartMenuOptionsSelector } from '../../../../../srcOld/redux/selectors/settingsSelector'
import { Sidebar } from '../Sidebar'

type Props = {}
export type SidebarOpenWindow = 'PolygonList' | 'Tasks' | 'EquipmentList' | 'FieldList' | 'PlayBack' | null

const SidebarContainer: React.FC<Props> = () => {
  const startMenuOptions = useSelector(getUsingStartMenuOptionsSelector)
  const [sidebarOpenContent, setSidebarOpenContent] = useState<SidebarOpenWindow>(startMenuOptions)
  return (
    <>
      <Sidebar
        sidebarOpenContent={sidebarOpenContent}
        setSidebarOpenContent={setSidebarOpenContent}
      />
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={sidebarOpenContent}
          classNames='sidebar-fade'
          timeout={280}
        >
          {
            sidebarOpenContent === 'PolygonList'
              ? <PolygonList />
              : sidebarOpenContent === 'EquipmentList'
                ? <LibraryList />
                : sidebarOpenContent === 'FieldList'
                  ? <FieldList />
                  : sidebarOpenContent === 'PlayBack'
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
