import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'
import { mapService } from '../../api/map'
import { getAllPolygons } from './mapSlice'

type FieldsInitialState = {
  fieldList: FieldType[],
  showAddFieldModal: boolean,
  editedField: FieldType | undefined
}

const fieldsInitialState: FieldsInitialState = {
  fieldList: [{
    id: 1,
    name: 'string',
    color: 'red'
  }],
  showAddFieldModal: false,
  editedField: undefined
}

const fieldSlice = createSlice({
  name: 'fields',
  initialState: fieldsInitialState,
  reducers: {
    setVisibleAddFieldModal: (state: FieldsInitialState, action) => {
      state.editedField = undefined
      state.showAddFieldModal = action.payload
    },
    setChangeFieldModal: (state: FieldsInitialState, action) => {
      state.showAddFieldModal = true
      state.editedField = state.fieldList.find(field => field.id === action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFields.fulfilled, (state: FieldsInitialState, action) => {
        state.fieldList = action.payload.data
      })
      .addCase(addField.fulfilled, (state: FieldsInitialState, action) => {
        state.fieldList = [...state.fieldList, action.payload.data]
      })
      .addCase(changeField.fulfilled, (state: FieldsInitialState, action) => {
        state.fieldList = state.fieldList.map((field: FieldType) => {
          if (field.id === action.payload.id) {
            return {
              id: action.payload.id,
              name: action.payload.name,
              color: action.payload.color
            }
          }
          return field
        })
      })
      .addCase(deleteField.fulfilled, (state: FieldsInitialState, action) => {
        state.fieldList = state.fieldList.filter((field: FieldType) => field.id !== action.payload.id)
      })
      .addDefaultCase(() => {})
  }
})

export const getAllFields = createAsyncThunk(
  'fields/getAllFieldsThunk',
  () => {
    return mapService.getFieldList()
  }
)
export const addField = createAsyncThunk(
  'fields/addFieldThunk',
  ({ name, color }: FieldAddType) => {
    return mapService.addField({
      name,
      color
    })
  }
)
export const changeField = createAsyncThunk(
  'fields/changeFieldThunk',
  async ({ id, name, color } : FieldType, thunkAPI) => {
    const response = await mapService.editField({
      id,
      name,
      color
    })
    thunkAPI.dispatch(getAllPolygons())
    return { id, name, color, response }
  }
)
export const deleteField = createAsyncThunk(
  'fields/deleteFieldThunk',
  async (id: number) => {
    const response = await mapService.deleteField(id)
    return { id, response }
  }
)

const {
  reducer,
  actions
} = fieldSlice

export const {
  setVisibleAddFieldModal,
  setChangeFieldModal
} = actions

export default reducer

export type FieldType = {
  id: number,
  name: string,
  color: string
}
type FieldAddType = {
  name: string,
  color: string
}
