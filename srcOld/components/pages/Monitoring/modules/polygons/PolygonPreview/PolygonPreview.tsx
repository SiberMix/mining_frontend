import { Dropdown } from 'antd'
import * as cn from 'classnames'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import EditBox from '~shared/assets/icons/edit.svg'
import GeoBox from '~shared/assets/icons/GPS-navigate.svg'

import { getSelectedPolygonIdSelector } from '../../../../../../redux/selectors/mapSelectors'
import { putEditPolygon, setEditedPolygon, setPolygonFlyTo } from '../../../../../../redux/slices/mapSlice'
import { useAppDispatch } from '../../../../../../redux/store'
import type { PolygonType } from '../../../../../../types'
import DeleteOption from '../../../../../common/DeleteOption/DeleteOption'
import PolygonCanvas from '../PolygonCanvas/PolygonCanvas'
import { EditPolygonNameModal, EditPolygonTypeModal } from './PolygonEditModal'
import s from './PolygonPreview.module.scss'

const PolygonPreview: React.FC<{
  polygon: PolygonType,
  onDelete: () => void
}> = ({
  polygon,
  onDelete
}) => {

  const selectedPolygonId = useSelector(getSelectedPolygonIdSelector)

  const dispatch = useAppDispatch()

  const [showEditNameModal, setShowEditNameModal] = useState(false)
  const toggleEditNameModal = () => setShowEditNameModal(!showEditNameModal)
  const [showEditTypeModal, setShowEditTypeModal] = useState(false)
  const toggleEditTypeModal = () => setShowEditTypeModal(!showEditTypeModal)

  const handleChangeName = async (name: string) => {
    const id = polygon.id
    await dispatch(putEditPolygon({
      polygonId: +id,
      newOption: { name }
    }))
    toggleEditNameModal()
  }

  const handleChangeType = async (type: string) => {
    dispatch(putEditPolygon({
      polygonId: +polygon.id,
      newOption: { sequence: type }
    }))
    toggleEditTypeModal()
  }

  return (
    <div className={cn(s.root)}>
      <div
        className={cn(s.content, { [s.contentActive]: polygon.id === selectedPolygonId })}
      >
        <div className={cn(s.canvasRef)}>
          <PolygonCanvas polygon={polygon} />
          <div className={cn(s.row)}>
            <div className={cn(s.nameDiv)}>
              <p className={cn(s.title)}>
                {polygon.name}
              </p>
              <img
                className={cn(s.geo)}
                src={GeoBox}
                onClick={() => dispatch(setPolygonFlyTo(+polygon.id))}
                alt=''
                title='Перейти к полигону на карте'
              />
            </div>
            <p className={cn(s.culture)}>
              {polygon.sequence === null ? 'культура не выбрана' : polygon.sequence.name}
            </p>
          </div>
        </div>
        <div className={cn(s.geoDiv)}>
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
                  onClick: toggleEditNameModal
                }
                // { todo вернуть редактирование полигона
                //   key: '3',
                //   label: 'Редактировать культуру',
                //   onClick: toggleEditTypeModal
                // }
              ]
            }}
          >
            <img
              className={cn(s.edit)}
              src={EditBox}
              alt=''
              title='Редактировать полигон'
            />
          </Dropdown>
          <DeleteOption
            onDelete={onDelete}
            className={cn(s.trash)}
            title='Удалить полигон'
            popConfirmTitle='Вы хотите удалить полигон?'
            popConfirmDescription='Удалить полигон'
          />
        </div>
      </div>
      <EditPolygonNameModal
        initialValue={polygon.name}
        visible={showEditNameModal}
        onOk={handleChangeName}
        onCancel={toggleEditNameModal}
      />
      <EditPolygonTypeModal
        initialValue={polygon.sequence === null ? '' : polygon.sequence.name}
        visible={showEditTypeModal}
        onOk={handleChangeType}
        onCancel={toggleEditTypeModal}
      />
    </div>
  )
}

export default PolygonPreview
