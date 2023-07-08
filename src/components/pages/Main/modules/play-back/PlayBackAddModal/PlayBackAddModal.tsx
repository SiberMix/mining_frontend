import './PlayBackAddModal.scss'
import * as cn from 'classnames'
import React, {
  useEffect,
  useState
} from 'react'
import {
  DatePicker,
  Input,
  Modal,
  Transfer
} from 'antd'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../../../../redux/store'
import { useAppDispatch } from '../../../../../../redux/store'
import { setIsOpenPlayBackAddModal } from '../../../../../../redux/slices/playBackSlice'
//@ts-ignore
import { GithubPicker } from 'react-color'
import importedColors from './recomended-colors.json'
import { getAllEquipmentSelector } from '../../../../../../redux/selectors/mapSelectors'

const PlayBackAddModal = () => {
  const dispatch = useAppDispatch()
  const isOpenPlayBackAddModal = useSelector((state: RootState) => state.playBackReducer.isOpenPlayBackAddModal)
  const defaultColor = '#52C41A'
  const allEquipment = useSelector(getAllEquipmentSelector)
  const [name, setName] = useState('')
  const [color, setColor] = useState(defaultColor)
  const [timeStep, setTimeStep] = useState<{ start: number, end: number } | null>(null)
  const [targetKeys, setTargetKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  /*
  * костыльная перерисовка датапикера, для сброса значений :D
  * */
  const [keyForReset, setKeyForReset] = useState(1)
  useEffect(() => {
    setKeyForReset(Date.now())
  }, [isOpenPlayBackAddModal])

  const handleSubmit = () => {
    if (name && timeStep !== null && targetKeys.length > 0) {
      console.log({
        name,
        color,
        time_step: timeStep,
        equipment: targetKeys
      })
      closeHandler()
    } else {
      alert('Пожалуйста заполните информацию полностью')
    }
  }

  const closeHandler = () => {
    dispatch(setIsOpenPlayBackAddModal(false))
    setName('')
    setColor(defaultColor)
    setTimeStep(null)
    setTargetKeys([])
    setSelectedKeys([])
    //сброс даты происходит с помощью key, смотри ниже
  }

  const handleColorChange = (newColor: any) => {
    setColor(newColor.hex)
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

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys)
  }

  const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  const mockData = allEquipment.map((equip, i) => ({
    key: equip.imei.toString(),
    title: equip.equip_name
  }))

  return (
    <Modal
      className={cn(
        'fieldPreviewModal',
        'PlayBackAddModal'
      )}
      title="Создать воспроизведение"
      open={isOpenPlayBackAddModal}
      onCancel={closeHandler}
      onOk={handleSubmit}
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
      <div className="PlayBackAddModal__transfer">
        <Transfer
          dataSource={mockData}
          titles={['Все', 'Выбрано']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={onChange}
          onSelectChange={onSelectChange}
          locale={{
            notFoundContent: 'Ничего не выбрано'
          }}
          render={(item) => item.title}
        />
      </div>
    </Modal>
  )
}

export default PlayBackAddModal
