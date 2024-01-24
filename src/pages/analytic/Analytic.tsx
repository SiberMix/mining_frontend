import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { RoutePath } from '~shared/config/route-config'
import { PageLayout } from '~shared/ui/page-layout'
import { Settings } from '~widgets/settings' //todo remove nahui

import BasePreloader from '../../../srcOld/components/common/BasePreloader/BasePreloader'
import AnalyticSidebar from '../../../srcOld/components/pages/Analytic/AnalyticSidebar/AnalyticSidebar'
import AnalyticSidebarContainer from '../../../srcOld/components/pages/Analytic/AnalyticSidebar/AnalyticSidebarContainer'
import { getAllPolygons } from '../../../srcOld/redux/slices/mapSlice'
import { useAppDispatch } from '../../../srcOld/redux/store'

const Analytic = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const [load, setLoad] = useState(true)

  useEffect(() => {

    (async () => {
      try {
        await Promise.all([
          dispatch(getAllPolygons())
        ])

        setLoad(false)
        navigate(RoutePath.analytics_equipments)
      } catch (error) {
        console.error('Произошла ошибка при загрузке данных:', error)
      }
    })()
  }, [])

  return (
    <div style={{
      position: 'relative',
      height: '100vh'
    }}
    >
      {load
        ? <BasePreloader />
        : (
          <PageLayout>
            <AnalyticSidebar />
            <AnalyticSidebarContainer />
            <Settings />
          </PageLayout>
        )}
    </div>
  )
}

export default Analytic
