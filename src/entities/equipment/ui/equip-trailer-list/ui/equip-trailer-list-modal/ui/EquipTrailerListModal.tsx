import './EquipTrailerListModal.scss'

import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { ModalStyled } from '~shared/ui/modal-styled'

import { getAddModalVisibleSelector, getEditedTrailerSelector } from '../../../../../../../srcOld/redux/selectors/optionalEquipmentSelectors'
import { addTrailer, editTrailer, setAddModalVisible } from '../../../../../../../srcOld/redux/slices/optionalEquipmentSlice'
import { useAppDispatch } from '../../../../../../../srcOld/redux/store'

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
    <ModalStyled
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
    </ModalStyled>
  )
}
