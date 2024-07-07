import type { NOTIFICATION_TYPES } from '../const'

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
  type: NOTIFICATION_TYPES,
  message: string,
  created_at: Date,
  isRead: boolean
}
