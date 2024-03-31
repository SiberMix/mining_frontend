import './PreviewCalendarEventModal.scss'

import React from 'react'

import { tasksCalendarStore } from '~entities/calendar/model'
import { StyledButton } from '~shared/ui/button-styled'
import { DeleteOption } from '~shared/ui/delete-option'
import { ModalStyled } from '~shared/ui/modal-styled'

import type { CalendarEventItem } from '../../../types'

type PreviewCalendarTaskModalProps = {
  isOpen: boolean,
  onCancel: () => void,
  event: CalendarEventItem | null,
  setIsAOpenAddModal: () => void
}

export const PreviewCalendarEventModal = ({
  isOpen,
  onCancel,
  event,
  setIsAOpenAddModal
}: PreviewCalendarTaskModalProps) => {
  const removeEvent = tasksCalendarStore(state => state.removeEvent)
  const setEventForEdit = tasksCalendarStore(state => state.setEventForEdit)

  const deleteItem = () => {
    removeEvent(event?.id!)
    onCancel()
  }

  const editItem = () => {
    setEventForEdit(event)
    setIsAOpenAddModal()
    onCancel()
  }

  return (
    <ModalStyled
      open={isOpen}
      onCancel={onCancel}
      footer={null}
    >
      <div className='PreviewCalendarTaskModal'>
        <TaskModalRow arr={['Название задачи:', event?.name]} />
        <TaskModalRow arr={['Полигон:', event?.polygon.name]} />
        <TaskModalRow arr={['Название техники:', event?.equip.equip_name]} />
        <TaskModalRow arr={['Описание:', event?.description]} />
        <TaskModalRow arr={['Задача:', event?.type_jobs?.name]} />
        <TaskModalRow arr={['Время начала задачи:', event?.start.toLocaleString()]} />
        <TaskModalRow arr={['Время окончания задачи:', event?.end.toLocaleString()]} />
        <div className='PreviewCalendarTaskModal_buttons'>
          <StyledButton onClick={editItem}>
            Редактировать
          </StyledButton>
          <DeleteOption onDelete={deleteItem}>
            <StyledButton>
              Удалить
            </StyledButton>
          </DeleteOption>
        </div>
      </div>
    </ModalStyled>
  )
}

const TaskModalRow = ({ arr }: { arr: [string, (string | undefined)] }) => (
  <>
    {
      arr[1]
        ? <div className='PreviewCalendarTaskModal_item'>
          <span>
            {arr[0]}
          </span>
          {arr[1]}
        </div>
        : null
    }
  </>
)
