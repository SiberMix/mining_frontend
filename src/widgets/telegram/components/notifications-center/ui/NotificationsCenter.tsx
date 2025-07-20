import './NotificationsCenter.scss'

import { SendOutlined } from '@ant-design/icons'
import { Button, Input, Modal } from 'antd'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { StyledButton } from '~shared/ui/styled-button'
import { useNotificationStore } from '~widgets/notifications'

import { variants } from '../const/framer-motion-variants'

// Настройка интерсептора для добавления токена в заголовок
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // Получаем токен из localStorage
    if (token) {
      config.headers['Authorization'] = `Token ${token}` // Добавляем токен в заголовок запроса
    }
    return config
  },
  (error) => {
    return Promise.reject(error) // Обработка ошибок запроса
  }
)

export const TelegramCenter = () => {
  const notifications = useNotificationStore(state => state.notifications)
  const markAllAsRead = useNotificationStore(state => state.markAllAsRead)
  const [isOpen, setIsOpen] = useState(false)

  const [drivers, setDrivers] = useState<any[]>([]) // Состояние для списка водителей
  const [loading, setLoading] = useState(true) // Состояние для загрузки данных
  const [error, setError] = useState<string | null>(null) // Состояние для ошибок
  const [isModalOpen, setIsModalOpen] = useState(false) // Состояние для модалки
  const [message, setMessage] = useState('') // Текст сообщения
  const [selectedDriver, setSelectedDriver] = useState<any>(null) // Выбранный водитель
  const [sending, setSending] = useState(false) // Состояние отправки

  // Выполнение запроса к API
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://myhectare.ru:8000/api/v1/drivers/')
        setDrivers(response.data) // Установка списка водителей
      } catch (err) {
        setError('Не удалось загрузить водителей') // Обработка ошибок
      } finally {
        setLoading(false) // Завершение загрузки
      }
    }

    fetchDrivers()
  }, [])

  // Функция для отправки сообщения
  const sendMessage = async () => {
    if (!message || !selectedDriver?.telegram_id) return

    setSending(true)

    try {
      const response = await axios.post('http://myhectare.ru:8000/api/v1/telegram/send_telegram_message/', {
        telegram_id: selectedDriver.telegram_id,
        message
      })
      // Уведомление об успешной отправке
      toast.success('Сообщение отправлено успешно', {
        position: 'bottom-right',
        autoClose: 3000,
        style: {
          backgroundColor: '#28a745', // Зеленая рамка
          color: 'white',
          borderRadius: '8px',
          padding: '10px'
        }
      })
    } catch (err) {
      // Обработка ошибок при отправке
      toast.error('Не удалось отправить сообщение', {
        position: 'bottom-right',
        autoClose: 3000,
        style: {
          backgroundColor: '#dc3545', // Красная рамка при ошибке
          color: 'white',
          borderRadius: '8px',
          padding: '10px'
        }
      })
    } finally {
      setSending(false)
      setIsModalOpen(false)
      setMessage('') // Очищаем блок ввода
    }
  }

  return (
    <div className='NotificationsCenter'>
      <StyledButton
        width='47px'
        className='NotificationsCenter-trigger'
        onClick={() => setIsOpen((prev) => !prev)}
        title='Отправить сообщение водителю'
      >
        <SendOutlined
          width={20}
          height={20} />
      </StyledButton>

      <motion.div
        className='NotificationsCenter-container'
        initial={false}
        variants={variants.container}
        animate={isOpen ? 'open' : 'closed'}
      >
        <div className='NotificationsCenter-container-header'>
          Водители
        </div>
        <AnimatePresence>
          <motion.section
            className='NotificationsCenter-container-content'
            variants={variants.content}
            animate={isOpen ? 'open' : 'closed'}
          >
            {loading ? (
              <motion.h4
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Загружаю водителей...
              </motion.h4>
            ) : error ? (
              <motion.h4
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {error}
              </motion.h4>
            ) : drivers.length === 0 ? (
              <motion.h4
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Нет водителей в сети
              </motion.h4>
            ) : (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {drivers.map((driver) => (
                  <motion.li
                    key={driver.id}
                    className='driver-item'>
                    <div className='driver-item-left'>
                      <span className='driver-name'>
                        {driver.fio}
                      </span>

                      <StyledButton
                        width='auto'
                        className='send-message-button'
                        onClick={() => {
                          setSelectedDriver(driver) // Выбираем водителя
                          setIsModalOpen(true) // Открываем модалку
                        }}
                      >
                        <SendOutlined />
                      </StyledButton>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.section>
        </AnimatePresence>

        <div className='NotificationsCenter-footer'>
          <StyledButton
            width='auto'
            onClick={markAllAsRead}>
            Обновить
          </StyledButton>
        </div>
      </motion.div>

      {/* Модалка для отправки сообщения */}
      <Modal
        title='Отправка сообщения'
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button
            key='cancel'
            onClick={() => setIsModalOpen(false)}>
            Отмена
          </Button>,
          <Button
            key='submit'
            type='primary'
            onClick={sendMessage}
            loading={sending}
            disabled={!message || sending}
          >
            Отправить
          </Button>
        ]}
      >
        <Input.TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder='Введите текст сообщения'
        />
      </Modal>
    </div>
  )
}
