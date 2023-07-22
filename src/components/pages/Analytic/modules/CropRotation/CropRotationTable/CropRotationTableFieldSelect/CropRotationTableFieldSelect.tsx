import './CropRotationTableFieldSelect.scss'
import * as cn from 'classnames'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  options: Array<{ value: string, label: string }>,
  initialValue: string,
  handleOnChange: (value: string) => void
  color: string
}
const CropRotationTableFieldSelect: React.FC<Props> = ({
  options,
  initialValue,
  handleOnChange,
  color
}) => {

  const [selectedOption, setSelectedOption] = useState(initialValue)
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  /*
  * Функия для выбора нужного элемента
  * */
  const selectOption = (option: { value: string, label: string }, event: React.MouseEvent) => {
    event.stopPropagation()
    setSelectedOption(option.label)
    handleOnChange(option.value)
    setIsOpen(false)
  }

  /*
  * Функия для клика вне меню
  * */
  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'CropRotationTableFieldSelect',
        { open: isOpen }
      )}
      onClick={() => setIsOpen(!isOpen)}
      style={{ backgroundColor: color }}
    >
      <div className='simple-select-selected-option'>
        {selectedOption}
      </div>
      {isOpen
        ? <div className='simple-options'>
          {options.map((option, index) => (
            <div
              key={index}
              className='simple-option'
              onClick={(event) => selectOption(option, event)}
            >
              {option.label}
            </div>
          ))}
        </div>
        : null}
    </div>
  )
}
export default CropRotationTableFieldSelect
