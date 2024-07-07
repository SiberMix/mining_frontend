import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { NotificationsStore } from '~widgets/notifications/types'

export const useNotificationStore = create<NotificationsStore>()(immer((set) => ({
  notifications: [],
  addNotification: (notification) => {
    set((state) => ({
      notifications: [...state.notifications, { ...notification, isRead: false }]
    }))
  },
  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true }))
    }))
  },
  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => n.id === id ? { ...n, isRead: true } : n)
    }))
  },
  clearNotifications: () => {
    set({ notifications: [] })
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id)
    }))
  }
})))
