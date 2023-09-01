import './EquipmentAddModal.scss'
import React, { useEffect, useState } from 'react'
import { Checkbox, Input, message, Modal, Select, Slider, Switch } from 'antd'
import styled from 'styled-components'
import SVG from 'react-inlinesvg'
import { useAppDispatch } from '../../../../../../redux/store'
import { useSelector } from 'react-redux'
import { getAddModalVisibleSelector, getOptionalEquipmentModelsListSelector, getOptionalEquipmentTypesListSelector } from '../../../../../../redux/selectors/optionalEquipmentSelectors'
import { getEditeEquipmentSelector } from '../../../../../../redux/selectors/mapSelectors'
import type { Equip } from '../../../../../../types/equip'
import { setAddModalVisible } from '../../../../../../redux/slices/optionalEquipmentSlice'
import { getAllEquipment, postNewEquipment, putEditEquipment } from '../../../../../../redux/slices/mapSlice'

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
  const [isRadiusDisabled, setIsRadiusDisabled] = useState(true)
  const [radius, setRadius] = useState<number | null>(null)
  const [imageStatus, setImageStatus] = useState(0)

  useEffect(() => {
    if (editedEquipment) {
      setName(editedEquipment.equip_name)
      setGosnomer(editedEquipment.gosnomer)
      setImei(editedEquipment.imei)
      setImageStatus(Number(editedEquipment.image_status))

      const type = equipmentTypes.find((t) => t.description === editedEquipment.equip_type)
      setType(type?.id)
      const model = equipmentModels.find((m) => m.description === editedEquipment.equip_model)
      setModel(model?.id)
    } else {
      setName('')
      setGosnomer('')
      setImei('')
      setType(undefined)
      setModel(undefined)
      setImageStatus(0)
    }
  }, [editedEquipment, equipmentTypes, equipmentModels])

  const [messageApi, contextHolder] = message.useMessage()
  const handleAdd = async () => {
    if (name && gosnomer && type && model) {
      if (editedEquipment) {
        dispatch(putEditEquipment({
          id: editedEquipment.id,
          equip_name: name,
          gosnomer,
          equip_type: type.toString(),
          equip_model: model.toString(),
          image_status: imageStatus.toString(),
          imei: imei_number.toString()
        }))
      } else {
        // Проверка на совпадения imei
        if (equips.some((equip: any) => equip.imei === imei_number.toString())) {
          messageApi.info('Данный номер уже зарезервирован, пожалуйста проверьте введенные данные')
        } else {
          dispatch(postNewEquipment({
            equip_name: name,
            gosnomer,
            equip_type: type.toString(),
            equip_model: model.toString(),
            image_status: imageStatus.toString(),
            imei: imei_number.toString(),
            radius
          }))
        }
      }
      dispatch(getAllEquipment())
    }
  }

  const images: string[] = []

  Object.values(import.meta.glob('../../../../../../assets/icons_enum/*.svg', { eager: true }))
    .forEach(({ default: path }: any) => {
      const url = new URL(path, import.meta.url)
      images.push(url.pathname)
    })

  return (
    <Modal
      title='Добавить оборудование'
      open={addVisibleModal}
      onOk={handleAdd}
      onCancel={() => dispatch(setAddModalVisible(false))}
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
          checked={isRadiusDisabled}
          onChange={() => setIsRadiusDisabled(d => !d)}
        />
        {isRadiusDisabled && radius !== null ? `${radius}м` : 'выкл'}
      </div>
      <CustomSlider
        value={radius ?? 10}
        onChange={setRadius}
        min={1}
        max={30}
        trackStyle={{ backgroundColor: '#565656' }}
        isRadiusDisabled={isRadiusDisabled}
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
