import s from './PolygonEditModal.module.scss'
import React, { useState } from 'react'
import {
  Modal,
  Select
} from 'antd'
import { useSelector } from 'react-redux'
import { getAllFieldsSelector } from '../../../../redux/selectors/fieldsSelectors'

export const EditPolygonTypeModal: React.FC<{
  visible: boolean,
  onOk: (value: string) => void,
  onCancel: () => void,
  initialValue: string
}> = ({ visible, onOk, onCancel, initialValue }) => {
  const [value, setValue] = useState(initialValue)
  const fieldTypes = useSelector(getAllFieldsSelector)

  return (
    <Modal
      open={visible}
      onOk={() => onOk(value)}
      onCancel={onCancel}
    >
      <div>
        Добавление полигона
      </div>
      <Select
        defaultValue={value}
        onChange={setValue}
        placeholder="Модель оборудования"
        options={fieldTypes.map((item: { name: any, id: any }) => ({
          label: item.name,
          value: item.name,
          key: item.id
        }))}
        style={{ marginBottom: '16px', width: '100%' }}
      />
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
      open={visible}
      onOk={() => onOk(value)}
      onCancel={onCancel}
    >
      <div>
        Добавление полигона
      </div>
      <input
        className={s.modalInput}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Modal>
  )
}
