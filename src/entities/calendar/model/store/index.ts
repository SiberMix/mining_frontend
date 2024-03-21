import { toast } from 'react-toastify'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { calendarApi } from '../../api'
import type { CalendarEventItem, CalendarEventItemForPost, TasksStoreInitialValue, TypeJobType } from '../../types'

export const tasksCalendarStore = create<TasksStoreInitialValue>()(immer((set, get) => ({
  isLoading: true,
  events: [],
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
    console.log('Зпрос на events')
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
  editEvent: async (event: CalendarEventItem) => {
    try {
      await calendarApi.editEvent(event)
      set((state) => ({
        events: state.events.map(item => item.id === event.id ? event : item)
      }))
    } catch (err) {
      console.error(err)
    }
  },
  editEventTime: async (event: CalendarEventItem) => {
    //сначала создаем копию старого события, чтоб было к чему откатиться
    const oldEvent = get()
      .events
      .find(e => e.id === event.id)
    const backupForEvent = structuredClone(oldEvent)//глубокое копирование
    //сразу заменяем данные в state, и перемещаем событие
    set((state) => ({
      events: state.events.map(item => item.id === event.id ? event : item)
    }))

    try {
      await calendarApi.editEvent({ //меняем данные о времени на сервере
        id: event.id,
        start: event.start,
        end: event.end
      } as any) //мне дико впадлу писать что может быть любой ключь из этого типа + id. Так что пусть будет any. Мне похуй
    } catch (err) {
      set((state) => ({ //в случае ошибки на сервере, откатываем данные о времени назад по бекапам
        events: state.events.map(item => item.id === event.id ? backupForEvent : item)
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
