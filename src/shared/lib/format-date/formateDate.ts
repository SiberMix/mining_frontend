import "moment/locale/ru"

import moment from "moment"

export const formatDate = (timestamp: number) => {
  const date = moment.unix(timestamp)
    .locale("ru")
  const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]
  const month = monthNames[date.month()]
  return date.format(`HH:mm - D ${month} YYYY`)
}
