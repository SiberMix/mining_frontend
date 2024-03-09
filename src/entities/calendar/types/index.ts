import type { Views } from 'react-big-calendar'

export type tasksStoreInitialValue = {
  isLoading: true,
  tasks: CalendarEventItem[]
}

export type CalendarViewType = (typeof Views)[keyof typeof Views]

export type CalendarEventItem = {
  id: number,
  start: Date,
  end: Date,
  equipment: number, //id
  polygon: number, //id
  work_type: number, //id
  description?: string,
  color: string
}
