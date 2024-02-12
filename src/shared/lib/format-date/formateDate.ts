import 'moment/locale/ru'

import moment from 'moment'

export const formatDate = (timestamp: number, daysOnly?: boolean) => {
  const date = moment.unix(timestamp)
    .locale('ru')
  const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
  const month = monthNames[date.month()]
  return daysOnly
    ? date.format(`D ${month} YYYY`)
    : date.format(`HH:mm - D ${month} YYYY`)

}
