import { axiosInstance } from '~shared/api/axios-instance'

import type { CalendarEventItem, CalendarEventItemForPost, TypeJobType } from '../types'

export const calendarApi = {
  /** Events */
  getEvents: async (start: Date, end: Date): Promise<CalendarEventItem[]> => {
    const response = await axiosInstance.get('/calendar/events', {
      params: {
        start,
        end
      }
    })
    return response.data
  },
  addNewEvent: async (data: CalendarEventItemForPost) => {
    const response = await axiosInstance.post('/calendar/events/', data)
    return response.data
  },
  editEvent: async ({
    id,
    ...otherData
  }: CalendarEventItem) => {
    const response = await axiosInstance.patch(`/calendar/events/${id}/`, otherData)
    return response.data
  },
  deleteEvent: async (id: number | string) => {
    const response = await axiosInstance.delete(`/calendar/events/${id}`)
    return response.data
  },
  /** Type jobs */
  getTypeJobs: async (): Promise<TypeJobType[]> => {
    const response = await axiosInstance.get('/calendar/typejobs')
    return response.data
  },
  postTypeJob: async (data: Omit<TypeJobType, 'id'>): Promise<TypeJobType> => {
    const response = await axiosInstance.post('/calendar/typejobs/', data)
    return response.data
  },
  editTypeJob: async (data: TypeJobType): Promise<TypeJobType> => {
    const response = await axiosInstance.patch(`/calendar/typejobs/${data.id}/`, data)
    return response.data
  },
  deleteTypeJob: async (id: number) => {
    const response = await axiosInstance.delete(`/calendar/typejobs/${id}`)
    return response.data
  }
}
