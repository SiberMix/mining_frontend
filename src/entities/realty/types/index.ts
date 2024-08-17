import type { LatLngExpression } from 'leaflet'
import type { CSSProperties } from 'react'

export type UseRealtyStore = {
  realtyList: RealtyType[],
  isOpenModal: boolean,
  isPickCenter: boolean,
  realtyForEdit: RealtyType | null,
  setIsOpenModal: (value: boolean) => void,
  setIsPickCenter: (value: boolean) => void,
  realtyFlyTo: number | undefined,
  circleToAdd: {
    lat: number,
    lng: number,
    radius: number
  } | null,
  setCircleToAdd: (circle: UseRealtyStore['circleToAdd']) => void,
  setRealtyFlyTo: (value: UseRealtyStore['realtyFlyTo']) => void,
  setRealtyForEdit: (value: RealtyType | null) => void,
  getRealtyList: () => void,
  addRealty: (realty: {name: string, color: string, type: string}) => void,
  editRealty: (realty: RealtyType) => void,
  deleteRealty: (id: RealtyType['id']) => void
}

export type RealtyType = {
  id: number,
  name: string,
  type: string,
  radius: number,
  cord: LatLngExpression,
  color: CSSProperties['backgroundColor']
}
