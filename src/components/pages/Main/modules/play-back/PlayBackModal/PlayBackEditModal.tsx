import './PlayBackAddModal.scss'
import React, { useEffect, useState } from 'react'
import { RootState, useAppDispatch } from '../../../../../../redux/store'
import { useSelector } from 'react-redux'
import * as cn from 'classnames'
import { Input, Modal } from 'antd'
import { editeNewPlayback, setEditedPlayback } from '../../../../../../redux/slices/playBackSlice'
//@ts-ignore
import { GithubPicker } from 'react-color'

const PlayBackEditModal = () => {

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
      alert('Название не может быть пустым')
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
      {/*<span className='PlayBackAddModal__title'>*/}
      {/*  Выберете цвет линий*/}
      {/*</span>*/}
      {/*<div*/}
      {/*  className='PlayBackAddModal__colorpicker-color'*/}
      {/*  style={{ backgroundColor: color }}*/}
      {/*/>*/}
      {/*<div className='PlayBackAddModal__colorpicker'>*/}
      {/*  <GithubPicker*/}
      {/*    width='95%'*/}
      {/*    triangle='hide'*/}
      {/*    color={color}*/}
      {/*    onChange={handleColorChange}*/}
      {/*    colors={importedColors.colors}*/}
      {/*  />*/}
      {/*</div>*/}
    </Modal>
  )
}

export default PlayBackEditModal
