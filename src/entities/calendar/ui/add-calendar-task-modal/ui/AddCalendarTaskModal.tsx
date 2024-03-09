import './AddCalendarTaskModal.scss'

import type { DatePickerProps } from 'antd'
import { DatePicker } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import type { RangePickerProps } from 'antd/lib/date-picker'

import { ModalStyled } from '~shared/ui/modal-styled'
import { SimpleSelect } from '~shared/ui/simple-select'

type AddCalendarTaskModalProps = {
  isOpen: boolean,
  onCancel: () => void
}

export const AddCalendarTaskModal = ({
  isOpen,
  onCancel
}: AddCalendarTaskModalProps) => {

  const onChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string
  ) => {
    console.log('Selected Time: ', value)
    console.log('Formatted Selected Time: ', dateString)
  }

  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value)
  }

  return (
    <ModalStyled
      open={isOpen}
      onCancel={onCancel}
    >
      <div className='AddCalendarTaskModal'>
        <DatePicker.RangePicker
          showTime={{ format: 'HH:mm' }}
          format='YYYY-MM-DD HH:mm'
          onChange={onChange}
          onOk={onOk}
        />
        <div className='AddCalendarTaskModal_selectors'>
          <SimpleSelect
            label='Техника'
            options={[{
              value: 'true',
              label: 'true'
            }, {
              value: 'false',
              label: 'false'
            }]}
            initialValue='true'
            handleOnChange={() => console.log('')}
          />
          <SimpleSelect
            label='Поле'
            options={[{
              value: 'true',
              label: 'true'
            }, {
              value: 'false',
              label: 'false'
            }]}
            initialValue='true'
            handleOnChange={() => console.log('')}
          />
          <SimpleSelect
            label='Вид работ'
            options={[{
              value: 'true',
              label: 'true'
            }, {
              value: 'false',
              label: 'false'
            }]}
            initialValue='true'
            handleOnChange={() => console.log('')}
          />
        </div>
        <TextArea
          placeholder='описание'
          autoSize={{
            minRows: 4,
            maxRows: 6
          }}
        />
      </div>
    </ModalStyled>
  )
}
