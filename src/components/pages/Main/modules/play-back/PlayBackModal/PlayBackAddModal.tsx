import './PlayBackAddModal.scss'
import * as cn from 'classnames'
import React, { useEffect, useState } from 'react'
import { ConfigProvider, DatePicker, Input, message, Modal } from 'antd'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../../../../redux/store'
import { useAppDispatch } from '../../../../../../redux/store'
import { EquipmentData, postNewPlayback, setIsOpenPlayBackAddModal } from '../../../../../../redux/slices/playBackSlice'
import importedColors from './recomended-colors.json'
import PlayBackEquipPicker from './PlayBackEquipPicker/PlayBackEquipPicker'
import { Collapse } from 'antd/lib'
//@ts-ignore
import { GithubPicker } from 'react-color'
import 'dayjs/locale/ru'
import locale from 'antd/locale/ru_RU'

const PlayBackAddModal = () => {
  const dispatch = useAppDispatch()
  const playbacksData = useSelector((state: RootState) => state.playBackReducer.playbacksData)
  const isOpenPlayBackAddModal = useSelector((state: RootState) => state.playBackReducer.isOpenPlayBackAddModal)

  const [name, setName] = useState('')
  const [timeStep, setTimeStep] = useState<{ start: number, end: number } | null>(null)
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentData[]>([])
  const [colorForThisEquip, setColorForThisEquip] = useState<number | null>(null)

  /*
  * костыльная перерисовка датапикера, для сброса значений :D
  * */
  const [keyForReset, setKeyForReset] = useState(1)
  useEffect(() => {
    setKeyForReset(Date.now())
  }, [isOpenPlayBackAddModal])

  const [messageApi, contextHolder] = message.useMessage()

  const handleSubmit = () => {
    if (name && timeStep !== null && selectedEquipment.length > 0) {
      if (playbacksData.some(data => data.name === name)) {
        messageApi.info('Плейбэк с таким названием уже существует')
      } else {
        dispatch(postNewPlayback({
          name,
          time_step: timeStep,
          equipment: selectedEquipment
        }))
        closeHandler()
      }
    } else {
      messageApi.info('Пожалуйста заполните информацию полностью')
    }
  }

  const closeHandler = () => {
    dispatch(setIsOpenPlayBackAddModal(false))
    setName('')
    setTimeStep(null)
    setColorForThisEquip(null)
    setSelectedEquipment([])
    //сброс даты происходит с помощью key, смотри ниже
  }

  const handleColorChange = (newColor: any) => {
    if (colorForThisEquip !== null) {
      const selectedEquipmentWithNewColor = selectedEquipment.map(equip => {
        if (equip.equip_id === colorForThisEquip) {
          return {
            equip_id: equip.equip_id,
            equip_color: newColor.hex
          }
        }
        return equip
      })
      setSelectedEquipment(selectedEquipmentWithNewColor)
    }
  }

  const onOkDate = (value: any) => {
    if (value[0] !== null && value[1] !== null) {
      const startDate = value[0].toDate()
      const endDate = value[1].toDate()

      const startTimestep = Math.floor(startDate.getTime() / 1000)
      const endTimestep = Math.floor(endDate.getTime() / 1000)

      setTimeStep({
        start: startTimestep,
        end: endTimestep
      })
    }
  }

  return (
    <Modal
      className={cn(
        'fieldPreviewModal',
        'PlayBackAddModal'
      )}
      title='Создать воспроизведение'
      open={isOpenPlayBackAddModal}
      onCancel={closeHandler}
      onOk={handleSubmit}
    >
      <Input
        placeholder='Название плэйкбэка'
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <span className='PlayBackAddModal__title PlayBackAddModal__title-date'>
        Выберете временной интервал
      </span>
      <div className='PlayBackAddModal__datepicker'>
        <ConfigProvider locale={locale}>
          <DatePicker.RangePicker
            //костыльно перерисовываем компонент для сброса значений
            key={`${keyForReset}`}
            showTime={{ format: 'HH:mm' }}
            format='YYYY-MM-DD HH:mm'
            onOk={onOkDate}
          />
        </ConfigProvider>
      </div>
      {
        !!colorForThisEquip
          ? (
            <span className='PlayBackAddModal__title'>
              Выберете цвет линий
            </span>
          ) : null
      }
      <Collapse
        size={'small'}
        activeKey={'' + !!colorForThisEquip}
      >
        <Collapse.Panel
          key='true'
          header='open'
        >
          <GithubPicker
            width='95%'
            triangle='hide'
            onChange={handleColorChange}
            colors={importedColors.colors}
          />
        </Collapse.Panel>
      </Collapse>
      <span className='PlayBackAddModal__title'>
        Выберете оорудование
      </span>
      <PlayBackEquipPicker
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
        colorForThisEquip={colorForThisEquip}
        setColorForThisEquip={setColorForThisEquip}
      />
      {contextHolder}
    </Modal>
  )
}

export default PlayBackAddModal
