import s from './PolygonPreview.module.scss'
import * as cn from 'classnames'
import React, { useState } from 'react'
import TrashBox from '/src/assets/icons/delete.svg'
import GeoBox from '/src/assets/icons/GPS-navigate.svg'
import EditBox from '/src/assets/icons/edit.svg'
import { Dropdown } from 'antd'
import { useAtom } from 'jotai'
import type { Polygon } from '../../../../types'
import { polygonsAtom } from '../../../pages/Main/Main'
import PolygonCanvas from '../PolygonCanvas/PolygonCanvas'
import { mapService } from '../../../../api/map'
import {
  EditPolygonNameModal,
  EditPolygonTypeModal
} from './PolygonEditModal'

const PolygonPreview: React.FC<{
  polygon: Polygon,
  onDelete?: () => void,
  onEditPolygon?: () => void,
  polygonHandleItemClick: (index: number) => void
}> = ({ polygon,
  onDelete,
  onEditPolygon,
  polygonHandleItemClick }) => {
  const [polygons, setPolygons] = useAtom(polygonsAtom)
  const [showEditNameModal, setShowEditNameModal] = useState(false)
  const toggleEditNameModal = () => setShowEditNameModal(!showEditNameModal)
  const [showEditTypeModal, setShowEditTypeModal] = useState(false)
  const toggleEditTypeModal = () => setShowEditTypeModal(!showEditTypeModal)

  const handleChangeName = async (name: string) => {
    const params: any = { ...polygon, name }
    const id = polygon.id
    await mapService.editField({ id, params })

    setPolygons(polygons.map((p) => (p.id === id ? { ...p, name } : p)))
    toggleEditNameModal()
  }

  const handleChangeType = async (type: string) => {
    const params = { ...polygon, sequence: type }
    const id = polygon.id

    await mapService.editField({ id, params })
    setPolygons(polygons.map((p) => (p.id === polygon.id ? { ...p, sequence: type } : p)))
    toggleEditTypeModal()
  }

  return (
    <div className={cn(s.root)}>
      <div className={cn(s.content)}>
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
                onClick={() => polygonHandleItemClick(+polygon.id)}
                alt=""
                title="Перейти к полигону на карте"
              />
            </div>
            <p className={cn(s.culture)}>
              {polygon.sequence}
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
                  onClick: onEditPolygon
                },
                {
                  key: '2',
                  label: 'Редактировать название',
                  onClick: toggleEditNameModal
                },
                {
                  key: '3',
                  label: 'Редактировать культуру',
                  onClick: toggleEditTypeModal
                }
              ]
            }}
          >
            <img
              className={cn(s.edit)}
              src={EditBox}
              alt=""
              title="Редактировать полигон"
            />
          </Dropdown>
          <img
            className={cn(s.trash)}
            onClick={onDelete}
            src={TrashBox}
            alt=""
            title="Удалить полигон"
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
        initialValue={polygon.field.name}
        visible={showEditTypeModal}
        onOk={handleChangeType}
        onCancel={toggleEditTypeModal}
      />
    </div>
  )
}

export default PolygonPreview
