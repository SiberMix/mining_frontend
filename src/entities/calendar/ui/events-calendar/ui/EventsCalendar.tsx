import './EventsCalendar.scss'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import type { EventProps } from 'react-big-calendar'
import { Calendar } from 'react-big-calendar'
import type { EventInteractionArgs, withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import { tasksCalendarStore } from '../../../model'
import type { CalendarEventItem, CalendarViewType } from '../../../types'
import { CalendarEvent } from '../../calendar-event'
import { localizer } from '../model/localizer'

type TasksCalendarProps = {
  view: CalendarViewType,
  date: Date,
  setSelectedTask: (task: CalendarEventItem) => void,
  events: CalendarEventItem[],
  isLoading: boolean
}

export const EventsCalendar = ({
  view,
  date,
  setSelectedTask,
  events,
  isLoading
}: TasksCalendarProps) => {
  const editEvent = tasksCalendarStore(state => state.editEvent)

  const onEventEdite = (data: EventInteractionArgs<CalendarEventItem>) => {
    const {
      start,
      end,
      event
    } = data

    editEvent({
      id: event.id,
      start: new Date(start),
      end: new Date(end)
    })
  }

  const onDoubleClickEvent = (data: unknown) => {
    setSelectedTask(data as CalendarEventItem)
  }

  const components: any = {
    event: ({ event }: EventProps<CalendarEventItem>) => {
      return (<CalendarEvent event={event} />)
    }
  }

  const STEP = 5
  const TIME_SLOTS = 60 / STEP

  return (
    <DnDCalendar
      className='TasksCalendar'
      defaultView='week'
      view={view}
      date={date}
      events={events}
      components={components}
      // culture='ru' todo исправить ошибку, и начинать неделю с понедельника
      localizer={localizer}
      onEventDrop={onEventEdite as withDragAndDropProps['onEventDrop']}
      onEventResize={onEventEdite as withDragAndDropProps['onEventResize']}
      onDoubleClickEvent={onDoubleClickEvent}
      resizable
      toolbar={false}
      step={STEP}
      timeslots={TIME_SLOTS}
    />
  )
}

const DnDCalendar = withDragAndDrop(Calendar)
