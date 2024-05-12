import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { mapService } from '~widgets/map/api'

import type { EquipModal, EquipTrailer, EquipType } from './mapSlice'

type Type = { id: number, description: string, status: boolean };
type Model = { id: number, description: string, length: string, width: string };
type Trailer = { id: number, trailer_name: string, gosnomer: string };

type OptionalEquipmentInitialState = {
  addModalVisible: boolean,
  editedType: Type | null,
  editedModel: Model | null,
  editedTrailer: Trailer | null,
  optionalEquipmentTypesList: Array<Type>,
  optionalEquipmentModelList: Array<Model>,
  optionalEquipmentTrailerList: Array<Trailer>
}

const optionalEquipmentInitialState: OptionalEquipmentInitialState = {
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
    setAddModalVisible: (state: OptionalEquipmentInitialState, action) => {
      state.addModalVisible = action.payload
      if (action.payload === false) {
        state.editedTrailer = null
        state.editedModel = null
        state.editedType = null
      }
    },
    setEditedType: (state: OptionalEquipmentInitialState, action: { type: string, payload: number }) => {
      state.editedType = state.optionalEquipmentTypesList.find(type => type.id === action.payload) || null
    },
    setEditedModel: (state: OptionalEquipmentInitialState, action: { type: string, payload: number }) => {
      state.editedModel = state.optionalEquipmentModelList.find(type => type.id === action.payload) || null
    },
    setEditedTrailer: (state: OptionalEquipmentInitialState, action: { type: string, payload: number }) => {
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
        state.optionalEquipmentTypesList = [...state.optionalEquipmentTypesList, action.payload.data]
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
        state.optionalEquipmentModelList = [...state.optionalEquipmentModelList, action.payload.data]
        state.addModalVisible = false
      })
      .addCase(editModel.fulfilled, (state: OptionalEquipmentInitialState, action) => {
        state.optionalEquipmentModelList = state.optionalEquipmentModelList.map(model => {
          const {
            id,
            description,
            length,
            width
          } = action.payload
          if (model.id === action.payload.id) {
            return {
              id,
              description,
              length,
              width
            }
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
        state.optionalEquipmentTrailerList = [...state.optionalEquipmentTrailerList, action.payload.data]
        state.addModalVisible = false
      })
      .addCase(editTrailer.fulfilled, (state: OptionalEquipmentInitialState, action) => {
        state.optionalEquipmentTrailerList = state.optionalEquipmentTrailerList.map(trailer => {
          const {
            id,
            gosnomer,
            trailer_name
          } = action.payload
          if (trailer.id === action.payload.id) {
            return {
              id,
              gosnomer,
              trailer_name
            }
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
export const addType = createAsyncThunk(
  'map/addTypesListThunk',
  ({
    description,
    status
  }: { description: string, status: boolean }) => {
    return toast.promise(
      mapService.addNewEquipType({
        description,
        status
      }),
      {
        pending: 'Добавление нового типа оборудования...',
        success: 'Новый тип оборудования успешно добавлен',
        error: 'Ошибка при добавлении нового типа оборудования'
      }
    )
  }
)
export const editType = createAsyncThunk(
  'optionalEquipment/editTypeThunk',
  async ({
    status,
    id,
    description
  }: EquipType) => {
    const newData: any = {
      description,
      status
    }

    const response = await toast.promise(
      mapService.editEquipType(id, newData),
      {
        pending: 'Редактирование типа оборудования...',
        success: 'Тип оборудования успешно отредактирован',
        error: 'Ошибка при редактировании типа оборудования'
      }
    )

    return {
      id,
      newData,
      response
    }
  }
)
export const deleteType = createAsyncThunk(
  'optionalEquipment/deleteTypeThunk',
  async (id: number) => {
    const response = await toast.promise(
      mapService.deleteEquipType(id),
      {
        pending: 'Удаление типа оборудования...',
        success: 'Тип оборудования успешно удален',
        error: 'Ошибка при удалении типа оборудования'
      }
    )

    return {
      id,
      response
    }
  }
)
export const getEquipsModelsList = createAsyncThunk(
  'optionalEquipment/getEquipsModelsListThunk',
  () => {
    return mapService.getEquipsModelsList()
  }
)
export const addModel = createAsyncThunk(
  'optionalEquipment/addModelThunk',
  (data: any) => {
    return toast.promise(
      mapService.addNewEquipsModel(data),
      {
        pending: 'Добавление новой модели оборудования...',
        success: 'Новая модель оборудования успешно добавлена',
        error: 'Ошибка при добавлении новой модели оборудования'
      }
    )
  }
)
export const editModel = createAsyncThunk(
  'optionalEquipment/editModelThunk',
  async ({
    id,
    description,
    length,
    width
  }: EquipModal) => {
    const response = await toast.promise(
      mapService.editEquipsModel({
        id,
        description,
        length,
        width
      }),
      {
        pending: 'Редактирование модели оборудования...',
        success: 'Модель оборудования успешно отредактирована',
        error: 'Ошибка при редактировании модели оборудования'
      }
    )

    return {
      id,
      description,
      length,
      width,
      response
    }
  }
)
export const deleteModel = createAsyncThunk(
  'optionalEquipment/deleteModelThunk',
  async (id: number) => {
    const response = await toast.promise(
      mapService.deleteEquipsModel(id),
      {
        pending: 'Удаление модели оборудования...',
        success: 'Модель оборудования успешно удалена',
        error: 'Ошибка при удалении модели оборудования'
      }
    )

    return {
      id,
      response
    }
  }
)
export const getTrailerList = createAsyncThunk(
  'optionalEquipment/getTrailerListThunk',
  () => {
    return mapService.getTrailerList()
  }
)
export const addTrailer = createAsyncThunk(
  'optionalEquipment/addTrailerThunk',
  (data: any) => {
    return toast.promise(
      mapService.addTrailer(data),
      {
        pending: 'Добавление нового прицепа...',
        success: 'Новый прицеп успешно добавлен',
        error: 'Ошибка при добавлении нового прицепа'
      }
    )
  }
)
export const editTrailer = createAsyncThunk(
  'optionalEquipment/editTrailerThunk',
  async ({
    id,
    ...params
  }: EquipTrailer) => {
    const response = await toast.promise(
      mapService.editTrailer({ id, ...params }),
      {
        pending: 'Редактирование прицепа...',
        success: 'Прицеп успешно отредактирован',
        error: 'Ошибка при редактировании прицепа'
      }
    )

    return {
      id,
      ...params,
      response
    }
  }
)
export const deleteTrailer = createAsyncThunk(
  'optionalEquipment/deleteTrailerThunk',
  async (id: number) => {
    const response = await toast.promise(
      mapService.deleteTrailer(id),
      {
        pending: 'Удаление прицепа...',
        success: 'Прицеп успешно удален',
        error: 'Ошибка при удалении прицепа'
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
} = optionalEquipmentSlice

export const {
  setAddModalVisible,
  setEditedType,
  setEditedModel,
  setEditedTrailer
} = actions

export default reducer
