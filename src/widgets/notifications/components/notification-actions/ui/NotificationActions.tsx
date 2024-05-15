import './NotificationActions.scss'

import { DeleteOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import type { NotificationCenterItem, UseNotificationCenter } from 'react-toastify/addons/use-notification-center'

import { StyledButton } from '~shared/ui/styled-button'

interface Props
  extends Pick<UseNotificationCenter<{}>, 'markAsRead' | 'remove'> {
  notification: NotificationCenterItem
}

export const NotificationActions = ({
  notification,
  markAsRead,
  remove
}: Props) => {
  return (
    <div className='NotificationActions'>
      {notification.read
        ? (
          <EyeOutlined />
        )
        : (
          <StyledButton
            padding='0 4px'
            title='Mark as read'
            disabled={notification.read}
            onClick={() => {
              markAsRead(notification.id)
            }}
          >
            <EyeInvisibleOutlined />
            <div className='ring' />
          </StyledButton>
        )}
      <StyledButton
        padding='0 4px'
        onClick={() => remove(notification.id)}
        title='Archive'
      >
        <DeleteOutlined />
      </StyledButton>
    </div>
  )
}
