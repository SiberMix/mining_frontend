import './AddCalendarTaskModal.scss'

import { DatePicker } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { tasksCalendarStore } from '~entities/calendar/model'
import type { CalendarEventItemForPost } from '~entities/calendar/types'
import { StyledButton } from '~shared/ui/button-styled'
import { ModalStyled } from '~shared/ui/modal-styled'
import { SimpleSelect } from '~shared/ui/simple-select'
import { StyledInput } from '~shared/ui/styled-input'

import { getAllEquipmentSelector, getAllPolygonsSelector } from '../../../../../srcOld/redux/selectors/mapSelectors'

type AddCalendarTaskModalProps = {
  isOpen: boolean,
  onCancel: () => void
}

export const AddCalendarTaskModal = ({
  isOpen,
  onCancel
}: AddCalendarTaskModalProps) => {
  const allPolygonsMapped = useSelector(getAllPolygonsSelector)
    ?.map(item => ({ //oh sheet im sorry
      value: item.id,
      label: item.name
    }))
  const allEquipmentsMapped = useSelector(getAllEquipmentSelector)
    ?.map(item => ({ //oh sheet im sorry
      value: item.id,
      label: item.equip_name
    }))
  const typeJobsMapped = tasksCalendarStore(state => state.typeJobs)
    ?.map(item => ({ //oh sheet im sorry
      value: item.id,
      label: item.name
    }))
  const addEvent = tasksCalendarStore(state => state.addEvent)

  const formikInitialValues: CalendarEventItemForPost = {
    name: '',
    equip: +allEquipmentsMapped[0]?.value,
    start: moment()
      .startOf('day')
      .toDate(),
    end: moment()
      .endOf('day')
      .toDate(),
    polygon: +allPolygonsMapped[0]?.value,
    type_jobs: +typeJobsMapped[0]?.value,
    description: ''
  }

  const formik = useFormik({
    initialValues: formikInitialValues,
    onSubmit: (values) => {
      if (values.name.length < 2) {
        toast.error('Название не может быть меньше 2х символов')
        return
      }

      addEvent({
        ...values,
        start: dayjs(values.start)
          .toDate(),
        end: dayjs(values.end)
          .toDate()
      })

      onCancel()
      formik.resetForm()
    }
  })

  const onChange = (rangeValue: null | (dayjs.Dayjs | null)[]) => {
    if (rangeValue && rangeValue[0]) {
      formik.setFieldValue('start', rangeValue[0])
    }
    if (rangeValue && rangeValue[1]) {
      formik.setFieldValue('end', rangeValue[1])
    }
  }

  return (
    <ModalStyled
      open={isOpen}
      onCancel={onCancel}
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
          onChange={onChange}
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
        Создать
      </StyledButton>
    </ModalStyled>
  )
}
