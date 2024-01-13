import "./CropRotationPolygonPreview.scss"

import React, { useState } from "react"

import { MoreInfo } from "../../../../../../../style/styled-components/MoreInfo"
import type { PolygonType } from "../../../../../../../types"
import PolygonCanvas from "../../../../../Monitoring/modules/polygons/PolygonCanvas/PolygonCanvas"
import PolygonDrawerPreview from "../../CropRotationList/PolygonDrawerPreview/PolygonDrawerPreview"

type Props = {
  polygon: PolygonType,
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
        className="CropRotationPolygonPreview"
        onClick={onClick}
      >
        <div className="CropRotationPolygonPreview-name">
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

export default CropRotationPolygonPreview
