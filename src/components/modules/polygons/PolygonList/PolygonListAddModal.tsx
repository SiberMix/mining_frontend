import './PolygonListAddModal.scss'
import {
  Input,
  Modal,
  Select
} from 'antd'
import type { FieldType } from '../../../../redux/slices/fieldSlice'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getNewPolygonCoordsSelector,
  getShowAddNewPolygonModalSelector
} from '../../../../redux/selectors/mapSelectors'
import { getAllFieldsSelector } from '../../../../redux/selectors/fieldsSelectors'
import {
  postNewPolygon,
  setShowAddNewPolygonModal
} from '../../../../redux/slices/mapSlice'
import { useAppDispatch } from '../../../../redux/store'

const PolygonListAddModal = () => {
  const dispatch = useAppDispatch()

  const showAddNewPolygonModal = useSelector(getShowAddNewPolygonModalSelector)
  const fieldsList = useSelector(getAllFieldsSelector)
  const newPolygonCoords = useSelector(getNewPolygonCoordsSelector)

  const [polygonName, setPolygonName] = useState('')
  const { Option } = Select
  const [polygonCulture, setPolygonCulture] = useState<string>('Пшеница')

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
    <Modal
      className="polygonListAddModal"
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
          popupClassName="polygonListAddModalSelect"
        >
          {fieldsList.map((field: FieldType) => (
            <Option
              //antd не дает стилизовать по другому выпадающее меню
              style={{ backgroundColor: '#565656' }}
              key={field.id}
              value={field.name}
            >
              <div>
                {field.name}
              </div>
            </Option>
          ))}
        </Select>
      </Input.Group>
    </Modal>
  )
}

export default PolygonListAddModal
