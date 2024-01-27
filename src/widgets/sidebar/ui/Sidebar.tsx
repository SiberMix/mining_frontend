import './Sidebar.scss'
import './SidebarCSSTransition.scss'

import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import { EquipmentSideOut } from '~entities/equipment'
import { FieldListSideOut } from '~entities/field'
import { PlayBackSideOut } from '~entities/playback'
import { PolygonListSideOut } from '~entities/polygon'
import type { NavbarOpenContent } from '~features/navbar'
import { Navbar } from '~features/navbar'
import { SidebarFooter } from '~features/sidebar-footer'

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
              ? <PolygonListSideOut />
              : sidebarOpenContent === 'EquipmentList'
                ? <EquipmentSideOut />
                : sidebarOpenContent === 'FieldList'
                  ? <FieldListSideOut />
                  : sidebarOpenContent === 'PlayBack'
                    ? <PlayBackSideOut />
                    : <></>
          }
        </CSSTransition>
      </SwitchTransition>
    </>
  )
})
