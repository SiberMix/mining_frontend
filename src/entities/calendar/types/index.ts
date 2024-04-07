import type { Views } from 'react-big-calendar'

export type TasksStoreInitialValue = {
  isLoading: boolean,
  events: CalendarEventItem[],
  eventForEdit: CalendarEventItem | null,
  typeJobs: TypeJobType[],
  setEventForEdit: (value: CalendarEventItem | null) => void,
  initialRequest: () => void,
  getEventsFromTo: (from: Date, to: Date) => void,
  addEvent: (data: CalendarEventItemForPost) => void,
  editEvent: (data: any) => void,
  editEventTime: (data: any) => void, //ну тут нихера не any, но мне лень ебаться с типами, потому что там можно пробросить любую часть от CalendarEventItemForPost
  removeEvent: (id: number) => void,
  addTypeJob: (data: Omit<TypeJobType, 'id'>) => void,
  editTypeJob: (data: TypeJobType) => void,
  deleteTypeJob: (id: number) => void
}

export type CalendarViewType = (typeof Views)[keyof typeof Views]

export type CalendarEventItem = {
  id: number,
  name: string,
  start: Date,
  end: Date,
  description?: string,
  polygon: {
    id: number,
    name: string
  },
  equip: {
    id: number,
    equip_name: string
  },
  type_jobs: {
    id: number,
    name: string,
    color: string
  } | null
}

export type CalendarEventItemForPost = {
  name: string,
  start: Date,
  end: Date,
  description?: string,
  polygon: number, //id
  equip: number, //id
  type_jobs: number //id
}

export type TypeJobType = {
  id: number,
  name: string,
  color: string
}
