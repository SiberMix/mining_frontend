import './index.scss'

import { message } from 'antd'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { GithubPicker } from 'react-color'

import { useRealtyStore } from '~entities/realty'
import { colors } from '~shared/const/colors'
import { getRandomColor } from '~shared/lib/get-random-color'
import { SimpleSelect } from '~shared/ui/simple-select'
import { StyledInput } from '~shared/ui/styled-input'
import { StyledModal } from '~shared/ui/styled-modal'
import { realtyTypeService } from '~entities/realty/api';

export const RealtyItemModal = () => {
  const isOpenModal = useRealtyStore(state => state.isOpenModal)
  const setIsOpenModal = useRealtyStore(state => state.setIsOpenModal)
  const addRealty = useRealtyStore(state => state.addRealty)
  const editRealty = useRealtyStore(state => state.editRealty)
  const realtyForEdit = useRealtyStore(state => state.realtyForEdit)
  const setRealtyForEdit = useRealtyStore(state => state.setRealtyForEdit)
  const [messageApi, contextHolder] = message.useMessage()

  const [realtySelectTypes, setRealtySelectTypes] = useState<{ value: string; label: string }[]>([])

  const { values, resetForm, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      color: getRandomColor(),
      type: ''
    },
    onSubmit: (submitValues) => {
      if (!submitValues.name || !submitValues.color || !submitValues.type) {
        messageApi.info('Все поля должны быть заполнены!')
        return
      }
      if (realtyForEdit !== null) {
        editRealty({ ...realtyForEdit, ...submitValues })
      } else {
        addRealty(submitValues)
      }
      handleCancel()
    }
  })

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await realtyTypeService.getRealtyList()
        const types = response.data.map((item: { name: string }) => ({
          value: item.name,
          label: item.name
        }))
        setRealtySelectTypes(types)
        if (!realtyForEdit) {
          setFieldValue('type', types[0]?.value || '')
        }
      } catch (error) {
        messageApi.error('Не удалось загрузить типы недвижимости')
      }
    }

    fetchTypes()
  }, [realtyForEdit, setFieldValue, messageApi])

  useEffect(() => {
    if (realtyForEdit !== null) {
      setFieldValue('name', realtyForEdit.name)
      setFieldValue('color', realtyForEdit.color)
      setFieldValue('type', realtyForEdit.type)
    }
  }, [realtyForEdit, setFieldValue])

  const handleCancel = () => {
    resetForm()
    setIsOpenModal(false)
    if (realtyForEdit !== null) {
      setRealtyForEdit(null)
    }
  }

  return (
    <StyledModal
      className='polygonAddModal'
      title='Добавить блок'
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
        <div style={{
          width: '100%',
          height: '8px',
          borderRadius: '8px',
          backgroundColor: values.color
        }} />
        <SimpleSelect
          options={realtySelectTypes}
          initialValue={values.type}
          handleOnChange={(value) => setFieldValue('type', value)}
        />
      </form>
      {contextHolder}
    </StyledModal>
  )
}
