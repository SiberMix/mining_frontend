import { useEffect, useState } from 'react'
import moment from 'moment'
import { EquipStatus } from '../../../../../../redux/slices/mapSlice'

type Props = {
  lastUpdDtt: string
  status: EquipStatus
}

export const TimeEquipIsNotActive = ({
  lastUpdDtt,
  status
}: Props) => {
  const initialTimeNotActive = moment()
    .valueOf() / 1000 - +lastUpdDtt
  const initialDuration = moment.duration(initialTimeNotActive, 'seconds')

  const [timeEquipIsNotActive, setTimeEquipIsNotActive] = useState({
    days: Math.floor(initialDuration.asDays()),
    hours: initialDuration.hours(),
    minutes: initialDuration.minutes(),
    seconds: initialDuration.seconds()
  })

  /**
   * таймер простоя техники без дела
   * */
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if ((status === 'Offline' || status === 'Idle')) {
      timeout = setTimeout(() => {
        const timeNotActive = moment()
          .valueOf() / 1000 - +lastUpdDtt

        const duration = moment.duration(timeNotActive, 'seconds')
        setTimeEquipIsNotActive({
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds()
        })
      }, 1000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [timeEquipIsNotActive])

  return (
    <div>
      {
        `Оборудование не активно:
         ${timeEquipIsNotActive.days} дней.
         ${timeEquipIsNotActive.hours}ч.
         ${timeEquipIsNotActive.minutes}м. 
         ${timeEquipIsNotActive.seconds}сек.`
      }
    </div>
  )
}
