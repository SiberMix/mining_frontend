import styled from 'styled-components'

export type EquipCustomMarkerStylesType = {
  zoomLevel: number,
  direction: number
}

export const StyledEquipCustomMarker = styled('img')<EquipCustomMarkerStylesType>`
    transform: rotate(${({
    zoomLevel,
    direction
  }) => zoomLevel > 17 ? direction : 0}deg);
    width: 50px;
    height: 50px;
    position: relative;
`
