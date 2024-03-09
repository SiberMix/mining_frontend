import './PreviewCalendarTaskModal.scss'

import { ModalStyled } from '~shared/ui/modal-styled'

import type { CalendarEventItem } from '../../../types'

type PreviewCalendarTaskModalProps = {
  isOpen: boolean,
  onCancel: () => void,
  task: CalendarEventItem | null
}

export const PreviewCalendarTaskModal = ({
  isOpen,
  onCancel,
  task
}: PreviewCalendarTaskModalProps) => {
  return (
    <ModalStyled
      open={isOpen}
      onCancel={onCancel}
    >
      <div className='PreviewCalendarTaskModal'>
        <div style={{
          color: '#FFFFFF',
          textAlign: 'center'
        }}
        >
          <p>
            id:
            {' '}
            {task?.id}
          </p>
          <p>
            Название:
            {' '}
            {task?.title}
          </p>
          <p>
            Описание:
            {' '}
            {task?.data}
          </p>
          <p>
            Время:
            {' '}
            {task?.start.toLocaleString()}
            {' '}
            -
            {' '}
            {task?.end.toLocaleString()}
          </p>
        </div>
      </div>
    </ModalStyled>
  )
}
