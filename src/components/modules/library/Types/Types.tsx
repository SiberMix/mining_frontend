import s from './Types.module.scss'
import * as cn from 'classnames'
import React from 'react'
import {
  atom,
  useSetAtom
} from 'jotai'
import { useListing } from '../../../../hooks/use-listing'
import type { EquipType } from '../../../../types/equip'
import { mapService } from '../../../../api/map'
import AddTypeModal from './TypesAddModal'

const fetchListHandler = async () => {
  const response = await mapService.getEquipTypes()
  return response.data
}

export const addModalAtom = atom({
  visible: false,
  editMode: false,
  type: null as EquipType | null
})

const EquipmentTypesComponent = () => {
  const setAddModal = useSetAtom(addModalAtom)

  const editItemHandler = async (id: number) => {
    const type = listData.find((item) => item.id === id)
    if (type) {
      setAddModal({ visible: true, editMode: true, type })
    }
  }

  const deleteItemHandler = async (id: number) => {
    await mapService.deleteEquipType(id)
    await fetchList()
  }

  const addModalHandler = () => {
    setAddModal({ visible: true, editMode: false, type: null })
  }

  const { tableBlock, fetchList, listData } = useListing<EquipType>({
    fetchListHandler,
    columnNames: ['Название', 'Статус'],
    mapTableData: (data) => {
      return data.map((item) => ({
        id: item.id,
        Название: item.description,
        Статус: item.status ? 'Активен' : 'Неактивен'
      }))
    },
    editItemHandler,
    deleteItemHandler
  })

  return (
    <div className={cn(s.root)}>
      <button
        className={cn(s.addButton)}
        onClick={addModalHandler}
      >
        + Добавить тип
      </button>
      {tableBlock()}
      <AddTypeModal fetchList={fetchList} />
    </div>
  )
}

export default EquipmentTypesComponent
