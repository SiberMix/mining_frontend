import './CropRotationPolygonPreview.scss'
import React, { useState } from 'react'
import PolygonCanvas from '../../../../../Main/modules/polygons/PolygonCanvas/PolygonCanvas'
import { Polygon } from '../../../../../../../types'
import { Button } from 'antd'
import PolygonDrawerPreview from '../../CropRotationList/PolygonDrawerPreview/PolygonDrawerPreview'

type Props = {
  polygon: Polygon
  onClick?: () => void
}

const CropRotationPolygonPreview: React.FC<Props> = ({
  polygon,
  onClick
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const moreInfoClickHandler = (event: any) => {
    event.stopPropagation()
    setIsOpen(true)
  }

  const closeMoreInfoClickHandler = () => {
    setIsOpen(false)
  }

  return (
    <>
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
      <PolygonDrawerPreview
        isOpen={isOpen}
        polygon={polygon}
        onClose={closeMoreInfoClickHandler}
      />
    </>

  )
}

export default CropRotationPolygonPreview
