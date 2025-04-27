import type { TypeOptions } from 'react-toastify/dist/types'

import type { NotificationEventNames } from '../const'

export type NotificationsStore = {
  notifications: Notification[],
  addNotification: (notification: Exclude<Notification, 'isRead'>) => void,
  clearNotifications: () => void,
  markAllAsRead: () => void,
  markAsRead: (id: number) => void,
  removeNotification: (id: number) => void
}

export type Notification = {
  id: number,
  type: TypeOptions,
  event_name: NotificationEventNames,
  message: string,
  created_at: Date,
  isRead: boolean
}
