import './PreviewAddModal.scss'
import React, {
  useEffect,
  useState
} from 'react'
import {
  Input,
  Modal
} from 'antd'
// @ts-ignore
import { CompactPicker } from 'react-color'
import { useAppDispatch } from '../../../../redux/store'
import { useSelector } from 'react-redux'
import {
  getEditedFieldSelector,
  getShowAddFieldModalSelector
} from '../../../../redux/selectors/fieldsSelectors'
import {
  addField,
  changeField,
  setVisibleAddFieldModal
} from '../../../../redux/slices/fieldSlice'

const AddPreviewModal = () => {
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
    <Modal
      className="fieldPreviewModal"
      title={
        EditedField ? 'Редактировать культуру' : 'Добавить культуру'
      }
      open={showAddFieldModal}
      onCancel={() => dispatch(setVisibleAddFieldModal(false))}
      onOk={handleAdd}
    >
      <Input
        placeholder="Название культуры"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <div style={{ marginBottom: '16px' }}>
        <div style={{ marginBottom: '8px' }}>
          Выберите цвет поля:
        </div>
        <CompactPicker
          color={color}
          onChange={handleColorChange}
        />
      </div>
    </Modal>
  )
}

export default AddPreviewModal
