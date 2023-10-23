import './EquipmentAddModal.scss'
import React, { useEffect, useState } from 'react'
import { Checkbox, Input, message, Modal, Select, Slider, Switch } from 'antd'
import styled from 'styled-components'
import SVG from 'react-inlinesvg'
import { useAppDispatch } from '../../../../../../../redux/store'
import { useSelector } from 'react-redux'
import { getAddModalVisibleSelector, getOptionalEquipmentModelsListSelector, getOptionalEquipmentTypesListSelector } from '../../../../../../../redux/selectors/optionalEquipmentSelectors'
import { getEditeEquipmentSelector } from '../../../../../../../redux/selectors/mapSelectors'
import type { Equip } from '../../../../../../../types/equip'
import { setAddModalVisible } from '../../../../../../../redux/slices/optionalEquipmentSlice'
import { postNewEquipment, putEditEquipment, setEditedEquipment } from '../../../../../../../redux/slices/mapSlice'

type Props = {
  equips: any
}

const AddEquipmentModal: React.FC<Props> = ({ equips }) => {
  const { Option } = Select

  const dispatch = useAppDispatch()
  const addVisibleModal = useSelector(getAddModalVisibleSelector)
  const editedEquipment: Equip | null = useSelector(getEditeEquipmentSelector)
  const equipmentTypes = useSelector(getOptionalEquipmentTypesListSelector)
  const equipmentModels = useSelector(getOptionalEquipmentModelsListSelector)

  const [name, setName] = useState('')
  const [gosnomer, setGosnomer] = useState('')
  const [imei_number, setImei] = useState('')
  const [type, setType] = useState<number | undefined>(undefined)
  const [model, setModel] = useState<number | undefined>(undefined)
  const [radius, setRadius] = useState<number | null>(null)
  const [imageStatus, setImageStatus] = useState(0)
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    if (editedEquipment !== null) {
      setName(editedEquipment.equip_name)
      setGosnomer(editedEquipment.gosnomer)
      setImei(editedEquipment.imei)
      setImageStatus(Number(editedEquipment.image_status))
      setRadius(editedEquipment.radius)

      const type = equipmentTypes.find((t) => t.description === editedEquipment.equip_type)
      setType(type?.id)
      const model = equipmentModels.find((m) => m.description === editedEquipment.equip_model)
      setModel(model?.id)
    } else {
      resetModalData()
    }
  }, [editedEquipment, equipmentTypes, equipmentModels])

  const onCancelHandler = () => {
    dispatch(setAddModalVisible(false))
    resetModalData()
  }

  const handleAdd = async () => {
    const newDataForEquip = {
      equip_name: name,
      gosnomer,
      equip_type: type?.toString(),
      equip_model: model?.toString(),
      image_status: imageStatus.toString(),
      imei: imei_number.toString(),
      radius
    }

    if (!name) {
      messageApi.info('Вы не указали имя')
      return
    }
    if (!gosnomer) {
      messageApi.info('Вы не указали гос. номер')
      return
    }
    if (!editedEquipment && equips.some((equip: any) => equip.imei === imei_number.toString())) {
      messageApi.info('Данный imei уже зарегистрирован в системе')
      return
    }
    if (!type) {
      messageApi.info('Вы не указали тип')
      return
    }
    if (!model) {
      messageApi.info('Вы не указали модель')
      return
    }
    if (!imageStatus.toString()) {
      messageApi.info('Вы не выбрали иконку')
      return
    }

    if (editedEquipment) {
      dispatch(putEditEquipment({ id: editedEquipment.id, ...newDataForEquip }))
      return
    } else {
      dispatch(postNewEquipment(newDataForEquip))
      return
    }
  }

  const resetModalData = () => {
    setName('')
    setGosnomer('')
    setImei('')
    setType(undefined)
    setModel(undefined)
    setImageStatus(0)
    setRadius(null)
    dispatch(setEditedEquipment(null))
  }

  /*
  * тут формируются изображения для селекта
  * */

  const images: string[] = []

  Object.values(import.meta.glob('../../../../../../assets/icons_enum/main_icons/*.svg', { eager: true }))
    .forEach(({ default: path }: any) => {
      const url = new URL(path, import.meta.url)
      images.push(url.pathname)
    })

  return (
    <Modal
      title={!!editedEquipment ? 'Редактировать оборудование' : 'Добавить оборудование'}
      open={addVisibleModal}
      onOk={handleAdd}
      onCancel={onCancelHandler}
      className='equipmentAddModal'
    >
      <Input
        placeholder='Название оборудования'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='modalStyle'
      />
      <Input
        placeholder='Госномер оборудования'
        value={gosnomer}
        onChange={(e) => setGosnomer(e.target.value)}
        className='modalStyle'
      />
      <Input
        placeholder='IMEI (Не обязательно)'
        value={imei_number}
        onChange={(e) => setImei(e.target.value)}
        className='modalStyle'
      />
      <Select
        value={type}
        onChange={setType}
        placeholder='Тип оборудования'
        popupClassName='equipmentAddModalSelect'
      >
        {equipmentTypes
          .filter((item) => item.status)
          .map((item) => (
            <Option
              //antd не дает стилизовать по другому выпадающее меню
              style={{ backgroundColor: '#565656' }}
              key={item.id}
              value={item.id}
            >
              <div className='equipmentAddModalSelect-textDiv'>
                {item.description}
                <div className='mini-line' />
              </div>
            </Option>
          ))}
      </Select>
      <Select
        value={model}
        onChange={setModel}
        placeholder='Модель оборудования'
        popupClassName='equipmentAddModalSelect'
      >
        {equipmentModels.map((item) => (
          <Option
            //antd не дает стилизовать по другому выпадающее меню
            style={{ backgroundColor: '#565656' }}
            key={item.id}
            value={item.id}
          >
            <div className='equipmentAddModalSelect-textDiv'>
              {item.description}
              <div className='mini-line' />
            </div>
          </Option>
        ))}
      </Select>
      <div>
        Радиус
        <Switch
          size='small'
          checked={radius !== null}
          onChange={() => {
            if (radius === null) {
              setRadius(10)
            } else {
              setRadius(null)
            }
          }}
        />
        {radius !== null ? `${radius}м` : 'выкл'}
      </div>
      <CustomSlider
        value={radius ?? 10}
        onChange={setRadius}
        min={1}
        max={30}
        trackStyle={{ backgroundColor: '#565656' }}
        isRadiusDisabled={radius !== null}
        tipFormatter={(num) => `${num}м`}
      />
      <div className='imagesList'>
        {images.map((item, index) => (
          <label
            key={index}
            className='imageField'
          >
            <Checkbox
              onChange={() => setImageStatus(index + 1)}
              checked={imageStatus === index + 1}
              style={{ display: 'none' }}
            />
            <div className={`equipmentImageSVG ${imageStatus === index + 1 ? 'active' : ''}`}>
              <Icon src={item} />
            </div>
          </label>
        ))}
      </div>
      {contextHolder}
    </Modal>
  )
}

export default AddEquipmentModal

const CustomSlider = styled(Slider)<{ isRadiusDisabled: boolean }>`
  width: ${({ isRadiusDisabled }) => isRadiusDisabled ? '80%' : '0'};
  overflow: ${({ isRadiusDisabled }) => isRadiusDisabled ? '' : 'hidden'};
  margin-top: 20px;
  transition: width 1s, overflow .1s 1s;
`

const Icon = styled(SVG)`
  height: 60px;
  width: 60px;

  path {
    fill: #c5ef75;
  }
`
