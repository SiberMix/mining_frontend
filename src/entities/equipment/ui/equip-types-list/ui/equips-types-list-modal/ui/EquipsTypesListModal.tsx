import './EquipsTypesListModal.scss'

import { Input, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { ModalStyled } from '~shared/ui/modal-styled'

import { getAddModalVisibleSelector, getEditedTypeSelector } from '../../../../../../../../srcOld/redux/selectors/optionalEquipmentSelectors'
import { addType, editType, setAddModalVisible } from '../../../../../../../../srcOld/redux/slices/optionalEquipmentSlice'
import { useAppDispatch } from '../../../../../../../../srcOld/redux/store'

export const EquipsTypesListModal = () => {
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
    <ModalStyled
      className='EquipsTypesListModal'
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
    </ModalStyled>
  )
}
