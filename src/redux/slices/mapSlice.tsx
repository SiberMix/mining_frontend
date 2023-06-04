import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'
import { mapService } from '../../api/map'
import type { Polygon } from '../../types'
import type { Equip } from '../../types/equip'

type MapInitialState = {
  polygonsList: Polygon[],
  equipmentList: Equip[],
  polygonFlyTo: number | undefined,
  equipmentFlyTo: number | undefined,
  drawingPolygonMode: boolean,
  showAddNewPolygonModal: boolean,
  newPolygonCoords: [number, number][],
  editedPolygon: Polygon | undefined
}

const mapInitialState: MapInitialState = {
  polygonsList: [],
  equipmentList: [],
  polygonFlyTo: undefined,
  equipmentFlyTo: undefined,
  drawingPolygonMode: false,
  showAddNewPolygonModal: false,
  newPolygonCoords: [],
  editedPolygon: undefined
}

const mapSlice = createSlice({
  name: 'map',
  initialState: mapInitialState,
  reducers: {
    setPolygons: (state: MapInitialState, action) => {
      state.polygonsList = action.payload
    },
    setPolygonFlyTo: (state: MapInitialState, action) => {
      state.polygonFlyTo = action.payload
    },
    setEquipmentFlyTo: (state: MapInitialState, action) => {
      state.equipmentFlyTo = action.payload
    },
    setDrawingPolygonMode: (state: MapInitialState, action) => {
      if (action.payload === false && state.editedPolygon) {
        state.polygonsList = [...state.polygonsList, state.editedPolygon]
        state.editedPolygon = undefined
      }
      state.drawingPolygonMode = action.payload
    },
    setShowAddNewPolygonModal: (state: MapInitialState, action) => {
      state.showAddNewPolygonModal = action.payload
    },
    setEditedPolygon: (state: MapInitialState, action) => {
      if (state.editedPolygon) {
        state.polygonsList = [...state.polygonsList, state.editedPolygon]
      }
      state.drawingPolygonMode = true
      state.editedPolygon = state.polygonsList.find(polygon => polygon.id === action.payload)
      state.polygonsList = state.polygonsList.filter(polygon => polygon.id !== action.payload)
    },
    setNewPolygonCoords: (state: MapInitialState, action) => {
      state.newPolygonCoords = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPolygons.fulfilled, (state: MapInitialState, action) => {
        state.polygonsList = action.payload.data
      })
      .addCase(getAllEquipment.fulfilled, (state: MapInitialState, action) => {
        state.equipmentList = action.payload.data
      })
      .addCase(postNewPolygon.fulfilled, (state: MapInitialState, action) => {
        state.polygonsList = [...state.polygonsList, action.payload.data]
        state.showAddNewPolygonModal = false
        state.drawingPolygonMode = false
      })
      .addCase(putEditPolygon.fulfilled, (state: MapInitialState, action) => {
        if (state.drawingPolygonMode) {
          state.polygonsList = [...state.polygonsList, action.payload.response.data]
        } else {
          state.polygonsList = state.polygonsList.map(polygon => {
            if (polygon.id === action.payload.polygonId) {
              return action.payload.response.data
            }
            return polygon
          })
        }
        state.drawingPolygonMode = false
        state.editedPolygon = undefined
      })
      .addCase(deletePolygon.fulfilled, (state: MapInitialState, action) => {
        state.polygonsList = state.polygonsList.filter((p) => p.id !== action.payload.id)
      })
      .addDefaultCase(() => {
      })
  }
})

export const getAllPolygons = createAsyncThunk(
  'map/getAllPolygonsThunk',
  async () => {
    return await mapService.getPolygons()
  }
)
export const getAllEquipment = createAsyncThunk(
  'map/getAllEquipmentThunk',
  async () => {
    return await mapService.getEquips()
  }
)
export const postNewPolygon = createAsyncThunk(
  'map/postNewPolygonThunk',
  async ({ coords, name, activeStatus = 1, sequence }: PostNewPolygonData, thunkAPI) => {
    return await mapService.addNewPolygon({ coords, name, activeStatus, sequence })
  }
)
export const putEditPolygon = createAsyncThunk(
  'map/editPolygonThunk',
  async ({ polygonId, newOption }: EditPolygonData) => {
    const response = await mapService.updatePolygonById({ polygonId, newOption })
    return { polygonId, response }
  }
)
export const deletePolygon = createAsyncThunk(
  'map/deletePolygonThunk',
  async (id: number) => {
    const response = await mapService.removePolygonById(id)
    return { id, response }
  }
)

const {
  reducer,
  actions
} = mapSlice

export const {
  setPolygons,
  setPolygonFlyTo,
  setEquipmentFlyTo,
  setDrawingPolygonMode,
  setShowAddNewPolygonModal,
  setEditedPolygon,
  setNewPolygonCoords
} = actions

export default reducer

export type PostNewPolygonData = {
  coords: [number, number][],
  name: string,
  sequence: string,
  activeStatus?: number
}
export type EditPolygonData = {
  polygonId: number,
  newOption: { name: string } | { coords: [number, number][] } | { sequence: string }
}
