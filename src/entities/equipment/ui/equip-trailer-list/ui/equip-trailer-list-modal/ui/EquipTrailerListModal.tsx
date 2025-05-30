import './EquipTrailerListModal.scss'

import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {
  getAddModalVisibleSelector,
  getEditedTrailerSelector
} from '~processes/redux/selectors/optionalEquipmentSelectors'
import { addTrailer, editTrailer, setAddModalVisible } from '~processes/redux/slices/optionalEquipmentSlice'
import { useAppDispatch } from '~processes/redux/store'
import { StyledModal } from '~shared/ui/styled-modal'

export const EquipTrailerListModal = () => {
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
    <StyledModal
      className='EquipTrailerListModal'
      title='Добавить прицеп'
      open={addModalVisible}
      onCancel={() => dispatch(setAddModalVisible(false))}
      onOk={handleAdd}
    >
      <Input
        placeholder='Название прицепа'
        value={trailer_name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <Input
        placeholder='Номер'
        value={gosnomer}
        onChange={(e) => setGosnomer(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
    </StyledModal>
  )
}
