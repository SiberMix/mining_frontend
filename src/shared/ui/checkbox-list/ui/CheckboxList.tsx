import './CheckboxList.scss'

import classNames from 'classnames'
import type { ChangeEvent } from 'react'
import React, { memo } from 'react'

type CheckboxListProps = {
  options: Array<{title: string, value: boolean}>,
  onCheckedItemsChange: (items: Array<{id?: string | number, title: string, value: boolean}>) => void,
  className?: string
}

export const CheckboxList = memo(({
  options,
  onCheckedItemsChange,
  className
}: CheckboxListProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newCheckedItems = options.map(item => item.title === event.target.name
      ? { title: event.target.name, value: event.target.checked }
      : item)
    onCheckedItemsChange(newCheckedItems)
  }

  return (
    <div className={classNames('checkbox-list', className)}>
      {options
        .map((option) => (
          <label
            key={option.title}
            className='checkbox-label'
          >
            <input
              type='checkbox'
              name={option.title}
              className='checkbox-input'
              checked={option.value}
              onChange={handleChange}
            />
            <span className='checkbox-custom' />
            {option.title}
          </label>
        ))}
    </div>
  )
})
