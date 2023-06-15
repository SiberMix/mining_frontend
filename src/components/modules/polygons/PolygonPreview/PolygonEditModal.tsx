import './PolygonEditModal.scss'
import React, { useState } from 'react'
import {
  Input,
  Modal,
  Select
} from 'antd'
import { useSelector } from 'react-redux'
import { getAllFieldsSelector } from '../../../../redux/selectors/fieldsSelectors'
import type { FieldType } from '../../../../redux/slices/fieldSlice'

export const EditPolygonTypeModal: React.FC<{
  visible: boolean,
  onOk: (value: string) => void,
  onCancel: () => void,
  initialValue: string
}> = ({ visible, onOk, onCancel, initialValue }) => {
  const [value, setValue] = useState(initialValue)
  const fieldTypes = useSelector(getAllFieldsSelector)
  const { Option } = Select

  return (
    <Modal
      className="polygonEditModal"
      title="Редактировать культуру"
      open={visible}
      onOk={() => onOk(value)}
      onCancel={onCancel}
    >
      <Select
        defaultValue={value}
        onChange={setValue}
        placeholder="Модель оборудования"
        popupClassName="polygonEditModalSelect"
      >
        {fieldTypes.map((field: FieldType) => (
          <Option
            //antd не дает стилизовать по другому выпадающее меню
            style={{ backgroundColor: '#565656' }}
            key={field.id}
            value={field.name}
          >
            <div className="polygonEditModalSelect-textDiv">
              {field.name}
              <div className="mini-line" />
            </div>
          </Option>
        ))}
      </Select>
    </Modal>
  )
}

export const EditPolygonNameModal: React.FC<{
  visible: boolean,
  onOk: (value: string) => void,
  onCancel: () => void,
  initialValue: string
}> = ({ visible, onOk, onCancel, initialValue }) => {
  const [value, setValue] = useState(initialValue)

  return (
    <Modal
      className="polygonEditModal"
      title="Редактировать название"
      open={visible}
      onOk={() => onOk(value)}
      onCancel={onCancel}
    >
      <Input
        placeholder="Редактировать название"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
    </Modal>
  )
}
