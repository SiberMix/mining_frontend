import BasePreloader from '../../common/BasePreloader/BasePreloader'
import React, {
  useEffect,
  useState
} from 'react'
import AnalyticLayout from './MainLayout/AnalyticLayout'
import AnalyticSidebarContainer from './AnalyticSidebar/AnalyticSidebarContainer'
import { useNavigate } from 'react-router-dom'
import AnalyticSidebar from './AnalyticSidebar/AnalyticSidebar'

const Analytic = () => {
  const navigate = useNavigate()
  const [load, setLoad] = useState(true)

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setLoad(false)
      navigate('/analytics/field')
    }, 3000)
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
