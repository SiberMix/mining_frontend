import './PolygonPreview.scss'

import { Dropdown } from 'antd'
import cn from 'classnames'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { PolygonCanvas } from '~entities/polygon'
import { getSelectedPolygonIdSelector } from '~processes/redux/selectors/mapSelectors'
import type { PolygonType } from '~processes/redux/slices/mapSlice'
import { putEditPolygon, setEditedPolygon, setPolygonFlyTo } from '~processes/redux/slices/mapSlice'
import { useAppDispatch } from '~processes/redux/store'
import EditBox from '~shared/assets/icons/edit.svg'
import GeoBox from '~shared/assets/icons/GPS-navigate.svg'
import { DeleteOption } from '~shared/ui/delete-option'

import { PolygonEditModal } from '../../polygon-edit-modal'
import { ModalTypeEnum } from '../../polygon-edit-modal/model/modal-type-enum'
import { createEditModalInitialValue } from '../helpers'
import { t } from 'i18next';

export const PolygonPreview: React.FC<{
  polygon: PolygonType,
  onDelete: () => void
}> = ({
  polygon,
  onDelete
}) => {
  const dispatch = useAppDispatch()
  const selectedPolygonId = useSelector(getSelectedPolygonIdSelector)

  const [showEditModal, setShowEditModal] = useState<ModalTypeEnum | null>(null)

  const closeEditModalHandler = () => {
    setShowEditModal(null)
  }

  const handleChangeName = async (name: string) => {
    const id = polygon.id
    await dispatch(putEditPolygon({
      polygonId: +id,
      newOption: { name }
    }))
    closeEditModalHandler()
  }

  const handleChangeType = async (type: string) => {
    dispatch(putEditPolygon({
      polygonId: +polygon.id,
      newOption: { sequence: type }
    }))
    closeEditModalHandler()
  }

  return (
    <div className='PolygonPreview'>
      <div
        className={cn('content', { ['contentActive']: polygon.id === selectedPolygonId })}
      >
        <div className='canvasRef'>
          <PolygonCanvas polygon={polygon} />
          <div className='row'>
            <div className='nameDiv'>
              <p className='title'>
                {polygon.name}
              </p>
              <img
                className='geo'
                src={GeoBox}
                onClick={() => dispatch(setPolygonFlyTo(+polygon.id))}
                alt=''
                title={t('Перейти к полигону на карте')}
              />
            </div>
            <p className='culture'>
              {polygon.sequence === null ? 'Материал не выбрана' : polygon.sequence.name}
            </p>
          </div>
        </div>
        <div className='geoDiv'>
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  label: t("Редактировать полигон"),
                  onClick: () => dispatch(setEditedPolygon(+polygon.id))
                },
                {
                  key: '2',
                  label: t('Редактировать название'),
                  onClick: () => setShowEditModal(ModalTypeEnum.EDIT_POLYGON_NAME)
                }
                // { todo вернуть редактирование блока
                //   key: '3',
                //   label: 'Редактировать материал',
                //   onClick: () => setShowEditModal(ModalTypeEnum.EDIT_POLYGON_TYPE)
                // }
              ]
            }}
          >
            <img
              className='edit'
              src={EditBox}
              alt=''
              title={t('Редактировать полигон')}
            />
          </Dropdown>
          <DeleteOption
            onDelete={onDelete}
            className='trash'
            title={t('Удалить полигон')}
            popConfirmTitle='Вы хотите удалить полигон?'
            popConfirmDescription={t('Удалить полигон')}
          />
        </div>
      </div>
      <PolygonEditModal
        initialValue={createEditModalInitialValue(showEditModal, polygon)}
        visible={showEditModal}
        onOk={showEditModal === ModalTypeEnum.EDIT_POLYGON_NAME ? handleChangeName : handleChangeType}
        onCancel={closeEditModalHandler}
      />
    </div>
  )
}
