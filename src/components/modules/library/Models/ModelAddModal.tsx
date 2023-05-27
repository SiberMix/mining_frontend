import React, {
  useEffect,
  useState
} from 'react'
import { useAtom } from 'jotai'
import { mapService } from '../../../../api/map'
import {
  Input,
  Modal
} from 'antd'
import { addModalAtom } from './Models'

const AddModelModal: React.FC<{ fetchList: () => void }> = ({ fetchList }) => {
  const [addModal, setAddModal] = useAtom(addModalAtom)

  const [description, setDescription] = useState('')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')

  useEffect(() => {
    if (addModal.model) {
      setDescription(addModal.model.description)
      setLength(addModal.model.length)
      setWidth(addModal.model.width)
    }
  }, [addModal])

  const handleAdd = async () => {
    if (description && length && width) {
      if (addModal.editMode && addModal.model) {
        await mapService.editEquipsModel({
          id: addModal.model.id,
          description,
          length,
          width
        })
      } else {
        await mapService.addNewEquipsModel({
          description,
          width,
          length
        })
      }

      await fetchList()
      setAddModalVisible(false)
      setDescription('')
    }
  }

  const setAddModalVisible = (visible: boolean) => {
    setAddModal({ ...addModal, model: null, visible })
  }

  return (
    <Modal
      title="Добавить модель"
      open={addModal.visible}
      onCancel={() => setAddModalVisible(false)}
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

export default React.memo(AddModelModal)
