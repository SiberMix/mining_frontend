import './Settings.scss'

import { Modal } from 'antd'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { getShowSettingsModalSelector } from '../../../../../../srcOld/redux/selectors/settingsSelector'
import { postSettings, resetSettings, setShowSettingsModal } from '../../../../../../srcOld/redux/slices/settingsSlice'
import { useAppDispatch } from '../../../../../../srcOld/redux/store'
import { SettingsContentLayout } from '../../settings-content'
import { SettingsMenu } from '../../settings-menu'

export const Settings = memo(() => {
  const dispatch = useAppDispatch()
  const showSettingsModal = useSelector(getShowSettingsModalSelector)

  const handleOk = () => {
    dispatch(postSettings())
    dispatch(setShowSettingsModal(false))
  }
  const handleCansel = () => {
    dispatch(resetSettings())
    dispatch(setShowSettingsModal(false))
  }
  const handleApply = () => {
    dispatch(postSettings())
  }

  return (
    <Modal
      open={showSettingsModal}
      className='customModal'
      width='50%'
      title='Настройки'
      onCancel={handleCansel}
      footer={[
        <button
          key={1}
          className='settingsButton settingsButtonOk'
          onClick={handleOk}
        >
          OK
        </button>,
        <button
          key={2}
          className='settingsButton settingsButtonCancel'
          onClick={handleCansel}
        >
          Отмена
        </button>,
        <button
          key={3}
          className='settingsButton settingsButtonApply'
          onClick={handleApply}
        >
          Применить
        </button>
      ]}
    >
      <SettingsMenu />
      <SettingsContentLayout />
    </Modal>
  )
})
