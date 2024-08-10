import { renderToString } from 'react-dom/server'

import type { EquipCustomMarkerStylesType } from '../ui/styled-equip-custom-marker'
import { StyledEquipCustomMarker } from '../ui/styled-equip-custom-marker'

export const createCustomMarkerHtml = ({
  zoomLevel,
  direction,
  src,
  alt,
  equipName
}: EquipCustomMarkerStylesType & { alt: string, src: string, equipName: string }) => {
  return renderToString(<>
    <StyledEquipCustomMarker
      zoomLevel={zoomLevel}
      direction={direction}
      src={src}
      alt={alt}
    />
    <div className='custom-marker-icon__equip-name'>
      {equipName}
    </div>
  </>)
}
