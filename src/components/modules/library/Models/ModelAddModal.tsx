import './ModelAddModal.scss'
import React, {
  useEffect,
  useState
} from 'react'
import {
  Input,
  Modal
} from 'antd'
import { useSelector } from 'react-redux'
import {
  getAddModalVisibleSelector,
  getEditedModelSelector
} from '../../../../redux/selectors/optionalEquipmentSelectors'
import { useAppDispatch } from '../../../../redux/store'
import {
  addModel,
  editModel,
  setAddModalVisible
} from '../../../../redux/slices/optionalEquipmentSlice'

const AddModelModal = () => {
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
    <Modal
      className="modelAddModal"
      title={editedModel ? 'Редактировать модель' : 'Добавить модель'}
      open={addModalVisible}
      onCancel={() => dispatch(setAddModalVisible(false))}
      onOk={handleAdd}
    >
      <Input
        placeholder="Название модели"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <Input
        placeholder="Ширина"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <Input
        placeholder="Длина"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
    </Modal>
  )
}

export default AddModelModal
