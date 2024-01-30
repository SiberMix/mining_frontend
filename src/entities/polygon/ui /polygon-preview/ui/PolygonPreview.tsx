import './PolygonPreview.scss'

import { Dropdown } from 'antd'
import * as cn from 'classnames'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { ModalTypeEnum } from '~entities/polygon/ui /polygon-edit-modal/model/modal-type-enum'
import { createEditModalInitialValue } from '~entities/polygon/ui /polygon-preview/helpers/create-edit-modal-initial-value'
import EditBox from '~shared/assets/icons/edit.svg'
import GeoBox from '~shared/assets/icons/GPS-navigate.svg'
import { DeleteOption } from '~shared/ui/delete-option'
import { PolygonCanvas } from '~shared/ui/polygon-canvas'

import { getSelectedPolygonIdSelector } from '../../../../../../srcOld/redux/selectors/mapSelectors'
import type { PolygonType } from '../../../../../../srcOld/redux/slices/mapSlice'
import { putEditPolygon, setEditedPolygon, setPolygonFlyTo } from '../../../../../../srcOld/redux/slices/mapSlice'
import { useAppDispatch } from '../../../../../../srcOld/redux/store'
import { PolygonEditModal } from '../../polygon-edit-modal'

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
                title='Перейти к полигону на карте'
              />
            </div>
            <p className='culture'>
              {polygon.sequence === null ? 'культура не выбрана' : polygon.sequence.name}
            </p>
          </div>
        </div>
        <div className='geoDiv'>
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  label: 'Редактировать полигон',
                  onClick: () => dispatch(setEditedPolygon(+polygon.id))
                },
                {
                  key: '2',
                  label: 'Редактировать название',
                  onClick: () => setShowEditModal(ModalTypeEnum.EDIT_POLYGON_NAME)
                }
                // { todo вернуть редактирование полигона
                //   key: '3',
                //   label: 'Редактировать культуру',
                //   onClick: () => setShowEditModal(ModalTypeEnum.EDIT_POLYGON_TYPE)
                // }
              ]
            }}
          >
            <img
              className='edit'
              src={EditBox}
              alt=''
              title='Редактировать полигон'
            />
          </Dropdown>
          <DeleteOption
            onDelete={onDelete}
            className='trash'
            title='Удалить полигон'
            popConfirmTitle='Вы хотите удалить полигон?'
            popConfirmDescription='Удалить полигон'
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
