import React, {
  useEffect,
  useState
} from "react"
import { useNavigate } from "react-router-dom"

import { getAllPolygons } from "../../../redux/slices/mapSlice"
import { useAppDispatch } from "../../../redux/store"
import { RoutePath } from "../../../shared/consfigs/RouteConfig/RouteConfig"
import BasePreloader from "../../common/BasePreloader/BasePreloader"
import SettingsModal from "../Monitoring/modules/settings/SettingsModal"
import AnalyticSidebar from "./AnalyticSidebar/AnalyticSidebar"
import AnalyticSidebarContainer from "./AnalyticSidebar/AnalyticSidebarContainer"
import AnalyticLayout from "./MainLayout/AnalyticLayout"

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
        console.error("Произошла ошибка при загрузке данных:", error)
      }
    })()
  }, [])

  return (
    <div style={{
      position: "relative",
      height: "100vh"
    }}
    >
      {load
        ? <BasePreloader />
        : (
          <AnalyticLayout>
            <AnalyticSidebar />
            <AnalyticSidebarContainer />
            <SettingsModal />
          </AnalyticLayout>
        )}
    </div>
  )
}

export default Analytic
