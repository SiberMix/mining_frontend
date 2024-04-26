import './SidebarFooter.scss'

import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import type { MonitoringConfigEnum } from '~features/navbar'
import { type AnalyticConfigEnum } from '~features/navbar'
import { createNavigateBtn } from '~features/sidebar-footer/lib/create-navigate-btn'

import { useAppDispatch } from '../../../srcOld/redux/store'

type SidebarFooterProps = {
  setSidebarOpenContent: (sidebarContent: MonitoringConfigEnum | AnalyticConfigEnum | null) => void
}

export const SidebarFooter = ({ setSidebarOpenContent }: SidebarFooterProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className='SidebarFooter'>
      {
        createNavigateBtn({
          pathname,
          setSidebarOpenContent,
          dispatch,
          navigate
        })
      }
    </div>
  )
}
