import './index.scss'

import { message } from 'antd'
import { useFormik } from 'formik'
import React from 'react'
import { GithubPicker } from 'react-color'

import { useRealtyStore } from '~entities/realty'
import { realtySelectTypes } from '~entities/realty/const/select-types'
import { colors } from '~shared/const/colors'
import { getRandomColor } from '~shared/lib/get-random-color'
import { SimpleSelect } from '~shared/ui/simple-select'
import { StyledInput } from '~shared/ui/styled-input'
import { StyledModal } from '~shared/ui/styled-modal'

export const RealtyItemModal = () => {
  const isOpenModal = useRealtyStore(state => state.isOpenModal)
  const setIsOpenModal = useRealtyStore(state => state.setIsOpenModal)
  const addRealty = useRealtyStore(state => state.addRealty)
  const [messageApi, contextHolder] = message.useMessage()

  const { values, resetForm, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      color: getRandomColor(),
      type: realtySelectTypes[0].value
    },
    onSubmit: (submitValues) => {
      if (!submitValues.name || !submitValues.color || !submitValues.type) {
        messageApi.info('Все поля должны быть заполнены!')
        return
      }
      addRealty(submitValues)
      handleCancel()
    }
  })

  const handleCancel = () => {
    resetForm()
    setIsOpenModal(false)
  }

  return (
    <StyledModal
      className='polygonAddModal'
      title='Добавить поле'
      open={isOpenModal}
      onCancel={handleCancel}
      onOk={() => handleSubmit()}
    >
      <form
        className='CalendarTypeJobsForm'
        onSubmit={handleSubmit}
      >
        <StyledInput
          placeholder='Название'
          value={values.name}
          onChange={(e) => setFieldValue('name', e.target.value)}
        />
        <GithubPicker
          width='95%'
          triangle='hide'
          onChange={e => setFieldValue('color', e.hex)}
          colors={colors}
        />
        <SimpleSelect
          options={realtySelectTypes}
          initialValue={realtySelectTypes[0].value}
          handleOnChange={(value) => setFieldValue('type', value)}
        />
      </form>
      {contextHolder}
    </StyledModal>
  )
}
