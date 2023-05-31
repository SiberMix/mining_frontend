import s from './Equipments.module.scss'
import * as cn from 'classnames'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  atom,
  useAtom,
  useSetAtom
} from 'jotai'
import '/src/style/equipments.css'
import { Equipments as equipmen } from '../../../pages/Main/Main'
import TrashBox from '/src/assets/icons/delete.svg'
import EditBox from '/src/assets/icons/edit.svg'

import type { Equip } from '../../../../types/equip'

import SVG from 'react-inlinesvg'
import GeoBox from '/src/assets/icons/GPS-navigate.svg'
import { mapService } from '../../../../api/map'
import AddEquipmentModal from './EquipmentAddModal'

type Props = {
  equipmentHandleItemClick: (imei: number) => void
}

interface Equipment {
  equip_type: string,
  equip_model: string,
  equip_name: string,
  gosnomer: string,
  id: number,
  image_status: string,
  imei: string
}

export const addModalAtom = atom({
  visible: false,
  editMode: false,
  equip: null as Equip | null
})

const EquipmentsComponent: React.FC<Props> = ({ equipmentHandleItemClick }) => {
  const setAddModal = useSetAtom(addModalAtom)
  const [equips, setEquip] = useAtom(equipmen)

  useEffect(() => {
    fetchListHandler()
  }, [])

  const fetchListHandler = async () => {
    const equips = await mapService.getEquips()
    setEquip(equips.data)
  }

  const editItemHandler = async (equip: Equipment) => {
    setAddModal({ visible: true, editMode: true, equip })
  }

  const deleteEquipmentHandler = async (id: number) => {
    if (confirm('Вы уверены, что хотите удалить оборудование?')) {
      await mapService.deleteEquip(id)
      fetchListHandler()
    }
  }

  const addModalHandler = () => {
    setAddModal({ visible: true, editMode: false, equip: null })
  }

  return (
    <div className={cn(s.root)}>
      <button
        className={cn(s.addButton)}
        onClick={addModalHandler}
      >
+ Добавить оборудование
      </button>
      {equips.map((equip) => (
        <div
          className={cn(s.equipments)}
          key={equip.id}
        >
          <Icon
            src={
              new URL(
                `../../../../assets/icons_enum/${equip.image_status}.svg`,
                import.meta.url
              ).href
            }
          />
          <div className={cn(s.row)}>
            <div className={cn(s.nameDiv)}>
              <p className={cn(s.title)}>
                {equip.equip_name}
              </p>
              <img
                className={cn(s.geo)}
                src={GeoBox}
                onClick={() => equipmentHandleItemClick(+equip.imei)}
                alt=""
                title="Перейти к оборудованию на карте"
              />
            </div>
            <p className={cn(s.culture)}>
              {equip.equip_model}
            </p>
            <p className={cn(s.culture)}>
              {equip.equip_type}
            </p>
          </div>
          <div className={cn(s.geoDiv)}>
            <img
              className={cn(s.edit)}
              onClick={() => editItemHandler(equip)}
              src={EditBox}
              alt=""
              title="Редактировать оборудование"
            />
            <img
              className={cn(s.trash)}
              onClick={() => deleteEquipmentHandler(equip.id)}
              src={TrashBox}
              alt=""
              title="Удалить оборудование"
            />
          </div>
        </div>
      ))}
      <AddEquipmentModal
        equips={equips}
        fetchList={fetchListHandler}
      />
    </div>
  )
}

export default EquipmentsComponent

const Icon = styled(SVG)`
  height: 70px;
  width: 70px;
  margin-right: 20px;
  cursor: pointer;

  path {
    fill: #c5ef75;
  }
`
