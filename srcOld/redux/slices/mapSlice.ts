import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { mapService } from '../../api/map'
import { setAddModalVisible } from './optionalEquipmentSlice'

type MapInitialState = {
  zoomLevel: number,
  polygonsList: PolygonType[],
  equipmentList: Equip[],
  editedEquipment: Equip | null,
  polygonFlyTo: number | undefined,
  equipmentFlyTo: number | undefined,
  drawingPolygonMode: boolean,
  showAddNewPolygonModal: boolean,
  newPolygonCoords: [number, number][][],
  editedPolygon: PolygonType | undefined,
  selectedPolygonId: number | undefined,
  addInternalPolygonMode: boolean,
  equipmentCoordinatesWebSocket: EquipmentSocketData[],
  equipStatusArrWebSocket: EquipEventsSocketDataArr,
  showRightSideEquipInfoImei: number | null
}

const mapInitialState: MapInitialState = {
  zoomLevel: 1,
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
  addInternalPolygonMode: false,
  equipmentCoordinatesWebSocket: [],
  equipStatusArrWebSocket: [],
  showRightSideEquipInfoImei: null
}

const mapSlice = createSlice({
  name: 'map',
  initialState: mapInitialState,
  reducers: {
    setZoomLevel: (state: MapInitialState, action) => {
      state.zoomLevel = action.payload
    },
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
    setEditedEquipment: (state: MapInitialState, action) => {
      state.editedEquipment = state.equipmentList.find(type => type.id === action.payload) || null
    },
    setAddInternalPolygonMode: (state: MapInitialState, action) => {
      state.addInternalPolygonMode = action.payload
    },
    setEquipmentCoordinatesWebSocket: (state: MapInitialState, action) => {
      // console.log('новые координаты трактора:', action.payload)
      state.equipmentCoordinatesWebSocket = [
        ...state.equipmentCoordinatesWebSocket.filter((item) => {
          return item.imei !== action.payload.imei
        }),
        action.payload
      ]
    },
    setEquipStatusArrWebSocket: (state: MapInitialState, action) => {
      // console.log('новые данные по ивентам тракторов:', action.payload)
      action.payload.data.forEach((newData: EquipEventsSocketData) => {
        const dataIndex = state.equipStatusArrWebSocket.findIndex((item) => item.imei === newData.imei)

        if (dataIndex !== -1) {
          const updatedDataList = [...state.equipStatusArrWebSocket]
          updatedDataList[dataIndex] = newData
          state.equipStatusArrWebSocket = updatedDataList
        } else {
          state.equipStatusArrWebSocket = [...state.equipStatusArrWebSocket, newData]
        }
      })
    },
    setShowRightSideEquipInfo: (state: MapInitialState, action) => {
      state.showRightSideEquipInfoImei = action.payload
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
        state.polygonsList = state.polygonsList.filter(polygon => polygon.id !== action.payload.id)
      })
      .addCase(postNewEquipment.fulfilled, (state: MapInitialState, action) => {
        //todo ТУТ МОЖЕТ БЫТЬ БАГ ОСТОРОЖНЕЙ
        state.equipmentList = [...state.equipmentList, action.payload.data]
      })
      .addCase(putEditEquipment.fulfilled, (state: MapInitialState, action) => {
        state.equipmentList = state.equipmentList.map(equip => {
          if (equip.id === action.payload.id) {
            return action.payload
          }
          return equip
        })
      })
      .addCase(deleteEquipment.fulfilled, (state: MapInitialState, action) => {
        state.equipmentList = state.equipmentList.filter(equip => equip.id !== action.payload.equipmentId)
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
  async (data: Omit<EquipForPost, 'id'>, thunkAPI) => {
    const response = await toast.promise(
      mapService.addNewEquip(data),
      {
        pending: 'Добавление нового оборудования...',
        success: 'Новое оборудование успешно добавлено',
        error: 'Ошибка при добавлении нового оборудования'
      }
    )

    thunkAPI.dispatch(setAddModalVisible(false))

    return response
  }
)

export const putEditEquipment = createAsyncThunk(
  'map/editEquipmentThunk',
  async ({
    id,
    ...data
  }: EquipForPut, thunkAPI) => {
    const response = await toast.promise(
      mapService.editEquip({ id, ...data }),
      {
        pending: 'Редактирование оборудования...',
        success: 'Оборудование успешно отредактировано',
        error: 'Ошибка при редактировании оборудования'
      }
    )

    thunkAPI.dispatch(setAddModalVisible(false))

    return response
  }
)

export const deleteEquipment = createAsyncThunk(
  'map/deleteEquipmentThunk',
  async (id: number, thunkAPI) => {
    const response = await mapService.deleteEquip(id)
    thunkAPI.dispatch(setAddModalVisible(false))
    return {
      equipmentId: id,
      response
    }
  }
)
export const postNewPolygon = createAsyncThunk(
  'map/postNewPolygonThunk',
  ({
    coords,
    name,
    activeStatus = 1,
    sequence
  }: PostNewPolygonData) => {
    return toast.promise(
      mapService.addNewPolygon({
        coords,
        name,
        activeStatus,
        sequence
      }),
      {
        pending: 'Добавление нового полигона...',
        success: 'Новый полигон успешно добавлен',
        error: 'Ошибка при добавлении нового полигона'
      }
    )
  }
)
export const putEditPolygon = createAsyncThunk(
  'map/editPolygonThunk',
  async ({
    polygonId,
    newOption
  }: EditPolygonData) => {
    const response = await toast.promise(
      mapService.updatePolygonById({
        polygonId,
        newOption
      }),
      {
        pending: 'Редактирование полигона...',
        success: 'Полигон успешно отредактирован',
        error: 'Ошибка при редактировании полигона'
      }
    )

    return {
      polygonId,
      response
    }
  }
)
export const deletePolygon = createAsyncThunk(
  'map/deletePolygonThunk',
  async (id: number) => {
    const response = await toast.promise(
      mapService.removePolygonById(id),
      {
        pending: 'Удаление полигона...',
        success: 'Полигон успешно удален',
        error: 'Ошибка при удалении полигона'
      }
    )

    return {
      id,
      response
    }
  }
)

const {
  reducer,
  actions
} = mapSlice

export const {
  setZoomLevel,
  setPolygonFlyTo,
  setEquipmentFlyTo,
  setDrawingPolygonMode,
  setShowAddNewPolygonModal,
  setEditedPolygon,
  setNewPolygonCoords,
  setSelectedPolygon,
  removeSelectedPolygon,
  setEditedEquipment,
  setAddInternalPolygonMode,
  setEquipmentCoordinatesWebSocket,
  setEquipStatusArrWebSocket,
  setShowRightSideEquipInfo
} = actions

export default reducer

export type EquipForPost = {
  equip_name: string,
  gosnomer: string,
  equip_type?: string,
  equip_model?: string,
  image_status: string,
  imei: string,
  radius: number | null
}
export type EquipForPut = {
  id: number,
  equip_name: string,
  gosnomer: string,
  equip_type?: string,
  equip_model?: string,
  image_status: string,
  imei: string,
  radius: number | null
}
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

export type EquipmentSocketData = {
  imei: string,
  lat: number,
  lon: number,
  date_time: number,
  type: number,
  speed: number,
  direction: number,
  bat: number,
  fuel_s: number | null,
  fuel_s_second: number | null,
  ignition: number,
  sensor: number,
  reserve: string,
  created_at: number
}

export type EquipEventsSocket = {
  data: EquipEventsSocketDataArr
}

export type EquipEventsSocketDataArr = Array<EquipEventsSocketData>

export type EquipEventsSocketData = {
  imei: string,
  status: EquipStatus,
  last_active: number
}

export type EquipStatus = 'Idle' | 'Active' | 'Offline'

export type PolygonType = {
  id: number | string,
  coords: [number, number][][],
  name: string,
  middle_coord: [number, number],
  activeStatus: number,
  sequence: {
    id: string,
    name: string,
    color: string
  },
  square: string
};

export type Equip = {
  equip_type: string,
  id: number,
  equip_model: string,
  equip_name: string,
  gosnomer: string,
  image_status: string,
  imei: string,
  speed: number,
  fuel: number,
  last_coord?: {
    lat: string,
    lon: string,
    direction: number,
    last_upd_ts: string
  } | null,
  last_status: null | EquipStatus,
  radius: null | number
};

export type EquipType = {
  id: number,
  status: boolean,
  description: string
};

export type EquipModal = {
  id: number,
  description: string,
  length: string,
  width: string
};

export type EquipTrailer = {
  id: number,
  trailer_name: string,
  gosnomer: string
};
