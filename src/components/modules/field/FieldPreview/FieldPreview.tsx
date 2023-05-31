import s from './FieldPreview.module.scss'
import * as cn from 'classnames'
import React from 'react'
import {
  atom,
  useSetAtom
} from 'jotai'
import { useListing } from '../../../../hooks/use-listing'
import type { Field as FieldType } from '../../../../types/field'
import { fieldTypesAtom } from '../../../pages/Main/Main'
import { mapService } from '../../../../api/map'
import AddPreviewModal from './PreviewAddModal'

export const addModalAtom = atom({
  visible: false,
  editMode: false,
  type: null as FieldType | null
})

const EquipmentPreviewsComponent = () => {
  const setFieldTypes = useSetAtom(fieldTypesAtom)
  const setAddModal = useSetAtom(addModalAtom)

  const fetchListHandler = async () => {
    const { data } = await mapService.getFieldList()
    setFieldTypes(data)
    return data
  }

  const editItemHandler = async (id: number) => {
    const type: any = listData.find((item) => item.id === id)
    if (type) {
      setAddModal({ visible: true, editMode: true, type })
    }
  }

  const deleteItemHandler = async (id: number) => {
    await mapService.deleteField(id)
    await fetchList()
  }

  const { tableBlock, fetchList, listData } = useListing({
    fetchListHandler,
    columnNames: ['Название поля', 'Цвет поля'],
    mapTableData: (data: any) => {
      return data.map((item: any) => {
        return {
          id: item.id,
          'Название поля': item.name,
          'Цвет поля': (
            <div
              style={{
                backgroundColor: item.color,
                width: '20px',
                height: '20px'
              }}
            />
          )
        }
      })
    },
    editItemHandler,
    deleteItemHandler
  })

  const addModalHandler = () => {
    setAddModal({ visible: true, editMode: false, type: null })
  }

  return (
    <div className={cn(s.root)}>
      <button
        className={cn(s.addButton)}
        onClick={addModalHandler}
      >
        + Добавить культуру
      </button>
      <div>
        {tableBlock()}
      </div>
      <AddPreviewModal fetchList={fetchList} />
    </div>
  )
}

export default EquipmentPreviewsComponent
