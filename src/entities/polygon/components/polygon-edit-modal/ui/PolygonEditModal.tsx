import './PolygonEditModal.scss'

import { Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getAllFieldsSelector } from '~processes/redux/selectors/fieldsSelectors'
import type { FieldType } from '~processes/redux/slices/fieldSlice'
import { StyledModal } from '~shared/ui/styled-modal'

import { ModalTypeEnum } from '../model/modal-type-enum'

export const PolygonEditModal: React.FC<{
  visible: ModalTypeEnum | null,
  onOk: (value: string) => void,
  onCancel: () => void,
  initialValue: string
}> = ({
  visible,
  onOk,
  onCancel,
  initialValue
}) => {
  const [value, setValue] = useState('')
  const fieldTypes = useSelector(getAllFieldsSelector)
  const { Option } = Select

  useEffect(() => { //не передается в стейт, тк тут подвязаны сразу два инпута
    setValue(initialValue)
  }, [initialValue])

  return (
    <StyledModal
      className='PolygonEditModal'
      title='Редактировать материал'
      open={!!visible}
      onOk={() => onOk(value)}
      onCancel={onCancel}
    >
      {
        visible === ModalTypeEnum.EDIT_POLYGON_TYPE
          ? (
            <Select
              defaultValue={value}
              onChange={setValue}
              placeholder='Модель оборудования'
              popupClassName='PolygonEditModal-select'
            >
              {fieldTypes.map((field: FieldType) => (
                <Option
                  //antd не дает стилизовать по другому выпадающее меню
                  style={{ backgroundColor: '#565656' }}
                  key={field.id}
                  value={field.name}
                >
                  <div className='PolygonEditModal-textDiv'>
                    {field.name}
                    <div className='mini-line' />
                  </div>
                </Option>
              ))}
            </Select>
          )
          : (
            <Input
              placeholder='Редактировать название'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ marginBottom: '16px' }}
            />
          )
      }
    </StyledModal>
  )
}
