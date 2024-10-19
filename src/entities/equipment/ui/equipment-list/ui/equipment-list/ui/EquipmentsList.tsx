import './EquipmentsList.scss'
import '~entities/equipment/equipments.css'

import React, { memo } from 'react'
import SVG from 'react-inlinesvg'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { getAllEquipmentSelector } from '~processes/redux/selectors/mapSelectors'
import {
  deleteEquipment,
  setEditedEquipment,
  setEquipmentFlyTo,
  setShowRightSideEquipInfo
} from '~processes/redux/slices/mapSlice'
import { setAddModalVisible } from '~processes/redux/slices/optionalEquipmentSlice'
import { useAppDispatch } from '~processes/redux/store'
import EditBox from '~shared/assets/icons/edit.svg'
import GeoBox from '~shared/assets/icons/GPS-navigate.svg'
import { DeleteOption } from '~shared/ui/delete-option'
import { MoreInfo } from '~shared/ui/more-info'

import { EquipmentAddModal } from '../../equipment-add-modal'
import { t } from 'i18next';

export const EquipmentList = memo(() => {
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

  const showRightSideEquipInfo = (imei: string | number) => {
    dispatch(setShowRightSideEquipInfo(imei))
  }

  return (
    <div className='EquipmentList'>
      <button
        className='addButton'
        onClick={addModalHandler}
      >
        + {t("Добавить оборудование")}
      </button>
      {equips.map((equip) => (
        <div
          className='equipments'
          key={equip.id}
        >
          <div className='equipmentsContent'>
            <Icon
              src={
                new URL(
                  `/src/shared/assets/icons_enum/main_icons/${equip.image_status}.svg`,
                  import.meta.url
                ).href
              }
            />
            <div className='row'>
              <div className='nameDiv'>
                <p className='title'>
                  {equip.equip_name}
                </p>
                <img
                  className='geo'
                  src={GeoBox}
                  onClick={() => dispatch(setEquipmentFlyTo(+equip.imei))}
                  alt=''
                  title={t('Перейти к оборудованию на карте')}
                />
              </div>
              <p className='culture'>
                {equip.equip_model}
              </p>
              <p className='culture'>
                {equip.equip_type}
              </p>
            </div>
            <div className='geoDiv'>
              <MoreInfo
                color='#6C6C6C'
                styledmargin='0 3px 0 0'
                onClick={() => showRightSideEquipInfo(+equip.imei)}
              />
              <img
                className='edit'
                onClick={() => editItemHandler(equip.id)}
                src={EditBox}
                alt=''
                title={t('Редактировать оборудование')}
              />
              <DeleteOption
                onDelete={() => deleteEquipmentHandler(equip.id)}
                className='trash'
                popConfirmDescription={t('Удалить оборудование')}
                popConfirmTitle={t('Вы хотите удалить оборудование?')}
                title={t('Удалить оборудование')}
              />
            </div>
          </div>
        </div>
      ))}
      <EquipmentAddModal equips={equips} />
    </div>
  )
})

const Icon = styled(SVG)`
    height: 70px;
    width: 70px;
    margin-right: 20px;
    cursor: pointer;

    path {
        fill: #c5ef75;
    }
`
