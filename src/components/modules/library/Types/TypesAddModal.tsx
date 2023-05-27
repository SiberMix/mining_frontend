import React, {
  useEffect,
  useState
} from 'react'
import { useAtom } from 'jotai'
import {
  Checkbox,
  Input,
  Modal
} from 'antd'
import { mapService } from '../../../../api/map'
import type { EquipType } from '../../../../types/equip'
import { addModalAtom } from './Types'

const postEquipmentType = async ({ description, status }: {description: string, status: boolean}) => {
  const newEquipType: any = { description, status }
  const res = await mapService.addNewEquipType(newEquipType)
  return res.data
}

const putEquipmentType = async ({ status, id, description }: EquipType) => {
  const newData: any = { description, status }
  return mapService.editEquipType(id, newData)
}

const AddTypeModal: React.FC<{ fetchList: () => void }> = ({ fetchList }) => {
  const [addModal, setAddModal] = useAtom(addModalAtom)
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(false)

  useEffect(() => {
    if (addModal.type) {
      setDescription(addModal.type.description)
      setStatus(addModal.type.status)
    }
  }, [addModal])

  const handleAdd = async () => {
    if (description) {
      if (addModal.editMode && addModal.type) {
        putEquipmentType({
          id: addModal.type.id,
          description,
          status
        })
      } else {
        await postEquipmentType({
          description,
          status
        })
      }

      await fetchList()
      setAddModalVisible(false)
      setDescription('')
    }
  }

  const setAddModalVisible = (visible: boolean) => {
    setAddModal({ ...addModal, type: null, visible })
  }

  return (
    <Modal
      title={!addModal.editMode ? 'Добавить тип' : 'Редактировать тип'}
      open={addModal.visible}
      onCancel={() => setAddModalVisible(false)}
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

export default React.memo(AddTypeModal)
