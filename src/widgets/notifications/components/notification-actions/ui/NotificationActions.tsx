import './NotificationActions.scss'

import { DeleteOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

import { StyledButton } from '~shared/ui/styled-button'
import type { Notification } from '~widgets/notifications'

type NotificationActionsProps = {
  notification: Notification,
  markAsRead: (id: number) => void,
  remove: (id: number) => void
}

export const NotificationActions = ({
  notification,
  markAsRead,
  remove
}: NotificationActionsProps) => {
  return (
    <div className='NotificationActions'>
      {notification.isRead
        ? (
          <EyeOutlined />
        )
        : (
          <StyledButton
            padding='0 4px'
            title='Mark as read'
            disabled={notification.isRead}
            onClick={markAsRead.bind(null, notification.id)}
          >
            <EyeInvisibleOutlined />
            <div className='ring' />
          </StyledButton>
        )}
      <StyledButton
        padding='0 4px'
        onClick={remove.bind(null, notification.id)}
        title='Archive'
      >
        <DeleteOutlined />
      </StyledButton>
    </div>
  )
}
