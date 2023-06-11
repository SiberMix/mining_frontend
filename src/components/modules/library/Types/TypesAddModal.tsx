import React, {
  useEffect,
  useState
} from 'react'
import {
  Checkbox,
  Input,
  Modal
} from 'antd'
import { useAppDispatch } from '../../../../redux/store'
import { useSelector } from 'react-redux'
import {
  getAddModalVisibleSelector,
  getEditedTypeSelector
} from '../../../../redux/selectors/optionalEquipmentSelectors'
import {
  addType,
  editType,
  setAddModalVisible
} from '../../../../redux/slices/optionalEquipmentSlice'

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
      title={editedType ? 'Редактировать тип' : 'Добавить тип'}
      open={addModalVisible}
      onCancel={() => dispatch(setAddModalVisible(false))}
      onOk={handleAdd}
    >
      <Input
        placeholder="Название типа"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <Checkbox
        checked={status}
        onChange={(e) => setStatus(e.target.checked)}
      >
        Активен
      </Checkbox>
    </Modal>
  )
}

export default AddTypeModal
