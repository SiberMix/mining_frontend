import './TasksCalendar.scss'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import type { EventProps } from 'react-big-calendar'
import { Calendar } from 'react-big-calendar'
import type { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import { tasksCalendarStore } from '~entities/calendar/model'

import type { CalendarEventItem, CalendarViewType } from '../../../types'
import { CalendarEvent } from '../../calendar-event'
import { localizer } from '../model/localizer'

type TasksCalendarProps = {
  view: CalendarViewType,
  date: Date,
  setSelectedTask: (task: CalendarEventItem) => void
}

export const TasksCalendar = ({
  view,
  date,
  setSelectedTask
}: TasksCalendarProps) => {
  const events = tasksCalendarStore(state => state.tasks)

  const onEventResize: withDragAndDropProps['onEventResize'] = data => {
    const {
      event,
      start,
      end
    } = data
    console.log('data', data)

    //todo изменение размеров (времени) события
  }

  const onEventDrop: withDragAndDropProps['onEventDrop'] = data => {
    const {
      event,
      start,
      end
    } = data
    console.log('data', data)

    //todo перетаскивание события dnd
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
      culture='ru'
      localizer={localizer}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      onDoubleClickEvent={onDoubleClickEvent}
      resizable
      toolbar={false}
      step={STEP}
      timeslots={TIME_SLOTS}
    />
  )
}

const DnDCalendar = withDragAndDrop(Calendar)
