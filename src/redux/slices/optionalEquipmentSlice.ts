import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'
import { mapService } from '../../api/map'
import type { EquipType } from '../../types/equip'
import type { EquipModal } from '../../types/equip'
import type { EquipTrailer } from '../../types/equip'

type Type = {id: number, description: string, status:boolean};
type Model = {id: number, description: string, length: string, width: string};
type Trailer = {id: number, trailer_name: string, gosnomer: string};

type OptionalEquipmentInitialState = {
  optionalEquipmentOpenWindow: SidebarOpenWindow,
  addModalVisible: boolean,
  editedType: Type | null,
  editedModel: Model | null,
  editedTrailer: Trailer | null,
  optionalEquipmentTypesList: Array<Type>,
  optionalEquipmentModelList: Array<Model>,
  optionalEquipmentTrailerList: Array<Trailer>
}

const optionalEquipmentInitialState: OptionalEquipmentInitialState = {
  optionalEquipmentOpenWindow: 'EquipmentList',
  editedType: null,
  editedModel: null,
  editedTrailer: null,
  addModalVisible: false,
  optionalEquipmentTypesList: [],
  optionalEquipmentModelList: [],
  optionalEquipmentTrailerList: []
}

const optionalEquipmentSlice = createSlice({
  name: 'optionalEquipment',
  initialState: optionalEquipmentInitialState,
  reducers: {
    setOpenOptionalEquipmentWindow: (state: OptionalEquipmentInitialState, action: {type: string, payload: SidebarOpenWindow}) => {
      state.optionalEquipmentOpenWindow = action.payload
    },
    setAddModalVisible: (state: OptionalEquipmentInitialState, action) => {
      state.addModalVisible = action.payload
      if (action.payload === false) {
        state.editedTrailer = null
        state.editedModel = null
        state.editedType = null
      }
    },
    setEditedType: (state: OptionalEquipmentInitialState, action: {type: string, payload: number}) => {
      state.editedType = state.optionalEquipmentTypesList.find(type => type.id === action.payload) || null
    },
    setEditedModel: (state: OptionalEquipmentInitialState, action: {type: string, payload: number}) => {
      state.editedModel = state.optionalEquipmentModelList.find(type => type.id === action.payload) || null
    },
    setEditedTrailer: (state: OptionalEquipmentInitialState, action: {type: string, payload: number}) => {
      state.editedTrailer = state.optionalEquipmentTrailerList.find(type => type.id === action.payload) || null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTypesList.fulfilled, (state: OptionalEquipmentInitialState, action) => {
        state.optionalEquipmentTypesList = action.payload.data
      })
      .addCase(getEquipsModelsList.fulfilled, (state: OptionalEquipmentInitialState, action) => {
        state.optionalEquipmentModelList = action.payload.data
      })
      .addCase(getTrailerList.fulfilled, (state: OptionalEquipmentInitialState, action) => {
        state.optionalEquipmentTrailerList = action.payload.data
      })
      .addCase(addType.fulfilled, (state: OptionalEquipmentInitialState, action) => {
        //todo сейчас на пост не возвращаются данные с id, да и вообще ничего не возращается
        // state.optionalEquipmentTypesList = [...state.optionalEquipmentTypesList, action.payload.data]
        state.addModalVisible = false
      })
      .addCase(editType.fulfilled, (state: OptionalEquipmentInitialState, action) => {
        state.optionalEquipmentTypesList = state.optionalEquipmentTypesList.map(type => {
          if (type.id === action.payload.id) {
            return { id: action.payload.id, ...action.payload.newData }
          }
          return type
        })
        state.addModalVisible = false
      })
      .addCase(deleteType.fulfilled, (state: OptionalEquipmentInitialState, action) => {
        state.optionalEquipmentTypesList = state.optionalEquipmentTypesList.filter(type => type.id !== action.payload.id)
        state.addModalVisible = false
      })
      .addCase(addModel.fulfilled, (state: OptionalEquipmentInitialState, action) => {
        //todo сейчас на пост не возвращаются данные с id, да и вообще ничего не возращается
        // state.optionalEquipmentModelList = [...state.optionalEquipmentModelList, action.payload.data]
        state.addModalVisible = false
      })
      .addCase(editModel.fulfilled, (state: OptionalEquipmentInitialState, action) => {
        state.optionalEquipmentModelList = state.optionalEquipmentModelList.map(model => {
          const { id, description, length, width } = action.payload
          if (model.id === action.payload.id) {
            return { id, description, length, width }
          }
          return model
        })
        state.addModalVisible = false
      })
      .addCase(deleteModel.fulfilled, (state: OptionalEquipmentInitialState, action) => {
        state.optionalEquipmentModelList = state.optionalEquipmentModelList.filter(model => model.id !== action.payload.id)
        state.addModalVisible = false
      })
      .addCase(addTrailer.fulfilled, (state: OptionalEquipmentInitialState, action) => {
        //todo сейчас на пост не возвращаются данные с id, да и вообще ничего не возращается
        // state.optionalEquipmentTrailerList = [...state.optionalEquipmentTrailerList, action.payload.data]
        state.addModalVisible = false
      })
      .addCase(editTrailer.fulfilled, (state: OptionalEquipmentInitialState, action) => {
        state.optionalEquipmentTrailerList = state.optionalEquipmentTrailerList.map(trailer => {
          const { id, gosnomer, trailer_name } = action.payload
          if (trailer.id === action.payload.id) {
            return { id, gosnomer, trailer_name }
          }
          return trailer
        })
        state.addModalVisible = false
      })
      .addCase(deleteTrailer.fulfilled, (state: OptionalEquipmentInitialState, action) => {
        state.optionalEquipmentTrailerList = state.optionalEquipmentTrailerList.filter(trailer => trailer.id !== action.payload.id)
        state.addModalVisible = false
      })
      .addDefaultCase(() => {
      })
  }
})

export const getTypesList = createAsyncThunk(
  'optionalEquipment/getTypesListThunk',
  () => {
    return mapService.getEquipTypes()
  }
)
//todo получать айдишник назад, для оптимизации, и чтоб не обновлять каждый раз при обновлении
export const addType = createAsyncThunk(
  'map/addTypesListThunk',
  ({ description, status }: {description: string, status: boolean}) => {
    return mapService.addNewEquipType({ description, status })
  }
)
export const editType = createAsyncThunk(
  'optionalEquipment/editTypeThunk',
  ({ status, id, description }: EquipType) => {
    const newData: any = { description, status }
    const response = mapService.editEquipType(id, newData)
    return { id, newData, response }
  }
)
export const deleteType = createAsyncThunk(
  'optionalEquipment/deleteTypeThunk',
  (id: number) => {
    const response = mapService.deleteEquipType(id)
    return { id, response }
  }
)
export const getEquipsModelsList = createAsyncThunk(
  'optionalEquipment/getEquipsModelsListThunk',
  () => {
    return mapService.getEquipsModelsList()
  }
)
//todo получать айдишник назад, для оптимизации, и чтоб не обновлять каждый раз при обновлении
export const addModel = createAsyncThunk(
  'optionalEquipment/addModelThunk',
  (data: any) => {
    return mapService.addNewEquipsModel(data)
  }
)
export const editModel = createAsyncThunk(
  'optionalEquipment/editModelThunk',
  ({ id, description, length, width }: EquipModal) => {
    const response = mapService.editEquipsModel({ id, description, length, width })
    return { id, description, length, width, response }
  }
)
export const deleteModel = createAsyncThunk(
  'optionalEquipment/deleteModelThunk',
  (id: number) => {
    const response = mapService.deleteEquipsModel(id)
    return { id, response }
  }
)
export const getTrailerList = createAsyncThunk(
  'optionalEquipment/getTrailerListThunk',
  () => {
    return mapService.getTrailerList()
  }
)
//todo получать айдишник назад, для оптимизации, и чтоб не обновлять каждый раз при обновлении
export const addTrailer = createAsyncThunk(
  'optionalEquipment/addTrailerThunk',
  (data: any) => {
    return mapService.addTrailer(data)
  }
)
export const editTrailer = createAsyncThunk(
  'optionalEquipment/editTrailerThunk',
  ({ id, ...params }: EquipTrailer) => {
    const response = mapService.editTrailer({ id, ...params })
    return { id, ...params, response }
  }
)
export const deleteTrailer = createAsyncThunk(
  'optionalEquipment/deleteTrailerThunk',
  (id: number) => {
    const response = mapService.deleteTrailer(id)
    return { id, response }
  }
)

const {
  reducer,
  actions
} = optionalEquipmentSlice

export const {
  setOpenOptionalEquipmentWindow,
  setAddModalVisible,
  setEditedType,
  setEditedModel,
  setEditedTrailer
} = actions

export default reducer

export type SidebarOpenWindow = 'EquipmentList' | 'EquipmentTypeList' | 'EquipmentModelList' | 'TrailerModelList'
