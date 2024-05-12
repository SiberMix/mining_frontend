import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { cropRotationApi } from '~entities/crop-rotation/api'

import type { RootState } from '../store'

type CropRotationSliceInitialState = {
  openCropRotationAddGroupModal: boolean,
  cropRotationGroups: CropRotationGroup[],
  selectedCropRotationGroup: number | null,
  editedCropRotationGroup: CropRotationGroup | undefined,
  isLoadingCropRotation: boolean,
  arrOfLoadingCultures: EditCropRotationGroupCulture[],
  isLoadingCreationNewMainGroup: boolean
}

const cropRotationSliceInitialState: CropRotationSliceInitialState = {
  openCropRotationAddGroupModal: false,
  cropRotationGroups: [],
  selectedCropRotationGroup: null,
  editedCropRotationGroup: undefined,
  isLoadingCropRotation: false,
  arrOfLoadingCultures: [],
  isLoadingCreationNewMainGroup: false
}

const cropRotationSlice = createSlice({
  name: 'cropRotation',
  initialState: cropRotationSliceInitialState,
  reducers: {
    setOpenCropRotationAddGroupModal: (state: CropRotationSliceInitialState, action) => {
      state.openCropRotationAddGroupModal = action.payload
    },
    setSelectedCropRotationGroup: (state: CropRotationSliceInitialState, action) => {
      state.selectedCropRotationGroup = action.payload
    },
    setEditedCropRotationGroup: (state: CropRotationSliceInitialState, action) => {
      console.log(`выбрана ${action.payload} группа на редактирование`)
    },
    pushArrOfLoadingCultures: (state: CropRotationSliceInitialState, action) => {
      state.arrOfLoadingCultures.push(action.payload)
    },
    removeLoadingFromArrOfLoadingCultures: (state: CropRotationSliceInitialState, action: {
      type: string,
      payload: EditCropRotationGroupCulture
    }) => {
      const {
        groupId,
        year,
        cultureId,
        polygonId
      } = action.payload
      state.arrOfLoadingCultures = state.arrOfLoadingCultures.filter((loadingCulture: EditCropRotationGroupCulture) => {
        const findLoadingForRemove = loadingCulture.cultureId === cultureId
          && loadingCulture.groupId === groupId
          && loadingCulture.polygonId === polygonId
          && loadingCulture.year === year

        return !findLoadingForRemove
      })
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getCropRotationGroupsThunk.pending, (state: CropRotationSliceInitialState) => {
        state.isLoadingCropRotation = true
      })
      .addCase(getCropRotationGroupsThunk.rejected, (state: CropRotationSliceInitialState) => {
        state.isLoadingCropRotation = false
      })
      .addCase(getCropRotationGroupsThunk.fulfilled, (state: CropRotationSliceInitialState, action) => {
        state.cropRotationGroups = action.payload
        state.isLoadingCropRotation = false
      })
      .addCase(postCropRotationGroupThunk.fulfilled, (state: CropRotationSliceInitialState, action) => {
        state.cropRotationGroups = [...state.cropRotationGroups, action.payload]
      })
      .addCase(deleteCropRotationGroupThunk.fulfilled, (state: CropRotationSliceInitialState, action) => {
        state.cropRotationGroups = state.cropRotationGroups.filter(group => group.id_group !== action.payload.groupId)
        if (state.selectedCropRotationGroup === action.payload.groupId) {
          if (state.cropRotationGroups.length === 0) {
            state.selectedCropRotationGroup = null
          } else {
            state.selectedCropRotationGroup = state.cropRotationGroups[0].id_group
          }
        }
      })
      .addCase(editCropRotationGroupCultureThunk.fulfilled, (state, action) => {
        const {
          groupId,
          year,
          polygonId
        } = action.payload.editCropRotationGroupCultureData

        state.cropRotationGroups = state.cropRotationGroups.map(group => {
          if (group.id_group !== groupId) return group

          return {
            ...group,
            years: group.years.map(yearData => {
              if (+yearData.year !== year) return yearData

              return {
                ...yearData,
                cropPolygons: yearData.cropPolygons.map(polygon => {
                  if (polygon.id !== polygonId) return polygon

                  return {
                    ...polygon,
                    culture: action.payload.nameOfCulture
                  }
                })
              }
            })
          } as CropRotationGroup
        })
      })
      .addCase(setMainCropRotationGroupThunk.pending, (state: CropRotationSliceInitialState, action) => {
        state.isLoadingCreationNewMainGroup = true
      })
      .addCase(setMainCropRotationGroupThunk.rejected, (state: CropRotationSliceInitialState, action) => {
        state.isLoadingCreationNewMainGroup = false
      })
      .addCase(setMainCropRotationGroupThunk.fulfilled, (state: CropRotationSliceInitialState, action) => {
        const newMainGroup = state.cropRotationGroups.find(group => group.id_group === action.payload.groupId)

        if (newMainGroup) {
          const otherGroups = state.cropRotationGroups.filter(group => group.id_group !== action.payload.groupId)
          state.cropRotationGroups = [newMainGroup, ...otherGroups]
        } else {
          toast.error('Произошла ошибка при формировании главной группы в списке, пожалуйста перезагрузите страницу и обратитесь в нашу поддержку')
        }
        state.isLoadingCreationNewMainGroup = false
      })
      .addDefaultCase(() => {
      })
  }
})

export const getCropRotationGroupsThunk = createAsyncThunk(
  'cropRotation/getCropRotationGroupsThunk',
  () => {
    return toast.promise(cropRotationApi.getCropRotationGroups(), {
      pending: 'Загрузка групп с сервера',
      success: 'Группы успешно загружены',
      error: 'Ошибка при загрузке групп'
    })
  }
)
export const postCropRotationGroupThunk = createAsyncThunk(
  'cropRotation/postCropRotationGroupsThunk',
  (postData: PostCropRotationGroup) => {
    return toast.promise(cropRotationApi.postCropRotationGroup(postData), {
      pending: 'Формирование группы на сервере',
      success: 'Группа успешно сформирована',
      error: 'Ошибка при создании группы'
    })
  }
)
export const deleteCropRotationGroupThunk = createAsyncThunk(
  'cropRotation/deleteCropRotationGroupsThunk',
  async (groupId: number) => {
    const response = await toast.promise(
      cropRotationApi.deleteCropRotationGroup(groupId),
      {
        pending: 'Удаляю данные о группе с сервера',
        success: 'Группа успешно удалена',
        error: 'Произошла ошибка при удалении группы'
      }
    )
    return {
      response,
      groupId
    }
  }
)
export const editCropRotationGroupCultureThunk = createAsyncThunk(
  'cropRotation/editCropRotationGroupCultureThunk',
  async (editCropRotationGroupCultureData: EditCropRotationGroupCulture, thunkAPI) => {
    const dispatch = thunkAPI.dispatch
    const state = thunkAPI.getState() as RootState
    const nameOfCulture = state.fieldsReducer.fieldList.find(field => field.id === editCropRotationGroupCultureData.cultureId)?.name

    let response
    try {
      dispatch(pushArrOfLoadingCultures(editCropRotationGroupCultureData))
      response = await cropRotationApi.editCropRotationGroupCulture(editCropRotationGroupCultureData)
      dispatch(removeLoadingFromArrOfLoadingCultures(editCropRotationGroupCultureData))
    } catch (e) {
      dispatch(removeLoadingFromArrOfLoadingCultures(editCropRotationGroupCultureData))
    }

    return {
      response,
      editCropRotationGroupCultureData,
      nameOfCulture
    }
  }
)

export const setMainCropRotationGroupThunk = createAsyncThunk(
  'cropRotation/setMainCropRotationGroup',
  async (groupId: number) => {
    const response = await toast.promise(
      cropRotationApi.setMainCropRotationGroup(groupId),
      {
        pending: 'Применение выбранных культур',
        success: 'Культуры полей успешно применены',
        error: 'Произошла ошибка при применении культур'
      }
    )
    return {
      response,
      groupId
    }
  }
)

const {
  reducer,
  actions
} = cropRotationSlice

export const {
  setOpenCropRotationAddGroupModal,
  setSelectedCropRotationGroup,
  setEditedCropRotationGroup,
  removeLoadingFromArrOfLoadingCultures,
  pushArrOfLoadingCultures
} = actions

export default reducer

export type PostCropRotationGroup = {
  groupName: string,
  description: string,
  groupData: number[]
}

export type EditCropRotationGroupCulture = {
  groupId: number,
  year: number,
  polygonId: number,
  cultureId: number
}

export type CropRotationGroup = {
  name: string,
  id_group: number,
  description: string,
  years: CropRotationGroupYear[]
}

export type CropRotationGroupYear = {
  year: string,
  cropPolygons: CropPolygon[]
}

export type CropPolygon = {
  id: number,
  culture: string | null
}
