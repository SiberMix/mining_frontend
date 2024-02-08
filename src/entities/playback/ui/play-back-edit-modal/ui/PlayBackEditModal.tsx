import '../../play-back-add-modal/ui/PlayBackAddModal.scss'

import { Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { ModalStyled } from '~shared/ui/modal-styled'

import { editeNewPlayback, setEditedPlayback } from '../../../../../srcOld/redux/slices/playBackSlice'
import type { RootState } from '../../../../../srcOld/redux/store'
import { useAppDispatch } from '../../../../../srcOld/redux/store'

export const PlayBackEditModal = () => {

  const dispatch = useAppDispatch()
  const editedPlayback = useSelector((state: RootState) => state.playBackReducer.editedPlayback)
  const [name, setName] = useState('')
  // const [color, setColor] = useState('')

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
    <ModalStyled
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
    </ModalStyled>
  )
}
