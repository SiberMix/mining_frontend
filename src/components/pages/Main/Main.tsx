import React, {
  useEffect,
  useState
} from 'react'
import {
  Input,
  Modal,
  Select
} from 'antd'

import {
  atom,
  useAtom,
  useSetAtom
} from 'jotai'
import MainLayout from './MainLayout/MainLayout'

import './styles.css'
import { mapService } from '../../../api/map'
import Preloader from '../../common/preloader/Preloader'
import SidebarContainer from './Sidebar/SidebarContainer'
import Map from './Map/Map'
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
import type { FieldType } from '../../../redux/slices/fieldSlice'
import { getAllFields } from '../../../redux/slices/fieldSlice'
import { getAllFieldsSelector } from '../../../redux/selectors/fieldsSelectors'

export const isDrawingAtom = atom(false)
export const isFetchingAtom = atom(false)
export const fieldTypesAtom = atom([])

const MainPage = () => {
  const [load, setLoad] = useState(true)
  const showAddNewPolygonModal = useSelector(getShowAddNewPolygonModalSelector)
  const newPolygonCoords = useSelector(getNewPolygonCoordsSelector)
  const fieldsList = useSelector(getAllFieldsSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => setLoad(false), 2500)
  }, [])

  const setIsFetching = useSetAtom(isFetchingAtom)

  const [polygonName, setPolygonName] = useState('')
  const { Option } = Select
  const [polygonCulture, setPolygonCulture] = useState<string>('Пшеница')

  useEffect(() => {
    ((async () => {
      dispatch(getAllFields())
      dispatch(getAllPolygons())
    }))()
  }, [])

  const handleCancel = () => {
    dispatch(setShowAddNewPolygonModal(false))
    setPolygonName('')
  }

  async function handleOk() {
    if (!newPolygonCoords) return
    // Отправляем POST-запрос с обновленными данными полигона
    dispatch(postNewPolygon({
      name: polygonName,
      coords: [...newPolygonCoords, newPolygonCoords[0]],
      sequence: polygonCulture
    }))
    setPolygonName('')
    setPolygonCulture('Пшеница')
    setIsFetching(false)
  }

  return (
    <div style={{
      position: 'relative',
      height: '100vh'
    }}
    >
      {load
        ? <Preloader />
        : (
          <MainLayout>
            <SidebarContainer />
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
              <Input.Group compact>
                <Select
                  style={{ width: '30%' }}
                  defaultValue={polygonCulture}
                  onChange={(value) => setPolygonCulture(value)}
                  value={polygonCulture}
                >
                  {fieldsList.map((field: FieldType) => (<Option value={field.name}>
                    {field.name}
                  </Option>))}
                </Select>
              </Input.Group>
            </Modal>
            <Map />
          </MainLayout>
        )}
    </div>
  )
}

export default MainPage
