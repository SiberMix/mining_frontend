import './SettingsAi.scss'

import { Button, notification, Select, Slider, Switch, Upload } from 'antd'
import React, { memo, useState } from 'react'

const { Option } = Select

export const SettingsAi: React.FC = memo(() => {
  const [model, setModel] = useState<string>('default') // Хранит выбранную модель
  const [aggressiveness, setAggressiveness] = useState<number>(50) // Хранит уровень агрессивности
  const [showHints, setShowHints] = useState<boolean>(false) // Хранит состояние подсказок
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false) // Хранит состояние уведомлений
  const [licenseExpiration, setLicenseExpiration] = useState<Date>(generateRandomDate()) // Хранит срок лицензии

  function generateRandomDate(): Date {
    const start = new Date() // Текущая дата
    const end = new Date(2026, 0, 1) // 1 января 2026 года
    const randomTimestamp = start.getTime() + Math.random() * (end.getTime() - start.getTime())
    return new Date(randomTimestamp) // Возвращаем случайную дату
  }

  const handleModelChange = (value: string) => {
    setModel(value)
  }

  const handleAggressivenessChange = (value: number) => {
    setAggressiveness(value)
  }

  const toggleHints = () => {
    setShowHints(!showHints)
    notification.info({
      message: 'Подсказки',
      description: showHints ? 'Подсказки при посеве отключены' : 'Подсказки при посеве включены'
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
              <span>
                Выбор модели AI:
              </span>
              <Select
                defaultValue={model}
                onChange={handleModelChange}
                style={{ width: '100%' }}>
                <Option value='default'>
                  Стандартная
                </Option>
                <Option value='advanced'>
                  Расширенная
                </Option>
                <Option value='expert'>
                  Экспертная
                </Option>
              </Select>
            </div>
            <div className='settinsevents'>
              <span>
                Настройки уведомлений
              </span>
            </div>
            <div className='settingsAiHints'>
              <span>
                Выдавать подсказки при посеве:
              </span>
              <Button
                type='default'
                onClick={toggleHints}
                style={{ marginLeft: '10px' }}>
                {showHints ? 'Выключить подсказки' : 'Включить подсказки'}
              </Button>
            </div>

            <div className='settingsAiNotifications'>
              <span>
                Уведомления:
              </span>
              <Switch
                checked={notificationsEnabled}
                onChange={toggleNotifications}
                style={{ marginLeft: '10px' }}
              />
            </div>

            <div className='settingsAiLicenseExpiration'>
              <span>
                Срок лицензии:
              </span>
              <div>
                {licenseExpiration.toLocaleDateString()}
              </div>
            </div>
          </div>
          <div
            className='settingsAiHelpText'
            style={{ marginTop: '20px', fontStyle: 'italic' }}>
            <p>
              <strong>
                Описание моделей AI:
              </strong>
            </p>
            <p>
              <strong>
                Стандартная:
              </strong>
              {' '}
              Подходит для базовых задач, таких как обработка данных и простые рекомендации.
            </p>
            <p>
              <strong>
                Расширенная:
              </strong>
              {' '}
              Имеет более сложные алгоритмы и может использоваться для анализа данных и прогнозирования.
            </p>
            <p>
              <strong>
                Экспертная:
              </strong>
              {' '}
              Предназначена для высококвалифицированных задач, таких как глубокий анализ и специализированные рекомендации.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})
