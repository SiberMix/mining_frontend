import './CalendarTypeJobsRightSide.scss'

import { Collapse, Drawer } from 'antd'
import { useCallback, useState } from 'react'

import { tasksCalendarStore } from '~entities/calendar/model'
import type { TypeJobType } from '~entities/calendar/types'
import { COLLAPSE_KEY } from '~entities/calendar/ui/calendar-type-jobs/components/calendar-type-jobs-right-side/const'
import { StyledButton } from '~shared/ui/button-styled'

import { CalendarTypeJobsForm } from '../../calendar-type-jobs-add-form'
import { CalendarTypeJobsListItem } from '../../calendar-type-jobs-list-item'

type CalendarTypeJobsRightSideProps = {
  isOpen: boolean,
  onClose: () => void
}

export const CalendarTypeJobsRightSide = ({
  isOpen,
  onClose
}: CalendarTypeJobsRightSideProps) => {
  const typeJobs = tasksCalendarStore(state => state.typeJobs)
  const deleteTypeJob = tasksCalendarStore(state => state.deleteTypeJob)
  const [selectedJobType, setSelectedJobType] = useState<null | number>(null)
  const [collapseActiveKey, setCollapseActiveKey] = useState<null | string | string[]>(null)
  const [editingTypeJob, setEditingTypeJob] = useState<TypeJobType | null>(null)

  const onSelectHandler = useCallback((id: number) => {
    if (selectedJobType === id) {
      setSelectedJobType(null)
    } else {
      setSelectedJobType(id)
    }
    setEditingTypeJob(null)
    setCollapseActiveKey(null)
  }, [selectedJobType, setSelectedJobType])

  const editClickHandler = () => {
    const typeJob = typeJobs.find(job => job.id === selectedJobType)
    setEditingTypeJob(typeJob || null)
    setCollapseActiveKey(COLLAPSE_KEY)
  }

  const deleteHandler = () => {
    deleteTypeJob(selectedJobType!)
  }

  return (
    <Drawer
      width='35%'
      className='CalendarTypeJobsRightSide'
      open={isOpen}
      onClose={onClose}
    >
      <Collapse
        onChange={setCollapseActiveKey}
        activeKey={collapseActiveKey ?? undefined}
        rootClassName='CalendarTypeJobsRightSide_collapse'
        size='small'
        items={[{
          key: COLLAPSE_KEY,
          label: editingTypeJob ? 'Редактировать вид работ' : 'Добавить новый вид работ',
          children: <CalendarTypeJobsForm
            onSubmit={setCollapseActiveKey.bind(null, null)}
            initialValue={editingTypeJob}
          />
        }]}
      />
      <div className='CalendarTypeJobsRightSide_list'>
        {
          typeJobs.map((item) => (
            <CalendarTypeJobsListItem
              key={`CalendarTypeJobsListItem__${item.id}`}
              typeJob={item}
              selected={item.id === selectedJobType}
              onSelect={onSelectHandler.bind(null, item.id)}
            />
          ))
        }
      </div>
      {
        selectedJobType !== null
          ? (
            <div className='CalendarTypeJobsRightSide_buttons'>
              <StyledButton onClick={editClickHandler}>
                Редактировать
              </StyledButton>
              <StyledButton onClick={deleteHandler}>
                Удалить
              </StyledButton>
            </div>
          )
          : null
      }
    </Drawer>
  )
}
