import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'
import { mapService } from '../../api/map'

type FieldsInitialState = {
  fieldList: FieldType[],
  showAddFieldModal: boolean,
  editedField: FieldType | undefined
}

const fieldsInitialState: FieldsInitialState = {
  fieldList: [],
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
        state.fieldList = action.payload.data
        //fixme возможен неправильный путь к получаемому полигону на ответ
      })
      .addCase(changeField.fulfilled, (state: FieldsInitialState, action) => {

        //todo логика обработки после редактирования
      })
      .addCase(deleteField.fulfilled, (state: FieldsInitialState, action) => {
        // state.fieldList = state.fieldList.filter(field => {field.id !== action.payload.id})
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
  async ({ id, name, color } : FieldType) => {
    const response = await mapService.editField({
      id,
      name,
      color
    })
    return { id, response }
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
  id: string,
  name: string,
  color: string
}
type FieldAddType = {
  name: string,
  color: string
}
