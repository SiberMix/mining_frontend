import { toast } from 'react-toastify'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { fieldsService } from '../api'
import type { FieldsStore, FieldType } from '../types'

export const useFieldStore = create<FieldsStore>()(immer((set, get) => ({
  fieldList: [],
  showAddFieldModal: false,
  editedField: undefined,
  setVisibleAddFieldModal: (val) => {
    set({ editedField: undefined })
    set({ showAddFieldModal: val })
  },
  setChangeFieldModal: (id) => {
    set({ showAddFieldModal: true })
    set((state) => ({
      editedField: state.fieldList.find(field => field.id === id)
    }))
  },
  getAllFields: async () => {
    try {
      const response = await fieldsService.getFieldList()
      set({ fieldList: response.data })
    } catch (err) {
      console.error(err)
    }
  },
  addField: async (data) => {
    try {
      const response = await toast.promise(fieldsService.addField(data), {
        pending: 'Отправка материалы на сервер...',
        success: 'Материал успешно загружено',
        error: 'Произошла ошибка при загрузке материала'
      })
      set((state) => ({
        fieldList: [...state.fieldList, response.data]
      }))
    } catch (err) {
      console.error(err)
    }
  },
  changeField: async (data) => {
    try {
      await toast.promise(fieldsService.editField(data), {
        pending: 'Мняем материал на сервере...',
        success: 'Материал успешно загружена',
        error: 'Произошла ошибка при загрузке материалы'
      })
      set((state) => ({
        fieldList: state.fieldList.map((field: FieldType) => field.id === data.id ? data : field)
      }))
    } catch (err) {
      console.error(err)
    }
  },
  deleteField: async (id) => {
    try {
      await toast.promise(fieldsService.deleteField(id), {
        pending: 'Удаляем материал на сервере...',
        success: 'Материал успешно удалена',
        error: 'Произошла ошибка при удалении материалы'
      })
      set((state) => ({
        fieldList: state.fieldList.filter((field: FieldType) => field.id !== id)
      }))
    } catch (err) {
      console.error(err)
    }
  }
})))
