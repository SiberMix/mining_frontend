import './Sidebar.scss'
import './SidebarCSSTransition.scss'

import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import { PolygonList } from '~entities/polygon'
import type { NavbarOpenContent } from '~features/navbar'
import { Navbar } from '~features/navbar'
import { SidebarFooter } from '~features/sidebar-footer'

import FieldList from '../../../../srcOld/components/pages/Monitoring/field/FieldList/FieldList'
import LibraryList from '../../../../srcOld/components/pages/Monitoring/libraryEquipment/LibraryList/LibraryList'
import PlayBack from '../../../../srcOld/components/pages/Monitoring/play-back/PlayBack'
import { getUsingStartMenuOptionsSelector } from '../../../../srcOld/redux/selectors/settingsSelector'

export const Sidebar = memo(() => {
  const startMenuOptions = useSelector(getUsingStartMenuOptionsSelector)
  const [sidebarOpenContent, setSidebarOpenContent] = useState<NavbarOpenContent>(startMenuOptions)

  return (
    <>
      <aside className='Sidebar'>
        <Navbar
          sidebarOpenContent={sidebarOpenContent}
          setSidebarOpenContent={setSidebarOpenContent}
        />

        <SidebarFooter setSidebarOpenContent={setSidebarOpenContent} />
      </aside>
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
    </>
  )
})
