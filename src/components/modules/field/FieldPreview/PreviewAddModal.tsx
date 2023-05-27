import React, {
  useEffect,
  useState
} from 'react'
import { useAtom } from 'jotai/index'
import { mapService } from '../../../../api/map'
import {
  Input,
  Modal
} from 'antd'
import { addModalAtom } from './FieldPreview'
// @ts-ignore
import { CompactPicker } from 'react-color'

const postEquipmentPreview = async (params: {
  name: string,
  color: string
}) => {
  return await mapService.addField(params)
}

const AddPreviewModal: React.FC<{ fetchList: () => void }> = ({
  fetchList
}) => {
  const [addModal, setAddModal] = useAtom(addModalAtom)

  const [name, setName] = useState('')

  useEffect(() => {
    if (addModal.type) {
      setName(addModal.type.name)
      setColor(addModal.type.color)
    }
  }, [addModal])
  const [color, setColor] = useState('#000000') // значение цвета по умолчанию

  const handleColorChange = (newColor: any) => {
    setColor(newColor.hex) // сохраняем код цвета в состоянии
  }

  const setAddModalVisible = (visible: boolean) => {
    setAddModal({ ...addModal, type: null, visible })
  }
  const handleAdd = async () => {
    if (name && color) {
      if (addModal.editMode && addModal.type) {
        await mapService.editField({
          ...addModal.type,
          name,
          color
        })
      } else {
        await postEquipmentPreview({
          name,
          color
        })
      }

      await fetchList()
      setAddModalVisible(false)

      setName('')
    }
  }

  return (
    <Modal
      title={
        !addModal.editMode ? 'Добавить культуру' : 'Редактировать культуру'
      }
      visible={addModal.visible}
      onCancel={() => setAddModalVisible(false)}
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
