import s from './Trailer.module.scss'
import * as cn from 'classnames'
import React from 'react'
import {
  atom,
  useSetAtom
} from 'jotai'
import { useListing } from '../../../../hooks/use-listing'
import type { EquipTrailer } from '../../../../types/equip'
import { mapService } from '../../../../api/map'
import AddTrailerModal from './TrailerAddModal'

const fetchListHandler = async () => {
  const response = await mapService.getTrailerList()
  return response.data
}

export const addModalAtom = atom({
  visible: false,
  editMode: false,
  trailer: null as EquipTrailer | null
})

const EquipmentTrailersComponent = () => {
  const setAddModal = useSetAtom(addModalAtom)

  const editItemHandler = async (id: number) => {
    const trailer = listData.find((item) => item.id === id)
    if (trailer) {
      setAddModal({ visible: true, editMode: true, trailer })
    }
  }

  const deleteItemHandler = async (id: number) => {
    await mapService.deleteTrailer(id)
    await fetchList()
  }

  const addModalHandler = () => {
    setAddModal({ visible: true, editMode: false, trailer: null })
  }

  const { tableBlock, fetchList, listData } = useListing<EquipTrailer>({
    fetchListHandler,
    columnNames: ['Название прицепа', 'Госномер'],
    mapTableData: (data: any) => {
      return data.map((item: any) => {
        return {
          id: item.id,
          'Название прицепа': item.trailer_name,
          Госномер: item.gosnomer
        }
      })
    },
    deleteItemHandler,
    editItemHandler
  })

  return (
    <div className={cn(s.EquipmentTrailersComponent)}>
      <button
        className={cn(s.AddButton)}
        onClick={addModalHandler}
      >
        + Добавить прицеп
      </button>
      {tableBlock()}
      <AddTrailerModal fetchList={fetchList} />
    </div>
  )
}

export default EquipmentTrailersComponent
