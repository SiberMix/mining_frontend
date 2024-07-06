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
        pending: 'Отправка культуры на сервер...',
        success: 'Культура успешно загружено',
        error: 'Произошла ошибка при загрузке поля'
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
        pending: 'Мняем культуру на сервере...',
        success: 'Культура успешно загружена',
        error: 'Произошла ошибка при загрузке культуры'
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
        pending: 'Удаляем культуру на сервере...',
        success: 'Культура успешно удалена',
        error: 'Произошла ошибка при удалении культуры'
      })
      set((state) => ({
        fieldList: state.fieldList.filter((field: FieldType) => field.id !== id)
      }))
    } catch (err) {
      console.error(err)
    }
  }
})))
