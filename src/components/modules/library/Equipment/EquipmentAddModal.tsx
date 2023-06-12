import s from './EquipmentAddModal.module.scss'
import * as cn from 'classnames'
import React, {
  useEffect,
  useState
} from 'react'
import {
  Checkbox,
  Input,
  Modal,
  Select
} from 'antd'
import styled from 'styled-components'
import SVG from 'react-inlinesvg'
import { useAppDispatch } from '../../../../redux/store'
import { useSelector } from 'react-redux'
import {
  getAddModalVisibleSelector,
  getOptionalEquipmentModelsListSelector,
  getOptionalEquipmentTypesListSelector
} from '../../../../redux/selectors/optionalEquipmentSelectors'
import { getEditeEquipmentSelector } from '../../../../redux/selectors/mapSelectors'
import type { Equip } from '../../../../types/equip'
import { setAddModalVisible } from '../../../../redux/slices/optionalEquipmentSlice'
import {
  getAllEquipment,
  postNewEquipment,
  putEditEquipment
} from '../../../../redux/slices/mapSlice'

type Props = {
  equips: any
}

const AddEquipmentModal: React.FC<Props> = ({ equips }) => {

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
          alert('Данный номер уже зарезервирован, пожалуйста проверьте введенные данные')
        } else {
          dispatch(postNewEquipment({
            equip_name: name,
            gosnomer,
            equip_type: type.toString(),
            equip_model: model.toString(),
            image_status: imageStatus.toString(),
            imei: imei_number.toString()
          }))
        }
      }
      dispatch(getAllEquipment())
    }
  }

  const images: string[] = []

  Object.values(import.meta.glob('../../../../assets/icons_enum/*.svg', { eager: true })).forEach(({ default: path }: any) => {
    const url = new URL(path, import.meta.url)
    images.push(url.pathname)
  })

  return (
    <Modal
      title="Добавить оборудование"
      open={addVisibleModal}
      onCancel={() => dispatch(setAddModalVisible(false))}
      onOk={handleAdd}
      className="modalStyle"
    >
      <Input
        placeholder="Название оборудования"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '16px' }}
        className="modalStyle"
      />
      <Input
        placeholder="Госномер оборудования"
        value={gosnomer}
        onChange={(e) => setGosnomer(e.target.value)}
        style={{ marginBottom: '16px' }}
        className="modalStyle"
      />
      <Input
        placeholder="IMEI (Не обязательно)"
        value={imei_number}
        onChange={(e) => setImei(e.target.value)}
        style={{ marginBottom: '16px' }}
        className="modalStyle"
      />
      <Select
        value={type}
        onChange={setType}
        placeholder="Тип оборудования"
        options={equipmentTypes
          .filter((item) => item.status)
          .map((item) => ({
            label: item.description,
            value: item.id,
            key: item.id
          }))}
        style={{ marginBottom: '16px', width: '100%', backgroundColor: '#232323' }}
        className="modalStyle"

      />
      <Select
        value={model}
        onChange={setModel}
        placeholder="Модель оборудования"
        options={equipmentModels.map((item) => ({
          label: item.description,
          value: item.id,
          key: item.id
        }))}
        style={{ marginBottom: '16px', width: '100%', backgroundColor: '#232323' }}
        className="modalStyle"

      />
      <div className={cn(s.imagesList)}>
        {images.map((item, index) => (
          <div
            key={index}
            className={cn(s.imageField)}
          >
            <Checkbox
              onChange={() => setImageStatus(index + 1)}
              checked={imageStatus === index + 1}
            />
            <Icon src={item} />
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default AddEquipmentModal

const Icon = styled(SVG)`
  height: 70px;
  width: 70px;
  margin-right: 20px;
  cursor: pointer;

  path {
    fill: #c5ef75;
  }
`
