import './CheckboxList.scss'

import type { ChangeEvent } from 'react'
import React, { memo, useEffect, useState } from 'react'

type CheckboxListProps = {
  options: Record<string, boolean>,
  onCheckedItemsChange: (items: Record<string, boolean>) => void
}

export const CheckboxList = memo(({
  options,
  onCheckedItemsChange
}: CheckboxListProps) => {
  const [checkedItems, setCheckedItems] = useState(options)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    })
  }

  useEffect(() => {
    onCheckedItemsChange(checkedItems)
  }, [checkedItems, onCheckedItemsChange])

  return (
    <div className='checkbox-list'>
      {Object.keys(options)
        .map((option) => (
          <label
            key={option}
            className='checkbox-label'
          >
            <input
              type='checkbox'
              name={option}
              className='checkbox-input'
              checked={checkedItems[option] || false}
              onChange={handleChange}
            />
            <span className='checkbox-custom' />
            {option}
          </label>
        ))}
    </div>
  )
})
