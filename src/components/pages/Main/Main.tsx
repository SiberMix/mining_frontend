import React, {
  useEffect,
  useState
} from 'react'
import MainLayout from './MainLayout/MainLayout'

import './styles.css'
import SidebarContainer from './Sidebar/SidebarContainer'
import Map from './Map/Map'
import {
  getAllEquipment,
  getAllPolygons
} from '../../../redux/slices/mapSlice'
import { useAppDispatch } from '../../../redux/store'
import { getAllFields } from '../../../redux/slices/fieldSlice'
import BasePreloader from '../../common/BasePreloader/BasePreloader'
import {
  getEquipsModelsList,
  getTrailerList,
  getTypesList
} from '../../../redux/slices/optionalEquipmentSlice'
import PolygonListAddModal from '../../modules/polygons/PolygonList/PolygonListAddModal'

const MainPage = () => {
  const dispatch = useAppDispatch()

  const [load, setLoad] = useState(true)

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => setLoad(false), 3000)
  }, [])

  useEffect(() => {
    ((async () => {
      dispatch(getAllFields())
      dispatch(getAllPolygons())
      dispatch(getAllEquipment())
      dispatch(getTypesList())
      dispatch(getEquipsModelsList())
      dispatch(getEquipsModelsList())
      dispatch(getTrailerList())
    }))()
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
          <MainLayout>
            <SidebarContainer />
            <Map />
            <PolygonListAddModal />
          </MainLayout>
        )}
    </div>
  )
}

export default MainPage
