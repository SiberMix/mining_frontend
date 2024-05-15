import './index.scss'

import { DatePicker } from 'antd'
import classNames from 'classnames'
import type dayjs from 'dayjs'
import { memo } from 'react'

import { StyledButton } from '~shared/ui/styled-button'

type WeatherPreviewModalControlsProps = {
  className: string,
  date: dayjs.Dayjs,
  onClick: (date: dayjs.Dayjs) => void,
  disabled: boolean
}

enum ButtonsTypes {
  prev = 'prev',
  next = 'next'
}

export const WeatherPreviewModalControls = memo(({
  date,
  onClick,
  className,
  disabled
}: WeatherPreviewModalControlsProps) => {

  const onClickHandler = (type: ButtonsTypes) => {
    if (type === ButtonsTypes.prev) {
      onClick(date.subtract(1, 'day'))
    } else {
      onClick(date.add(1, 'day'))
    }
  }

  return (
    <div className={classNames(className, 'weather-preview-modal-controls')}>
      <StyledButton
        width='auto'
        onClick={onClickHandler.bind(null, ButtonsTypes.prev)}
        disabled={disabled}
      >
        Предыдущий день
      </StyledButton>
      <DatePicker
        value={date}
        onChange={onClick}
        disabled={disabled}
      />
      <StyledButton
        width='auto'
        onClick={onClickHandler.bind(null, ButtonsTypes.next)}
        disabled={disabled}
      >
        Следующий день
      </StyledButton>
    </div>
  )
})
