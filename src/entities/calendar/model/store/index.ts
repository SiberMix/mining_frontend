import { toast } from 'react-toastify'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { calendarApi } from '../../api'
import type { CalendarEventItem, CalendarEventItemForPost, TasksStoreInitialValue, TypeJobType } from '../../types'

export const tasksCalendarStore = create<TasksStoreInitialValue>()(immer((set, get) => ({
  isLoading: true,
  events: [],
  eventForEdit: null,
  typeJobs: [],
  initialRequest: async () => {
    set({ isLoading: true })
    try {
      const typeJobs = await calendarApi.getTypeJobs()
      set({ typeJobs })
    } catch (err) {
      console.error(err)
    } finally {
      set({ isLoading: false })
    }
  },
  getEventsFromTo: async (from: Date, to: Date) => {
    set({ isLoading: true })
    try {
      const events = await calendarApi.getEvents(from, to)
      set({
        events: events.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }))
      })
    } catch (err) {
      console.error(err)
    } finally {
      set({ isLoading: false })
    }
  },
  addEvent: async (data: CalendarEventItemForPost) => {
    try {
      const event = await calendarApi.addNewEvent(data)
      set((state) => ({
        events: [...state.events, {
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }]
      }))
    } catch (err) {
      console.error(err)
    }
  },
  setEventForEdit: (eventForEdit: CalendarEventItem | null) => {
    set({ eventForEdit })
  },
  editEvent: async (data: any) => {
    try {
      const response = await calendarApi.editEvent(data)
      set((state) => ({
        events: state.events.map(item => item.id === response.id
          ? {
            ...response,
            start: new Date(response.start),
            end: new Date(response.end)
          }
          : item)
      }))
    } catch (err) {
      toast.error('Ошибка при редактировании события!')
      console.error(err)
    }
  },
  editEventTime: async (editEventInfo: CalendarEventItem) => {
    //сначала создаем копию старого события, чтоб было к чему откатиться
    const oldEvent = get()
      .events
      .find(e => e.id === editEventInfo.id)
    const eventBackup = structuredClone(oldEvent)//глубокое копирование
    const newEvent = { ...eventBackup, ...editEventInfo }
    //сразу заменяем данные в state, и перемещаем событие
    set((state) => ({
      events: state.events.map(item => item.id === editEventInfo.id ? newEvent : item)
    }))

    try {
      await calendarApi.editEvent(editEventInfo)
    } catch (err) {
      set((state) => ({ //в случае ошибки на сервере, откатываем данные о времени назад по бекапам
        events: state.events.map(item => item.id === editEventInfo.id ? eventBackup : item)
      }))
      toast.error('Ошибка при изменении времени события!')
      console.error(err)
    }
  },
  removeEvent: async (id: number) => {
    try {
      await calendarApi.deleteEvent(id)
      set((state) => ({
        events: state.events.filter(item => item.id !== id)
      }))
    } catch (err) {
      console.error(err)
    }
  },
  addTypeJob: async (data: Omit<TypeJobType, 'id'>) => {
    set({ isLoading: true })
    try {
      const typeJob = await calendarApi.postTypeJob(data)
      set((state) => ({
        typeJobs: [...state.typeJobs, typeJob]
      }))
    } catch (err) {
      console.error(err)
    } finally {
      set({ isLoading: false })
    }
  },
  editTypeJob: async (data: TypeJobType) => {
    set({ isLoading: true })
    try {
      const typeJob = await calendarApi.editTypeJob(data)
      set((state) => ({
        typeJobs: state.typeJobs.map(item => item.id === typeJob.id ? typeJob : item)
      }))
    } catch (err) {
      console.error(err)
    } finally {
      set({ isLoading: false })
    }
  },
  deleteTypeJob: async (id: number) => {
    set({ isLoading: true })
    try {
      await calendarApi.deleteTypeJob(id)
      set((state) => ({
        typeJobs: state.typeJobs.filter(item => item.id !== id)
      }))
    } catch (err) {
      console.error(err)
    } finally {
      set({ isLoading: false })
    }
  }
})))
