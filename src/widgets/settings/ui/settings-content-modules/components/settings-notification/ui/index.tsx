import './index.scss'

import { useField } from 'formik'
import React, { useCallback } from 'react'

import { CheckboxList } from '~shared/ui/checkbox-list'

export const SettingsNotification = () => {
  const [field, _, helpers] = useField('notificationOptions')

  const handleCheckedItemsChange = useCallback((itemsArr: Array<{title: string, value: boolean}>) => {
    helpers.setValue(itemsArr)
  }, [helpers])

  return (
    <div className='settings-notification'>
      <span className='settings-notification-title'>
        Выберете отображаемые уведомления
      </span>
      <CheckboxList
        className='settings-notification-list'
        options={field.value}
        onCheckedItemsChange={handleCheckedItemsChange}
      />
    </div>
  )
}
