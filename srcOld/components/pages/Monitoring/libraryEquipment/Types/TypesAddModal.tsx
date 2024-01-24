import './TypesAddModal.scss'

import { Input, Modal, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getAddModalVisibleSelector, getEditedTypeSelector } from '../../../../../redux/selectors/optionalEquipmentSelectors'
import { addType, editType, setAddModalVisible } from '../../../../../redux/slices/optionalEquipmentSlice'
import { useAppDispatch } from '../../../../../redux/store'

const AddTypeModal = () => {
  const dispatch = useAppDispatch()
  const addModalVisible = useSelector(getAddModalVisibleSelector)
  const editedType = useSelector(getEditedTypeSelector)

  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(false)

  useEffect(() => {
    if (editedType) {
      setDescription(editedType.description)
      setStatus(editedType.status)
    } else {
      setDescription('')
      setStatus(false)
    }
  }, [addModalVisible])

  const handleAdd = async () => {
    if (description) {
      if (editedType) {
        dispatch(editType({
          id: editedType.id,
          description,
          status
        }))
      } else {
        dispatch(addType({
          description,
          status
        }))
      }
    }
  }

  return (
    <Modal
      className='typesAddModal'
      title={editedType ? 'Редактировать тип' : 'Добавить тип'}
      open={addModalVisible}
      onCancel={() => dispatch(setAddModalVisible(false))}
      onOk={handleAdd}
    >
      <Input
        placeholder='Название типа'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <Switch
        checkedChildren='Активен'
        unCheckedChildren='Неактивен'
        checked={status}
        onChange={(e) => setStatus(e.valueOf())}
      />
    </Modal>
  )
}

export default AddTypeModal
