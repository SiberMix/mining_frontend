import React, {
  useEffect,
  useState
} from 'react'
import {
  Input,
  Modal,
  Select
} from 'antd'
import MainLayout from './MainLayout/MainLayout'

import './styles.css'
import SidebarContainer from './Sidebar/SidebarContainer'
import Map from './Map/Map'
import {
  getAllEquipment,
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
import BasePreloader from '../../common/BasePreloader/BasePreloader'
import {
  getEquipsModelsList,
  getTrailerList,
  getTypesList
} from '../../../redux/slices/optionalEquipmentSlice'

const MainPage = () => {
  const [load, setLoad] = useState(true)
  const showAddNewPolygonModal = useSelector(getShowAddNewPolygonModalSelector)
  const newPolygonCoords = useSelector(getNewPolygonCoordsSelector)
  const fieldsList = useSelector(getAllFieldsSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => setLoad(false), 3000)
  }, [])

  const [polygonName, setPolygonName] = useState('')
  const { Option } = Select
  const [polygonCulture, setPolygonCulture] = useState<string>('Пшеница')

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

  const handleCancel = () => {
    dispatch(setShowAddNewPolygonModal(false))
    setPolygonName('')
  }

  async function handleOk() {
    if (!newPolygonCoords) return
    // Отправляем POST-запрос с обновленными данными полигона
    dispatch(postNewPolygon({
      name: polygonName,
      //todo обернуть в дополнительный массив, для внутреннего контура
      coords: [...newPolygonCoords, newPolygonCoords[0]],
      sequence: polygonCulture
    }))
    setPolygonName('')
    setPolygonCulture('Пшеница')
  }

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
                  {fieldsList.map((field: FieldType) => (<Option
                    key={field.id}
                    value={field.name}
                  >
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
