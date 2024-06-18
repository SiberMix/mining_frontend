import './index.scss'

import { memo } from 'react'

type SettingsModalFooterProps = {
  handleOk: () => void,
  handleCansel: () => void,
  handleApply: () => void
}

export const SettingsModalFooter = memo((props: SettingsModalFooterProps) => {
  const {
    handleApply,
    handleOk,
    handleCansel
  } = props

  return (
    [
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
    ]
  )
})
