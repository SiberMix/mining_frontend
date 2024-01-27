import './EquipmentAddModal.scss'

import { Checkbox, Input, message, Select, Slider, Switch } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { ModalStyled } from '~shared/ui/modal-styled'
import { Svg } from '~shared/ui/svg-styled'

import { getEditeEquipmentSelector } from '../../../../../../../../srcOld/redux/selectors/mapSelectors'
import { getAddModalVisibleSelector, getOptionalEquipmentModelsListSelector, getOptionalEquipmentTypesListSelector } from '../../../../../../../../srcOld/redux/selectors/optionalEquipmentSelectors'
import type { Equip } from '../../../../../../../../srcOld/redux/slices/mapSlice'
import { postNewEquipment, putEditEquipment, setEditedEquipment } from '../../../../../../../../srcOld/redux/slices/mapSlice'
import { setAddModalVisible } from '../../../../../../../../srcOld/redux/slices/optionalEquipmentSlice'
import { useAppDispatch } from '../../../../../../../../srcOld/redux/store'

type EquipmentAddModalProps = {
  equips: any
}

export const EquipmentAddModal = memo(({ equips }: EquipmentAddModalProps) => {
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

    } else {
      dispatch(postNewEquipment(newDataForEquip))

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

  Object.values(import.meta.glob('/src/shared/assets/icons_enum/main_icons/*.svg', { eager: true }))
    .forEach(({ default: path }: any) => {
      const url = new URL(path, import.meta.url)
      images.push(url.pathname)
    })

  return (
    <ModalStyled
      className='equipmentAddModal'
      title={editedEquipment ? 'Редактировать оборудование' : 'Добавить оборудование'}
      open={addVisibleModal}
      onOk={handleAdd}
      onCancel={onCancelHandler}
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
      {
        radius
          ? <CustomSlider
            value={radius ?? 10}
            onChange={setRadius}
            min={1}
            max={30}
            trackStyle={{ backgroundColor: '#565656' }}
            isRadiusDisabled={radius !== null}
            tipFormatter={(num) => `${num}м`}
          />
          : null
      }
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
              <Svg
                src={item}
                $height='60px'
                $width='60px'
                $color='var(--green)'
                activeColor='var(--green)'
              />
            </div>
          </label>
        ))}
      </div>
      {contextHolder}
    </ModalStyled>
  )
})

const CustomSlider = styled(Slider)<{ isRadiusDisabled: boolean }>`
    width: ${({ isRadiusDisabled }) => isRadiusDisabled ? '80%' : '0'};
    overflow: ${({ isRadiusDisabled }) => isRadiusDisabled ? '' : 'hidden'};
    margin-top: 20px;
    transition: width 1s, overflow .1s 1s;
`
