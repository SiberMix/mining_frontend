import './EquipModelListModal.scss'

import { Input } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {
  getAddModalVisibleSelector,
  getEditedModelSelector
} from '~processes/redux/selectors/optionalEquipmentSelectors'
import { addModel, editModel, setAddModalVisible } from '~processes/redux/slices/optionalEquipmentSlice'
import { useAppDispatch } from '~processes/redux/store'
import { StyledModal } from '~shared/ui/styled-modal'

export const EquipModelListModal = memo(() => {
  const dispatch = useAppDispatch()
  const addModalVisible = useSelector(getAddModalVisibleSelector)
  const editedModel = useSelector(getEditedModelSelector)

  const [description, setDescription] = useState('')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')

  useEffect(() => {
    if (editedModel) {
      setDescription(editedModel.description)
      setLength(editedModel.length)
      setWidth(editedModel.width)
    } else {
      setDescription('')
      setLength('')
      setWidth('')
    }
  }, [editedModel])

  const handleAdd = async () => {
    if (description && length && width) {
      if (editedModel) {
        dispatch(editModel({
          id: editedModel.id,
          description,
          length,
          width
        }))
      } else {
        dispatch(addModel({
          description,
          width,
          length
        }))
      }
    }
  }

  return (
    <StyledModal
      className='modelAddModal'
      title={editedModel ? 'Редактировать модель' : 'Добавить модель'}
      open={addModalVisible}
      onCancel={() => dispatch(setAddModalVisible(false))}
      onOk={handleAdd}
    >
      <Input
        placeholder='Название модели'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <Input
        placeholder='Ширина'
        value={width}
        onChange={(e) => setWidth(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <Input
        placeholder='Длина'
        value={length}
        onChange={(e) => setLength(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
    </StyledModal>
  )
})
