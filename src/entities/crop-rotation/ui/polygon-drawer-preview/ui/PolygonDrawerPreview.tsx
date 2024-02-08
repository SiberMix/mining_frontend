import './PolygonDrawerPreview.scss'

import { Drawer } from 'antd'
import React from 'react'
import Chart from 'react-apexcharts'
import { useSelector } from 'react-redux'

import { createPolygonPreviewOptions } from '~entities/crop-rotation/ui/polygon-drawer-preview/lib/create-polygon-preview-options'
import { MiniMap } from '~entities/mini-map'

import { getAllPolygonsSelector } from '../../../../../srcOld/redux/selectors/mapSelectors'
import type { PolygonType } from '../../../../../srcOld/redux/slices/mapSlice'

type PolygonDrawerPreviewProps = {
  isOpen: boolean,
  polygon: PolygonType,
  onClose: () => void
}

export const PolygonDrawerPreview = ({
  polygon,
  onClose,
  isOpen
}: PolygonDrawerPreviewProps) => {
  const allPolygons = useSelector(getAllPolygonsSelector)

  const polygonsWithSameSequence = allPolygons.filter(p => p.sequence.name === polygon.sequence.name)
  const squareOfAllSamePolygons = polygonsWithSameSequence.reduce((acc: number, cur: PolygonType) => {
    return acc + (+cur.square)
  }, 0)
  const percentOfSequence = (+polygon.square * 100 / squareOfAllSamePolygons).toFixed(2)

  return (
    <Drawer
      className='polygonDrawerPreview'
      title='Статичная информация по полигону'
      placement='right'
      onClose={onClose}
      open={isOpen}
      width='25%'
    >
      <div className='polygonDrawerPreview-minimap'>
        <MiniMap polygon={polygon} />
      </div>
      <p>
        <span className='polygonDrawerPreview-info_name'>
          Название:
          {' '}
        </span>
        <span className='polygonDrawerPreview-info'>
          {polygon.name}
        </span>
      </p>
      <p>
        <span className='polygonDrawerPreview-info_name'>
          Статус активности:
          {' '}
        </span>
        <span className='polygonDrawerPreview-info'>
          {polygon.activeStatus ? 'Активно' : 'Не активно'}
        </span>
      </p>
      <p>
        <span className='polygonDrawerPreview-info_name'>
          Культура:
          {' '}
        </span>
        <span className='polygonDrawerPreview-info'>
          {polygon.sequence.name}
        </span>
      </p>
      <p>
        <span className='polygonDrawerPreview-info_name'>
          Площадь:
          {' '}
        </span>
        <span className='polygonDrawerPreview-info'>
          {polygon.square}
          {' '}
          га
        </span>
      </p>
      <div className='polygonDrawerPreview-info_chart'>
        <span className='polygonDrawerPreview-info_name'>
          Процент от всей культуры:
          {' '}
        </span>
        <Chart
          options={createPolygonPreviewOptions(polygon.sequence.color)}
          type='radialBar'
          series={[+percentOfSequence]}
          width='100%'
          height={315}
        />
      </div>
    </Drawer>
  )
}
