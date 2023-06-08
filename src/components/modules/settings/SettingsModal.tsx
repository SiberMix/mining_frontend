import './SettingsModal.scss'
import { Modal } from 'antd'
import React from 'react'
import SettingsMenu from './SettingsMenu/SettingsMenu'
import { useSelector } from 'react-redux'
import { getShowSettingsModalSelector } from '../../../redux/selectors/settingsSelector'
import { setShowSettingsModal } from '../../../redux/slices/settingsSlice'
import { useAppDispatch } from '../../../redux/store'
import SettingsContent from './SettingsContent/SettingsContent'

const SettingsModal = () => {
  const dispatch = useAppDispatch()
  const showSettingsModal = useSelector(getShowSettingsModalSelector)

  const handleOk = () => {
    dispatch(setShowSettingsModal(false))
  }
  const handleCansel = () => {
    dispatch(setShowSettingsModal(false))
  }
  const handleApply = () => {
    dispatch(setShowSettingsModal(false))
  }

  return (
    <Modal
      open={showSettingsModal}
      className="customModal"
      width="55%"
      title="Program Settings"
      onCancel={handleCansel}
      footer={[
        <button
          key={1}
          className="settingsButton settingsButtonOk"
          onClick={handleOk}
        >
          OK
        </button>,
        <button
          key={2}
          className="settingsButton settingsButtonCancel"
          onClick={handleCansel}
        >
          Cansel
        </button>,
        <button
          key={3}
          className="settingsButton settingsButtonApply"
          onClick={handleApply}
        >
          Apply
        </button>
      ]}
    >
      <SettingsMenu />
      <SettingsContent />
    </Modal>
  )
}

export default React.memo(SettingsModal)
