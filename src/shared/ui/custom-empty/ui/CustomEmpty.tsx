import './CustomEmpty.scss'

import { Empty } from 'antd'
import classNames from 'classnames'

type EquipsAnalyticEmptyProps = {
  className?: classNames.Value | classNames.ArgumentArray | classNames.Argument,
  description?: string
}

export const CustomEmpty = ({ className }: EquipsAnalyticEmptyProps) => {
  return (
    <Empty
      className={classNames(className, 'EquipsAnalyticEmpty')}
      description={<div className='EquipsAnalyticEmpty_description'>
        Информация не найдена
      </div>}
    />
  )
}
