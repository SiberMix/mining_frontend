import s from './Trailer.module.scss'
import * as cn from 'classnames'
import React, { useEffect } from 'react'
import { useListing } from '../../../../hooks/use-listing'
import type { EquipTrailer } from '../../../../types/equip'
import AddTrailerModal from './TrailerAddModal'
import { useSelector } from 'react-redux'
import {
  getOptionalEquipmentTrailerListSelector
} from '../../../../redux/selectors/optionalEquipmentSelectors'
import { useAppDispatch } from '../../../../redux/store'
import {
  deleteTrailer,
  setAddModalVisible,
  setEditedTrailer
} from '../../../../redux/slices/optionalEquipmentSlice'

const EquipmentTrailersComponent = () => {
  const dispatch = useAppDispatch()
  const trailerList = useSelector(getOptionalEquipmentTrailerListSelector)

  const editItemHandler = async (id: number) => {
    dispatch(setEditedTrailer(id))
    dispatch(setAddModalVisible(true))
  }

  const deleteItemHandler = async (id: number) => {
    dispatch(deleteTrailer(id))
  }

  const addModalHandler = () => {
    dispatch(setAddModalVisible(true))
  }

  const { tableBlock, refreshData } = useListing<EquipTrailer>({
    columnNames: ['Название прицепа', 'Госномер'],
    mapTableData: (trailerList: any) => {
      return trailerList.map((item: any) => {
        return {
          id: item.id,
          key: item.id,
          'Название прицепа': item.trailer_name,
          Госномер: item.gosnomer
        }
      })
    },
    fetchListHandler: () => trailerList,
    deleteItemHandler,
    editItemHandler
  })

  useEffect(() => {
    refreshData()
  }, [trailerList])

  return (
    <div className={cn(s.EquipmentTrailersComponent)}>
      <button
        className={cn(s.AddButton)}
        onClick={addModalHandler}
      >
        + Добавить прицеп
      </button>
      {tableBlock()}
      <AddTrailerModal />
    </div>
  )
}

export default React.memo(EquipmentTrailersComponent)
