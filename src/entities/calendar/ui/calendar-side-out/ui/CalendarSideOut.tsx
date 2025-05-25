import moment, { type unitOfTime } from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { Views } from 'react-big-calendar'

import { tasksCalendarStore } from '~entities/calendar/model'
import { BasePreloader } from '~shared/ui/base-preloader'
import { SideOutLayout } from '~shared/ui/side-out-layout'

import type { CalendarEventItem, CalendarViewType } from '../../../types'
import { AddCalendarTaskModal } from '../../add-calendar-task-modal'
import { CalendarControl } from '../../calendar-control'
import { EventsCalendar } from '../../events-calendar'
import { PreviewCalendarEventModal } from '../../preview-calendar-event-modal'

export const CalendarSideOut = () => {
  // zustand
  const initialRequest = tasksCalendarStore(state => state.initialRequest)
  const getEventsFromTo = tasksCalendarStore(state => state.getEventsFromTo)
  const events = tasksCalendarStore(state => state.events)
  const typeJobs = tasksCalendarStore(state => state.typeJobs)
  const isLoading = tasksCalendarStore(state => state.isLoading)
  // states
  const [isAOpenAddModal, setIsAOpenAddModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<CalendarEventItem | null>(null)
  const [view, setView] = useState<CalendarViewType>(Views.WEEK)
  const [date, setDate] = useState<Date>(moment()
    .toDate())

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

  useEffect(() => {
    initialRequest()
  }, [])

  useEffect(() => {
    getEventsFromTo(unixTimestamp.start, unixTimestamp.end)
  }, [unixTimestamp])

  return (
    <SideOutLayout $width='100%'>
      {isLoading ? <BasePreloader opacity='0.8' /> : null}
      <CalendarControl
        isLoading={isLoading}
        view={view}
        setView={setView}
        date={date}
        setDate={setDate}
        setIsOpenModal={setIsAOpenAddModal}
      />
      <EventsCalendar
        view={view}
        date={date}
        onView={setView}
        onNavigate={setDate}
        setSelectedTask={setSelectedTask}
        events={events}
        isLoading={isLoading}
      />
      {
        typeJobs.length > 0 // нужно для корректной работы, иначе formik внутри работает через пизду...
          ? <AddCalendarTaskModal
            isOpen={isAOpenAddModal}
            onCancel={setIsAOpenAddModal.bind(null, false)}
            typeJobs={typeJobs}
          />
          : null
      }
      <PreviewCalendarEventModal
        isOpen={!!selectedTask}
        onCancel={setSelectedTask.bind(null, null)}
        event={selectedTask}
        setIsAOpenAddModal={setIsAOpenAddModal.bind(null, true)}
      />
    </SideOutLayout>
  )
}
