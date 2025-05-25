import './CalendarTypeJobsForm.scss'

import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { GithubPicker } from 'react-color'

import type { TypeJobType } from '~entities/calendar/types'
import { colors } from '~shared/const/colors'
import { getRandomColor } from '~shared/lib/get-random-color'
import { StyledButton } from '~shared/ui/styled-button'
import { StyledInput } from '~shared/ui/styled-input'

import { tasksCalendarStore } from '../../../../../model'

type tasksCalendarStoreProps = {
  initialValue: TypeJobType | null,
  onSubmit: () => void
};

export const CalendarTypeJobsForm = ({
  initialValue,
  onSubmit
}: tasksCalendarStoreProps) => {
  const addTypeJob = tasksCalendarStore((state) => state.addTypeJob)
  const editTypeJob = tasksCalendarStore((state) => state.editTypeJob)
  const formik = useFormik({
    initialValues: {
      name: '',
      color: getRandomColor()
    },
    onSubmit: (values) => {
      if (initialValue !== null) {
        editTypeJob({
          id: initialValue.id,
          name: values.name,
          color: values.color
        })
      } else {
        addTypeJob(values)
      }
      formik.resetForm()
      onSubmit()
    }
  })

  useEffect(() => {
    if (initialValue !== null) {
      formik.setFieldValue('name', initialValue.name)
      formik.setFieldValue('color', initialValue.color)
    } else {
      formik.resetForm()
    }
  }, [initialValue])

  return (
    <form
      className='CalendarTypeJobsForm'
      onSubmit={formik.handleSubmit}>
      <StyledInput
        placeholder='Название'
        value={formik.values.name}
        onChange={formik.handleChange}
        name='name'
      />
      <GithubPicker
        width='95%'
        triangle='hide'
        onChange={(e) => formik.setFieldValue('color', e.hex)}
        colors={colors}
      />
      <StyledButton onClick={() => formik.handleSubmit()}>
        {initialValue ? 'Изменить' : 'Создать'}
      </StyledButton>
    </form>
  )
}
