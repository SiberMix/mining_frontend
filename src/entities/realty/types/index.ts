import type { LatLngExpression } from 'leaflet'
import type { CSSProperties } from 'react'

export type UseRealtyStore = {
  realtyList: RealtyType[],
  isOpenModal: boolean,
  isPickCenter: boolean,
  setIsOpenModal: (value: boolean) => void,
  setIsPickCenter: (value: boolean) => void,
  realtyFlyTo: number | undefined,
  circleToAdd: {
    lat: number,
    lng: number,
    radius: number
  } | null,
  setCircleToAdd: (circle: UseRealtyStore['circleToAdd']) => void,
  addRealty: (realty: {name: string, color: string, type: string}) => void,
  setRealtyFlyTo: (value: UseRealtyStore['realtyFlyTo']) => void
}

export type RealtyType = {
  id: number,
  name: string,
  type: string,
  radius: number,
  cord: LatLngExpression,
  color: CSSProperties['backgroundColor']
}
