import './Sidebar.scss'
import './SidebarCSSTransition.scss'

import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import type { NavbarOpenContent } from '~features/navbar'
import { Navbar } from '~features/navbar/ui/Navbar'
import { SidebarFooter } from '~features/sidebar-footer'

import FieldList from '../../../../srcOld/components/pages/Monitoring/modules/field/FieldList/FieldList'
import LibraryList from '../../../../srcOld/components/pages/Monitoring/modules/libraryEquipment/LibraryList/LibraryList'
import PlayBack from '../../../../srcOld/components/pages/Monitoring/modules/play-back/PlayBack'
import PolygonList from '../../../../srcOld/components/pages/Monitoring/modules/polygons/PolygonList/PolygonList'
import SettingsModal from '../../../../srcOld/components/pages/Monitoring/modules/settings/SettingsModal'
import { getUsingStartMenuOptionsSelector } from '../../../../srcOld/redux/selectors/settingsSelector'

export const Sidebar = memo(() => {
  const startMenuOptions = useSelector(getUsingStartMenuOptionsSelector)
  const [sidebarOpenContent, setSidebarOpenContent] = useState<NavbarOpenContent>(startMenuOptions)

  return (
    <aside className='Sidebar'>
      <Navbar
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
      <SidebarFooter setSidebarOpenContent={setSidebarOpenContent} />

      <SettingsModal />
    </aside>
  )
})
