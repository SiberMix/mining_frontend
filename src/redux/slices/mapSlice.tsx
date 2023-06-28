import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'
import { mapService } from '../../api/map'
import type { Polygon } from '../../types'
import type { Equip } from '../../types/equip'
import { setAddModalVisible } from './optionalEquipmentSlice'

type MapInitialState = {
  polygonsList: Polygon[],
  equipmentList: Equip[],
  editedEquipment: Equip | null,
  polygonFlyTo: number | undefined,
  equipmentFlyTo: number | undefined,
  drawingPolygonMode: boolean,
  showAddNewPolygonModal: boolean,
  newPolygonCoords: [number, number][][],
  editedPolygon: Polygon | undefined,
  selectedPolygonId: number | undefined,
  addInternalPolygonMode: boolean
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
  editedEquipment: null,
  selectedPolygonId: undefined,
  addInternalPolygonMode: false
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
        state.addInternalPolygonMode = false
      }
      state.drawingPolygonMode = action.payload
    },
    setShowAddNewPolygonModal: (state: MapInitialState, action) => {
      state.showAddNewPolygonModal = action.payload
    },
    setEditedPolygon: (state: MapInitialState, action) => {
      if (state.editedPolygon) {
        // state.polygonsList = [...state.polygonsList, state.editedPolygon]
        state.polygonsList = state.polygonsList.map(polygon => (polygon.id === state.editedPolygon?.id) ? state.editedPolygon : polygon)
      }
      state.drawingPolygonMode = true
      state.editedPolygon = state.polygonsList.find(polygon => polygon.id === action.payload)
    },
    setNewPolygonCoords: (state: MapInitialState, action) => {
      state.newPolygonCoords = action.payload
    },
    setEditedEquipment: (state, action) => {
      state.editedEquipment = state.equipmentList.find(type => type.id === action.payload) || null
    },
    setAddInternalPolygonMode: (state: MapInitialState, action) => {
      state.addInternalPolygonMode = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPolygons.fulfilled, (state: MapInitialState, action) => {
        console.log(action.payload.data)
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
        state.polygonsList = state.polygonsList.filter(polygon => polygon.id !== action.payload.id)
      })
      .addCase(postNewEquipment.fulfilled, (state: MapInitialState, action) => {
        //todo мне нужно чтоб сервер возвращал equipment с id
        // state.equipmentList = [...state.equipmentList, action.payload.data]
      })
      .addCase(putEditEquipment.fulfilled, (state: MapInitialState, action) => {
        const { id, gosnomer, image_status, equip_type, imei, equip_name, equip_model } = action.payload
        state.equipmentList.map(equip => equip.id === action.payload.id
          ? {
            id,
            gosnomer,
            image_status,
            equip_type,
            imei,
            equip_name,
            equip_model
          }
          : equip)
      })
      .addCase(deleteEquipment.fulfilled, (state: MapInitialState, action) => {
        state.equipmentList = state.equipmentList.filter(equip => equip.id !== action.payload.id)
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
export const postNewEquipment = createAsyncThunk(
  'map/postNewEquipmentThunk',
  async (data: Omit<Equip, 'id'>, thunkAPI) => {
    const response = await mapService.addNewEquip(data)
    thunkAPI.dispatch(setAddModalVisible(false))
    return response
  }
)
export const putEditEquipment = createAsyncThunk(
  'map/editEquipmentThunk',
  async ({ id, ...data }: Equip, thunkAPI) => {
    const response = await mapService.editEquip({ id, ...data })
    thunkAPI.dispatch(setAddModalVisible(false))
    return { id, ...data, response }
  }
)
export const deleteEquipment = createAsyncThunk(
  'map/deleteEquipmentThunk',
  async (id: number, thunkAPI) => {
    const response = await mapService.deleteEquip(id)
    thunkAPI.dispatch(setAddModalVisible(false))
    return { id, response }
  }
)
export const postNewPolygon = createAsyncThunk(
  'map/postNewPolygonThunk',
  ({ coords, name, activeStatus = 1, sequence }: PostNewPolygonData) => {
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
  removeSelectedPolygon,
  setEditedEquipment,
  setAddInternalPolygonMode
} = actions

export default reducer

export type PostNewPolygonData = {
  coords: [number, number][][],
  name: string,
  sequence: string,
  activeStatus?: number
}
export type EditPolygonData = {
  polygonId: number,
  newOption: { name: string } | { coords: [number, number][][] } | { sequence: string }
}
