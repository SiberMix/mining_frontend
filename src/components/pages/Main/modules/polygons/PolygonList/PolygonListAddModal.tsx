import './PolygonListAddModal.scss'
import { Input, message, Modal, Select } from 'antd'
import type { FieldType } from '../../../../../../redux/slices/fieldSlice'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllPolygonsSelector, getNewPolygonCoordsSelector, getShowAddNewPolygonModalSelector } from '../../../../../../redux/selectors/mapSelectors'
import { getAllFieldsSelector } from '../../../../../../redux/selectors/fieldsSelectors'
import { postNewPolygon, setShowAddNewPolygonModal } from '../../../../../../redux/slices/mapSlice'
import { useAppDispatch } from '../../../../../../redux/store'

const PolygonListAddModal = () => {
  const dispatch = useAppDispatch()

  const allPolygons = useSelector(getAllPolygonsSelector)
  const showAddNewPolygonModal = useSelector(getShowAddNewPolygonModalSelector)
  const fieldsList = useSelector(getAllFieldsSelector)
  const newPolygonCoords = useSelector(getNewPolygonCoordsSelector)

  const [polygonName, setPolygonName] = useState('')
  const { Option } = Select
  const [polygonCulture, setPolygonCulture] = useState<string>(fieldsList[0]?.name)
  const [messageApi, contextHolder] = message.useMessage()

  const handleCancel = () => {
    dispatch(setShowAddNewPolygonModal(false))
    setPolygonName('')
    setPolygonCulture(fieldsList[0]?.name)
  }

  async function handleOk() {
    if (!newPolygonCoords) return

    const isSameNameInPolygons = !!allPolygons.find(p => p.name === polygonName)

    if (isSameNameInPolygons) {
      messageApi.info('Полигон с таким названием уже находится в базе, пожалуйста выберете другое')
      return
    } else {
      // Отправляем POST-запрос с обновленными данными полигона
      dispatch(postNewPolygon({
        name: polygonName,
        coords: newPolygonCoords,
        sequence: polygonCulture
      }))
      setPolygonName('')
      setPolygonCulture(fieldsList[0]?.name)
    }
  }

  return (
    <Modal
      className='polygonListAddModal'
      title='Добавить поле'
      open={showAddNewPolygonModal}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Input
        placeholder='Введите название'
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
          popupClassName='polygonListAddModalSelect'
        >
          {fieldsList.map((field: FieldType) => (
            <Option
              //antd не дает стилизовать по другому выпадающее меню
              style={{ backgroundColor: '#565656' }}
              key={field?.id}
              value={field?.name}
            >
              <div className='polygonListAddModalSelect-textDiv'>
                {field?.name}
                <div className='mini-line' />
              </div>
            </Option>
          ))}
        </Select>
      </Input.Group>
      {contextHolder}
    </Modal>
  )
}

export default PolygonListAddModal
