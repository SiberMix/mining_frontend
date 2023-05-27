import s from './Models.module.scss'
import * as cn from 'classnames'
import React from 'react'
import {
  atom,
  useSetAtom
} from 'jotai'
import { useListing } from '../../../../hooks/use-listing'
import type { EquipModal } from '../../../../types/equip'
import { mapService } from '../../../../api/map'
import AddModelModal from './ModelAddModal'

const fetchListHandler = async () => {
  const response = await mapService.getEquipsModelsList()
  return response.data
}

export const addModalAtom = atom({
  visible: false,
  editMode: false,
  model: null as EquipModal | null
})

const EquipmentModelsComponent = () => {
  const setAddModal = useSetAtom(addModalAtom)

  const editItemHandler = async (id: number) => {
    const model = listData.find((item) => item.id === id)
    if (model) {
      setAddModal({ visible: true, editMode: true, model })
    }
  }

  const deleteItemHandler = async (id: number) => {
    await mapService.deleteEquipsModel(id)
    await fetchList()
  }

  const addModalHandler = () => {
    setAddModal({ visible: true, editMode: false, model: null })
  }

  const { tableBlock, fetchList, listData } = useListing<EquipModal>({
    fetchListHandler,
    columnNames: ['Название', 'Длина', 'Ширина'],
    mapTableData: (data: any) => {
      return data.map((item: any) => {
        return {
          id: item.id,
          Название: item.description,
          Длина: item.length,
          Ширина: item.width
        }
      })
    },
    deleteItemHandler,
    editItemHandler
  })

  return (
    <div className={cn(s.root)}>
      <button
        className={cn(s.addButton)}
        onClick={addModalHandler}
      >
        + Добавить модель
      </button>
      {tableBlock()}
      <AddModelModal fetchList={fetchList} />
    </div>
  )
}

export default EquipmentModelsComponent
