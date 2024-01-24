import './PolygonPreviewCropRotation.scss'

import React, { useState } from 'react'

import { MoreInfo } from '~shared/ui/more-info'
import { PolygonCanvas } from '~shared/ui/polygon-canvas'

import PolygonDrawerPreview from '../../../../../../srcOld/components/pages/Analytic/modules/CropRotation/CropRotationList/PolygonDrawerPreview/PolygonDrawerPreview'
import type { PolygonType } from '../../../../../../srcOld/redux/slices/mapSlice'

type Props = {
  polygon: PolygonType,
  onClick?: () => void
}

export const PolygonPreviewCropRotation: React.FC<Props> = ({
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
        <MoreInfo onClick={moreInfoClickHandler} />
      </div>
      <PolygonDrawerPreview
        isOpen={isOpen}
        polygon={polygon}
        onClose={closeMoreInfoClickHandler}
      />
    </>
  )
}
