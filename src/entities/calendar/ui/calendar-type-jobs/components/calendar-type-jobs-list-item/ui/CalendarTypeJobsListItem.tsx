import './CalendarTypeJobsListItem.scss'

import classNames from 'classnames'
import { memo } from 'react'

import type { TypeJobType } from '~entities/calendar/types'
import { getContrastColor } from '~shared/lib/get-сontrast-сolor'

type CalendarTypeJobsListItemProps = {
  typeJob: TypeJobType,
  onSelect: () => void,
  selected: boolean
}

export const CalendarTypeJobsListItem = memo(({
  selected,
  typeJob,
  onSelect
}: CalendarTypeJobsListItemProps) => {
  console.log('typeJob', typeJob)
  return (
    <div
      onClick={onSelect}
      className={classNames(
        'CalendarTypeJobsListItem',
        { 'CalendarTypeJobsListItem_selected': selected }
      )}
      style={{
        border: `1px solid ${getContrastColor(typeJob.color)}`,
        color: getContrastColor(typeJob.color),
        backgroundColor: typeJob.color
      }}
    >
      {typeJob.name}
    </div>
  )
})
