import type { RootState } from '../store'

export const getAllPolygonsSelector = (state: RootState) => state.mapReducer.polygonsList
export const getAllEquipmentSelector = (state: RootState) => state.mapReducer.equipmentList
export const getPolygonFlyToSelector = (state: RootState) => state.mapReducer.polygonFlyTo
export const getEquipmentFlyToSelector = (state: RootState) => state.mapReducer.equipmentFlyTo
export const getDrawingPolygonModeSelector = (state: RootState) => state.mapReducer.drawingPolygonMode
export const getShowAddNewPolygonModalSelector = (state: RootState) => state.mapReducer.showAddNewPolygonModal
export const getEditedPolygonSelector = (state: RootState) => state.mapReducer.editedPolygon
export const getNewPolygonCoordsSelector = (state: RootState) => state.mapReducer.newPolygonCoords
export const getSelectedPolygonIdSelector = (state: RootState) => state.mapReducer.selectedPolygonId
export const getEditeEquipmentSelector = (state: RootState) => state.mapReducer.editedEquipment
export const getAddInternalPolygonModeSelector = (state: RootState) => state.mapReducer.addInternalPolygonMode
export const getZoomLevelSelector = (state: RootState) => state.mapReducer.zoomLevel
export const getEquipmentCoordinatesWebSocketSelector = (state: RootState) => state.mapReducer.equipmentCoordinatesWebSocket
export const getEquipStatusArrWebSocketSelector = (state: RootState) => state.mapReducer.equipStatusArrWebSocket
export const getShowRightSideEquipInfoImeiSelector = (state: RootState) => state.mapReducer.showRightSideEquipInfoImei

