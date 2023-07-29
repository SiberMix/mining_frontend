import './PolygonDrawerPreview.scss'
import React from 'react'
import { Polygon as PolygonType } from '../../../../../../../types'
import { Drawer } from 'antd'
import MiniMap from '../../../../../../common/MiniMap/MiniMap'
import { useSelector } from 'react-redux'
import { getAllPolygonsSelector } from '../../../../../../../redux/selectors/mapSelectors'

type Props = {
  isOpen: boolean
  polygon: PolygonType,
  onClose: () => void
}

const PolygonDrawerPreview: React.FC<Props> = ({
  polygon,
  onClose,
  isOpen
}) => {
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
      width={'25%'}
    >
      <div className='polygonDrawerPreview-minimap'>
        <MiniMap polygon={polygon} />
      </div>
      <p>
        <span className='polygonDrawerPreview-info_name'>Название: </span>
        <span className='polygonDrawerPreview-info'>{polygon.name}</span>
      </p>
      <p>
        <span className='polygonDrawerPreview-info_name'>Статус активности: </span>
        <span className='polygonDrawerPreview-info'>{polygon.activeStatus ? 'Активно' : 'Не активно'}</span>
      </p>
      <p>
        <span className='polygonDrawerPreview-info_name'>Культура: </span>
        <span className='polygonDrawerPreview-info'>{polygon.sequence.name}</span>
      </p>
      <p>
        <span className='polygonDrawerPreview-info_name'>Общая площадь: </span>
        <span className='polygonDrawerPreview-info'>{polygon.square} га</span>
      </p>
      <p>
        <span className='polygonDrawerPreview-info_name'>Процент от всей культуры: </span>
        <span className='polygonDrawerPreview-info'>{percentOfSequence} %</span>
      </p>
    </Drawer>
  )
}

export default PolygonDrawerPreview
