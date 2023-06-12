import './TrailerAddModal.scss'
import React, {
  useEffect,
  useState
} from 'react'
import {
  Input,
  Modal
} from 'antd'
import { useAppDispatch } from '../../../../redux/store'
import { useSelector } from 'react-redux'
import {
  getAddModalVisibleSelector,
  getEditedTrailerSelector
} from '../../../../redux/selectors/optionalEquipmentSelectors'
import {
  addTrailer,
  editTrailer,
  setAddModalVisible
} from '../../../../redux/slices/optionalEquipmentSlice'

const AddTrailerModal = () => {
  const dispatch = useAppDispatch()
  const addModalVisible = useSelector(getAddModalVisibleSelector)
  const editedTrailer = useSelector(getEditedTrailerSelector)

  const [trailer_name, setName] = useState('')
  const [gosnomer, setGosnomer] = useState('')

  useEffect(() => {
    if (editedTrailer) {
      setName(editedTrailer.trailer_name)
      setGosnomer(editedTrailer.gosnomer)
    } else {
      setName('')
      setGosnomer('')
    }
  }, [editedTrailer])

  const handleAdd = async () => {
    if (trailer_name && gosnomer) {
      if (editedTrailer) {
        dispatch(editTrailer({
          ...editedTrailer,
          trailer_name,
          gosnomer
        }))
      } else {
        dispatch(addTrailer({
          trailer_name,
          gosnomer
        }))
      }
    }
  }

  return (
    <Modal
      className="trailerAddModal"
      title="Добавить прицеп"
      open={addModalVisible}
      onCancel={() => dispatch(setAddModalVisible(false))}
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

export default AddTrailerModal
