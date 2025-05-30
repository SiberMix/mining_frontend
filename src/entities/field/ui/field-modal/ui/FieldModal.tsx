import './FieldModal.scss'

import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { CompactPicker } from 'react-color'
import { useSelector } from 'react-redux'

import { getEditedFieldSelector, getShowAddFieldModalSelector } from '~processes/redux/selectors/fieldsSelectors'
import { addField, changeField, setVisibleAddFieldModal } from '~processes/redux/slices/fieldSlice'
import { useAppDispatch } from '~processes/redux/store'
import { StyledModal } from '~shared/ui/styled-modal'

export const FieldModal = () => {
  const dispatch = useAppDispatch()
  const EditedField = useSelector(getEditedFieldSelector)
  const showAddFieldModal = useSelector(getShowAddFieldModalSelector)
  const [color, setColor] = useState('#000000') // значение цвета по умолчанию
  const [name, setName] = useState('')

  /*
  * Проверка на режим редактирвоания
  * */
  useEffect(() => {
    if (EditedField) {
      setName(EditedField.name)
      setColor(EditedField.color)
    }
  }, [EditedField])

  const handleColorChange = (newColor: any) => {
    setColor(newColor.hex) // сохраняем код цвета в состоянии
  }

  const handleAdd = async () => {
    if (name && color) {
      if (EditedField) {
        const id = EditedField.id
        dispatch(changeField({
          id,
          name,
          color
        }))
      } else {
        dispatch(addField({
          name,
          color
        }))
      }
      dispatch(setVisibleAddFieldModal(false))
      setName('')
    }
  }

  return (
    <StyledModal
      title={
        EditedField ? 'Редактировать материал' : 'Добавить материал'
      }
      open={showAddFieldModal}
      onCancel={() => dispatch(setVisibleAddFieldModal(false))}
      onOk={handleAdd}
    >
      <Input
        placeholder='Название материалы'
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <div style={{ marginBottom: '16px' }}>
        <div style={{ marginBottom: '8px' }}>
          Выберите цвет материала:
        </div>
        <CompactPicker
          color={color}
          onChange={handleColorChange}
        />
      </div>
    </StyledModal>
  )
}
