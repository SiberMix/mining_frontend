import './CropRotationPolygonPreview.scss'
import React from 'react'
import PolygonCanvas from '../../../../../Main/modules/polygons/PolygonCanvas/PolygonCanvas'
import { Polygon } from '../../../../../../../types'
import { Button } from 'antd'

type Props = {
  polygon: Polygon
  onClick?: () => void
}

const CropRotationPolygonPreview: React.FC<Props> = ({
  polygon,
  onClick
}) => {
  const moreInfoClickHandler = (event: any) => {
    event.stopPropagation()
  }

  return (
    <div
      className='CropRotationPolygonPreview'
      onClick={onClick}
    >
      <div className='CropRotationPolygonPreview-name'>
        <PolygonCanvas polygon={polygon} />
        {polygon.name}
      </div>
      <Button
        type={'default'}
        className='CropRotationPolygonPreview-btn'
        onClick={moreInfoClickHandler}
      >
        Инфо
      </Button>
    </div>
  )
}

export default CropRotationPolygonPreview
