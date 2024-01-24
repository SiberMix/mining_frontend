import './PlayBackAddModal.scss'

import { Input, message, Modal } from 'antd'
import * as cn from 'classnames'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { editeNewPlayback, setEditedPlayback } from '../../../../../redux/slices/playBackSlice'
import type { RootState } from '../../../../../redux/store'
import { useAppDispatch } from '../../../../../redux/store'

const PlayBackEditModal = () => {

  const dispatch = useAppDispatch()
  const editedPlayback = useSelector((state: RootState) => state.playBackReducer.editedPlayback)
  const [name, setName] = useState('')
  // consts [color, setColor] = useState('')

  useEffect(() => {
    if (editedPlayback) {
      setName(editedPlayback.name)
      // setColor(editedPlayback.color)
    }
  }, [editedPlayback])

  const [messageApi, contextHolder] = message.useMessage()
  const handleSubmit = () => {
    if (name && editedPlayback) {
      dispatch(editeNewPlayback({
        id: editedPlayback.id,
        newPlaybackData: {
          ...editedPlayback,
          name
          // color
        }
      }))
      closeHandler()
    } else {
      messageApi.info('Название не может быть пустым')
    }
  }

  const closeHandler = () => {
    dispatch(setEditedPlayback(null))
    setName('')
    // setColor('')
  }

  const handleColorChange = (newColor: any) => {
    // setColor(newColor.hex)
  }

  return (
    <Modal
      className={cn(
        'fieldPreviewModal',
        'PlayBackAddModal'
      )}
      title='Редактировать плэйбэк'
      open={!!editedPlayback}
      onCancel={closeHandler}
      onOk={handleSubmit}
    >
      <Input
        placeholder='Название плэйкбэка'
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      {contextHolder}
    </Modal>
  )
}

export default PlayBackEditModal
