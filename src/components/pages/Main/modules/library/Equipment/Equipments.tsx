import s from './Equipments.module.scss'
import * as cn from 'classnames'
import React from 'react'
import styled from 'styled-components'
import '/src/style/equipments.css'
import EditBox from '/src/assets/icons/edit.svg'

import SVG from 'react-inlinesvg'
import GeoBox from '/src/assets/icons/GPS-navigate.svg'
import AddEquipmentModal from './EquipmentAddModal'
import { deleteEquipment, setEditedEquipment, setEquipmentFlyTo } from '../../../../../../redux/slices/mapSlice'
import { useAppDispatch } from '../../../../../../redux/store'
import { useSelector } from 'react-redux'
import { getAllEquipmentSelector } from '../../../../../../redux/selectors/mapSelectors'
import { setAddModalVisible } from '../../../../../../redux/slices/optionalEquipmentSlice'
import DeleteOption from '../../../../../common/DeleteOption/DeleteOption'

type Props = {}

const EquipmentsComponent: React.FC<Props> = () => {

  const dispatch = useAppDispatch()
  const equips = useSelector(getAllEquipmentSelector)

  const editItemHandler = async (id: number) => {
    dispatch(setEditedEquipment(id))
    dispatch(setAddModalVisible(true))
  }

  const deleteEquipmentHandler = async (id: number) => {
    dispatch(deleteEquipment(id))
  }

  const addModalHandler = () => {
    dispatch(setEditedEquipment(null))
    dispatch(setAddModalVisible(true))
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
          <div className={cn(s.equipmentsContent)}>
            <Icon
              src={
                new URL(
                  `../../../../../../assets/icons_enum/main_icons/${equip.image_status}.svg`,
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
                  onClick={() => dispatch(setEquipmentFlyTo(+equip.imei))}
                  alt=''
                  title='Перейти к оборудованию на карте'
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
                onClick={() => editItemHandler(equip.id)}
                src={EditBox}
                alt=''
                title='Редактировать оборудование'
              />
              <DeleteOption
                onDelete={() => deleteEquipmentHandler(equip.id)}
                className={cn(s.trash)}
                popConfirmDescription={'Удалить оборудование'}
                popConfirmTitle={'Вы хотите удалить оборудование?'}
                title={'Удалить оборудование'}
              />
            </div>
          </div>
        </div>
      ))}
      <AddEquipmentModal
        equips={equips}
      />
    </div>
  )
}

export default React.memo(EquipmentsComponent)

const Icon = styled(SVG)`
  height: 70px;
  width: 70px;
  margin-right: 20px;
  cursor: pointer;

  path {
    fill: #c5ef75;
  }
`
