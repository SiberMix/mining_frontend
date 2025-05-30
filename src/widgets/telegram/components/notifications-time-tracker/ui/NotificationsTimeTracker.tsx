import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect, useReducer, useRef } from 'react'

dayjs.locale('ru')
dayjs.extend(duration)
dayjs.extend(relativeTime)

export const NotificationsTimeTracker = ({ createdAt }: { createdAt: Date }) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  const intervalRef = useRef<number>()

  // refresh value of `createdAt` every ~ 1 minute
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      forceUpdate()
    }, 1000) as any

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <>
      {dayjs(createdAt)
        .fromNow()}
    </>
  )
}
