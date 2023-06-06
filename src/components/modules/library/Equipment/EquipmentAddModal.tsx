import s from './EquipmentAddModal.module.scss'
import * as cn from 'classnames'
import React, {
  useEffect,
  useState
} from 'react'
import { useAtom } from 'jotai'
import { mapService } from '../../../../api/map'
import {
  Checkbox,
  Input,
  Modal,
  Select
} from 'antd'
import styled from 'styled-components'
import { addModalAtom } from './Equipments'
import SVG from 'react-inlinesvg'

type EquipmentType = {
  description: string,
  id: number,
  status: boolean
};

type EquipmentModel = {
  description: string,
  id: number
};

type Props = {
  fetchList: () => void,
  equips: any
}

const AddEquipmentModal: React.FC<Props> = ({ fetchList, equips }) => {

  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([])
  const [equipmentModels, setEquipmentModels] = useState<EquipmentModel[]>([])
  const [addModal, setAddModal] = useAtom(addModalAtom)

  const [name, setName] = useState('')
  const [gosnomer, setGosnomer] = useState('')
  const [imei_number, setImei] = useState('')
  const [type, setType] = useState<number | undefined>(undefined)
  const [model, setModel] = useState<number | undefined>(undefined)
  const [imageStatus, setImageStatus] = useState(0)

  useEffect(() => {
    if (addModal.equip) {
      setName(addModal.equip.equip_name)
      setGosnomer(addModal.equip.gosnomer)
      setImei(addModal.equip.imei)
      setImageStatus(Number(addModal.equip.image_status))

      const type = equipmentTypes.find((t) => t.description === addModal.equip?.equip_type)
      setType(type?.id)
      const model = equipmentModels.find((m) => m.description === addModal.equip?.equip_model)

      setModel(model?.id)
    }
  }, [addModal, equipmentTypes, equipmentModels])

  useEffect(() => {
    (async () => {
      const types = await mapService.getEquipTypes()
      const models = await mapService.getEquipsModelsList()
      setEquipmentTypes(types.data)
      setEquipmentModels(models.data)
    })()
  }, [])

  const handleAdd = async () => {
    if (name && gosnomer && type && model) {
      if (addModal.editMode && addModal.equip) {
        await mapService.editEquip({
          id: addModal.equip?.id,
          equip_name: name,
          gosnomer,
          equip_type: type.toString(),
          equip_model: model.toString(),
          image_status: imageStatus.toString(),
          imei: imei_number.toString()
        })
      } else {
        // Проверка на совпадения imei
        if (equips.some((equip: any) => equip.imei === imei_number.toString())) {
          alert('Данный номер уже зарезервирован, пожалуйста проверьте введенные данные')
          return
        }
        await mapService.addNewEquip({
          equip_name: name,
          gosnomer,
          equip_type: type.toString(),
          equip_model: model.toString(),
          image_status: imageStatus.toString(),
          imei: imei_number.toString()
        })
      }
      await fetchList()
      setAddModalVisible(false)
      resetForm()
    }
  }

  const setAddModalVisible = (visible: boolean) => {
    setAddModal({ editMode: false, equip: null, visible })
    resetForm()
  }

  const resetForm = () => {
    setName('')
    setGosnomer('')
    setType(undefined)
    setModel(undefined)
  }

  const images: string[] = []

  Object.values(import.meta.glob('../../../../assets/icons_enum/*.svg', { eager: true })).forEach(({ default: path }: any) => {
    const url = new URL(path, import.meta.url)
    images.push(url.pathname)
  })

  return (
    <Modal
      title="Добавить оборудование"
      open={addModal.visible}
      onCancel={() => setAddModalVisible(false)}
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
      {/* для 3 картинок в строке*/}
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
