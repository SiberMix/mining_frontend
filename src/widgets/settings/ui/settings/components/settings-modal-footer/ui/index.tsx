import './index.scss'

import { memo } from 'react'
import { t } from 'i18next';

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
        {t("Отмена")}
      </button>,
      <button
        key={3}
        className='settingsButton settingsButtonApply'
        onClick={handleApply}
      >
        {t("Применить")}
      </button>
    ]
  )
})
