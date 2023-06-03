import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'
import { mapService } from '../../api/map'
import type { Polygon } from '../../types'
import type { Equip } from '../../types/equip'
import { sassTrue } from 'sass'

type MapInitialState = {
  polygonsList: Polygon[],
  equipmentList: Equip[],
  polygonFlyTo: number | undefined,
  equipmentFlyTo: number | undefined,
  drawingPolygonMode: boolean,
  showAddNewPolygonModal: boolean
}

const mapInitialState: MapInitialState = {
  polygonsList: [],
  equipmentList: [],
  polygonFlyTo: undefined,
  equipmentFlyTo: undefined,
  drawingPolygonMode: false,
  showAddNewPolygonModal: false
}

const mapSlice = createSlice({
  name: 'map',
  initialState: mapInitialState,
  reducers: {
    setPolygons: (state: MapInitialState, action) => {
      state.polygonsList = action.payload
    },
    setPolygonFlyTo: ((state: MapInitialState, action) => {
      state.polygonFlyTo = action.payload
    }),
    setEquipmentFlyTo: ((state: MapInitialState, action) => {
      state.equipmentFlyTo = action.payload
    }),
    setDrawingPolygonMode: ((state: MapInitialState, action) => {
      state.drawingPolygonMode = action.payload
    }),
    setShowAddNewPolygonModal: ((state: MapInitialState, action) => {
      state.showAddNewPolygonModal = action.payload
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPolygons.fulfilled, (state: MapInitialState, action) => {
        state.polygonsList = action.payload.data
      })
      .addCase(getAllEquipment.fulfilled, (state: MapInitialState, action) => {
        state.equipmentList = action.payload.data
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

const {
  reducer,
  actions
} = mapSlice

export const {
  setPolygons,
  setPolygonFlyTo,
  setEquipmentFlyTo,
  setDrawingPolygonMode,
  setShowAddNewPolygonModal
} = actions

export default reducer
