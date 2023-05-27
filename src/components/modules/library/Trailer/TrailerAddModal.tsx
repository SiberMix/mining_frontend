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
import { addModalAtom } from './Trailer'

const AddTrailerModal: React.FC<{ fetchList: () => void }> = ({
  fetchList
}) => {
  const [addModal, setAddModal] = useAtom(addModalAtom)

  const [trailer_name, setName] = useState('')
  const [gosnomer, setGosnomer] = useState('')

  useEffect(() => {
    if (addModal.trailer) {
      setName(addModal.trailer.trailer_name)
      setGosnomer(addModal.trailer.gosnomer)
    }
  }, [addModal])

  const handleAdd = async () => {
    if (trailer_name && gosnomer) {
      if (addModal.editMode && addModal.trailer) {
        await mapService.editTrailer({
          ...addModal.trailer,
          trailer_name,
          gosnomer
        })
      } else {
        await mapService.addTrailer({
          trailer_name,
          gosnomer
        })
      }

      await fetchList()
      setAddModalVisible(false)

      setName('')
    }
  }

  const setAddModalVisible = (visible: boolean) => {
    setAddModal({ ...addModal, trailer: null, visible })
  }

  return (
    <Modal
      title="Добавить прицеп"
      open={addModal.visible}
      onCancel={() => setAddModalVisible(false)}
      onOk={handleAdd}
    >
      <Input
        placeholder="Название прицепа"
        value={trailer_name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <Input
        placeholder="Номер"
        value={gosnomer}
        onChange={(e) => setGosnomer(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
    </Modal>
  )
}

export default React.memo(AddTrailerModal)
