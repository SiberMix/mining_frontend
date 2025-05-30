import './SettingsAi.scss'

import { Button, notification, Select, Switch } from 'antd'
import React, { memo, useState } from 'react'

const { Option } = Select

export const SettingsAi: React.FC = memo(() => {
  const [model, setModel] = useState<string>('default')
  const [showHints, setShowHints] = useState<boolean>(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false)
  const [licenseExpiration, setLicenseExpiration] = useState<Date>(generateRandomDate())

  function generateRandomDate(): Date {
    const start = new Date()
    const end = new Date(2026, 0, 1)
    const randomTimestamp = start.getTime() + Math.random() * (end.getTime() - start.getTime())
    return new Date(randomTimestamp)
  }

  const handleModelChange = (value: string) => {
    setModel(value)
  }

  const toggleHints = () => {
    setShowHints(!showHints)
    notification.info({
      message: 'Подсказки',
      description: showHints ? 'Подсказки отключены' : 'Подсказки включены'
    })
  }

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled)
    notification.info({
      message: 'Уведомления',
      description: notificationsEnabled ? 'Уведомления отключены' : 'Уведомления включены'
    })
  }

  return (
    <div className='settingsUserWrapper'>
      <div className='settingsUser'>
        <div className='settingsUserSidebar'>
          <div className='settingsAiOptions'>
            <div className='settingsAiModelSelect'>
              <span>Выбор модели AI:</span>
              <Select
                defaultValue={model}
                onChange={handleModelChange}
                style={{ width: '100%' }}>
                <Option value='default'>Стандартная</Option>
                <Option value='advanced'>Расширенная</Option>
                <Option value='expert'>Экспертная</Option>
              </Select>
            </div>

            <div className='settingsNotificationsHeader'>
              <span>Настройки интерфейса</span>
            </div>

            <div className='settingsAiHints'>
              <span>Показывать подсказки:</span>
              <Button
                type='default'
                onClick={toggleHints}
                style={{ marginLeft: '10px' }}>
                {showHints ? 'Отключить' : 'Включить'}
              </Button>
            </div>

            <div className='settingsAiNotifications'>
              <span>Уведомления:</span>
              <Switch
                checked={notificationsEnabled}
                onChange={toggleNotifications}
                style={{ marginLeft: '10px' }}
              />
            </div>

            <div className='settingsAiLicenseExpiration'>
              <span>Срок действия лицензии:</span>
              <div>{licenseExpiration.toLocaleDateString()}</div>
            </div>
          </div>

          <div className='settingsAiHelpText' style={{ marginTop: '20px', fontStyle: 'italic' }}>
            <p><strong>Описание моделей AI:</strong></p>
            <p><strong>Стандартная:</strong> Подходит для базовых задач, таких как работа с данными и простые рекомендации.</p>
            <p><strong>Расширенная:</strong> Имеет более сложные алгоритмы и может использоваться для анализа и прогнозирования.</p>
            <p><strong>Экспертная:</strong> Предназначена для сложных сценариев, включая глубокий анализ и специализированные решения.</p>
          </div>
        </div>
      </div>
    </div>
  )
})
