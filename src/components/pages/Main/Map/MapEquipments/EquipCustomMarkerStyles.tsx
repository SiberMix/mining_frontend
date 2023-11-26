import styled from 'styled-components'
import { renderToString } from 'react-dom/server'

type EquipCustomMarkerStylesType = {
  zoomLevel: number
  direction: number
}

const EquipCustomMarkerStyles = styled('img')<EquipCustomMarkerStylesType>`
  transform: rotate(${({
    zoomLevel,
    direction
  }) => zoomLevel > 17 ? direction : 0}deg);
  width: 50px;
  height: 50px;
  position: relative;
`

export const createCustomMarkerHtml = ({
  zoomLevel,
  direction,
  src,
  alt,
  equipName
}: EquipCustomMarkerStylesType & { alt: string, src: string, equipName: string }) => {
  return renderToString(
    <>
      <EquipCustomMarkerStyles zoomLevel={zoomLevel} direction={direction} src={src} alt={alt} />
      <div className='custom-marker-icon__equip-name'>
        {equipName}
      </div>
    </>
  )
}
