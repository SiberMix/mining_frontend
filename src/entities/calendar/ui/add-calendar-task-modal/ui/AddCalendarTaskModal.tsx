import './AddCalendarTaskModal.scss'

import { DatePicker } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import moment from 'moment'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { tasksCalendarStore } from '~entities/calendar/model'
import type { CalendarEventItemForPost, TypeJobType } from '~entities/calendar/types'
import { getAllEquipmentSelector, getAllPolygonsSelector } from '~processes/redux/selectors/mapSelectors'
import { SimpleSelect } from '~shared/ui/simple-select'
import { StyledButton } from '~shared/ui/styled-button'
import { StyledInput } from '~shared/ui/styled-input'
import { StyledModal } from '~shared/ui/styled-modal'

type AddCalendarTaskModalProps = {
  isOpen: boolean,
  onCancel: () => void,
  typeJobs: TypeJobType[]
}

export const AddCalendarTaskModal = ({
  isOpen,
  onCancel,
  typeJobs
}: AddCalendarTaskModalProps) => {
  // zustand
  const addEvent = tasksCalendarStore(state => state.addEvent)
  const editEvent = tasksCalendarStore(state => state.editEvent)
  const eventForEdit = tasksCalendarStore(state => state.eventForEdit)
  const setEventForEdit = tasksCalendarStore(state => state.setEventForEdit)
  // redux
  const allPolygonsMapped = useSelector(getAllPolygonsSelector) //todo при смене с redux на zustand, вынести выше по аналогии с typeJobs
    ?.map(item => ({ //ou sheet im sorry
      value: item.id,
      label: item.name
    }))
  const allEquipmentsMapped = useSelector(getAllEquipmentSelector) //todo при смене с redux на zustand, вынести выше по аналогии с typeJobs
    ?.map(item => ({ //ou sheet im sorry
      value: item.id,
      label: item.equip_name
    }))

  // const
  const typeJobsMapped = typeJobs?.map(item => ({
    value: item.id,
    label: item.name
  }))

  const formik = useFormik({
    initialValues: {
      name: '',
      start: moment()
        .startOf('day')
        .toDate(),
      end: moment()
        .endOf('day')
        .toDate(),
      equip: Number(allEquipmentsMapped?.at(0)?.value),
      polygon: Number(allPolygonsMapped?.at(0)?.value),
      type_jobs: Number(typeJobsMapped?.at(0)?.value),
      description: ''
    } as CalendarEventItemForPost,
    onSubmit: (values) => {
      if (values.name.length < 2) {
        toast.error('Название не может быть меньше 2х символов')
        return
      }

      if (eventForEdit !== null) {
        editEvent({
          ...values,
          id: eventForEdit.id,
          polygon: { id: values.polygon },
          equip: { id: values.equip },
          type_jobs: { id: values.type_jobs },
          start: dayjs(values.start)
            .toDate(),
          end: dayjs(values.end)
            .toDate()
        })
      } else {
        addEvent({
          ...values,
          start: dayjs(values.start)
            .toDate(),
          end: dayjs(values.end)
            .toDate()
        })
      }

      closeHandler()
    }
  })

  //todo редактирование событий после исправлений бека

  useEffect(() => {
    if (eventForEdit) {
      formik.setFieldValue('name', eventForEdit.name)
      formik.setFieldValue('start', eventForEdit.start)
      formik.setFieldValue('end', eventForEdit.end)
      formik.setFieldValue('equip', eventForEdit.equip.id)
      formik.setFieldValue('polygon', eventForEdit.polygon.id)
      formik.setFieldValue('type_jobs', eventForEdit.type_jobs?.id)
      formik.setFieldValue('description', eventForEdit.description)
    }
  }, [eventForEdit])

  const onChangeRangePicker = (rangeValue: null | (dayjs.Dayjs | null)[]) => {
    if (rangeValue && rangeValue[0]) {
      formik.setFieldValue('start', rangeValue[0])
    }
    if (rangeValue && rangeValue[1]) {
      formik.setFieldValue('end', rangeValue[1])
    }
  }

  const closeHandler = () => {
    setEventForEdit(null)
    formik.resetForm()
    onCancel()
  }

  return (
    <StyledModal
      open={isOpen}
      onCancel={closeHandler}
      title={eventForEdit ? 'Редактировать событие' : 'Добавить событие'}
      footer={null}
    >
      <form className='AddCalendarTaskModal'>
        <StyledInput
          placeholder='Название'
          value={formik.values.name}
          onChange={(value) => formik.setFieldValue('name', value.target.value)}
        />
        <DatePicker.RangePicker
          showTime={{ format: 'HH:mm' }}
          format='YYYY-MM-DD HH:mm'
          value={[dayjs(formik.values.start), dayjs(formik.values.end)]}
          onChange={onChangeRangePicker}
        />
        <div className='AddCalendarTaskModal_selectors'>
          <SimpleSelect
            label='Техника'
            options={allEquipmentsMapped}
            initialValue={allEquipmentsMapped[0].label}
            handleOnChange={(value) => formik.setFieldValue('equip', Number(value))}
          />
          <SimpleSelect
            label='Поле'
            options={allPolygonsMapped}
            initialValue={allPolygonsMapped[0]?.label}
            handleOnChange={(value) => formik.setFieldValue('polygon', Number(value))}
          />
          <SimpleSelect
            label='Вид работ'
            options={typeJobsMapped}
            initialValue={typeJobsMapped[0]?.label}
            handleOnChange={(value) => formik.setFieldValue('type_jobs', Number(value))}
          />
        </div>
        <TextArea
          placeholder='описание'
          autoSize={{
            minRows: 4,
            maxRows: 6
          }}
          value={formik.values.description}
          onChange={(value) => formik.setFieldValue('description', value.target.value)}
        />
      </form>
      <StyledButton onClick={() => formik.handleSubmit()}>
        {eventForEdit ? 'Сохранить' : 'Создать'}
      </StyledButton>
    </StyledModal>
  )
}
