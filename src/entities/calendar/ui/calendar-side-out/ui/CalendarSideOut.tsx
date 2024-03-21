import moment, { type unitOfTime } from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { Views } from 'react-big-calendar'

import { tasksCalendarStore } from '~entities/calendar/model'
import { SideOutLayout } from '~shared/ui/side-out-layout'

import type { CalendarEventItem, CalendarViewType } from '../../../types'
import { AddCalendarTaskModal } from '../../add-calendar-task-modal'
import { CalendarControl } from '../../calendar-control'
import { EventsCalendar } from '../../events-calendar'
import { PreviewCalendarEventModal } from '../../preview-calendar-event-modal'

export const CalendarSideOut = () => {
  const initialRequest = tasksCalendarStore(state => state.initialRequest)
  const [isAOpenAddModal, setIsAOpenAddModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<CalendarEventItem | null>(null)
  const [view, setView] = useState<CalendarViewType>(Views.WEEK)
  const [date, setDate] = useState<Date>(moment()
    .toDate())

  const getEvents = tasksCalendarStore(state => state.getEventsFromTo)

  const unixTimestamp: { start: Date, end: Date } = useMemo(() => {
    return {
      start: moment(date)
        .startOf(view as unitOfTime.StartOf)
        .toDate(),
      end: moment(date)
        .endOf(view as unitOfTime.StartOf)
        .toDate()
    }
  }, [view, date])

  useEffect(initialRequest, [])

  useEffect(() => {
    getEvents(unixTimestamp.start, unixTimestamp.end)
  }, [unixTimestamp])

  return (
    <SideOutLayout $width='100%'>
      <CalendarControl
        view={view}
        setView={setView}
        date={date}
        setDate={setDate}
        setIsOpenModal={setIsAOpenAddModal}
      />
      <EventsCalendar
        view={view}
        date={date}
        setSelectedTask={setSelectedTask}
      />
      <AddCalendarTaskModal
        isOpen={isAOpenAddModal}
        onCancel={setIsAOpenAddModal.bind(null, false)}
      />
      <PreviewCalendarEventModal
        isOpen={!!selectedTask}
        onCancel={setSelectedTask.bind(null, null)}
        event={selectedTask}
      />
    </SideOutLayout>
  )
}
