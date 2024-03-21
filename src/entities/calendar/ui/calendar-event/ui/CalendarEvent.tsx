import './CalendarEvent.scss'

import { getContrastColor } from '~shared/lib/get-сontrast-сolor'

import type { CalendarEventItem } from '../../../types'

type CalendarEventProps = {
  event: CalendarEventItem
}

export const CalendarEvent = ({ event }: CalendarEventProps) => {
  return (
    <div
      className='CalendarEvent'
      style={{
        backgroundColor: event?.type_jobs?.color,
        color: getContrastColor(event?.type_jobs?.color)
      }}
    >
      <div>
        {event.equip.equip_name.toUpperCase()}
      </div>
    </div>
  )
}
