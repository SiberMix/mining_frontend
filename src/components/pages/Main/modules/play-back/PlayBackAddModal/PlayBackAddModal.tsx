import './PlayBackAddModal.scss'
import * as cn from 'classnames'
import React, {
  useEffect,
  useState
} from 'react'
import {
  DatePicker,
  Input,
  Modal
} from 'antd'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../../../../redux/store'
import { useAppDispatch } from '../../../../../../redux/store'
import { setIsOpenPlayBackAddModal } from '../../../../../../redux/slices/playBackSlice'
//@ts-ignore
import { GithubPicker } from 'react-color'
import importedColors from './recomended-colors.json'

const PlayBackAddModal = () => {
  const dispatch = useAppDispatch()
  const isOpenPlayBackAddModal = useSelector((state: RootState) => state.playBackReducer.isOpenPlayBackAddModal)
  const defaultColor = '#52C41A'

  const [name, setName] = useState('')
  const [color, setColor] = useState(defaultColor)
  const [timeStep, setTimeStep] = useState<{start: number, end: number} | null>(null)
  /*
  * костыльная перерисовка датапикера, для сброса значений :D
  * */
  const [keyForReset, setKeyForReset] = useState(1)
  useEffect(() => {
    setKeyForReset(Date.now())
  }, [isOpenPlayBackAddModal])

  const handleAdd = () => {

  }

  const closeHandler = () => {
    dispatch(setIsOpenPlayBackAddModal(false))
    setName('')
    setColor(defaultColor)
    setTimeStep(null)
    //сброс даты происходит с помощью key, смотри ниже
  }

  const handleColorChange = (newColor: any) => {
    console.log(newColor)
    setColor(newColor.hex)
  }

  const onOkDate = (value: any) => {
    if (value && value.length === 2) {
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
      title="Создать воспроизведение"
      open={isOpenPlayBackAddModal}
      onCancel={closeHandler}
      onOk={handleAdd}
    >
      <Input
        placeholder="Название плэйкбэка"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <span className="PlayBackAddModal__title">
        Выберете цвет линий
      </span>
      <div
        className="PlayBackAddModal__colorpicker-color"
        style={{ backgroundColor: color }}
      />
      <div className="PlayBackAddModal__colorpicker">
        <GithubPicker
          width="95%"
          triangle="hide"
          color={color}
          onChange={handleColorChange}
          colors={importedColors.colors}
        />
      </div>
      <span className="PlayBackAddModal__title PlayBackAddModal__title-date">
        Выберете временной интервал
      </span>
      <div className="PlayBackAddModal__datepicker">
        <DatePicker.RangePicker
          //костыльно перерисовываем компонент для сброса значений
          key={`${keyForReset}`}
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          onOk={onOkDate}
        />
      </div>
      <span className="PlayBackAddModal__title">
        Выберете оорудование
      </span>
      <Transfer
        dataSource={mockData}
        titles={['Source', 'Target']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        onScroll={onScroll}
        render={(item) => item.title}
      />
    </Modal>
  )
}

export default PlayBackAddModal
