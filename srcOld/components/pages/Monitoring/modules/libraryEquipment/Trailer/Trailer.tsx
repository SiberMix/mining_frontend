import * as cn from 'classnames'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useListing } from '~shared/hooks/use-listing/use-listing'

import { getOptionalEquipmentTrailerListSelector } from '../../../../../../redux/selectors/optionalEquipmentSelectors'
import { deleteTrailer, setAddModalVisible, setEditedTrailer } from '../../../../../../redux/slices/optionalEquipmentSlice'
import { useAppDispatch } from '../../../../../../redux/store'
import type { EquipTrailer } from '../../../../../../types/equip'
import s from './Trailer.module.scss'
import AddTrailerModal from './TrailerAddModal'

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

  const {
    tableBlock,
    refreshData
  } = useListing<EquipTrailer>({
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
