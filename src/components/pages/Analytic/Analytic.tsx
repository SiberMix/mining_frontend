import React, { useEffect, useState } from 'react'
import BasePreloader from '../../common/BasePreloader/BasePreloader'
import AnalyticLayout from './MainLayout/AnalyticLayout'
import AnalyticSidebarContainer from './AnalyticSidebar/AnalyticSidebarContainer'
import { useNavigate } from 'react-router-dom'
import AnalyticSidebar from './AnalyticSidebar/AnalyticSidebar'
import { useAppDispatch } from '../../../redux/store'
import { getAllPolygons } from '../../../redux/slices/mapSlice'

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
        console.log('Информация загружена')
        navigate('/analytics/equipments')
        // navigate('/analytics/field')
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
          <AnalyticLayout>
            <AnalyticSidebar />
            <AnalyticSidebarContainer />
          </AnalyticLayout>
        )}
    </div>
  )
}

export default Analytic
