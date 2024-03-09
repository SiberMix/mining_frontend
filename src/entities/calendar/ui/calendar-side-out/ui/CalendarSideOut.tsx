import moment from 'moment'
import { useState } from 'react'
import { Views } from 'react-big-calendar'

import { SideOutLayout } from '~shared/ui/side-out-layout'

import type { CalendarEventItem, CalendarViewType } from '../../../types'
import { AddCalendarTaskModal } from '../../add-calendar-task-modal'
import { CalendarControl } from '../../calendar-control'
import { PreviewCalendarTaskModal } from '../../preview-calendar-task-modal'
import { TasksCalendar } from '../../tasks-calendar'

export const CalendarSideOut = () => {
  const [isAOpenAddModal, setIsAOpenAddModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<CalendarEventItem | null>(null)
  const [view, setView] = useState<CalendarViewType>(Views.WEEK)
  const [date, setDate] = useState<Date>(moment()
    .toDate())

  return (
    <SideOutLayout $width='100%'>
      <CalendarControl
        view={view}
        setView={setView}
        date={date}
        setDate={setDate}
        setIsOpenModal={setIsAOpenAddModal}
      />
      <TasksCalendar
        view={view}
        date={date}
        setSelectedTask={setSelectedTask}
      />
      <AddCalendarTaskModal
        isOpen={isAOpenAddModal}
        onCancel={setIsAOpenAddModal.bind(null, false)}
      />
      <PreviewCalendarTaskModal
        isOpen={!!selectedTask}
        onCancel={setSelectedTask.bind(null, null)}
        task={selectedTask}
      />
    </SideOutLayout>
  )
}
