import dayjs from 'dayjs'

import type { PeriodType, Timestamp } from '../types'

export const createTimeStamp = (period: PeriodType): Timestamp | undefined => {
  const now = dayjs() // Текущая временная метка

  switch (period) {
    case 'День':
      // Определяем дату, соответствующую "дню назад"
      const dayAgo = now.subtract(1, 'day')
        .valueOf()
      return {
        start: dayAgo,
        end: now.valueOf()
      }
    case 'Неделя':
      // Определяем дату, соответствующую "неделе назад"
      const weekAgo = now.subtract(1, 'week')
        .valueOf()
      return {
        start: weekAgo,
        end: now.valueOf()
      }
    case 'Месяц':
      // Определяем дату, соответствующую "месяцу назад"
      const monthAgo = now.subtract(1, 'month')
        .valueOf()
      return {
        start: monthAgo,
        end: now.valueOf()
      }
    default:
      const dayAgoForDefault = now.subtract(1, 'day')
        .valueOf()
      return {
        start: dayAgoForDefault,
        end: now.valueOf()
      }
  }
}
