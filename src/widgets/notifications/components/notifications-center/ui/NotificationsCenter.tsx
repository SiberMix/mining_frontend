import './NotificationsCenter.scss'

import { SoundOutlined } from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Icons } from 'react-toastify'

import { StyledButton } from '~shared/ui/styled-button'
import { useNotificationStore } from '~widgets/notifications'
import { NotificationsTimeTracker } from '~widgets/notifications/components/notifications-time-tracker'

import { NotificationActions } from '../../notification-actions'
import { variants } from '../const/framer-motion-variants'

export const NotificationsCenter = () => {
  const notifications = useNotificationStore(state => state.notifications)
  const unreadNotifications = notifications.filter(n => !n.isRead)
  const markAsRead = useNotificationStore(state => state.markAsRead)
  const clearNotifications = useNotificationStore(state => state.clearNotifications)
  const markAllAsRead = useNotificationStore(state => state.markAllAsRead)
  const removeNotification = useNotificationStore(state => state.removeNotification)
  const [showUnreadOnly] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='NotificationsCenter'>

      {/** Тут находится кнопка с иконкой */}

      <StyledButton
        width='47px'
        className='NotificationsCenter-trigger'
        onClick={() => setIsOpen(prev => !prev)}
        title='Уведомления'
      >
        <SoundOutlined
          width={20}
          height={20}
        />
        <span className='NotificationsCenter-count'>
          {
            notifications
              .filter(n => !n.isRead)
              .length
          }
        </span>
      </StyledButton>

      {/** Тут находится контент */}

      <motion.div
        className='NotificationsCenter-container'
        initial={false}
        variants={variants.container}
        animate={isOpen ? 'open' : 'closed'}
      >
        <div className='NotificationsCenter-container-header'>
          Уведомления
        </div>
        <AnimatePresence>
          <motion.section
            className='NotificationsCenter-container-content'
            variants={variants.content}
            animate={isOpen ? 'open' : 'closed'}
          >
            {(!notifications.length ||
              (unreadNotifications.length === 0 && showUnreadOnly))
              ? <motion.h4
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Уведомлений нет
              </motion.h4>
              : null}
            <AnimatePresence>
              {(showUnreadOnly
                ? notifications.filter((v) => !v.isRead)
                : notifications
              ).map((notification) => {
                return (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={{
                      scale: 0.4,
                      opacity: 0,
                      y: 50
                    }}
                    exit={{
                      scale: 0,
                      opacity: 0,
                      transition: { duration: 0.2 }
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      y: 0
                    }}
                    style={{ padding: '0.4rem' }}
                  >
                    <motion.article
                      className='NotificationsCenter-container-content-item'
                      key={notification.id}
                      variants={variants.item}
                    >
                      <div style={{ width: '24px' }}>
                        {Icons.info({
                          theme: 'light',
                          type: notification.type
                        })}
                      </div>
                      <div className='NotificationsCenter-container-content-item-info'>
                        <div className='NotificationsCenter-container-content-item-info-title'>
                          {notification.message?.toString()}
                        </div>
                        <div className='NotificationsCenter-container-content-item-info-subtitle'>
                          <NotificationsTimeTracker createdAt={notification.created_at} />
                        </div>
                      </div>
                      <NotificationActions
                        notification={notification}
                        markAsRead={markAsRead}
                        remove={removeNotification}
                      />
                    </motion.article>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.section>
        </AnimatePresence>

        {/** Тут находится футер */}

        <div className='NotificationsCenter-footer'>
          <StyledButton
            width='auto'
            onClick={clearNotifications}
          >
            Удалить все
          </StyledButton>
          <StyledButton
            width='auto'
            onClick={markAllAsRead}
            style={{ margin: '2px' }}
          >
            Прочитать все
          </StyledButton>
        </div>

      </motion.div>
    </div>
  )
}
