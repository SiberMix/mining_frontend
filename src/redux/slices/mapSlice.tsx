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
  editedPolygon: Polygon | undefined,
  selectedPolygonId: number | undefined
}

const mapInitialState: MapInitialState = {
  polygonsList: [],
  equipmentList: [],
  polygonFlyTo: undefined,
  equipmentFlyTo: undefined,
  drawingPolygonMode: false,
  showAddNewPolygonModal: false,
  newPolygonCoords: [],
  editedPolygon: undefined,
  selectedPolygonId: undefined
}

const mapSlice = createSlice({
  name: 'map',
  initialState: mapInitialState,
  reducers: {
    setPolygons: (state: MapInitialState, action) => {
      state.polygonsList = action.payload
    },
    setSelectedPolygon: (state: MapInitialState, action) => {
      state.selectedPolygonId = action.payload
    },
    removeSelectedPolygon: (state) => {
      state.selectedPolygonId = undefined
    },
    setPolygonFlyTo: (state: MapInitialState, action) => {
      state.polygonFlyTo = action.payload
    },
    setEquipmentFlyTo: (state: MapInitialState, action) => {
      state.equipmentFlyTo = action.payload
    },
    setDrawingPolygonMode: (state: MapInitialState, action) => {
      if (action.payload === false && state.editedPolygon) {
        state.polygonsList = state.polygonsList.map(polygon => (polygon.id === state.editedPolygon?.id) ? state.editedPolygon : polygon)
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
          state.polygonsList = state.polygonsList.map(polygon => (polygon.id === state.editedPolygon?.id) ? action.payload.response.data : polygon)
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
  () => {
    return mapService.getPolygons()
  }
)
export const getAllEquipment = createAsyncThunk(
  'map/getAllEquipmentThunk',
  () => {
    return mapService.getEquips()
  }
)
export const postNewPolygon = createAsyncThunk(
  'map/postNewPolygonThunk',
  ({ coords, name, activeStatus = 1, sequence }: PostNewPolygonData, thunkAPI) => {
    return mapService.addNewPolygon({ coords, name, activeStatus, sequence })
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
  setNewPolygonCoords,
  setSelectedPolygon,
  removeSelectedPolygon
} = actions

export default reducer

export type PostNewPolygonData = {
  //todo оберунть в доп массив для
  coords: [number, number][],
  name: string,
  sequence: string,
  activeStatus?: number
}
export type EditPolygonData = {
  polygonId: number,
  newOption: { name: string } | { coords: [number, number][] } | { sequence: string }
}
