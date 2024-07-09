import './index.scss'

import { Modal } from 'antd'
import { FormikContext, useFormik } from 'formik'
import React, { memo, useCallback } from 'react'

import { settingsStore } from '~widgets/settings'

import { SettingsContent } from '../../../../settings-content'
import { SettingsModalFooter } from '../../settings-modal-footer'

export const Settings = memo(() => {
  // zustand
  const isSettingsOpen = settingsStore(state => state.isSettingsOpen)
  const setIsSettingsOpen = settingsStore(state => state.setIsSettingsOpen)
  const settings = settingsStore(state => state.settings)
  const setSettings = settingsStore(state => state.setSettings)
  // костыль
  const newBaseCord = settingsStore(state => state.newBaseCord)

  // formik
  const settingsFormik = useFormik({
    initialValues: settings,
    onSubmit: values => {
      // костыль для базовой координаты
      const newSettings = { ...values, baseCord: newBaseCord }
      setSettings(newSettings)
    }
  })

  const handleOk = useCallback(() => {
    settingsFormik.handleSubmit()
    setIsSettingsOpen(false)
  }, [settingsFormik, setIsSettingsOpen])

  const handleCansel = useCallback(() => {
    settingsFormik.resetForm()
    setIsSettingsOpen(false)
  }, [settingsFormik, setIsSettingsOpen])

  const handleApply = useCallback(() => {
    settingsFormik.handleSubmit()
  }, [settingsFormik])

  return (
    <FormikContext.Provider value={settingsFormik}>
      <Modal
        open={isSettingsOpen}
        className='customModal'
        width='50%'
        title='Настройки'
        onCancel={handleCansel}
        footer={<SettingsModalFooter
          handleOk={handleOk}
          handleCansel={handleCansel}
          handleApply={handleApply}
        />}
      >
        <SettingsContent />
      </Modal>
    </FormikContext.Provider>
  )
})
