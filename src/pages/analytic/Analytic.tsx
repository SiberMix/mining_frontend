import React, { useEffect, useState } from 'react'

import { analyticConfig, AnalyticConfigEnum } from '~features/navbar'
import { getAllPolygons } from '~processes/redux/slices/mapSlice'
import { useAppDispatch } from '~processes/redux/store'
import { BasePreloader } from '~shared/ui/base-preloader'
import { PageLayout } from '~shared/ui/page-layout'
import { Sidebar } from '~widgets/sidebar'

const Analytic = () => {
  const dispatch = useAppDispatch()

  const [load, setLoad] = useState(true)

  useEffect(() => {

    (async () => {
      try {
        await Promise.all([
          dispatch(getAllPolygons())
        ])

        setLoad(false)
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
            <Sidebar
              navbarConfig={analyticConfig}
              defaultSidebarContent={AnalyticConfigEnum.analytics_equipments}
              withAnimation={false}
            />
          </PageLayout>
        )}
    </div>
  )
}

export default Analytic
