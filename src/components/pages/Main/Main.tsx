import React, {
  useEffect,
  useState
} from 'react'
import {
  Input,
  Modal
} from 'antd'

import {
  atom,
  useAtom,
  useSetAtom
} from 'jotai'
import MainLayout from './MainLayout/MainLayout'

import { SidebarStateAtom } from './Sidebar/Sidebar'

import './styles.css'
import { mapService } from '../../../api/map'
import Preloader from '../../common/preloader/Preloader'
import SidebarContainer from './Sidebar/SidebarContainer'
import Map from './Map/Map'
import { MapContainer } from 'react-leaflet'
import * as cn from 'classnames'
import s from './Map/Map.module.scss'
import {
  getAllPolygons,
  postNewPolygon,
  setShowAddNewPolygonModal
} from '../../../redux/slices/mapSlice'
import { useAppDispatch } from '../../../redux/store'
import { useSelector } from 'react-redux'
import {
  getNewPolygonCoordsSelector,
  getShowAddNewPolygonModalSelector
} from '../../../redux/selectors/mapSelectors'

export const isDrawingAtom = atom(false)
export const isFetchingAtom = atom(false)
export const fieldTypesAtom = atom([])

const MainPage = () => {
  const [load, setLoad] = useState(true)
  const showAddNewPolygonModal = useSelector(getShowAddNewPolygonModalSelector)
  const newPolygonCoords = useSelector(getNewPolygonCoordsSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => setLoad(false), 2500)
  }, [])

  const [fieldTypes, setFieldTypes] = useAtom(fieldTypesAtom)

  const setIsFetching = useSetAtom(isFetchingAtom)
  const [sidebarState] = useAtom<any>(SidebarStateAtom)

  const [polygonName, setPolygonName] = useState('')

  useEffect(() => {
    ((async () => {
      const fieldTypes = await mapService.getFieldList()
      setFieldTypes(fieldTypes.data)
      dispatch(getAllPolygons())
    }))()
  }, [setFieldTypes])

  const handleCancel = () => {
    dispatch(setShowAddNewPolygonModal(false))
    setPolygonName('')
  }

  async function handleOk() {
    if (!newPolygonCoords) return

    // Отправляем POST-запрос с обновленными данными полигона
    dispatch(postNewPolygon({ name: polygonName, coords: [...newPolygonCoords, newPolygonCoords[0]] }))
    setPolygonName('')
    setIsFetching(false)
  }

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {load
        ? <Preloader />
        : (
          <MainLayout>
            <SidebarContainer
              sidebarState={sidebarState}
            />
            <Modal
              title="Добавить поле"
              open={showAddNewPolygonModal}
              onCancel={handleCancel}
              onOk={handleOk}
            >
              <Input
                placeholder="Введите название"
                value={polygonName}
                onChange={(e) => setPolygonName(e.target.value)}
                style={{ marginBottom: '16px' }}
              />
            </Modal >
            <MapContainer
              className={cn(s.map)}
              center={[54.925946, 82.775931]}
              zoom={13}
              minZoom={3}
            >
              <Map />
            </MapContainer>
          </MainLayout>
        )}
    </div>
  )
}

export default MainPage
